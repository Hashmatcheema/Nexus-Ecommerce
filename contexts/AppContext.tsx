'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

export interface Product {
  id: number
  name: string
  price: number
  image: string
  category?: string
  originalPrice?: number
  description?: string
}

export interface CartItem extends Product {
  quantity: number
  selectedVariant?: string
}

interface AppContextType {
  cart: CartItem[]
  favorites: number[]
  addToCart: (product: Product, quantity?: number, variant?: string) => void
  removeFromCart: (productId: number) => void
  updateCartQuantity: (productId: number, quantity: number) => void
  toggleFavorite: (productId: number) => void
  isFavorite: (productId: number) => boolean
  cartTotal: number
  cartItemCount: number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  isAIModalOpen: boolean
  setIsAIModalOpen: (open: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isAIModalOpen, setIsAIModalOpen] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('nexus-cart')
    const savedFavorites = localStorage.getItem('nexus-favorites')
    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
  }, [])

  // Save to localStorage whenever cart or favorites change
  useEffect(() => {
    localStorage.setItem('nexus-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('nexus-favorites', JSON.stringify(favorites))
  }, [favorites])

  const addToCart = useCallback((product: Product, quantity = 1, variant?: string) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) => item.id === product.id && item.selectedVariant === variant
      )

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id && item.selectedVariant === variant
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }

      return [...prev, { ...product, quantity, selectedVariant: variant }]
    })
    setIsCartOpen(true)
  }, [])

  const removeFromCart = useCallback((productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }, [])

  const updateCartQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    )
  }, [removeFromCart])

  const toggleFavorite = useCallback((productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }, [])

  const isFavorite = useCallback(
    (productId: number) => favorites.includes(productId),
    [favorites]
  )

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <AppContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleFavorite,
        isFavorite,
        cartTotal,
        cartItemCount,
        isCartOpen,
        setIsCartOpen,
        isAIModalOpen,
        setIsAIModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

