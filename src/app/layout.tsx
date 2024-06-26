import { absoluteUrl } from '@/lib/utils'
import { Metadata } from 'next'
import '../styles/index.css'
import 'giscus';

export const metadata: Metadata = {
  metadataBase: new URL('https://cms.byorns-playground.com'),
  title: {
    default: 'Byorns Playground',
    template: '%s | Byorns-Playground'
  },
  description: 'Byorns technicle blog site',
  openGraph: {
    title: 'Byorns playground  Next.js project built using outstatic',
    description: 'Byorns technicle blog site built with nextjs',
    url: absoluteUrl('/'),
    siteName: 'byorns-playground',
    images: [
      {
        url: absoluteUrl('/images/og-image.png'),
        width: 1800,
        height: 1600
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  icons: {
    icon: [{ url: '/favicon/favicon-32x32.png' }],
    apple: [{ url: '/favicon/apple-touch-icon.png' }]
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
