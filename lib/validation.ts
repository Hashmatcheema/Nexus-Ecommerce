import { z } from 'zod'

export const productFilterSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    sort: z.enum(['newest', 'price-asc', 'price-desc', 'popular']).optional().default('newest'),
    search: z.string().optional(),
    category: z.string().optional(),
    limit: z.coerce.number().int().min(1).max(100).default(12),
})

export type ProductFilterParams = z.infer<typeof productFilterSchema>

export const addressSchema = z.object({
    street: z.string().min(5, 'Street address is too short'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    zip: z.string().min(5, 'Valid ZIP code is required'),
    country: z.string().min(2, 'Country is required'),
    name: z.string().optional(),
    type: z.string().optional(),
    isDefault: z.boolean().default(false),
})
