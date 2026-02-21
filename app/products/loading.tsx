import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function ProductsLoading() {
    return (
        <main className="min-h-screen bg-paper">
            <Navigation />

            {/* Hero Skeleton */}
            <section className="pt-24 lg:pt-32 pb-8 lg:pb-12">
                <div className="container-wide">
                    <div className="max-w-3xl space-y-4">
                        <div className="w-24 h-8 bg-gray-200 rounded-full animate-pulse" />
                        <div className="w-64 h-12 bg-gray-200 rounded animate-pulse" />
                        <div className="w-96 h-6 bg-gray-200 rounded animate-pulse" />
                    </div>
                </div>
            </section>

            {/* Filters Skeleton */}
            <section className="sticky top-16 lg:top-20 z-30 bg-paper/95 backdrop-blur-xl border-y border-border">
                <div className="container-wide">
                    <div className="flex items-center justify-between h-14 lg:h-16 gap-4">
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="w-20 h-9 bg-gray-200 rounded-full animate-pulse flex-shrink-0" />
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="hidden md:block w-32 h-9 bg-gray-200 rounded-full animate-pulse" />
                            <div className="hidden sm:block w-24 h-4 bg-gray-200 rounded animate-pulse" />
                            <div className="w-32 h-9 bg-gray-200 rounded-full animate-pulse" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid Skeleton */}
            <section className="py-12 lg:py-16">
                <div className="container-wide">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="space-y-4">
                                <div className="aspect-[4/5] bg-gray-200 rounded-2xl animate-pulse" />
                                <div className="space-y-2">
                                    <div className="w-3/4 h-5 bg-gray-200 rounded animate-pulse" />
                                    <div className="w-1/4 h-4 bg-gray-200 rounded animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
