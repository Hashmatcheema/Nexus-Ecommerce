import { ENV_KEYS, getEnvDisplay } from '@/lib/env'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Shield } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function AdminEnvPage() {
  const entries = ENV_KEYS.map((key) => {
    const { value } = getEnvDisplay(key)
    return { key, value }
  })

  return (
    <main className="min-h-screen bg-paper">
      <Navigation />
      <div className="container-wide pt-28 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-8">
            <Shield className="w-5 h-5 shrink-0" />
            <p className="text-sm">
              Env values below are what the app uses (process.env overrides <code className="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">lib/env.ts</code> fallbacks).
              Restrict or remove this page in production if you do not want env visible.
            </p>
          </div>

          <h1 className="text-2xl font-display font-bold text-ink mb-2">Environment variables</h1>
          <p className="text-muted mb-6">All keys and their current effective values.</p>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-3 font-semibold text-ink">Key</th>
                  <th className="px-4 py-3 font-semibold text-ink">Value</th>
                </tr>
              </thead>
              <tbody>
                {entries.map(({ key, value }) => (
                  <tr
                    key={key}
                    className="border-b border-gray-100 dark:border-gray-800 last:border-0"
                  >
                    <td className="px-4 py-3 font-mono text-ink">{key}</td>
                    <td className="px-4 py-3 font-mono text-muted break-all">
                      {value || <span className="text-gray-400">— not set —</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
