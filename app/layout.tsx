import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { AppProvider } from '@/contexts/AppContext'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Toaster } from '@/components/ui/sonner'

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
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body>
          <ErrorBoundary>
            <AppProvider>
              {children}
              <Toaster />
            </AppProvider>
          </ErrorBoundary>
        </body>
      </html>
    </ClerkProvider>
  )
}



