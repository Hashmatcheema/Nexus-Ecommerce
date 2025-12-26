'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Mail, Gift, Sparkles } from 'lucide-react'

const benefits = [
  { icon: Gift, text: '15% off first order' },
  { icon: Sparkles, text: 'Early access to sales' },
  { icon: Mail, text: 'Weekly style tips' },
]

export default function CTASection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section className="py-20 lg:py-28 bg-ink overflow-hidden">
      <div className="container-wide">
        <div className="grid grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-12 lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full mb-6">
              <Mail className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-medium">Newsletter</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white leading-tight mb-4">
              Join the
              <br />
              <span className="text-accent">Inner Circle</span>
            </h2>
            
            <p className="text-white/60 text-lg mb-8 max-w-md">
              Be the first to know about new arrivals, exclusive offers, and insider-only content.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap gap-4 mb-8">
              {benefits.map((benefit) => (
                <div
                  key={benefit.text}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full"
                >
                  <benefit.icon className="w-4 h-4 text-accent" />
                  <span className="text-white/80 text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="col-span-12 lg:col-span-6"
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-white/10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">
                    Welcome to the Circle!
                  </h3>
                  <p className="text-white/60">
                    Check your inbox for your 15% discount code.
                  </p>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    Get 15% Off Your First Order
                  </h3>
                  <p className="text-white/50 text-sm mb-6">
                    Plus exclusive access to new drops and sales.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="group w-full py-4 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
                    >
                      Subscribe Now
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>

                  <p className="text-white/30 text-xs mt-4 text-center">
                    No spam, ever. Unsubscribe anytime.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-12 border-t border-white/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50K+', label: 'Newsletter Subscribers' },
              { value: '98%', label: 'Satisfaction Rate' },
              { value: '24H', label: 'Customer Support' },
              { value: '15%', label: 'First Order Discount' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl lg:text-4xl font-display font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-white/40 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
