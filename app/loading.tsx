export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-paper">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-ink border-t-transparent animate-spin"></div>
            </div>
        </div>
    )
}
