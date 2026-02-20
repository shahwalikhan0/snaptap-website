"use client";

import Navbar from "../../app/components/navbar";
import Footer from "../../app/components/footer";
import { Icon } from "@iconify/react";

export default function TermsOfService() {
    return (
        <div className="bg-white min-h-screen font-sans text-slate-800">
            <Navbar />

            <main className="pt-32 pb-20 px-6 md:px-12 lg:px-24">
                <div className="max-w-4xl mx-auto">
                    {/* Page Header */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-[#007cae]/10 flex items-center justify-center">
                                <Icon icon="mdi:file-document-outline" className="text-[#007cae]" width={24} />
                            </div>
                            <span className="text-sm font-semibold text-[#007cae] uppercase tracking-wider">Legal</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Terms of Service</h1>
                        <p className="text-slate-400 text-sm">Last updated: February 20, 2026</p>
                    </div>

                    {/* Content */}
                    <div className="space-y-10">
                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Agreement to Terms</h2>
                            <p className="text-slate-600 leading-relaxed">
                                By accessing or using SnapTap&apos;s website, mobile applications, or any of our services (collectively, the &quot;Services&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not access or use our Services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Description of Services</h2>
                            <p className="text-slate-600 leading-relaxed">
                                SnapTap provides a platform that allows businesses to create 3D augmented reality (AR) models of their products, publish them on our marketplace or embed them on their own websites, and enable end customers to visualize products in their real-world environment. Our Services include product scanning tools, 3D model generation, inventory management, AR viewer embedding, QR code generation, and related analytics.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Account Registration</h2>
                            <p className="text-slate-600 leading-relaxed">
                                To access certain features, you must create an account. You agree to provide accurate and complete information during registration and to keep your account credentials secure. You are responsible for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Subscriptions &amp; Payments</h2>
                            <p className="text-slate-600 leading-relaxed">
                                Some of our Services require a paid subscription. By selecting a subscription plan, you agree to pay the applicable fees. Subscription fees are billed on a recurring basis according to your chosen plan. You may upgrade, downgrade, or cancel your subscription at any time, subject to the terms of your current billing cycle.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">5. User Content &amp; Ownership</h2>
                            <p className="text-slate-600 leading-relaxed">
                                You retain ownership of all content you upload to SnapTap, including product images, 3D scan data, and generated AR models (&quot;User Content&quot;). By uploading content, you grant SnapTap a limited, non-exclusive license to process, store, and display your content solely for the purpose of providing our Services. We do not claim ownership over your User Content.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">6. Acceptable Use</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                You agree not to use our Services to:
                            </p>
                            <ul className="space-y-3 text-slate-600">
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-[#007cae] mt-1 shrink-0" width={18} />
                                    <span>Upload content that is unlawful, infringing, harmful, or violates any third-party rights.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-[#007cae] mt-1 shrink-0" width={18} />
                                    <span>Attempt to reverse-engineer, decompile, or gain unauthorized access to any part of the platform.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-[#007cae] mt-1 shrink-0" width={18} />
                                    <span>Use automated tools, bots, or scrapers to access or interact with our Services without authorization.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-[#007cae] mt-1 shrink-0" width={18} />
                                    <span>Interfere with the security, integrity, or performance of our platform.</span>
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">7. Intellectual Property</h2>
                            <p className="text-slate-600 leading-relaxed">
                                All intellectual property rights in the SnapTap platform, including our software, branding, design, and technology (excluding User Content), are owned by SnapTap. You may not copy, modify, distribute, or create derivative works based on our platform without prior written consent.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">8. Termination</h2>
                            <p className="text-slate-600 leading-relaxed">
                                We reserve the right to suspend or terminate your account if you violate these Terms or engage in activities that harm the platform or other users. You may also close your account at any time. Upon termination, your right to use the Services ceases immediately, and we may delete your account data after a reasonable retention period.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">9. Limitation of Liability</h2>
                            <p className="text-slate-600 leading-relaxed">
                                SnapTap is provided on an &quot;as is&quot; and &quot;as available&quot; basis. To the maximum extent permitted by law, SnapTap shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our Services. Our total liability shall not exceed the amount you have paid to us in the twelve (12) months preceding the claim.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">10. Changes to These Terms</h2>
                            <p className="text-slate-600 leading-relaxed">
                                We may revise these Terms from time to time. If we make material changes, we will notify you by updating the date at the top of this page or through other reasonable means. Your continued use of the Services after any changes constitutes your acceptance of the updated Terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">11. Contact Us</h2>
                            <p className="text-slate-600 leading-relaxed">
                                If you have any questions about these Terms of Service, please contact us at:
                            </p>
                            <a href="mailto:admin@snaptap.pk" className="inline-flex items-center gap-2 text-[#007cae] font-semibold mt-3 hover:underline transition">
                                <Icon icon="mdi:email-outline" width={20} />
                                admin@snaptap.pk
                            </a>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
