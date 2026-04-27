import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wrenching 101 | Mettle Cycling',
  description: 'Intro bike maintenance event tool for learning bike parts, terminology, and common fixes.',
  metadataBase: new URL('https://wrenching101.mettlecycling.com'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
