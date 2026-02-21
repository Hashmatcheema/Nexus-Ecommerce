'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Package,
  TrendingUp,
  Users,
  Settings,
  Bell,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Key,
} from 'lucide-react'

const metrics = [
  { label: 'Total Revenue', value: '$124,580', change: '+12.5%', trend: 'up' },
  { label: 'Orders', value: '1,234', change: '+8.2%', trend: 'up' },
  { label: 'Products', value: '456', change: '+3.1%', trend: 'up' },
  { label: 'Customers', value: '8,901', change: '-2.4%', trend: 'down' },
]

const aiLogs = [
  {
    id: 1,
    action: 'Restock Recommendation',
    product: 'Aether Pro',
    decision: 'Increase inventory by 50 units',
    timestamp: '2 minutes ago',
    confidence: 94,
  },
  {
    id: 2,
    action: 'Price Optimization',
    product: 'Nova Elite',
    decision: 'Reduce price by 5% for better conversion',
    timestamp: '15 minutes ago',
    confidence: 87,
  },
  {
    id: 3,
    action: 'Trend Alert',
    product: 'Quantum X',
    decision: 'High demand detected, consider promotion',
    timestamp: '1 hour ago',
    confidence: 92,
  },
]

const inventory = [
  { id: 1, name: 'Aether Pro', stock: 45, status: 'low', sales: 234 },
  { id: 2, name: 'Nova Elite', stock: 120, status: 'good', sales: 189 },
  { id: 3, name: 'Quantum X', stock: 23, status: 'low', sales: 312 },
  { id: 4, name: 'Zenith Ultra', stock: 89, status: 'good', sales: 156 },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <main className="min-h-screen bg-futuristic-black flex">
      {/* Sidebar */}
      <aside className="w-64 glass-effect-dark border-r border-white/10 p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-neon to-neon-purple bg-clip-text text-transparent">
              NEXUS
            </span>
            <span className="text-white/60 text-sm block mt-1">Admin</span>
          </h1>
        </div>

        <nav className="space-y-2 flex-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-neon to-neon-purple'
                : 'hover:bg-white/10'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-neon to-neon-purple'
                : 'hover:bg-white/10'
            }`}
          >
            <Package className="w-5 h-5" />
            Products
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'analytics'
                ? 'bg-gradient-to-r from-neon to-neon-purple'
                : 'hover:bg-white/10'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'customers'
                ? 'bg-gradient-to-r from-neon to-neon-purple'
                : 'hover:bg-white/10'
            }`}
          >
            <Users className="w-5 h-5" />
            Customers
          </button>
          <button
            onClick={() => setActiveTab('ai-agent')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'ai-agent'
                ? 'bg-gradient-to-r from-neon to-neon-purple'
                : 'hover:bg-white/10'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            AI Agent
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'settings'
                ? 'bg-gradient-to-r from-neon to-neon-purple'
                : 'hover:bg-white/10'
            }`}
          >
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </nav>

        <div className="pt-6 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-4 py-3 glass-effect rounded-xl hover:bg-white/10 transition-colors">
            <Bell className="w-5 h-5" />
            Notifications
            <span className="ml-auto w-2 h-2 bg-neon rounded-full"></span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 lg:p-12">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-display-3 font-bold mb-2">Dashboard Overview</h2>
                  <p className="text-white/60">Welcome back! Here's what's happening today.</p>
                </div>
                <Link
                  href="/admin/env"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-effect hover:bg-white/10 transition-colors text-sm"
                >
                  <Key className="w-4 h-4" />
                  View env vars
                </Link>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-effect rounded-card p-6"
                  >
                    <p className="text-sm text-white/60 mb-2">{metric.label}</p>
                    <p className="text-3xl font-bold mb-2">{metric.value}</p>
                    <div className="flex items-center gap-2">
                      {metric.trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4 text-green-400" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-400" />
                      )}
                      <span
                        className={`text-sm ${
                          metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {metric.change}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* AI Agent Log */}
              <div className="glass-effect rounded-card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-neon" />
                  <h3 className="text-2xl font-bold">AI Agent Log</h3>
                </div>
                <div className="space-y-4">
                  {aiLogs.map((log) => (
                    <div
                      key={log.id}
                      className="glass-effect-dark rounded-xl p-4 border-l-4 border-neon"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold">{log.action}</p>
                          <p className="text-sm text-white/60">{log.product}</p>
                        </div>
                        <span className="text-xs text-white/40">{log.timestamp}</span>
                      </div>
                      <p className="text-white/80 mb-2">{log.decision}</p>
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-neon" />
                        <span className="text-xs text-white/60">
                          Confidence: {log.confidence}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inventory Table */}
              <div className="glass-effect rounded-card p-6">
                <h3 className="text-2xl font-bold mb-6">Inventory Status</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-4 px-4 text-white/60 font-medium">Product</th>
                        <th className="text-left py-4 px-4 text-white/60 font-medium">Stock</th>
                        <th className="text-left py-4 px-4 text-white/60 font-medium">Status</th>
                        <th className="text-left py-4 px-4 text-white/60 font-medium">Sales</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventory.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          <td className="py-4 px-4 font-semibold">{item.name}</td>
                          <td className="py-4 px-4">{item.stock} units</td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                item.status === 'low'
                                  ? 'bg-red-500/20 text-red-400'
                                  : 'bg-green-500/20 text-green-400'
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">{item.sales}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai-agent' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-display-3 font-bold mb-2">AI Agent Insights</h2>
                <p className="text-white/60">
                  Intelligent recommendations and automated decisions from your AI agent.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-effect rounded-card p-6">
                  <h3 className="text-xl font-bold mb-4">Smart Recommendations</h3>
                  <div className="space-y-4">
                    <div className="glass-effect-dark rounded-xl p-4">
                      <p className="font-semibold mb-1">Restock Alert</p>
                      <p className="text-sm text-white/60">
                        Aether Pro is running low. Consider ordering 50 more units.
                      </p>
                    </div>
                    <div className="glass-effect-dark rounded-xl p-4">
                      <p className="font-semibold mb-1">Trend Alert</p>
                      <p className="text-sm text-white/60">
                        Quantum X is trending. Consider a promotional campaign.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-effect rounded-card p-6">
                  <h3 className="text-xl font-bold mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-white/60">Decision Accuracy</span>
                        <span className="font-semibold">94%</span>
                      </div>
                      <div className="w-full h-2 glass-effect-dark rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-neon to-neon-purple rounded-full"
                          style={{ width: '94%' }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-white/60">Cost Savings</span>
                        <span className="font-semibold">$12,450</span>
                      </div>
                      <div className="w-full h-2 glass-effect-dark rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-neon to-neon-purple rounded-full"
                          style={{ width: '78%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}



