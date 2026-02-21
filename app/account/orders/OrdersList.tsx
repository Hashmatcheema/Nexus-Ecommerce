'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import { Package, Truck, CheckCircle, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface OrdersListProps {
  orders: any[]
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'DELIVERED': return CheckCircle
    case 'SHIPPED': return Truck
    case 'PROCESSING': return Package // or specific icon
    default: return Clock
  }
}

export default function OrdersList({ orders }: OrdersListProps) {
  return (
    <main className="min-h-screen bg-paper">
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
            {orders.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-border rounded-2xl">
                <Package className="w-12 h-12 text-muted mx-auto mb-4" />
                <h3 className="text-lg font-medium text-ink">No orders found</h3>
                <p className="text-muted mb-6">You haven't placed any orders yet.</p>
                <Link href="/products" className="btn-primary">Start Shopping</Link>
              </div>
            ) : (
              orders.map((order, index) => {
                const StatusIcon = getStatusIcon(order.status)
                return (
                  <motion.article
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="border border-subtle bg-white rounded-xl overflow-hidden"
                  >
                    {/* Order Header */}
                    <div className="p-6 border-b border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="font-display text-lg font-semibold">#{order.orderNumber}</h2>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                              order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-700' :
                                'bg-yellow-100 text-yellow-700'
                            }`}>
                            <StatusIcon className="w-3 h-3" />
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-xl font-semibold">
                          ${Number(order.total).toFixed(2)}
                        </div>
                        <p className="text-xs text-muted mt-1">{order.items.length} items</p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-6">
                      <div className="space-y-4">
                        {order.items.map((item: any, itemIndex: number) => (
                          <div key={itemIndex} className="flex gap-4">
                            <div className="relative w-16 h-16 bg-gray-100 flex-shrink-0 rounded-md overflow-hidden">
                              {item.product?.images?.[0] ? (
                                <Image
                                  src={item.product.images[0]}
                                  alt={item.product.name}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-full text-xs text-muted">No Img</div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium truncate text-ink">{item.product.name}</h3>
                              <p className="text-sm text-muted">Qty: {item.quantity}</p>
                            </div>
                            <div className="font-medium text-ink">
                              ${(Number(item.price) * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                )
              })
            )}
          </div>
        </div>
      </section>

      <Footer />
      <CartDrawer />
    </main>
  )
}
