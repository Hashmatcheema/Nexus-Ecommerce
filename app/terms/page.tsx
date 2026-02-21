'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-paper">
            <Navigation />

            <section className="pt-32 pb-16 lg:pt-48 container-wide">
                <div className="max-w-3xl mx-auto">
                    <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">Legal</span>
                    <h1 className="text-4xl lg:text-5xl font-display font-bold text-ink mb-6">
                        Terms of Service
                    </h1>
                    <p className="text-muted mb-12">
                        Last updated: February 1, 2025
                    </p>

                    <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-accent prose-p:text-muted">
                        <h3>1. Introduction</h3>
                        <p>
                            Welcome to Nexus. By accessing our website, purchasing our products, or using our services, you agree to be bound by these Terms of Service. Please read them carefully.
                        </p>

                        <h3>2. Online Store Terms</h3>
                        <p>
                            By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence. You may not use our products for any illegal or unauthorized purpose.
                        </p>

                        <h3>3. Products and Services</h3>
                        <p>
                            We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change at anytime without notice. We reserve the right to discontinue any product at any time.
                        </p>

                        <h3>4. Pricing and Payment</h3>
                        <p>
                            Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
                        </p>

                        <h3>5. User Comments and Feedback</h3>
                        <p>
                            If you send us specific submissions (e.g., contest entries) or creative ideas, suggestions, proposals, plans, or other materials, you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us.
                        </p>

                        <h3>6. Errors and Inaccuracies</h3>
                        <p>
                            Occasionally there may be information on our site that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors.
                        </p>

                        <h3>7. Governing Law</h3>
                        <p>
                            These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of the State of New York.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
