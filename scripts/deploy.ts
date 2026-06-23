#!/usr/bin/env node
/**
 * 本地部署脚本
 *
 * 用法：
 *   pnpm run deploy:script -- --id=abc123 --file=./project.zip --api=https://vibesite.pages.dev
 *   pnpm run deploy:script -- --id=abc123 --r2-key=submissions/abc123/project.zip --api=https://vibesite.pages.dev
 *
 * 参数：
 *   --id        提交 ID（必填）
 *   --file      本地 zip 文件路径（与 --r2-key 二选一）
 *   --r2-key    R2 中的文件 key（与 --file 二选一）
 *   --api       API 基础 URL（必填）
 *   --admin-pwd 管理员密码（必填）
 *   --temp-url  预览链接前缀（可选，如 https://preview.example.com）
 */

import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parseArgs } from 'node:util';

interface DeployArgs {
  id: string;
  file?: string;
  r2Key?: string;
  api: string;
  adminPwd: string;
  tempUrl?: string;
}

function parseCliArgs(): DeployArgs {
  const { values } = parseArgs({
    options: {
      id: { type: 'string' },
      file: { type: 'string' },
      'r2-key': { type: 'string' },
      api: { type: 'string' },
      'admin-pwd': { type: 'string' },
      'temp-url': { type: 'string' },
    },
  });

  if (!values.id) {
    console.error('❌ 缺少 --id 参数');
    process.exit(1);
  }
  if (!values.file && !values['r2-key']) {
    console.error('❌ 需要 --file 或 --r2-key 参数');
    process.exit(1);
  }
  if (!values.api) {
    console.error('❌ 缺少 --api 参数');
    process.exit(1);
  }
  if (!values['admin-pwd']) {
    console.error('❌ 缺少 --admin-pwd 参数');
    process.exit(1);
  }

  return {
    id: values.id,
    file: values.file,
    r2Key: values['r2-key'],
    api: values.api,
    adminPwd: values['admin-pwd'],
    tempUrl: values['temp-url'],
  };
}

function log(message: string): void {
  const time = new Date().toLocaleTimeString('zh-CN');
  console.log(`[${time}] ${message}`);
}

function exec(cmd: string, cwd?: string): string {
  log(`  执行: ${cmd}`);
  return execSync(cmd, { cwd, encoding: 'utf-8', stdio: 'pipe' }).trim();
}

function detectProjectType(dirPath: string): 'html' | 'vite' | 'react' | 'unknown' {
  if (existsSync(join(dirPath, 'package.json'))) {
    const pkg = JSON.parse(readFileSync(join(dirPath, 'package.json'), 'utf-8'));
    if (pkg.dependencies?.react || pkg.devDependencies?.react) {
      if (pkg.dependencies?.next) {
        return 'unknown'; // Next.js 不支持
      }
      return 'react';
    }
    if (pkg.devDependencies?.vite || pkg.dependencies?.vite) {
      return 'vite';
    }
    return 'vite'; // 有 package.json 默认当 Vite 项目
  }

  if (existsSync(join(dirPath, 'index.html'))) {
    return 'html';
  }

  // 检查子目录
  const entries = exec(`ls -1`, dirPath).split('\n');
  if (entries.length === 1) {
    const subDir = join(dirPath, entries[0]);
    if (existsSync(join(subDir, 'index.html'))) return 'html';
    if (existsSync(join(subDir, 'package.json'))) return detectProjectType(subDir);
  }

  return 'unknown';
}

async function updateStatus(
  api: string,
  id: string,
  adminPwd: string,
  status: string,
  data: Record<string, string> = {},
): Promise<void> {
  // 先登录获取 cookie
  const loginResponse = await fetch(`${api}/api/admin/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: adminPwd }),
  });

  const cookies = loginResponse.headers.get('set-cookie') ?? '';

  const response = await fetch(`${api}/api/admin/submissions/${id}/result`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies,
    },
    body: JSON.stringify({ status, ...data }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`更新状态失败: ${response.status} ${body}`);
  }
}

async function main(): Promise<void> {
  const args = parseCliArgs();
  const workDir = resolve(`.deploy-${args.id}`);
  const extractDir = join(workDir, 'src');
  const outputDir = join(workDir, 'dist');

  try {
    // 1. 更新状态为处理中
    log('📤 更新状态为处理中...');
    await updateStatus(args.api, args.id, args.adminPwd, 'processing');

    // 2. 准备工作目录
    mkdirSync(extractDir, { recursive: true });

    // 3. 获取 zip 文件
    if (args.file) {
      log(`📦 解压本地文件: ${args.file}`);
      exec(`unzip -o "${resolve(args.file)}" -d "${extractDir}"`);
    } else {
      log(`📦 从 R2 下载文件: ${args.r2Key}`);
      // 使用 wrangler 下载
      exec(
        `npx wrangler r2 object get vibesite-uploads/${args.r2Key} --file="${join(workDir, 'source.zip')}"`,
      );
      exec(`unzip -o "${join(workDir, 'source.zip')}" -d "${extractDir}"`);
    }

    // 4. 检测项目类型
    const projectType = detectProjectType(extractDir);
    log(`🔍 检测到项目类型: ${projectType}`);

    if (projectType === 'unknown') {
      throw new Error('无法识别的项目类型，仅支持纯 HTML/CSS/JS、Vite 项目和 React SPA');
    }

    // 5. 构建
    mkdirSync(outputDir, { recursive: true });

    switch (projectType) {
      case 'html':
        log('📋 纯 HTML 项目，直接复制...');
        exec(`cp -r "${extractDir}"/* "${outputDir}"/`);
        break;

      case 'vite':
        log('🔧 安装依赖...');
        exec('npm install --prefer-offline', extractDir);
        log('🔧 构建 Vite 项目...');
        exec('npx vite build', extractDir);
        // 复制 dist 目录
        const viteDist = existsSync(join(extractDir, 'dist'))
          ? join(extractDir, 'dist')
          : join(extractDir, 'build');
        exec(`cp -r "${viteDist}"/* "${outputDir}"/`);
        break;

      case 'react':
        log('🔧 安装依赖...');
        exec('npm install --prefer-offline', extractDir);
        log('🔧 构建 React 项目...');
        exec('npx react-scripts build', extractDir);
        exec(`cp -r "${join(extractDir, 'build')}"/* "${outputDir}"/`);
        break;
    }

    // 6. 生成预览链接
    const previewUrl = args.tempUrl
      ? `${args.tempUrl}/${args.id}/`
      : `https://preview.vibesite.dev/${args.id}/`;

    // 7. 更新状态为已部署
    log('✅ 更新状态为已部署...');
    await updateStatus(args.api, args.id, args.adminPwd, 'deployed', {
      temporary_url: previewUrl,
    });

    log(`🎉 部署成功！预览链接: ${previewUrl}`);
  } catch (error) {
    log(`❌ 部署失败: ${error instanceof Error ? error.message : String(error)}`);

    // 更新状态为失败
    try {
      await updateStatus(args.api, args.id, args.adminPwd, 'failed', {
        error_message: error instanceof Error ? error.message : String(error),
      });
    } catch {
      log('⚠️ 无法更新失败状态');
    }

    process.exit(1);
  } finally {
    // 清理工作目录
    if (existsSync(workDir)) {
      log('🧹 清理工作目录...');
      rmSync(workDir, { recursive: true, force: true });
    }
  }
}

main();
