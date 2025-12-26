'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import CartDrawer from '@/components/CartDrawer'
import { Package, Truck, CheckCircle, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const orders = [
  {
    id: 'ORD-2024-001',
    date: 'December 24, 2024',
    status: 'Delivered',
    statusIcon: CheckCircle,
    items: [
      {
        name: 'Aether Pro',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        quantity: 1,
        price: 1299
      }
    ],
    total: 1299,
  },
  {
    id: 'ORD-2024-002',
    date: 'December 20, 2024',
    status: 'In Transit',
    statusIcon: Truck,
    items: [
      {
        name: 'Nova Elite',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        quantity: 1,
        price: 899
      }
    ],
    total: 899,
    estimatedDelivery: 'December 28, 2024'
  },
  {
    id: 'ORD-2024-003',
    date: 'December 15, 2024',
    status: 'Processing',
    statusIcon: Clock,
    items: [
      {
        name: 'Quantum X',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        quantity: 1,
        price: 1599
      },
      {
        name: 'Zenith Ultra',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
        quantity: 2,
        price: 749
      }
    ],
    total: 3097,
  }
]

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-paper pb-16 md:pb-0">
      <Navigation />

      <section className="pt-32 pb-24">
        <div className="container-wide">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <Link href="/account" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors mb-8">
              ← Back to Account
            </Link>
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-muted block mb-4">
              Orders
            </span>
            <h1 className="text-headline font-display">
              Order History
            </h1>
          </motion.div>

          {/* Orders List */}
          <div className="space-y-8">
            {orders.map((order, index) => (
              <motion.article
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="border border-subtle"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="font-display text-lg font-semibold">#{order.id}</h2>
                      <span className="text-xs font-medium text-muted flex items-center gap-1">
                        <order.statusIcon className="w-3 h-3" />
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-xl font-semibold">
                      ${order.total.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex gap-4">
                        <div className="relative w-16 h-16 bg-gray-100 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{item.name}</h3>
                          <p className="text-sm text-muted">Qty: {item.quantity}</p>
                        </div>
                        <div className="font-medium">
                          ${(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {order.estimatedDelivery && (
                    <p className="text-sm text-muted mt-6 pt-6 border-t border-subtle">
                      Estimated delivery: {order.estimatedDelivery}
                    </p>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <MobileBottomNav />
      <CartDrawer />
    </main>
  )
}
