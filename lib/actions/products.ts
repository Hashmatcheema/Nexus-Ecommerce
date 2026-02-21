import 'server-only'
import prisma from '@/lib/prisma'
import { productFilterSchema, ProductFilterParams } from '@/lib/validation'
import { allProducts, categories as staticCategories } from '@/lib/data'

export interface Product {
    id: number
    name: string
    price: number
    image: string
    images: string[]
    category: string
    description: string
    isNew: boolean
    inStock: boolean
}

export type GetProductsParams = ProductFilterParams

function isDbConnectionError(error: unknown): boolean {
    if (error && typeof error === 'object' && 'code' in error) {
        const code = (error as { code?: string }).code
        return code === 'ECONNREFUSED' || code === 'P1001'
    }
    return false
}

function getProductsFallback(params: GetProductsParams) {
    const parsed = productFilterSchema.safeParse(params)
    const { page = 1, limit = 12, sort = 'newest', search, category } = parsed.success ? parsed.data : { page: 1, limit: 12, sort: 'newest' as const, search: undefined, category: undefined }
    const skip = (page - 1) * limit

    let list = [...allProducts]
    if (category && category !== 'All') list = list.filter(p => p.category === category)
    if (search) {
        const q = search.toLowerCase()
        list = list.filter(p => p.name.toLowerCase().includes(q) || (p.description?.toLowerCase().includes(q)))
    }
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    else list.sort((a, b) => b.id - a.id)
    const total = list.length
    const products = list.slice(skip, skip + limit).map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.image,
        images: p.images ?? [p.image],
        category: p.category,
        description: p.description ?? '',
        isNew: p.isNew ?? false,
        inStock: p.inStock ?? true,
    }))
    return { products, total, pages: Math.ceil(total / limit), currentPage: page }
}

export async function getProducts(params: GetProductsParams) {
    const parsed = productFilterSchema.safeParse(params)

    if (!parsed.success) {
        console.error('Invalid params:', parsed.error)
        return {
            products: [],
            total: 0,
            pages: 0,
            currentPage: 1
        }
    }

    const { page, limit, sort, search, category } = parsed.data
    const skip = (page - 1) * limit

    try {
        const where: any = {}
        if (category && category !== 'All') where.category = { name: category }
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ]
        }
        let orderBy: any = {}
        switch (sort) {
            case 'price-asc': orderBy = { price: 'asc' }; break
            case 'price-desc': orderBy = { price: 'desc' }; break
            default: orderBy = { createdAt: 'desc' }; break
        }

        const total = await prisma.product.count({ where })
        const products = await prisma.product.findMany({
            where,
            orderBy,
            skip,
            take: limit,
            include: { category: true, variants: true },
        })

        const formattedProducts = products.map((p) => {
            const idAsNum = parseInt(p.id)
            return {
                id: isNaN(idAsNum) ? 0 : idAsNum,
                name: p.name,
                price: p.price.toNumber(),
                image: p.images[0] || '',
                images: p.images,
                category: p.category.name,
                description: p.description,
                isNew: (Date.now() - new Date(p.createdAt).getTime()) < 30 * 24 * 60 * 60 * 1000,
                inStock: true,
            }
        })

        return {
            products: formattedProducts,
            total,
            pages: Math.ceil(total / limit),
            currentPage: page,
        }
    } catch (error) {
        if (isDbConnectionError(error)) {
            console.warn('Database unavailable, using static product data.')
            return getProductsFallback(params)
        }
        throw error
    }
}

export async function getCategories() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' },
            select: { name: true },
        })
        return ['All', ...categories.map(c => c.name)]
    } catch (error) {
        if (isDbConnectionError(error)) {
            console.warn('Database unavailable, using static categories.')
            return staticCategories
        }
        throw error
    }
}
