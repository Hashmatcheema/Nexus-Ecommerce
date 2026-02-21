import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

// Mock Clerk so Jest doesn't try to parse ESM from node_modules
jest.mock('@clerk/nextjs', () => ({
    SignInButton: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    SignIn: () => null,
    SignedIn: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    SignedOut: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    UserButton: () => <span data-testid="user-button" />,
    useAuth: () => ({ isSignedIn: false }),
    auth: () => Promise.resolve({ userId: null }),
    clerkMiddleware: () => () => {},
}))

// Mock the AppContext
jest.mock('@/contexts/AppContext', () => ({
    useApp: () => ({
        isAIModalOpen: false,
        setIsAIModalOpen: jest.fn(),
        cart: [],
        favorites: [],
        isCartOpen: false,
        setIsCartOpen: jest.fn(),
        cartTotal: 0,
        cartItemCount: 0,
        isFavorite: () => false,
        toggleFavorite: jest.fn(),
        addToCart: jest.fn(),
        removeFromCart: jest.fn(),
        updateCartQuantity: jest.fn(),
    }),
}))

// Mock useRouter/usePathname
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
    usePathname: () => '/',
    useSearchParams: () => ({
        get: jest.fn(),
    }),
}))

describe('Home Page', () => {
    it('renders the main element', () => {
        render(<Home />)
        const main = screen.getByRole('main')
        expect(main).toBeInTheDocument()
    })
})
