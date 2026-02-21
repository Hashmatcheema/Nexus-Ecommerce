# Nexus E-commerce Production Plan

## Phased Roadmap

### Phase 0: Engineering Baseline (Days 1-2)
**Goal:** Solidify the foundation for scalable development.
- **Repo Hygiene:** strict TS config, strict linting, Prettier, husky pre-commit hooks.
- **Config:** Environment variable validation schema (zod env).
- **CI/CD:** Basic GitHub Actions for typecheck/lint/build on PR.
- **Testing:** Jest + React Testing Library setup. Playwright setup. Smoke tests for Home/Product/Cart.

### Phase 1: "Make it Real" (P0 Launch) (Days 3-10)
**Goal:** Replace mocks with functional systems.
- **Database:** Provision PostgreSQL (Supabase/Neon). Set up Prisma ORM.
- **Auth:** Implement Clerk or NextAuth (Credentials + Social).
- **Backend:** Migrate `lib/data.ts` to DB seeds. Create Data Access Layer (DAL).
- **Cart:** Move from LocalStorage-only to Hybrid (Sync Local -> DB on login).
- **Checkout:** Stripe Integration (PaymentIntert + Webhooks).
- **Orders:** Order creation logic, idempotent processing, email receipts (Resend).

### Phase 2: Quality & Usability (Days 11-15)
**Goal:** Polish the experience to be professional and trustworthy.
- **UX:** Loading skeletons (React Suspense), standard error boundaries.
- **Mobile:** Rigid mobile testing (tap targets, drawer behavior, keyboard handling).
- **SEO:** Dynamic metadata (OpenGraph, JSON-LD schemas).
- **Customer Support:** Functional Contact form (Resend), static policy pages.

### Phase 3: Hardening & Scale (Days 16+)
**Goal:** Prepare for traffic spikes and security threats.
- **Performance:** Image optimization (AVIF/WebP), ISR for products.
- **Security:** Rate limiting (Upstash Ratelimit), Zod input validation everywhere.
- **Inventory:** Atomic stock decrementing.
- **Search:** Evaluate full-text search vs external provider (Algolia) based on catalog size.

## Proposed Architecture

- **Frontend:** Next.js 14+ (App Router), React, Tailwind, Framer Motion.
- **Backend:** Next.js Server Actions (Mutations) + Cached Data Fetching.
- **Database:** PostgreSQL (via Supabase or Neon). managed relational DB.
- **ORM:** Prisma (Type-safe DB access).
- **Auth:** Clerk (Managed Auth) or NextAuth v5.
- **Payments:** Stripe (Checkout/Elements).
- **Email:** Resend (Transactional emails).
- **Hosting:** Vercel (Edge Network + Serverless Functions).
- **Observability:** Sentry (Error tracking), Vercel Analytics.

## Assumptions & Dependencies

- **Launch Region:** United States (USD).
- **Tax:** Automatic calculation via Stripe Tax (simplified for MVP).
- **Shipping:** Flat rate tiers (Standard/Express) initially. No live carrier rates.
- **Inventory:** Soft reservation (hold in cart) not required for MVP; check stock at checkout time.
- **Browsing:** Server-side pagination required for >100 SKUs.

## Open Questions (To be clarified)

1.  **Guest Checkout:** Is it strictly required? (Assumption: YES, critical for conversion).
2.  **Payment Methods:** Card only? Or digital wallets? (Assumption: Stripe handles Cards + Apple/Google Pay).
3.  **Migration:** Is there existing data to import? (Assumption: NO, fresh start).
