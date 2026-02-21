import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { items } = await req.json() // Expecting array of local cart items

        if (!Array.isArray(items)) {
            return NextResponse.json({ error: 'Invalid Input' }, { status: 400 })
        }

        // Ensure cart exists
        let cart = await prisma.cart.findUnique({
            where: { userId },
        })

        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId },
            })
        }

        // Process merge
        for (const item of items) {
            const existingItem = await prisma.cartItem.findFirst({
                where: {
                    cartId: cart.id,
                    productId: item.id.toString(),
                    variantId: item.variantId || null,
                },
            })

            if (existingItem) {
                // Option: Add quantities, or max, or overwrite. Let's add.
                await prisma.cartItem.update({
                    where: { id: existingItem.id },
                    data: { quantity: existingItem.quantity + item.quantity },
                })
            } else {
                await prisma.cartItem.create({
                    data: {
                        cartId: cart.id,
                        productId: item.id.toString(),
                        variantId: item.variantId || null,
                        quantity: item.quantity,
                    },
                })
            }
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error merging cart:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
