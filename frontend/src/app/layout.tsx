import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '../i18n/LanguageContext';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ikura — Thiết Bị Bếp Cao Cấp | Bếp Ga Chuẩn An Toàn Cho Căn Bếp Việt',
  description: 'Thương hiệu thiết bị nhà bếp Ikura chuyên phân phối bếp ga âm, bếp ga hồng ngoại, bếp ga dương với công nghệ cảm biến tự động ngắt ga FFD, đầu đốt đồng thau và bảo hành chính hãng 24 - 36 tháng.',
  keywords: [
    'bếp ga Ikura',
    'bếp ga âm',
    'bếp ga ngắt ga tự động',
    'bảo hành bếp ga',
    'thiết bị nhà bếp an toàn',
    'bếp ga hồng ngoại'
  ],
  authors: [{ name: 'Ikura Vietnam' }],
  icons: {
    icon: '/logo/ikura_logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`scroll-smooth ${plusJakartaSans.variable}`}>
      <body className="min-h-screen flex flex-col bg-neutral-bg text-text-primary antialiased selection:bg-accent-pink selection:text-neutral-white font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
