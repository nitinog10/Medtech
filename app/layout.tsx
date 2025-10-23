import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MedTech Hospital - Advanced Healthcare Solutions',
  description: 'Leading hospital providing comprehensive medical services with cutting-edge technology and expert care.',
  keywords: 'hospital, medical services, healthcare, emergency care, surgery, diagnostics',
  other: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="referrer" content="no-referrer" />
        <meta name="robots" content="noindex, nofollow, nosnippet, noarchive" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
        <script dangerouslySetInnerHTML={{__html: `
                 // Enhanced security measures
                 (function() {
                   'use strict';
                   // ...security JS logic here (copy your entire script)...
                 })();
            `}} />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
