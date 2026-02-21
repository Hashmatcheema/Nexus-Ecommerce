/**
 * Central env config – process.env overrides these.
 * Edit the fallbacks below to hardcode values for local/prod, or set in Vercel.
 * WARNING: Do not commit real CLERK_SECRET_KEY, STRIPE_SECRET_KEY, DATABASE_URL, etc.
 */

const fallbacks = {
  // App
  NEXT_PUBLIC_APP_URL: 'http://localhost:3000',

  // Database (Postgres)
  DATABASE_URL: 'postgresql://postgres:password@localhost:5432/nexus_ecommerce?schema=public',

  // Clerk (public key is safe to expose; secret must stay server-side only)
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 'pk_test_build_placeholder',
  CLERK_SECRET_KEY: '',
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: '/sign-in',
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: '/sign-up',

  // Stripe
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: 'pk_test_placeholder',
  STRIPE_SECRET_KEY: '',
  STRIPE_WEBHOOK_SECRET: '',

  // Resend (email)
  RESEND_API_KEY: '',
} as const

function get<K extends keyof typeof fallbacks>(key: K): string {
  const val = process.env[key] ?? fallbacks[key]
  return typeof val === 'string' ? val : ''
}

/** Use in app – prefers process.env, then hardcoded fallbacks */
export const env = {
  get NEXT_PUBLIC_APP_URL() {
    return get('NEXT_PUBLIC_APP_URL')
  },
  get DATABASE_URL() {
    return get('DATABASE_URL')
  },
  get NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY() {
    return get('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY')
  },
  get CLERK_SECRET_KEY() {
    return get('CLERK_SECRET_KEY')
  },
  get NEXT_PUBLIC_CLERK_SIGN_IN_URL() {
    return get('NEXT_PUBLIC_CLERK_SIGN_IN_URL')
  },
  get NEXT_PUBLIC_CLERK_SIGN_UP_URL() {
    return get('NEXT_PUBLIC_CLERK_SIGN_UP_URL')
  },
  get NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY() {
    return get('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY')
  },
  get STRIPE_SECRET_KEY() {
    return get('STRIPE_SECRET_KEY')
  },
  get STRIPE_WEBHOOK_SECRET() {
    return get('STRIPE_WEBHOOK_SECRET')
  },
  get RESEND_API_KEY() {
    return get('RESEND_API_KEY')
  },
}

/** All keys we track – for admin “see all env” page */
export const ENV_KEYS = [
  'NEXT_PUBLIC_APP_URL',
  'DATABASE_URL',
  'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
  'CLERK_SECRET_KEY',
  'NEXT_PUBLIC_CLERK_SIGN_IN_URL',
  'NEXT_PUBLIC_CLERK_SIGN_UP_URL',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'RESEND_API_KEY',
] as const

export type EnvKey = (typeof ENV_KEYS)[number]

/** Returns value for a key; masks secrets (only show if you need to “see all” – use with care) */
export function getEnvDisplay(key: EnvKey): { value: string; masked: boolean } {
  const val = get(key)
  const isSecret =
    key === 'CLERK_SECRET_KEY' ||
    key === 'STRIPE_SECRET_KEY' ||
    key === 'STRIPE_WEBHOOK_SECRET' ||
    key === 'DATABASE_URL' ||
    key === 'RESEND_API_KEY'
  return {
    value: val,
    masked: isSecret && val.length > 0,
  }
}
