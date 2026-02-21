'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'

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
  variantId?: string // Added to support DB variants
}

interface AppContextType {
  cart: CartItem[]
  favorites: number[]
  addToCart: (product: Product, quantity?: number, variant?: string, variantId?: string) => Promise<void>
  removeFromCart: (productId: number, variantId?: string) => Promise<void>
  updateCartQuantity: (productId: number, quantity: number, variantId?: string) => Promise<void>
  toggleFavorite: (productId: number) => void
  isFavorite: (productId: number) => boolean
  cartTotal: number
  cartItemCount: number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  isAIModalOpen: boolean
  setIsAIModalOpen: (open: boolean) => void
  clearCart: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded, isSignedIn } = useUser()
  const [cart, setCart] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isAIModalOpen, setIsAIModalOpen] = useState(false)
  const [isMerging, setIsMerging] = useState(false)

  // Load from localStorage on mount (for guests or initial state)
  useEffect(() => {
    if (!isSignedIn) {
      const savedCart = localStorage.getItem('nexus-cart')
      if (savedCart) setCart(JSON.parse(savedCart))
    }
    const savedFavorites = localStorage.getItem('nexus-favorites')
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
  }, [isSignedIn])

  // Fetch cart from server when signed in
  useEffect(() => {
    if (isSignedIn && user) {
      const fetchServerCart = async () => {
        try {
          const res = await fetch('/api/cart')
          if (res.ok) {
            const data = await res.json()
            setCart(data)
          }
        } catch (error) {
          console.error('Failed to fetch user cart', error)
        }
      }
      fetchServerCart()
    }
  }, [isSignedIn, user])

  // Merge logic: If just signed in and have local cart
  useEffect(() => {
    const mergeCart = async () => {
      const savedCart = localStorage.getItem('nexus-cart')
      if (isSignedIn && savedCart && !isMerging) {
        setIsMerging(true)
        const localItems = JSON.parse(savedCart)
        if (localItems.length > 0) {
          try {
            await fetch('/api/cart/merge', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ items: localItems }),
            })
            // Clear local storage after merge
            localStorage.removeItem('nexus-cart')
            // Refetch server cart
            const res = await fetch('/api/cart')
            if (res.ok) {
              const data = await res.json()
              setCart(data)
              toast.success('Cart merged with your account!')
            }
          } catch (error) {
            console.error('Failed to merge cart', error)
            toast.error('Failed to sync cart')
          }
        }
        setIsMerging(false)
      }
    }

    if (isLoaded && isSignedIn) {
      mergeCart()
    }
  }, [isLoaded, isSignedIn])


  // Save to localStorage whenever cart changes (ONLY IF GUEST)
  useEffect(() => {
    if (!isSignedIn) {
      localStorage.setItem('nexus-cart', JSON.stringify(cart))
    }
  }, [cart, isSignedIn])

  useEffect(() => {
    localStorage.setItem('nexus-favorites', JSON.stringify(favorites))
  }, [favorites])

  const addToCart = useCallback(async (product: Product, quantity = 1, variant?: string, variantId?: string) => {
    // Optimistic Update
    const newItem = { ...product, quantity, selectedVariant: variant, variantId }

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
      return [...prev, newItem]
    })
    setIsCartOpen(true)

    if (isSignedIn) {
      try {
        const res = await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: product.id, quantity, variantId }),
        })
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          toast.error(data?.error || 'Failed to save to account')
        }
      } catch (error) {
        console.error('Failed to add to server cart', error)
        toast.error('Failed to save to account')
      }
    }
  }, [isSignedIn])

  const removeFromCart = useCallback(async (productId: number, variantId?: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === productId && (variantId ? item.variantId === variantId : true)))) // Simplistic filtering, might need variant checking for local

    if (isSignedIn) {
      try {
        const res = await fetch('/api/cart', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId, variantId }),
        })
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          toast.error(data?.error || 'Failed to update cart')
        }
      } catch (error) {
        console.error('Failed to remove from server cart', error)
      }
    }
  }, [isSignedIn])

  const clearCart = useCallback(() => {
    setCart([])
    if (!isSignedIn) {
      localStorage.removeItem('nexus-cart')
    }
    // For server, we might want a clear endpoint, but typically this is called after checkout which clears it on server side
  }, [isSignedIn])

  const updateCartQuantity = useCallback(async (productId: number, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId)
      return
    }

    setCart((prev) =>
      prev.map((item) => (item.id === productId && (variantId ? item.variantId === variantId : true) ? { ...item, quantity } : item))
    )

    if (isSignedIn) {
      try {
        const res = await fetch('/api/cart', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId, quantity, variantId }),
        })
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          toast.error(data?.error || 'Failed to update cart')
        }
      } catch (error) {
        console.error('Failed to update server cart quantity', error)
      }
    }
  }, [removeFromCart, isSignedIn])

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

  const cartTotal = cart.reduce((sum: number, item) => sum + item.price * item.quantity, 0)
  const cartItemCount = cart.reduce((sum: number, item) => sum + item.quantity, 0)

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
        clearCart,
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

