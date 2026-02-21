import 'dotenv/config'
import pg from 'pg'
const { Pool } = pg
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

async function main() {
    console.log('Connecting...')
    const connectionString = process.env.DATABASE_URL
    console.log('DB URL defined:', !!connectionString)
    if (!connectionString) {
        console.error('DATABASE_URL is missing in process.env')
        return;
    }

    const pool = new Pool({ connectionString })
    const adapter = new PrismaPg(pool)
    const prisma = new PrismaClient({ adapter })

    try {
        console.log('Testing raw connection...')
        await prisma.$connect()
        console.log('Connected.')

        console.log('Testing count()...')
        const total = await prisma.product.count()
        console.log('Total products:', total)

        console.log('Testing count({ where: {} })...')
        const totalWhere = await prisma.product.count({ where: {} })
        console.log('Total (where={}):', totalWhere)

    } catch (e) {
        console.error('Error:', e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
