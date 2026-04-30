import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wrenching 101 | Mettle Cycling',
  description:
    'An Intro for cyclists who ride good and want to wrench good too.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔧</text></svg>",
  },
  openGraph: {
    title: 'Wrenching 101 p/b mettle Cycling',
    description: 'An Intro for cyclists who ride good and want to wrench good too.',
    url: 'https://wrenching101.mettlecycling.com',
    siteName: 'Wrenching 101',
    images: [{
      url: 'https://wrenching101.mettlecycling.com/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Wrenching 101 bike geometry diagram',
      type: 'image/png',
    }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wrenching 101 p/b mettle Cycling',
    description: 'An Intro for cyclists who ride good and want to wrench good too.',
    images: [{
      url: 'https://wrenching101.mettlecycling.com/og-image.png',
      alt: 'Wrenching 101 bike geometry diagram',
    }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
