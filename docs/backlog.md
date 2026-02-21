# Project Backlog

## P0: Launch Critical (Phase 1)
- [ ] **Setup**: Repo hygiene, linting, env vars (Phase 0).
- [ ] **DB**: Setup Prisma + Postgres. Definition of User, Product, Order schemas.
- [ ] **Data**: Migration script to seed DB from `lib/data.ts`.
- [ ] **Auth**: Implementation of Clerk/NextAuth. Login/Register pages.
- [ ] **Cart Sync**: API to sync guest cart to DB on login.
- [ ] **Checkout API**: Server endpoint to create PaymentIntent.
- [ ] **Checkout UI**: Stripe Elements integration.
- [ ] **Webhooks**: Stripe webhook handler for order creation.
- [ ] **Emails**: Order confirmation email sender.

## P1: Important (Phase 2)
- [ ] **Server Pagination**: Infinite scroll or pagination for `/products`.
- [ ] **Filters**: Server-side filtering parameters (clean URLs).
- [ ] **Account**: Order History page with real DB data.
- [ ] **Loading UI**: Skeletons for Product Grid and Dashboard.
- [ ] **SEO**: Metadata generation for Product Pages (`generateMetadata`).
- [ ] **Mobile**: Sidebar drawer optimizations (prevent body scroll).

## P2: Nice to Have (Phase 3)
- [ ] **Search**: Algolia integration.
- [ ] **Inventory**: Real-time stock decrementing.
- [ ] **Admin**: Basic dashboard for Order status updates.
- [ ] **Reviews**: DB schema for reviews + submission form.
