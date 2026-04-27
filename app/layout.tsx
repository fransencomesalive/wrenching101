import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wrenching 101 — Mettle Cycling',
  description:
    'An evening for cyclists who ride confidently and wrench... less so. Presented by Mettle Cycling.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
