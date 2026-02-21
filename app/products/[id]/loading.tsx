import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function ProductDetailLoading() {
    return (
        <main className="min-h-screen bg-paper">
            <Navigation />

            <section className="pt-28 pb-24">
                <div className="container-wide">
                    {/* Back link skeleton */}
                    <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-8" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Images Skeleton */}
                        <div className="space-y-4">
                            <div className="aspect-[3/4] bg-gray-200 rounded-3xl animate-pulse" />
                            <div className="grid grid-cols-3 gap-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="aspect-[3/4] bg-gray-200 rounded-2xl animate-pulse" />
                                ))}
                            </div>
                        </div>

                        {/* Details Skeleton */}
                        <div className="lg:py-8 space-y-8">
                            <div className="space-y-4">
                                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
                                <div className="w-3/4 h-12 bg-gray-200 rounded animate-pulse" />
                                <div className="w-32 h-8 bg-gray-200 rounded animate-pulse" />
                            </div>

                            <div className="space-y-2">
                                <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
                                <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
                                <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse" />
                            </div>

                            {/* Selectors Skeleton */}
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
                                    <div className="flex gap-2">
                                        {[1, 2, 3].map(i => <div key={i} className="w-24 h-10 bg-gray-200 rounded-full animate-pulse" />)}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4].map(i => <div key={i} className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />)}
                                    </div>
                                </div>
                            </div>

                            {/* Actions Skeleton */}
                            <div className="flex gap-4">
                                <div className="flex-1 h-14 bg-gray-200 rounded-full animate-pulse" />
                                <div className="w-14 h-14 bg-gray-200 rounded-full animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
