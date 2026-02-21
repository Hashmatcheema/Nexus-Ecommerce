import { Suspense } from 'react'
import OrdersList from './OrdersList'
import { getUserOrders } from '@/lib/actions/user'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

export default async function OrdersPage() {
    const { userId } = await auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const orders = await getUserOrders()

    return (
        <OrdersList orders={orders} />
    )
}
