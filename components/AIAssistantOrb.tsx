'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface AIAssistantOrbProps {
  onClick: () => void
}

export default function AIAssistantOrb({ onClick }: AIAssistantOrbProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-24 lg:bottom-8 right-6 z-40"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Open AI assistant"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-accent rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
      
      {/* Button */}
      <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-accent to-[#d97756] flex items-center justify-center shadow-lg group cursor-pointer overflow-hidden">
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        
        {/* Icon */}
        <Sparkles className="w-5 h-5 text-white relative z-10" />
        
        {/* Pulse Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-accent"
          animate={{
            scale: [1, 1.4, 1.4],
            opacity: [0.6, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      </div>
      
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-ink text-white text-sm font-medium rounded-lg whitespace-nowrap pointer-events-none"
      >
        AI Shopping Assistant
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-ink rotate-45" />
      </motion.div>
    </motion.button>
  )
}
