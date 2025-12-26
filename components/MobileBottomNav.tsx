'use client'

import { Home, Search, ShoppingBag, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useApp } from '@/contexts/AppContext'

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Search, label: 'Search', href: '/products' },
  { icon: ShoppingBag, label: 'Cart', href: '#cart' },
  { icon: User, label: 'Account', href: '/account' },
]

export default function MobileBottomNav() {
  const pathname = usePathname()
  const { cart, setIsCartOpen } = useApp()
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-paper border-t border-subtle z-40">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const isCart = item.href === '#cart'

          if (isCart) {
            return (
              <button
                key={item.label}
                onClick={() => setIsCartOpen(true)}
                className="relative flex flex-col items-center justify-center gap-1 p-2"
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-ink' : 'text-muted'}`} />
                <span className={`text-[10px] font-medium ${isActive ? 'text-ink' : 'text-muted'}`}>
                  {item.label}
                </span>
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-ink text-paper text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            )
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 p-2"
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-ink' : 'text-muted'}`} />
              <span className={`text-[10px] font-medium ${isActive ? 'text-ink' : 'text-muted'}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
