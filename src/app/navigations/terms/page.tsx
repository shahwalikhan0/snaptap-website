"use client";

import Navbar from "../../app/components/navbar";
import Footer from "../../app/components/footer";
import { Icon } from "@iconify/react";
import {
    JURISDICTION_CITY,
    LEGAL_BUSINESS_NAME,
    REGISTERED_ADDRESS,
    SUPPORT_EMAIL,
    SUPPORT_PHONE_PK,
} from "@/app/utils/site";

export default function TermsOfService() {
    return (
        <div className="bg-white min-h-screen font-sans text-slate-800">
            <Navbar />

            <main className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6 md:px-12 lg:px-24">
                <div className="max-w-4xl mx-auto">
                    {/* Page Header */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-brand bg-snaptap-blue-dark/10 flex items-center justify-center">
                                <Icon icon="mdi:file-document-outline" className="text-snaptap-blue-dark" width={24} />
                            </div>
                            <span className="text-sm font-semibold text-snaptap-blue-dark uppercase tracking-wider">Legal</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">Terms &amp; Conditions</h1>
                        <p className="text-slate-400 text-sm">Last updated: August 18, 2026</p>
                    </div>

                    {/*
                      Business identity block. Called out as a card rather than buried in
                      prose because payment-gateway review requires the legal name and the
                      registered address to be findable at a glance on this page.
                    */}
                    <div className="mb-12 rounded-brand border border-slate-200 bg-slate-50 p-6 sm:p-8">
                        <h2 className="text-lg font-bold text-slate-900 mb-5">Business Information</h2>
                        <dl className="space-y-4 text-sm">
                            <div className="flex flex-col sm:flex-row sm:gap-6">
                                <dt className="w-full sm:w-56 shrink-0 font-semibold text-slate-500">Registered business name</dt>
                                <dd className="text-slate-800 font-semibold">{LEGAL_BUSINESS_NAME}</dd>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:gap-6">
                                <dt className="w-full sm:w-56 shrink-0 font-semibold text-slate-500">Trading as</dt>
                                <dd className="text-slate-800">SnapTap (gosnaptap.com)</dd>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:gap-6">
                                <dt className="w-full sm:w-56 shrink-0 font-semibold text-slate-500">Registered office</dt>
                                <dd className="text-slate-800">{REGISTERED_ADDRESS}</dd>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:gap-6">
                                <dt className="w-full sm:w-56 shrink-0 font-semibold text-slate-500">Principal place of business</dt>
                                <dd className="text-slate-800">{REGISTERED_ADDRESS}</dd>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:gap-6">
                                <dt className="w-full sm:w-56 shrink-0 font-semibold text-slate-500">Customer service phone</dt>
                                <dd>
                                    <a href={`tel:${SUPPORT_PHONE_PK.tel}`} className="text-snaptap-blue-dark font-semibold hover:underline">
                                        {SUPPORT_PHONE_PK.display}
                                    </a>
                                </dd>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:gap-6">
                                <dt className="w-full sm:w-56 shrink-0 font-semibold text-slate-500">Customer service email</dt>
                                <dd>
                                    <a href={`mailto:${SUPPORT_EMAIL}`} className="text-snaptap-blue-dark font-semibold hover:underline">
                                        {SUPPORT_EMAIL}
                                    </a>
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* Content */}
                    <div className="space-y-10">
                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Introduction</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                This website and the SnapTap platform are owned and operated by {LEGAL_BUSINESS_NAME} (referred to throughout these Terms as &quot;{LEGAL_BUSINESS_NAME}&quot;, &quot;SnapTap&quot;, &quot;we&quot;, &quot;us&quot; and &quot;our&quot;). Our registered office is at {REGISTERED_ADDRESS}, and our principal place of business is located at the same address.
                            </p>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                We offer this website, including all information, tools, products and services available from it, to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                If you have any problems subscribing to a plan on our website, or require support after placing an order through our website, please contact us on{" "}
                                <a href={`tel:${SUPPORT_PHONE_PK.tel}`} className="text-snaptap-blue-dark font-semibold hover:underline">
                                    {SUPPORT_PHONE_PK.display}
                                </a>{" "}
                                or send us an email at{" "}
                                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-snaptap-blue-dark font-semibold hover:underline">
                                    {SUPPORT_EMAIL}
                                </a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Applicability &amp; Updates</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                By accessing or using SnapTap&apos;s website, mobile applications, or any of our services (collectively, the &quot;Services&quot;), you engage in our Service and agree to be bound by these Terms &amp; Conditions, including the additional policies referenced here or available by hyperlink. These Terms apply to all users of the site, without limitation to browsers, vendors, customers, merchants and contributors of content. If you do not agree to these Terms, you may not access or use our Services.
                            </p>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                In consideration of your use of our website and services, you represent that you are of legal age to form a binding contract and are not a person barred from receiving products and services under the laws of Pakistan or any other applicable jurisdiction.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                We may need to update these Terms from time to time. Each time you subscribe to or renew a plan on our website, you agree to the latest version of these Terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Description of Services</h2>
                            <p className="text-slate-600 leading-relaxed">
                                SnapTap provides a platform that allows businesses to create 3D augmented reality (AR) models of their products, publish them on our marketplace or embed them on their own websites, and enable end customers to visualize products in their real-world environment. Our Services include product scanning tools, 3D model generation, inventory management, AR viewer embedding, QR code generation, and related analytics. Our Services are delivered entirely digitally — we do not ship any physical goods.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Account Registration</h2>
                            <p className="text-slate-600 leading-relaxed">
                                To access certain features, you must create an account. You agree to provide accurate and complete information during registration and to keep your account credentials secure. You are responsible for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Subscriptions, Pricing &amp; Payments</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Some of our Services require a paid subscription. All plans, their scan quotas, and their prices are listed in full on our{" "}
                                <a href="/app/pricing" className="text-snaptap-blue-dark font-semibold hover:underline">Pricing page</a>{" "}
                                and are quoted in United States Dollars (USD) unless a different currency is displayed at checkout. Your monthly invoice consists of your plan&apos;s subscription fee plus any usage-based AR view charges accrued during the billing period at your plan&apos;s per-view rate.
                            </p>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                By selecting a subscription plan, you agree to pay the applicable fees. Subscription fees are billed on a recurring basis according to your chosen plan and are charged automatically to the payment method saved on your account. You may upgrade, downgrade, or cancel your subscription at any time from the Subscription page of your dashboard, subject to the conditions in our Refund &amp; Cancellation Policy.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                Card details are captured and stored by our PCI-compliant payment processor. We do not store your full card number on our own systems.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">6. Service Delivery, Cancellation &amp; Refunds</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Access to a paid plan is provisioned immediately once payment is confirmed; there is no physical shipment and therefore no delivery charge, whether local or international. You may cancel your subscription at any time, without a cancellation fee or notice period, from the Subscription page of your dashboard.
                            </p>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                <strong className="text-slate-800">Subscription fees and usage-based AR view charges are non-refundable.</strong> Because your plan is delivered immediately and consumed as you use it, we do not refund unused scan quota, a cancellation made part-way through a billing period, or a change of mind. Where we have charged you an amount we were never owed — a duplicate charge, a charge taken after a confirmed cancellation, a plan that was paid for but never provisioned, or an amount above your plan&apos;s published price — we reverse it in full. The full conditions, including turnaround times, are set out in our Refund &amp; Cancellation Policy, which forms part of these Terms.
                            </p>
                            <a
                                href="/navigations/refunds"
                                className="inline-flex items-center gap-2 text-snaptap-blue-dark font-semibold hover:underline transition"
                            >
                                <Icon icon="mdi:cash-refund" width={20} />
                                Read the Refund &amp; Cancellation Policy
                            </a>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">7. User Content &amp; Ownership</h2>
                            <p className="text-slate-600 leading-relaxed">
                                You retain ownership of all content you upload to SnapTap, including product images, 3D scan data, and generated AR models (&quot;User Content&quot;). By uploading content, you grant SnapTap a limited, non-exclusive license to process, store, and display your content solely for the purpose of providing our Services. We do not claim ownership over your User Content.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">8. Acceptable Use</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                You are prohibited from using this website, our Services, or their content for any unlawful purpose, to solicit others to perform unlawful acts, or to violate any international, federal, provincial or state laws, regulations and rules. In particular, you agree not to:
                            </p>
                            <ul className="space-y-3 text-slate-600">
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-snaptap-blue-dark mt-1 shrink-0" width={18} />
                                    <span>Upload content that is unlawful, infringing, harmful, obscene, or violates any third-party rights, including our intellectual property rights or those of others.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-snaptap-blue-dark mt-1 shrink-0" width={18} />
                                    <span>Harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate on the basis of gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-snaptap-blue-dark mt-1 shrink-0" width={18} />
                                    <span>Submit false or misleading information, including false registration or payment details.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-snaptap-blue-dark mt-1 shrink-0" width={18} />
                                    <span>Upload or transmit viruses or any other malicious code that may affect the functionality of the Service, or interfere with or circumvent its security features.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-snaptap-blue-dark mt-1 shrink-0" width={18} />
                                    <span>Collect or track the personal information of others, or spam, phish, pharm, pretext, spider, crawl or scrape our Services.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-snaptap-blue-dark mt-1 shrink-0" width={18} />
                                    <span>Attempt to reverse-engineer, decompile, or gain unauthorized access to any part of the platform, or interfere with its security, integrity or performance.</span>
                                </li>
                            </ul>
                            <p className="text-slate-600 leading-relaxed mt-4">
                                We reserve the right to terminate your use of the Service or any related website for violating any of these prohibited uses.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">9. Intellectual Property</h2>
                            <p className="text-slate-600 leading-relaxed">
                                All intellectual property rights in the SnapTap platform, including our software, branding, design, and technology (excluding User Content), are owned exclusively by {LEGAL_BUSINESS_NAME}. The structure, organization and code of the website and its related software contain valuable trade secrets and confidential information of {LEGAL_BUSINESS_NAME}. Except as expressly stated here, these Terms do not grant you any intellectual property rights in the website or its related software, and all rights are reserved by {LEGAL_BUSINESS_NAME}. You may not copy, modify, distribute, or create derivative works based on our platform without prior written consent.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">10. Termination</h2>
                            <p className="text-slate-600 leading-relaxed">
                                We may change or terminate your access to our products, services and this website, or any online membership with us, with or without notice, at any time, without liability to you, any other user or any third party. We reserve the right to terminate your access if, without limitation, you have: (1) provided us with false or misleading registration information; (2) interfered with other users or the administration of our services or websites; (3) been the subject of a request by law enforcement or other governmental authorities; or (4) otherwise violated these Terms. You may also close your account at any time. Upon termination, your right to use the Services ceases immediately, and we may delete your account data after a reasonable retention period.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">11. Indemnity &amp; Limitation of Liability</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                You agree to indemnify, defend and hold harmless {LEGAL_BUSINESS_NAME} and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees from any claim or demand, including reasonable attorneys&apos; fees, made by any third party arising out of your breach of these Terms or the documents they incorporate by reference, or your violation of any law or the rights of a third party.
                            </p>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                SnapTap is provided on an &quot;as is&quot; and &quot;as available&quot; basis. Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors, and we expressly exclude liability for them to the fullest extent permitted by law. Your use of any information or materials on this website is entirely at your own risk, and it is your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                To the extent permitted by law, we also disclaim all warranties, whether express or implied, including the implied warranties of merchantability, fitness for a particular purpose, title and non-infringement. To the maximum extent permitted by law, SnapTap shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our Services, and our total liability shall not exceed the amount you have paid to us in the twelve (12) months preceding the claim.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">12. Complaints &amp; Dispute Resolution</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                If you are unhappy with any aspect of our Services, please raise it with us first — most issues are resolved quickly and without cost to you. Email{" "}
                                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-snaptap-blue-dark font-semibold hover:underline">
                                    {SUPPORT_EMAIL}
                                </a>{" "}
                                or call{" "}
                                <a href={`tel:${SUPPORT_PHONE_PK.tel}`} className="text-snaptap-blue-dark font-semibold hover:underline">
                                    {SUPPORT_PHONE_PK.display}
                                </a>{" "}
                                with the word &quot;Complaint&quot; and your registered email address. We acknowledge every complaint within 2 business days and aim to resolve it within 7 business days; where an investigation takes longer, we will tell you why and give you a revised timeline.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                The full escalation path, including timelines, is set out in our{" "}
                                <a href="/navigations/refunds" className="text-snaptap-blue-dark font-semibold hover:underline">
                                    Refund &amp; Cancellation Policy
                                </a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">13. Severability &amp; Waiver</h2>
                            <p className="text-slate-600 leading-relaxed">
                                If any portion of these Terms is found to be unenforceable, the unenforceable portion will be deemed amended to the minimum extent necessary to make it enforceable, and if it cannot be made enforceable, it will be severed and the remaining portion will remain in full force and effect. If we fail to enforce any of these Terms, it will not be considered a waiver. Any amendment to or waiver of these Terms must be made in writing and signed by us.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">14. Governing Law &amp; Jurisdiction</h2>
                            <p className="text-slate-600 leading-relaxed">
                                These Terms &amp; Conditions are governed by and construed in accordance with the laws of the Islamic Republic of Pakistan. You agree that the courts of {JURISDICTION_CITY}, Pakistan (including any consumer court) will have exclusive jurisdiction over any dispute that you have with us.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">15. Changes to These Terms</h2>
                            <p className="text-slate-600 leading-relaxed">
                                We may revise these Terms from time to time. If we make material changes, we will notify you by updating the date at the top of this page or through other reasonable means. Your continued use of the Services after any changes constitutes your acceptance of the updated Terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">16. Contact Us</h2>
                            <p className="text-slate-600 leading-relaxed">
                                If you have any questions about these Terms &amp; Conditions, please contact {LEGAL_BUSINESS_NAME} at {REGISTERED_ADDRESS}, or reach us at:
                            </p>
                            <div className="flex flex-col gap-2 mt-3">
                                <a href={`mailto:${SUPPORT_EMAIL}`} className="inline-flex items-center gap-2 text-snaptap-blue-dark font-semibold hover:underline transition w-fit">
                                    <Icon icon="mdi:email-outline" width={20} />
                                    {SUPPORT_EMAIL}
                                </a>
                                <a href={`tel:${SUPPORT_PHONE_PK.tel}`} className="inline-flex items-center gap-2 text-snaptap-blue-dark font-semibold hover:underline transition w-fit">
                                    <Icon icon="mdi:phone-outline" width={20} />
                                    {SUPPORT_PHONE_PK.display}
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
