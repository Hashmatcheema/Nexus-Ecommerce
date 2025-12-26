import type { Metadata } from 'next'
import './globals.css'
import { AppProvider } from '@/contexts/AppContext'
import { ErrorBoundary } from '@/components/ErrorBoundary'

export const metadata: Metadata = {
  title: 'NEXUS | Next-Generation eCommerce',
  description: 'Ultra-premium futuristic eCommerce experience with integrated AI',
  keywords: ['ecommerce', 'shopping', 'AI', 'premium', 'luxury'],
  authors: [{ name: 'NEXUS' }],
  openGraph: {
    title: 'NEXUS | Next-Generation eCommerce',
    description: 'Ultra-premium futuristic eCommerce experience with integrated AI',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <ErrorBoundary>
          <AppProvider>{children}</AppProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}



