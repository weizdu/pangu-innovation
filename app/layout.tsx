import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Sans_SC } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto-sans-sc',
})

export const metadata: Metadata = { 
  title: "盘古创新 - AI教练", 
  description: "你的点子值多少钱？一键生成商业闭环，验证疯狂的创业想法。", 
  icons: { 
    icon: '/pangu logo.png', // 已经放了这个文件 
  }, 
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} ${notoSansSC.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
