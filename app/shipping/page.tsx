'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Truck, Globe, Clock, ShieldCheck } from 'lucide-react'

export default function ShippingPage() {
    return (
        <main className="min-h-screen bg-paper">
            <Navigation />

            <section className="pt-32 pb-16 lg:pt-48 container-wide text-center">
                <h1 className="text-4xl lg:text-6xl font-display font-bold text-ink mb-6">
                    Shipping Information
                </h1>
                <p className="text-lg text-muted max-w-2xl mx-auto">
                    We ship worldwide. Here’s everything you need to know about getting your order.
                </p>
            </section>

            <section className="pb-24">
                <div className="container-wide max-w-4xl mx-auto">

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        <div className="p-6 bg-white rounded-2xl border border-subtle text-center">
                            <Truck className="w-8 h-8 mx-auto mb-3 text-accent" />
                            <div className="font-bold text-sm">Free Shipping</div>
                            <div className="text-xs text-muted">On orders over $200</div>
                        </div>
                        <div className="p-6 bg-white rounded-2xl border border-subtle text-center">
                            <Clock className="w-8 h-8 mx-auto mb-3 text-accent" />
                            <div className="font-bold text-sm">Fast Dispatch</div>
                            <div className="text-xs text-muted">Within 24 hours</div>
                        </div>
                        <div className="p-6 bg-white rounded-2xl border border-subtle text-center">
                            <Globe className="w-8 h-8 mx-auto mb-3 text-accent" />
                            <div className="font-bold text-sm">Global Delivery</div>
                            <div className="text-xs text-muted">50+ Countries</div>
                        </div>
                        <div className="p-6 bg-white rounded-2xl border border-subtle text-center">
                            <ShieldCheck className="w-8 h-8 mx-auto mb-3 text-accent" />
                            <div className="font-bold text-sm">Insured</div>
                            <div className="text-xs text-muted">Every shipment covered</div>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-accent">
                        <h3>Domestic Shipping (USA)</h3>
                        <p>
                            We offer several shipping options for our domestic customers. All orders are processed within 1 business day (excluding weekends and holidays).
                        </p>
                        <ul>
                            <li><strong>Standard Ground</strong> (3-5 business days): $10 or Free for orders over $200</li>
                            <li><strong>Express</strong> (2 business days): $25</li>
                            <li><strong>Overnight</strong> (1 business day): $45</li>
                        </ul>

                        <h3>International Shipping</h3>
                        <p>
                            We ship to most countries worldwide via DHL Express. International shipping costs are calculated at checkout based on destination and package weight.
                        </p>
                        <p>
                            <strong>Please note:</strong> International orders may be subject to import duties and taxes (including VAT), which are incurred once a shipment reaches your destination country. Nexus is not responsible for these charges if they are applied and are your responsibility as the customer.
                        </p>

                        <h3>Order Tracking</h3>
                        <p>
                            When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.
                        </p>

                        <h3>Lost or Damaged Packages</h3>
                        <p>
                            Nexus is liable for packages that are lost or damaged during transit. If your package arrives damaged, please take photos of the condition and contact us immediately at <a href="mailto:support@nexus.com">support@nexus.com</a>.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
