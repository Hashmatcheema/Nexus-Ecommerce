import { PrismaClient } from '@prisma/client'
import { allProducts, categories } from './data'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    // Seed Categories
    for (const categoryName of categories) {
        if (categoryName === 'All') continue

        await prisma.category.upsert({
            where: { name: categoryName },
            update: {},
            create: {
                name: categoryName,
                slug: categoryName.toLowerCase().replace(' ', '-'),
            },
        })
    }

    // Seed Products
    for (const product of allProducts) {
        const category = await prisma.category.findUnique({
            where: { name: product.category },
        })

        if (!category) {
            console.warn(`Category ${product.category} not found for product ${product.name}`)
            continue
        }

        const createdProduct = await prisma.product.upsert({
            where: { id: product.id.toString() }, // Using string ID as per schema
            update: {
                name: product.name,
                description: product.description || '',
                price: product.price,
                images: [product.image, ...(product.images || [])],
                categoryId: category.id,
            },
            create: {
                id: product.id.toString(),
                name: product.name,
                description: product.description || '',
                price: product.price,
                images: [product.image, ...(product.images || [])],
                categoryId: category.id,
                slug: product.name.toLowerCase().replace(/ /g, '-'),
            },
        })

        // Seed Variants (Colors/Sizes)
        if (product.colors && product.sizes) {
            for (const color of product.colors) {
                for (const size of product.sizes) {
                    const variantName = `${color} / ${size}`
                    await prisma.variant.upsert({
                        where: {
                            sku: `${createdProduct.slug}-${color}-${size}`.toLowerCase().replace(/ /g, '-')
                        },
                        update: {},
                        create: {
                            productId: createdProduct.id,
                            name: variantName,
                            sku: `${createdProduct.slug}-${color}-${size}`.toLowerCase().replace(/ /g, '-'),
                            stock: 100, // Default stock
                            priceDiff: 0,
                        },
                    })
                }
            }
        } else if (product.colors) {
            for (const color of product.colors) {
                const variantName = `${color}`
                await prisma.variant.upsert({
                    where: {
                        sku: `${createdProduct.slug}-${color}`.toLowerCase().replace(/ /g, '-')
                    },
                    update: {},
                    create: {
                        productId: createdProduct.id,
                        name: variantName,
                        sku: `${createdProduct.slug}-${color}`.toLowerCase().replace(/ /g, '-'),
                        stock: 100, // Default stock
                        priceDiff: 0,
                    },
                })
            }
        }
    }

    console.log('Seeding completed.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
