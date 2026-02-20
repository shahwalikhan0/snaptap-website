"use client";

import Navbar from "../../app/components/navbar";
import Footer from "../../app/components/footer";
import { Icon } from "@iconify/react";

export default function PrivacyPolicy() {
    return (
        <div className="bg-white min-h-screen font-sans text-slate-800">
            <Navbar />

            <main className="pt-32 pb-20 px-6 md:px-12 lg:px-24">
                <div className="max-w-4xl mx-auto">
                    {/* Page Header */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-[#007cae]/10 flex items-center justify-center">
                                <Icon icon="mdi:shield-lock-outline" className="text-[#007cae]" width={24} />
                            </div>
                            <span className="text-sm font-semibold text-[#007cae] uppercase tracking-wider">Legal</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
                        <p className="text-slate-400 text-sm">Last updated: February 20, 2026</p>
                    </div>

                    {/* Content */}
                    <div className="space-y-10">
                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Introduction</h2>
                            <p className="text-slate-600 leading-relaxed">
                                Welcome to SnapTap (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, including our website, mobile applications, and augmented reality (AR) services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Information We Collect</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                We may collect the following types of information when you interact with SnapTap:
                            </p>
                            <ul className="space-y-3 text-slate-600">
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-[#007cae] mt-1 shrink-0" width={18} />
                                    <span><strong>Account Information:</strong> Name, email address, business name, and login credentials when you register for an account.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-[#007cae] mt-1 shrink-0" width={18} />
                                    <span><strong>Product Data:</strong> Images, 3D scans, and metadata of products you upload to generate AR models.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-[#007cae] mt-1 shrink-0" width={18} />
                                    <span><strong>Usage Data:</strong> How you interact with our platform, including pages visited, features used, and session duration.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-[#007cae] mt-1 shrink-0" width={18} />
                                    <span><strong>Device &amp; Technical Data:</strong> IP address, browser type, operating system, and device identifiers.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-[#007cae] mt-1 shrink-0" width={18} />
                                    <span><strong>Payment Information:</strong> Billing details and transaction records processed through our secure payment providers.</span>
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. How We Use Your Information</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                We use the information we collect for the following purposes:
                            </p>
                            <ul className="space-y-3 text-slate-600">
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-[#007cae] mt-1 shrink-0" width={18} />
                                    <span>To provide and maintain our 3D scanning, AR model generation, and marketplace services.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-[#007cae] mt-1 shrink-0" width={18} />
                                    <span>To process your transactions and manage your subscription.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-[#007cae] mt-1 shrink-0" width={18} />
                                    <span>To improve, personalize, and expand our platform and services.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-[#007cae] mt-1 shrink-0" width={18} />
                                    <span>To communicate with you about updates, support, and promotional offers.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-[#007cae] mt-1 shrink-0" width={18} />
                                    <span>To detect, prevent, and address technical issues and security threats.</span>
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. 3D Scanning &amp; AR Data</h2>
                            <p className="text-slate-600 leading-relaxed">
                                When you use SnapTap to scan products and generate 3D AR models, the scan data (images and depth information) is processed on our servers solely for the purpose of creating your AR assets. We do not sell, share, or use your product scan data for any purpose other than delivering our services to you. You retain full ownership of your product data and 3D models.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Data Sharing &amp; Third Parties</h2>
                            <p className="text-slate-600 leading-relaxed">
                                We do not sell your personal information. We may share your data only with trusted service providers who assist us in operating our platform (e.g., cloud hosting, payment processing, analytics), and only to the extent necessary to provide our services. All third-party providers are bound by confidentiality obligations.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">6. Data Security</h2>
                            <p className="text-slate-600 leading-relaxed">
                                We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">7. Your Rights</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Depending on your location, you may have the following rights regarding your personal data:
                            </p>
                            <ul className="space-y-3 text-slate-600">
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-[#007cae] mt-1 shrink-0" width={18} />
                                    <span>The right to access, update, or delete your personal information.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-[#007cae] mt-1 shrink-0" width={18} />
                                    <span>The right to object to or restrict the processing of your data.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-[#007cae] mt-1 shrink-0" width={18} />
                                    <span>The right to data portability.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-[#007cae] mt-1 shrink-0" width={18} />
                                    <span>The right to withdraw consent at any time.</span>
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">8. Changes to This Policy</h2>
                            <p className="text-slate-600 leading-relaxed">
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this policy periodically.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">9. Contact Us</h2>
                            <p className="text-slate-600 leading-relaxed">
                                If you have any questions or concerns about this Privacy Policy, please contact us at:
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
