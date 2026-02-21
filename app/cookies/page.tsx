'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function CookiesPage() {
    return (
        <main className="min-h-screen bg-paper">
            <Navigation />

            <section className="pt-32 pb-16 lg:pt-48 container-wide">
                <div className="max-w-3xl mx-auto">
                    <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">Legal</span>
                    <h1 className="text-4xl lg:text-5xl font-display font-bold text-ink mb-6">
                        Cookie Policy
                    </h1>
                    <p className="text-muted mb-12">
                        Last updated: February 1, 2025
                    </p>

                    <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-accent prose-p:text-muted">
                        <p>
                            This Cookie Policy explains how Nexus uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are, why we use them, and your rights to control our use of them.
                        </p>

                        <h3>What are cookies?</h3>
                        <p>
                            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
                        </p>

                        <h3>Why do we use cookies?</h3>
                        <p>
                            We use first-party and third-party cookies for several reasons:
                        </p>
                        <ul>
                            <li><strong>Essential Cookies:</strong> Required for technical reasons in order for our Website to operate.</li>
                            <li><strong>Performance Cookies:</strong> Allow us to track and target the interests of our users to enhance the experience.</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with the Website.</li>
                        </ul>

                        <h3>How can I control cookies?</h3>
                        <p>
                            You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
                        </p>

                        <h3>Changes to this Cookie Policy</h3>
                        <p>
                            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
