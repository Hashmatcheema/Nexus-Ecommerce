'use client'

import { useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { SlidersHorizontal, ChevronDown, Check, X, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ProductFiltersProps {
    categories: string[]
    totalProducts: number
}

const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' }, // Maps to Newest/Desc usually, unless we add 'views'
]

export default function ProductFilters({ categories, totalProducts }: ProductFiltersProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const currentCategory = searchParams.get('category') || 'All'
    const currentSort = searchParams.get('sort') || 'newest'
    const currentSearch = searchParams.get('search') || ''
    const currentView = searchParams.get('view') || '4'

    const [isSortOpen, setIsSortOpen] = useState(false)
    const [showMobileFilters, setShowMobileFilters] = useState(false)
    const [searchQuery, setSearchQuery] = useState(currentSearch)

    const updateFilters = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value && value !== 'All') {
            params.set(key, value)
        } else {
            params.delete(key)
        }
        // Reset page on filter change
        if (key !== 'page' && key !== 'view') {
            params.delete('page')
        }
        router.push(`${pathname}?${params.toString()}`)
    }

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        updateFilters('search', searchQuery)
    }

    return (
        <>
            <section className="sticky top-16 lg:top-20 z-30 bg-paper/95 backdrop-blur-xl border-y border-border">
                <div className="container-wide">
                    <div className="flex items-center justify-between h-14 lg:h-16 gap-4">
                        {/* Left: Categories (Desktop) / Filter Toggle (Mobile) */}
                        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar flex-1">

                            {/* Mobile Filter Toggle */}
                            <button
                                onClick={() => setShowMobileFilters(!showMobileFilters)}
                                className={`lg:hidden flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${showMobileFilters ? 'bg-ink text-paper' : 'bg-gray-100 text-ink'}`}
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                Filters
                            </button>

                            {/* Desktop Categories */}
                            <div className="hidden lg:flex items-center gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => updateFilters('category', category)}
                                        className={`px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${currentCategory === category
                                                ? 'bg-ink text-paper'
                                                : 'text-muted hover:text-ink hover:bg-gray-100'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right: Search, Count, Sort */}
                        <div className="flex items-center gap-3">
                            {/* Search Bar */}
                            <form onSubmit={handleSearchSubmit} className="hidden md:flex relative group">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 pr-4 py-2 bg-gray-100 rounded-full text-sm w-32 focus:w-48 transition-all focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                                <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </form>

                            <span className="hidden sm:block text-sm text-muted whitespace-nowrap">
                                {totalProducts} products
                            </span>

                            {/* Grid Toggle */}
                            <div className="hidden lg:flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                                <button
                                    onClick={() => updateFilters('view', '3')}
                                    className={`p-2 rounded-md transition-colors ${currentView === '3' ? 'bg-white shadow-sm' : 'text-muted hover:text-ink'}`}
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="3" width="7" height="7"></rect>
                                        <rect x="14" y="3" width="7" height="7"></rect>
                                        <rect x="14" y="14" width="7" height="7"></rect>
                                        <rect x="3" y="14" width="7" height="7"></rect>
                                    </svg>
                                </button>
                                <button
                                    onClick={() => updateFilters('view', '4')}
                                    className={`p-2 rounded-md transition-colors ${currentView === '4' ? 'bg-white shadow-sm' : 'text-muted hover:text-ink'}`}
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="3" width="5" height="5"></rect>
                                        <rect x="10" y="3" width="5" height="5"></rect>
                                        <rect x="17" y="3" width="4" height="5"></rect>
                                        <rect x="3" y="10" width="5" height="5"></rect>
                                        <rect x="10" y="10" width="5" height="5"></rect>
                                        <rect x="17" y="10" width="4" height="5"></rect>
                                        <rect x="3" y="17" width="5" height="5"></rect>
                                        <rect x="10" y="17" width="5" height="5"></rect>
                                        <rect x="17" y="17" width="4" height="5"></rect>
                                    </svg>
                                </button>
                            </div>

                            {/* Sort Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium whitespace-nowrap"
                                >
                                    {sortOptions.find(o => o.value === currentSort)?.label}
                                    <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {isSortOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute top-full right-0 mt-2 w-48 bg-paper rounded-xl shadow-xl border border-border py-2 z-10"
                                        >
                                            {sortOptions.map((option) => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => {
                                                        updateFilters('sort', option.value)
                                                        setIsSortOpen(false)
                                                    }}
                                                    className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between ${currentSort === option.value
                                                            ? 'bg-accent-light text-accent font-medium'
                                                            : 'text-muted hover:bg-gray-50 hover:text-ink'
                                                        }`}
                                                >
                                                    {option.label}
                                                    {currentSort === option.value && <Check className="w-4 h-4" />}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Filters Panel */}
            <AnimatePresence>
                {showMobileFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden border-b border-border overflow-hidden bg-gray-50"
                    >
                        <div className="container-wide py-6 space-y-6">
                            {/* Mobile Search */}
                            <form onSubmit={handleSearchSubmit} className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                                <Search className="w-5 h-5 text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </form>

                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-ink">Categories</h3>
                                    <button onClick={() => setShowMobileFilters(false)} className="p-1 text-muted hover:text-ink">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => {
                                                updateFilters('category', category)
                                                setShowMobileFilters(false)
                                            }}
                                            className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${currentCategory === category
                                                    ? 'bg-ink text-paper'
                                                    : 'bg-white text-muted border border-border hover:border-ink hover:text-ink'
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
