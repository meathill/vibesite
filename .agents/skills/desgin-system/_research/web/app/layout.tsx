import { Space_Grotesk } from 'next/font/google';
import Script from 'next/script';
import type { ReactNode } from 'react';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={spaceGrotesk.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">{children}</body>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
    </html>
  );
}
