'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Sparkles, Loader2, ArrowRight, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useApp } from '@/contexts/AppContext'
import { allProducts } from '@/lib/data'

interface AIAssistantModalProps {
  onClose: () => void
}

const suggestedPrompts = [
  { text: 'Find the perfect gift', icon: '🎁' },
  { text: "What's trending now?", icon: '✨' },
  { text: 'Outfit for a date night', icon: '💃' },
  { text: 'Sustainable options', icon: '🌿' },
]

interface Message {
  id: number
  type: 'ai' | 'user'
  text: string
  products?: typeof allProducts
}

export default function AIAssistantModal({ onClose }: AIAssistantModalProps) {
  const { setIsAIModalOpen, addToCart } = useApp()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      text: "Hi there! 👋 I'm your personal shopping assistant. How can I help you find the perfect piece today?",
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleClose = () => {
    setIsAIModalOpen(false)
    onClose()
  }

  const handleSend = (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      text: messageText,
    }

    setMessages([...messages, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const randomProducts = allProducts
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)

      const aiResponse: Message = {
        id: messages.length + 2,
        type: 'ai',
        text: "Based on your preferences, here are some curated recommendations just for you:",
        products: randomProducts,
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl h-[85vh] bg-paper rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-border bg-gradient-to-r from-accent-light to-paper">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-[#d97756] flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold">NEXUS AI</h2>
                <p className="text-xs text-muted flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Always here to help
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] ${message.type === 'user' ? '' : ''}`}>
                  <div
                    className={`rounded-2xl p-4 ${
                      message.type === 'user'
                        ? 'bg-accent text-white rounded-br-sm'
                        : 'bg-gray-100 text-ink rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  
                  {/* Product Recommendations */}
                  {message.products && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {message.products.map((product) => (
                        <motion.div
                          key={product.id}
                          whileHover={{ y: -2 }}
                          className="bg-white rounded-xl border border-border overflow-hidden group"
                        >
                          <Link
                            href={`/products/${product.id}`}
                            onClick={handleClose}
                            className="block relative aspect-square"
                          >
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </Link>
                          <div className="p-3">
                            <h4 className="font-medium text-sm truncate mb-1">{product.name}</h4>
                            <div className="flex items-center justify-between">
                              <span className="text-accent font-bold text-sm">${product.price}</span>
                              <button
                                onClick={() => addToCart(product)}
                                className="p-1.5 bg-ink text-white rounded-lg hover:bg-ink/90 transition-colors"
                              >
                                <ShoppingBag className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 rounded-2xl rounded-bl-sm p-4">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-accent" />
                    <span className="text-sm text-muted">Thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          <div className="px-5 pb-3">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt.text}
                  onClick={() => handleSend(prompt.text)}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-border rounded-full hover:border-accent hover:bg-accent-light transition-colors whitespace-nowrap"
                >
                  <span>{prompt.icon}</span>
                  {prompt.text}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-5 border-t border-border bg-white">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-sm"
              />
              <motion.button
                onClick={() => handleSend()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
