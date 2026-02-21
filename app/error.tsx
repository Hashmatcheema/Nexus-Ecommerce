'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw, AlertTriangle } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application Error:', error)
    }, [error])

    return (
        <div className="min-h-screen bg-paper flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center max-w-md bg-white p-8 rounded-3xl shadow-xl border border-border"
            >
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                    <AlertTriangle className="w-8 h-8" />
                </div>

                <h2 className="text-2xl font-display font-bold text-ink mb-3">
                    Something went wrong!
                </h2>
                <p className="text-muted mb-8">
                    We apologize for the inconvenience. Our team has been notified of this issue.
                </p>

                <button
                    onClick={reset}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                >
                    <RotateCcw className="w-4 h-4" />
                    Try Again
                </button>
            </motion.div>
        </div>
    )
}
