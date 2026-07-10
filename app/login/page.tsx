'use client';

import { EnvelopeSimpleIcon, WarningCircleIcon } from '@phosphor-icons/react/dist/ssr';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OTPField, OTPFieldInput } from '@/components/ui/otp-field';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';

const OTP_LENGTH = 6;
const OTP_SLOT_KEYS = Array.from({ length: OTP_LENGTH }, (_, i) => `otp-slot-${i}`);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSendOTP(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { error: otpError } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: 'sign-in',
      });

      if (otpError) {
        setError(otpError.message || '发送验证码失败，请稍后重试');
        return;
      }

      setStep('otp');
    } catch {
      setError('发送验证码失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVerifyOTP(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { error: signInError } = await authClient.signIn.emailOtp({
        email,
        otp,
      });

      if (signInError) {
        setError(signInError.message || '验证码错误，请重新输入');
        return;
      }

      // 登录成功，重定向到上传页面
      router.push('/submit');
    } catch {
      setError('登录失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">登录 VibeSite</CardTitle>
        </CardHeader>
        <CardContent>
          {step === 'email' ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">邮箱地址</Label>
                <div className="relative">
                  <EnvelopeSimpleIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
                <p className="text-sm text-muted-foreground">我们将向您的邮箱发送一个 6 位验证码</p>
              </div>

              {error && (
                <Alert variant="error">
                  <WarningCircleIcon />
                  <AlertTitle>{error}</AlertTitle>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner className="mr-2 size-4" />
                    发送中...
                  </>
                ) : (
                  '发送验证码'
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">验证码</Label>
                <OTPField
                  id="otp"
                  length={OTP_LENGTH}
                  value={otp}
                  onValueChange={setOtp}
                  disabled={isLoading}
                  required
                  className="justify-center"
                >
                  {OTP_SLOT_KEYS.map((slotKey, index) => (
                    <OTPFieldInput key={slotKey} autoFocus={index === 0} />
                  ))}
                </OTPField>
                <p className="text-sm text-muted-foreground">
                  验证码已发送至 <span className="font-medium">{email}</span>
                </p>
              </div>

              {error && (
                <Alert variant="error">
                  <WarningCircleIcon />
                  <AlertTitle>{error}</AlertTitle>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || otp.length !== OTP_LENGTH}
              >
                {isLoading ? (
                  <>
                    <Spinner className="mr-2 size-4" />
                    验证中...
                  </>
                ) : (
                  '验证并登录'
                )}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setStep('email');
                  setOtp('');
                  setError('');
                }}
                disabled={isLoading}
              >
                返回修改邮箱
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
