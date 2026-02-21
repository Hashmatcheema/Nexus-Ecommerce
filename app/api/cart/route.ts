import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'

function isDbConnectionError(error: unknown): boolean {
    if (error && typeof error === 'object' && 'code' in error) {
        const code = (error as { code?: string }).code
        return code === 'ECONNREFUSED' || code === 'P1001'
    }
    return false
}

export async function GET(req: NextRequest) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const cart = await prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true,
                        variant: true,
                    },
                    orderBy: {
                        id: 'asc'
                    }
                },
            },
        })

        if (!cart) {
            return NextResponse.json([])
        }

        // Transform to frontend format
        const formattedItems = cart.items.map((item: any) => ({
            id: parseInt(item.product.id),
            name: item.product.name,
            price: item.variant ? item.product.price.toNumber() + item.variant.priceDiff.toNumber() : item.product.price.toNumber(),
            image: item.product.images[0],
            category: item.product.category?.name || '',
            quantity: item.quantity,
            selectedVariant: item.variant ? item.variant.name : undefined,
            variantId: item.variantId,
        }))

        return NextResponse.json(formattedItems)
    } catch (error) {
        console.error('Error fetching cart:', error)
        if (isDbConnectionError(error)) {
            return NextResponse.json([])
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { productId, quantity, variantId } = await req.json()

        if (!productId || typeof quantity !== 'number') {
            return NextResponse.json({ error: 'Invalid Input' }, { status: 400 })
        }

        let cart = await prisma.cart.findUnique({
            where: { userId },
        })

        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId },
            })
        }

        const existingItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId: productId.toString(),
                variantId: variantId || null,
            },
        })

        if (existingItem) {
            await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
            })
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId: productId.toString(),
                    variantId: variantId || null,
                    quantity,
                },
            })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error updating cart:', error)
        if (isDbConnectionError(error)) {
            return NextResponse.json({ error: 'Database unavailable. Cart saved locally.', code: 'SERVICE_UNAVAILABLE' }, { status: 503 })
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { productId, quantity, variantId } = await req.json()

        if (!productId || typeof quantity !== 'number') {
            return NextResponse.json({ error: 'Invalid Input' }, { status: 400 })
        }

        const cart = await prisma.cart.findUnique({ where: { userId } })
        if (!cart) return NextResponse.json({ error: 'Cart not found' }, { status: 404 })

        const existingItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId: productId.toString(),
                variantId: variantId || null,
            },
        })

        if (existingItem) {
            if (quantity > 0) {
                await prisma.cartItem.update({
                    where: { id: existingItem.id },
                    data: { quantity },
                })
            } else {
                await prisma.cartItem.delete({ where: { id: existingItem.id } })
            }
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error setting cart quantity:', error)
        if (isDbConnectionError(error)) {
            return NextResponse.json({ error: 'Database unavailable.', code: 'SERVICE_UNAVAILABLE' }, { status: 503 })
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { productId, variantId } = await req.json()

        const cart = await prisma.cart.findUnique({
            where: { userId },
        })

        if (!cart) {
            return NextResponse.json({ error: 'Cart not found' }, { status: 404 })
        }

        const existingItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId: productId.toString(),
                variantId: variantId || null,
            },
        })

        if (existingItem) {
            await prisma.cartItem.delete({
                where: { id: existingItem.id }
            })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error removing from cart:', error)
        if (isDbConnectionError(error)) {
            return NextResponse.json({ error: 'Database unavailable.', code: 'SERVICE_UNAVAILABLE' }, { status: 503 })
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
