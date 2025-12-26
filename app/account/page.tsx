'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import Link from 'next/link'
import Image from 'next/image'
import { Package, Heart, MapPin, CreditCard, Settings, LogOut, ChevronRight, Star, Bell, Gift, ArrowUpRight } from 'lucide-react'
import { user, orders, addresses } from '@/lib/data'

const menuItems = [
  { icon: Package, label: 'My Orders', href: '/account/orders', count: orders.length, color: 'bg-blue-100 text-blue-600' },
  { icon: Heart, label: 'Wishlist', href: '/account/wishlist', count: 8, color: 'bg-pink-100 text-pink-600' },
  { icon: MapPin, label: 'Addresses', href: '/account/addresses', count: addresses.length, color: 'bg-green-100 text-green-600' },
  { icon: CreditCard, label: 'Payment Methods', href: '/account/payment', color: 'bg-purple-100 text-purple-600' },
  { icon: Bell, label: 'Notifications', href: '/account/notifications', color: 'bg-yellow-100 text-yellow-600' },
  { icon: Settings, label: 'Settings', href: '/account/settings', color: 'bg-gray-100 text-gray-600' },
]

const quickActions = [
  { icon: Package, label: 'Track Order', href: '/account/orders' },
  { icon: Gift, label: 'Gift Cards', href: '/gift-cards' },
  { icon: Heart, label: 'Wishlist', href: '/account/wishlist' },
]

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      <Navigation />
      
      {/* Header */}
      <section className="bg-ink pt-24 lg:pt-32 pb-32">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-6"
          >
            <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden ring-4 ring-white/20">
              <Image
                src={user.avatar}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold text-white mb-1">
                {user.name}
              </h1>
              <p className="text-white/60 mb-3">{user.email}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/20 rounded-full">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span className="text-accent text-sm font-medium">{user.tier} · {user.points} points</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="-mt-20">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-3 gap-4"
              >
                {quickActions.map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                      <action.icon className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-sm font-medium text-ink">{action.label}</span>
                  </Link>
                ))}
              </motion.div>

              {/* Recent Orders */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl overflow-hidden"
              >
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <h2 className="text-lg font-display font-bold">Recent Orders</h2>
                  <Link href="/account/orders" className="text-sm text-accent hover:underline flex items-center gap-1">
                    View All <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="divide-y divide-border">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <p className="font-semibold">{order.id}</p>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                              order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-muted">{order.date}</p>
                        </div>
                        <span className="text-lg font-bold">${order.total}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {order.items.slice(0, 4).map((item, index) => (
                          <div key={index} className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                        {order.items.length > 4 && (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-sm text-muted font-medium">
                            +{order.items.length - 4}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Saved Addresses */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl overflow-hidden"
              >
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <h2 className="text-lg font-display font-bold">Saved Addresses</h2>
                  <Link href="/account/addresses" className="text-sm text-accent hover:underline flex items-center gap-1">
                    Manage <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`rounded-xl p-5 border-2 transition-colors ${
                        address.isDefault ? 'border-accent bg-accent-light' : 'border-border hover:border-accent/30'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className={`w-4 h-4 ${address.isDefault ? 'text-accent' : 'text-muted'}`} />
                        <span className="font-semibold text-sm">{address.type}</span>
                        {address.isDefault && (
                          <span className="px-2 py-0.5 bg-accent text-white text-[10px] font-bold rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted leading-relaxed">
                        {address.name}<br />
                        {address.street}<br />
                        {address.city}, {address.state} {address.zip}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Menu */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="space-y-6"
            >
              {/* Loyalty Card */}
              <div className="bg-gradient-to-br from-accent to-[#d97756] rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-medium opacity-80">Loyalty Points</span>
                  <Star className="w-5 h-5 opacity-80" />
                </div>
                <div className="text-4xl font-display font-bold mb-2">{user.points}</div>
                <div className="text-sm opacity-80 mb-6">Points Available</div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: '65%' }} />
                </div>
                <p className="text-xs opacity-60 mt-2">350 more points to Platinum</p>
              </div>

              {/* Menu */}
              <div className="bg-white rounded-2xl overflow-hidden">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-border last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.count !== undefined && (
                        <span className="text-sm text-muted">{item.count}</span>
                      )}
                      <ChevronRight className="w-4 h-4 text-muted" />
                    </div>
                  </Link>
                ))}
                
                <button className="w-full flex items-center gap-3 p-4 text-red-500 hover:bg-red-50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                    <LogOut className="w-5 h-5" />
                  </div>
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="py-12" />
      <Footer />
      <CartDrawer />
    </main>
  )
}
