import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-01-28.clover',
})

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // specific cart items could be passed, but better to fetch from DB for security
        const cart = await prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true,
                        variant: true,
                    }
                }
            }
        })

        if (!cart || cart.items.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
        }

        // Calculate total on server
        const total = cart.items.reduce((sum: number, item) => {
            const price = item.variant ? (item.product.price.toNumber() + item.variant.priceDiff.toNumber()) : item.product.price.toNumber()
            return sum + (price * item.quantity)
        }, 0)

        // Add shipping/tax logic here if needed to match frontend
        const shipping = total > 100 ? 0 : 12
        // Basic tax approximation or integration
        const tax = total * 0.08

        const finalAmount = Math.round((total + shipping + tax) * 100) // Stripe expects cents

        const paymentIntent = await stripe.paymentIntents.create({
            amount: finalAmount,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                userId,
                cartId: cart.id,
            },
        })

        return NextResponse.json({ clientSecret: paymentIntent.client_secret })
    } catch (error) {
        console.error('Error creating payment intent:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
