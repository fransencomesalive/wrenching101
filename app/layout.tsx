import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wrenching 101 | Mettle Cycling',
  description:
    'An evening for cyclists who ride confidently and wrench... less so. Presented by Mettle Cycling.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔧</text></svg>",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
