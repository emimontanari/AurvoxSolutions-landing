import React from "react"
import type { Metadata, Viewport } from 'next'
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

/* Premium Typography System - Supabase Style
   Display & Body: Outfit - Geometric, modern, distinctive
   Secondary: Plus Jakarta Sans - Clean, highly readable */

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a2e' },
  ],
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  title: 'Aura Solutions | Automatización con IA para Restaurantes',
  description: 'Transformamos restaurantes en negocios eficientes y rentables mediante automatización inteligente con IA que trabaja 24/7. Recupera ingresos perdidos, reduce costos operativos y libera tiempo de tu equipo.',
  generator: 'Next.js',
  keywords: [
    'automatización restaurantes',
    'inteligencia artificial restaurantes',
    'IA para restaurantes',
    'WhatsApp bot restaurante',
    'reservas automaticas',
    'agente IA hostelería',
    'automatización hostelería',
    'chatbot restaurante',
    'gestión de reservas IA',
  ],
  authors: [{ name: 'Aura Solutions' }],
  creator: 'Aura Solutions',
  publisher: 'Aura Solutions',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://aurasolutions.ai',
    siteName: 'Aura Solutions',
    title: 'Aura Solutions | Automatización con IA para Restaurantes',
    description: 'Transformamos restaurantes con automatización inteligente. WhatsApp, llamadas y reservas automatizadas 24/7.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aura Solutions | IA para Restaurantes',
    description: 'Automatización inteligente que transforma tu restaurante.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${outfit.variable} ${jakarta.variable} dark`}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-body antialiased">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:font-medium"
        >
          Saltar al contenido principal
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
