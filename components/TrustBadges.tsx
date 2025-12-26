'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Award, Truck, CreditCard, Headphones } from 'lucide-react'

const badges = [
  { icon: Shield, title: 'Secure Checkout', description: '256-bit SSL encryption' },
  { icon: Truck, title: 'Free Shipping', description: 'On orders over $100' },
  { icon: Award, title: '100% Authentic', description: 'Verified genuine products' },
  { icon: Headphones, title: '24/7 Support', description: 'Always here to help' },
]

export default function TrustBadges() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4">
                <badge.icon className="w-6 h-6 text-ink" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{badge.title}</h3>
              <p className="text-xs text-muted">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
