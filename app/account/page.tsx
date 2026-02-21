import { Suspense } from 'react'
import AccountDashboard from './AccountDashboard'
import { getUserDashboardData } from '@/lib/actions/user'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

export default async function AccountPage() {
    const { userId } = await auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const data = await getUserDashboardData()

    if (!data) {
        return <div>Failed to load user data</div>
    }

    return (
        <AccountDashboard
            userData={data.user}
            orders={data.orders}
            addresses={data.addresses}
        />
    )
}
