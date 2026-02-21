import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function AccountLoading() {
    return (
        <main className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
            <Navigation />

            {/* Header Skeleton */}
            <section className="bg-ink pt-24 lg:pt-32 pb-32">
                <div className="container-wide">
                    <div className="flex items-center gap-6 animate-pulse">
                        <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-gray-700/50" />
                        <div className="space-y-3">
                            <div className="w-48 h-8 rounded bg-gray-700/50" />
                            <div className="w-64 h-5 rounded bg-gray-700/50" />
                            <div className="w-32 h-6 rounded-full bg-accent/20" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Skeleton */}
            <section className="-mt-20">
                <div className="container-wide">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Quick Actions */}
                            <div className="grid grid-cols-3 gap-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="bg-white rounded-2xl p-6 h-32 animate-pulse" />
                                ))}
                            </div>

                            {/* Recent Orders */}
                            <div className="bg-white rounded-2xl overflow-hidden animate-pulse h-64" />

                            {/* Addresses */}
                            <div className="bg-white rounded-2xl overflow-hidden animate-pulse h-48" />
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-accent to-[#d97756] rounded-2xl p-6 h-48 animate-pulse opacity-50" />
                            <div className="bg-white rounded-2xl h-64 animate-pulse" />
                        </div>
                    </div>
                </div>
            </section>

            <div className="py-12" />
            <Footer />
        </main>
    )
}
