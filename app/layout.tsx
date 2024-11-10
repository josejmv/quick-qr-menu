// main tools
import localFont from 'next/font/local'

// styles
import './globals.css'

// types
import type { Metadata } from 'next'

const geistSans = localFont({
  weight: '100 900',
  variable: '--font-geist-sans',
  src: './(assets)/fonts/GeistVF.woff',
})
const geistMono = localFont({
  weight: '100 900',
  variable: '--font-geist-mono',
  src: './(assets)/fonts/GeistMonoVF.woff',
})

export const metadata: Metadata = {
  title: 'QuickMenü',
  description: 'QuickMenü is a restaurant menu app',
}

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang='es'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}

export default RootLayout
