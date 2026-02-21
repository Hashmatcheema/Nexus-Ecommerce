import 'server-only'
import prisma from '@/lib/prisma'
import { auth, currentUser } from '@clerk/nextjs/server'

export async function getUserDashboardData() {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId || !user) {
        return null
    }

    const dbUser = await prisma.user.findUnique({
        where: { email: user.emailAddresses[0].emailAddress },
        include: {
            orders: {
                take: 3,
                orderBy: { createdAt: 'desc' },
                include: {
                    items: {
                        take: 4,
                        include: {
                            product: true
                        }
                    }
                }
            },
            addresses: {
                take: 4,
                orderBy: { isDefault: 'desc' }
            }
        }
    })

    type OrderWithItems = NonNullable<typeof dbUser>['orders'][number]
    type OrderItemWithProduct = OrderWithItems['items'][number]
    const orders = (dbUser?.orders || []).map((order: OrderWithItems) => ({
        ...order,
        total: Number(order.total),
        items: order.items.map((item: OrderItemWithProduct) => ({
            ...item,
            price: Number(item.price)
        }))
    }))

    return {
        user: {
            name: user.firstName + ' ' + user.lastName,
            email: user.emailAddresses[0].emailAddress,
            avatar: user.imageUrl,
            tier: 'Silver',
            points: 1250,
        },
        orders: orders,
        addresses: dbUser?.addresses || [],
    }
}

export async function getUserOrders() {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId || !user) return []

    const dbUser = await prisma.user.findUnique({
        where: { email: user.emailAddresses[0].emailAddress },
        include: {
            orders: {
                orderBy: { createdAt: 'desc' },
                include: {
                    items: {
                        include: {
                            product: true
                        }
                    }
                }
            }
        }
    })

    type OrderWithItems = NonNullable<typeof dbUser>['orders'][number]
    type OrderItemWithProduct = OrderWithItems['items'][number]
    return (dbUser?.orders || []).map((order: OrderWithItems) => ({
        ...order,
        total: Number(order.total),
        items: order.items.map((item: OrderItemWithProduct) => ({
            ...item,
            price: Number(item.price)
        }))
    }))
}

export async function getUserAddresses() {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId || !user) return []

    const dbUser = await prisma.user.findUnique({
        where: { email: user.emailAddresses[0].emailAddress },
        include: {
            addresses: {
                orderBy: { isDefault: 'desc' }
            }
        }
    })

    return dbUser?.addresses || []
}
