# Route Inventory

| Route | Screen Name | Purpose | Primary CTA | Auth? | Data Dependencies |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | Home | Landing | Shop Now | No | Featured Products |
| `/products` | Shop | Catalogue | Filter/View | No | All Products (Paginated) |
| `/products/[id]` | Product Detail | Conversion | Add to Cart | No | Product, Related Items |
| `/cart` | Cart Page | Review | Checkout | No | Cart State |
| `/checkout` | Checkout | Purchase | Place Order | No | Cart, User (Optional) |
| `/login` | Login | Entry | Sign In | No | - |
| `/register` | Sign Up | Entry | Create Account | No | - |
| `/account` | Dashboard | User Hub | View Orders | **Yes** | User Profile |
| `/account/orders` | Order History | History | View Detail | **Yes** | User Orders |
| `/account/orders/[id]` | Order Detail | Receipt | Support/Reorder | **Yes** | Order, Line Items |
| `/account/addresses` | Addresses | Shipping | Add/Edit | **Yes** | User Addresses |
| `/order/confirmation/[id]`| Success | Confirmation | Track/Shop | No* | Order (Public Ref) |
| `/api/webhooks/stripe` | Webhook | System | - | System | Stripe Event |
| `/faq`, `/contact` | Support | Information | Contact Us | No | Static |
