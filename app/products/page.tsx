import { Suspense } from 'react'
import Navigation from '@/components/Navigation'
import ProductCard from '@/components/ProductCard'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import { getProducts, getCategories } from '@/lib/actions/products'
import Pagination from '@/components/products/Pagination'
import ProductFilters from '@/components/products/ProductFilters'
import { Sparkles, SlidersHorizontal } from 'lucide-react'

// Force dynamic rendering since we depend on searchParams
export const dynamic = 'force-dynamic'

interface ProductsPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const page = Number(searchParams.page) || 1
  const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'newest'
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined
  const view = typeof searchParams.view === 'string' ? searchParams.view : '4'

  const [{ products, total, pages }, categories] = await Promise.all([
    getProducts({ page, sort, search, category }),
    getCategories(),
  ])

  return (
    <main className="min-h-screen bg-paper">
      <Navigation />

      {/* Hero Header */}
      <section className="pt-24 lg:pt-32 pb-8 lg:pb-12">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-light rounded-full text-accent text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-4 h-4" />
              Shop All
            </span>
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-ink leading-tight mb-4">
              {category && category !== 'All' ? category : 'All Products'}
            </h1>
            <p className="text-lg text-muted">
              {search
                ? `Showing results for "${search}"`
                : "Discover our complete collection of premium clothing and accessories."}
            </p>
          </div>
        </div>
      </section>

      {/* Filters Bar */}
      <Suspense fallback={<div className="h-16 bg-gray-100 animate-pulse" />}>
        <ProductFilters categories={categories} totalProducts={total} />
      </Suspense>

      {/* Products Grid */}
      <section className="py-12 lg:py-16">
        <div className="container-wide">
          {products.length > 0 ? (
            <div className={`grid grid-cols-2 gap-4 lg:gap-8 ${view === '3' ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={index < 4}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <SlidersHorizontal className="w-6 h-6 text-muted" />
              </div>
              <h3 className="text-xl font-display font-bold text-ink mb-2">No products found</h3>
              <p className="text-muted mb-6">Try adjusting your filters or browse all products.</p>
            </div>
          )}

          {/* Pagination */}
          <Suspense>
            <Pagination currentPage={page} pages={pages} />
          </Suspense>
        </div>
      </section>

      <Footer />
      <CartDrawer />
    </main>
  )
}
