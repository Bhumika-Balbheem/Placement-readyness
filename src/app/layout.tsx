import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'KodNest Premium Build System',
  description: 'Premium SaaS Design System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
