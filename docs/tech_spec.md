# Technical Specification

## Data Model (Prisma Schema Draft)

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  orders    Order[]
  addresses Address[]
  cart      Cart?
  createdAt DateTime @default(now())
}

model Product {
  id          String   @id @default(cuid())
  slug        String   @unique
  name        String
  description String
  price       Decimal
  images      String[]
  categoryId  String
  category    Category @relation(fields: [categoryId], references: [id])
  variants    Variant[]
  orderItems  OrderItem[]
  createdAt   DateTime @default(now())
}

model Variant {
  id        String  @id @default(cuid())
  productId String
  product   Product @relation(fields: [productId], references: [id])
  name      String  // e.g. "Size M / Red"
  sku       String  @unique
  stock     Int
  priceDiff Decimal @default(0)
}

model Order {
  id             String      @id @default(cuid())
  orderNumber    String      @unique
  userId         String?
  user           User?       @relation(fields: [userId], references: [id])
  items          OrderItem[]
  total          Decimal
  status         OrderStatus @default(PENDING)
  paymentIntent  String?
  shippingAddress Json
  createdAt      DateTime    @default(now())
}

model Cart {
  id        String     @id @default(cuid())
  userId    String?    @unique
  items     CartItem[]
  updatedAt DateTime   @updatedAt
}
```

## Authentication Strategy
- **Provider**: Clerk (Recommended for speed) or NextAuth v5.
- **Session**: HttpOnly Cookies.
- **Middleware**: Next.js Middleware to protect `/account/*` and admin routes.

## Payment Flow (Stripe)
1.  **Frontend**: `Stripe Elements` (PaymentElement) collects card data securely.
2.  **Server**: 
    -   Calculate total from DB (not client).
    -   Create `PaymentIntent` via Stripe API.
    -   Return `clientSecret` to frontend.
3.  **Confirmation**: Frontend calls `stripe.confirmPayment`.
4.  **Webhook**: Listen for `payment_intent.succeeded`.
    -   Create Order Record.
    -   Send Email.
    -   Clear Cart.

## Cart Persistence
- **Guest**: `localStorage` (Array of items).
- **User**: Database `Cart` model.
- **Merge**: On login, UI sends `localStorage` items to API -> Server merges with DB Cart -> Clears `localStorage`.

## Observability
- **Logs**: `pino` or `console` structured logging.
- **Errors**: Sentry (Client + Server).
- **Vitals**: Vercel Web Vitals.
