import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wrenching 101 | Mettle Cycling',
  description:
    'An intro for cyclists who ride confidently and wrench... less so. Presented by Mettle Cycling.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔧</text></svg>",
  },
  openGraph: {
    title: 'Presented by Mettle Cycling',
    description: 'An intro for cyclists who ride confidently and wrench... less so.',
    url: 'https://wrenching101.mettlecycling.com',
    siteName: 'Wrenching 101',
    images: [{ url: 'https://wrenching101.mettlecycling.com/opengraph-image', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Presented by Mettle Cycling',
    description: 'An intro for cyclists who ride confidently and wrench... less so.',
    images: ['https://wrenching101.mettlecycling.com/opengraph-image'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
