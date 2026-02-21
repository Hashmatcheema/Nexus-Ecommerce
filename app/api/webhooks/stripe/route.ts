import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { env } from '@/lib/env'

type PrismaTransaction = Parameters<Parameters<typeof prisma.$transaction>[0]>[0]

function getStripe(): Stripe {
    const key = env.STRIPE_SECRET_KEY
    if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
    return new Stripe(key, { apiVersion: '2026-01-28.clover' })
}

export async function POST(req: NextRequest) {
    const body = await req.text()
    const sig = headers().get('stripe-signature') as string
    const endpointSecret = env.STRIPE_WEBHOOK_SECRET

    let event: Stripe.Event

    try {
        if (!sig || !endpointSecret) {
            console.error('Missing stripe signature or endpoint secret')
            return NextResponse.json({ error: 'Webhook Error: Missing config' }, { status: 400 })
        }
        const stripe = getStripe()
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    } catch (err: any) {
        console.error(`Webhook Signature Verification Failed: ${err.message}`)
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }

    // Handle the event
    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        const userId = paymentIntent.metadata.userId
        const cartId = paymentIntent.metadata.cartId

        console.log(`Processing Order for User: ${userId}, Cart: ${cartId}, PaymentIntent: ${paymentIntent.id}`)

        if (!cartId) {
            console.error('Missing cartId in metadata')
            return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
        }

        try {
            // Start Transaction
            await prisma.$transaction(async (tx: PrismaTransaction) => {
                // 1. Fetch Cart Items
                const cartItems = await tx.cartItem.findMany({
                    where: { cartId: cartId },
                    include: { product: true, variant: true }
                })

                if (cartItems.length === 0) {
                    console.log('Cart is empty, possibly already processed')
                    return // Duplicate event?
                }

                // 2. Calculate final totals (redundant check, but good for data integrity)
                type CartItemWithRelations = (typeof cartItems)[number]
                const total = cartItems.reduce((sum: number, item: CartItemWithRelations) => {
                    const price = item.variant ? (item.product.price.toNumber() + item.variant.priceDiff.toNumber()) : item.product.price.toNumber()
                    return sum + (price * item.quantity)
                }, 0)

                // Generate Order Number
                const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`

                // 3. Create Order
                const order = await tx.order.create({
                    data: {
                        userId: userId || null, // Handle guest checkout case if we support it later (currently we require auth)
                        orderNumber,
                        total: total,
                        status: 'PROCESSING', // Or 'PAID'
                        paymentIntent: paymentIntent.id,
                        // Shipping Address - ideally passed in metadata or stored in DB separately. 
                        // For now, we will store a placeholder or extract from Stripe payment_method_details if possible/needed.
                        // Let's use a dummy object if missing, or maybe we should have passed it in metadata?
                        // Stripe Charge object has shipping. PaymentIntent has shipping.
                        shippingAddress: JSON.parse(JSON.stringify(paymentIntent.shipping || {})),
                    }
                })

                // 4. Create Order Items
                for (const item of cartItems) {
                    const price = item.variant ? (item.product.price.toNumber() + item.variant.priceDiff.toNumber()) : item.product.price.toNumber()

                    await tx.orderItem.create({
                        data: {
                            orderId: order.id,
                            productId: item.productId,
                            quantity: item.quantity,
                            price: price
                        }
                    })
                }

                // 5. Clear Cart (delete items, keep cart shell? or delete cart?)
                // Usually keep cart shell for user.
                await tx.cartItem.deleteMany({
                    where: { cartId: cartId }
                })

                console.log(`Order ${order.id} created successfully`)
            })

        } catch (dbError) {
            console.error('Database transaction failed', dbError)
            return NextResponse.json({ error: 'Database Error' }, { status: 500 })
        }
    }

    return NextResponse.json({ received: true })
}
