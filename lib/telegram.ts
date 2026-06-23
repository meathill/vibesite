import type { Submission } from '@/types';

const STATUS_LABELS: Record<string, string> = {
  pending: '⏳ 待处理',
  processing: '🔧 部署中',
  deployed: '✅ 已上线',
  failed: '❌ 部署失败',
  expired: '⏰ 已过期',
};

const INTENT_LABELS: Record<string, string> = {
  preview: '仅预览',
  hosting: '长期托管',
  custom_domain: '绑定域名',
  human_service: '需要人工服务',
};

export async function sendTelegramMessage(
  token: string,
  chatId: string,
  text: string,
): Promise<void> {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram API error: ${response.status} ${body}`);
  }
}

export function sendNewSubmissionNotification(
  token: string,
  chatId: string,
  submission: Submission,
): Promise<void> {
  const lines = [
    '📥 <b>新提交</b>',
    '',
    `<b>项目名称：</b>${submission.project_name}`,
    `<b>联系方式：</b>${submission.contact}`,
  ];

  if (submission.intent) {
    lines.push(`<b>用途：</b>${INTENT_LABELS[submission.intent] ?? submission.intent}`);
  }

  if (submission.description) {
    lines.push(`<b>描述：</b>${submission.description}`);
  }

  lines.push('', `<b>提交 ID：</b><code>${submission.id}</code>`);

  return sendTelegramMessage(token, chatId, lines.join('\n'));
}

export function sendStatusUpdateNotification(
  token: string,
  chatId: string,
  submission: Submission,
): Promise<void> {
  const lines = [
    '🔄 <b>状态更新</b>',
    '',
    `<b>项目名称：</b>${submission.project_name}`,
    `<b>状态：</b>${STATUS_LABELS[submission.status] ?? submission.status}`,
  ];

  if (submission.temporary_url) {
    lines.push(`<b>预览链接：</b>${submission.temporary_url}`);
  }

  if (submission.permanent_url) {
    lines.push(`<b>永久链接：</b>${submission.permanent_url}`);
  }

  if (submission.error_message) {
    lines.push(`<b>错误信息：</b>${submission.error_message}`);
  }

  lines.push('', `<b>提交 ID：</b><code>${submission.id}</code>`);

  return sendTelegramMessage(token, chatId, lines.join('\n'));
}
