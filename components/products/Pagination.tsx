'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
    currentPage: number
    pages: number
}

export default function Pagination({ currentPage, pages }: PaginationProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', page.toString())
        router.push(`${pathname}?${params.toString()}`)
    }

    if (pages <= 1) return null

    return (
        <div className="flex justify-center gap-2 mt-12">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: pages }).map((_, i) => {
                const page = i + 1
                return (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${currentPage === page
                                ? 'bg-ink text-white border-ink'
                                : 'border-border hover:bg-gray-50'
                            }`}
                    >
                        {page}
                    </button>
                )
            })}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pages}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    )
}
