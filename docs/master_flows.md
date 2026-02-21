# Master Flow Map

## Legend
- **[HAPPY]**: Standard success path
- **[ALT]**: Alternative valid path
- **[FAIL]**: Error state
- **[RECOV]**: Recovery action

## FLOW-001: Browse & Discovery
1.  **Entry**: Home Page (`/`)
2.  **Action**: Click "Shop" or Category Card
3.  **Screen**: Product List (`/products`)
    -   *Server Action*: Fetch paginated products + categories
    -   *UI*: Grid of Product Cards
4.  **[ALT] Filter**: Select Category / Sort
    -   *Action*: Update URL params (`?category=x&sort=y`)
    -   *Server*: Re-fetch with filters
5.  **[FAIL] No Results**:
    -   *UI*: "No products found" state
    -   *RECOV*: "Clear Filters" button
6.  **Action**: Click Product Card -> Go to `FLOW-002`

## FLOW-002: Product Detail & Add to Cart
1.  **Entry**: Product Detail (`/products/[id]`)
    -   *Server*: Fetch Product + Related Items
2.  **Action**: Select Variant (Color/Size)
3.  **Action**: Click "Add to Cart"
    -   *Validation*: Check stock status
    -   **[FAIL] OOS**: Disable button, show "Out of Stock"
    -   **[HAPPY]**: 
        -   Update Client Cart (Optimistic)
        -   *Server*: Sync Cart (if logged in)
        -   Open Cart Drawer (`FLOW-003`)

## FLOW-003: Cart Management
1.  **Entry**: Cart Drawer (Global) or Cart Page (`/cart`)
2.  **Action**: Modify Qty / Remove Item
    -   *Logic*: Recalculate totals client-side
    -   *Persistence*: Update LocalStorage (Guest) or DB (User)
3.  **Action**: Click "Checkout" -> Go to `FLOW-004`
    -   **[FAIL] Empty Cart**: Button disabled
    -   **[RECOV]**: "Continue Shopping" link

## FLOW-004: Checkout (Guest/User)
1.  **Entry**: Checkout Page (`/checkout`)
    -   *Check*: Cart not empty? -> Redirect to Cart if empty.
2.  **Step 1: Shipping**:
    -   User enters address
    -   *Action*: "Continue to Payment"
3.  **Step 2: Payment**:
    -   User enters credentials (Stripe Element)
    -   *Action*: "Place Order"
    -   **[FAIL] Decline**: Show error, stick on step 2.
    -   **[HAPPY]**:
        -   *Server*: Create Payment Intent -> Confirm
        -   *Server*: Webhook -> Create Order Record -> Clear Cart
        -   Redirect to Confirmation
4.  **Screen**: Order Confirmation (`/order/confirmation/[id]`)
    -   Show Order Summary + "Check Email" message
    -   *Exit*: Link to "Order Status" (User) or "Home" (Guest)

## FLOW-005: Authentication
1.  **Entry**: `/login` or `/register`
2.  **Action**: Submit Form / Social Auth
    -   **[FAIL]**: Invalid credentials -> Show error toast
    -   **[HAPPY]**:
        -   Create Session
        -   *Action*: Merge Guest Cart to User Cart
        -   Redirect to previous page or `/account`

## FLOW-006: Account Management
1.  **Entry**: `/account` (Protected Route)
2.  **Screen**: Dashboard
    -   Links: Orders, Addresses, Profile
3.  **Sub-flow**: Order History (`/account/orders`)
    -   List of past orders
    -   Click -> Order Detail (`/account/orders/[id]`)
4.  **Action**: Logout
    -   Destroy Session
    -   Redirect Home
