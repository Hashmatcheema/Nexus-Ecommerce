import AddressesList from './AddressesList'
import { getUserAddresses } from '@/lib/actions/user'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

export default async function AddressesPage() {
    const { userId } = await auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const addresses = await getUserAddresses()

    return (
        <AddressesList addresses={addresses} />
    )
}
