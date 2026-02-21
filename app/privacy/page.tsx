'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-paper">
            <Navigation />

            <section className="pt-32 pb-16 lg:pt-48 container-wide">
                <div className="max-w-3xl mx-auto">
                    <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">Legal</span>
                    <h1 className="text-4xl lg:text-5xl font-display font-bold text-ink mb-6">
                        Privacy Policy
                    </h1>
                    <p className="text-muted mb-12">
                        Last updated: February 1, 2025
                    </p>

                    <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-accent prose-p:text-muted">
                        <p>
                            At Nexus ("we", "our", or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website nexus.com.
                        </p>

                        <h3>Information We Collect</h3>
                        <p>
                            We collect information that you provide directly to us when you:
                        </p>
                        <ul>
                            <li>Create an account or purchase a product</li>
                            <li>Subscribe to our newsletter</li>
                            <li>Contact customer support</li>
                            <li>Participate in a promotion or survey</li>
                        </ul>
                        <p>
                            This information may include your name, email address, shipping/billing address, phone number, and payment information.
                        </p>

                        <h3>How We Use Your Information</h3>
                        <p>
                            We use the information we collect to:
                        </p>
                        <ul>
                            <li>Process your orders and manage your account</li>
                            <li>Send you transactional emails (order confirmations, shipping updates)</li>
                            <li>Send you marketing emails (if you opted in)</li>
                            <li>Improve our website and customer service</li>
                            <li>Detect and prevent fraud</li>
                        </ul>

                        <h3>Sharing of Information</h3>
                        <p>
                            We do not sell your personal information. We may share your information with third-party service providers who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential. Examples include:
                        </p>
                        <ul>
                            <li>Payment processors (Stripe, PayPal)</li>
                            <li>Shipping partners (DHL, FedEx)</li>
                            <li>Email marketing platforms</li>
                        </ul>

                        <h3>Data Security</h3>
                        <p>
                            We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.
                        </p>

                        <h3>Your Rights</h3>
                        <p>
                            Depending on your location, you may have the right to request access to the personal information we hold about you, to port it to a new service, or to request that your personal information be corrected or deleted.
                        </p>

                        <h3>Contact Us</h3>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@nexus.com">privacy@nexus.com</a>.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
