import { getCloudflareContext } from '@opennextjs/cloudflare';
import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { emailOTP } from 'better-auth/plugins';

// better-auth 配置选项会生成过深的泛型，缓存实例用 any 规避
// biome-ignore lint/suspicious/noExplicitAny: better-auth 复杂类型推断
let _auth: any = null;

export async function getAuth() {
  if (_auth) return _auth;

  const { env } = await getCloudflareContext({ async: true });

  _auth = betterAuth({
    baseURL: env.BETTER_AUTH_URL || 'http://localhost:3000',
    secret: env.BETTER_AUTH_SECRET,

    // D1 数据库配置
    database: {
      provider: 'sqlite',
      url: env.DB as unknown as string,
    },

    // 禁用邮箱密码登录，只使用 OTP
    emailAndPassword: {
      enabled: false,
    },

    plugins: [
      emailOTP({
        async sendVerificationOTP({
          email,
          otp,
          type,
        }: {
          email: string;
          otp: string;
          type: string;
        }) {
          const subjects: Record<string, string> = {
            'sign-in': 'VibeSite 登录验证码',
            'email-verification': 'VibeSite 邮箱验证',
            'forget-password': 'VibeSite 重置密码',
          };

          try {
            await env.EMAIL.send({
              to: email,
              from: 'noreply@vibe.meathill.com',
              subject: subjects[type] || 'VibeSite 验证码',
              html: `
                <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto; padding: 20px;">
                  <h2 style="color: #333;">VibeSite 验证码</h2>
                  <p style="color: #666;">您的验证码是：</p>
                  <div style="background: #f5f5f5; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0;">
                    <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #333;">${otp}</span>
                  </div>
                  <p style="color: #999; font-size: 14px;">此验证码将在 5 分钟后过期。</p>
                  <p style="color: #999; font-size: 14px;">如果这不是您的操作，请忽略此邮件。</p>
                </div>
              `,
              text: `您的 VibeSite 验证码是：${otp}，此验证码将在 5 分钟后过期。`,
            });
          } catch (error) {
            console.error('Failed to send OTP email:', error);
            throw new Error('发送验证码失败，请稍后重试');
          }
        },
        otpLength: 6,
        expiresIn: 300, // 5 分钟
        allowedAttempts: 3,
      }),
      nextCookies(), // 必须在最后
    ],
  });

  return _auth;
}
