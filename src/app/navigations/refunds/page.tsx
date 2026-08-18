"use client";

import Navbar from "../../app/components/navbar";
import Footer from "../../app/components/footer";
import { Icon } from "@iconify/react";
import {
    LEGAL_BUSINESS_NAME,
    REGISTERED_ADDRESS,
    SUPPORT_EMAIL,
    SUPPORT_PHONE_PK,
} from "@/app/utils/site";

/** The turnaround commitments, kept in one place so the prose and the summary
 *  cards can never quote different numbers. */
const TURNAROUND = [
    {
        icon: "mdi:lightning-bolt-outline",
        label: "Plan activation",
        value: "Immediate",
        note: "No shipment — access is provisioned as soon as payment is confirmed.",
    },
    {
        icon: "mdi:email-check-outline",
        label: "Billing issue reviewed",
        value: "3 business days",
        note: "We confirm in writing whether a charge was taken in error.",
    },
    {
        icon: "mdi:cash-refund",
        label: "Erroneous charge reversed",
        value: "7–10 business days",
        note: "Returned to the original payment method.",
    },
];

export default function RefundPolicy() {
    return (
        <div className="bg-white min-h-screen font-sans text-slate-800">
            <Navbar />

            <main className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6 md:px-12 lg:px-24">
                <div className="max-w-4xl mx-auto">
                    {/* Page Header */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-brand bg-snaptap-blue-dark/10 flex items-center justify-center">
                                <Icon icon="mdi:cash-refund" className="text-snaptap-blue-dark" width={24} />
                            </div>
                            <span className="text-sm font-semibold text-snaptap-blue-dark uppercase tracking-wider">Legal</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">Refund &amp; Cancellation Policy</h1>
                        <p className="text-slate-400 text-sm">Last updated: August 18, 2026</p>
                    </div>

                    {/* Turnaround summary — the numbers a customer (or a payment
                        gateway reviewer) is looking for, above the fold. */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                        {TURNAROUND.map((t) => (
                            <div key={t.label} className="rounded-brand border border-slate-200 bg-slate-50 p-5">
                                <Icon icon={t.icon} className="text-snaptap-blue-dark mb-3" width={22} />
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t.label}</p>
                                <p className="text-lg font-bold text-slate-900 mb-2">{t.value}</p>
                                <p className="text-xs text-slate-500 leading-relaxed">{t.note}</p>
                            </div>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="space-y-10">
                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Scope of This Policy</h2>
                            <p className="text-slate-600 leading-relaxed">
                                This policy explains how subscriptions to SnapTap, operated by {LEGAL_BUSINESS_NAME}, are delivered, cancelled and refunded. It forms part of our{" "}
                                <a href="/navigations/terms" className="text-snaptap-blue-dark font-semibold hover:underline">Terms &amp; Conditions</a>{" "}
                                and applies to every paid plan listed on our{" "}
                                <a href="/app/pricing" className="text-snaptap-blue-dark font-semibold hover:underline">Pricing page</a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Service Delivery &amp; Shipping</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                SnapTap is a software-as-a-service platform. Everything we sell — scan quota, 3D model processing, AR hosting, QR codes and analytics — is delivered digitally through your account. <strong className="text-slate-800">We do not ship physical goods, so no local or international shipping charges, customs duties or delivery timelines apply.</strong>
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                Your plan is activated immediately once your payment is confirmed, and your scan quota becomes available in the dashboard right away. Individual product scans are typically processed into an AR-ready model within 1–5 minutes of upload. If our processing pipeline fails at any step, the product is removed automatically and your scan quota is <strong className="text-slate-800">not</strong> decremented, so a failed scan never costs you quota.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Cancelling Your Subscription</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                You can cancel at any time, with no cancellation fee and no notice period. Go to <strong className="text-slate-800">Subscription &rarr; Change Plan</strong> in your dashboard and choose <strong className="text-slate-800">Cancel Subscription</strong>. You will be asked to re-enter your password to confirm.
                            </p>
                            <ul className="space-y-3 text-slate-600">
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-snaptap-blue-dark mt-1 shrink-0" width={18} />
                                    <span>Cancellation takes effect immediately. Your plan is removed, your remaining scan quota is forfeited, and recurring billing stops — you will not be charged again. Cancelling part-way through a billing period does not refund that period; see section 4.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-snaptap-blue-dark mt-1 shrink-0" width={18} />
                                    <span><strong className="text-slate-800">All of your active and inactive products are permanently deleted on cancellation</strong>, and the QR codes printed for them will stop working. Please export anything you need before cancelling — this cannot be undone.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-snaptap-blue-dark mt-1 shrink-0" width={18} />
                                    <span>Any invoice already outstanding — your plan fee and AR view charges accrued up to the moment of cancellation — must be settled before the cancellation can complete.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:chevron-right" className="text-snaptap-blue-dark mt-1 shrink-0" width={18} />
                                    <span>You may also downgrade instead of cancelling, provided your current product count fits within the smaller plan&apos;s quota. Downgrading keeps your products and your QR codes intact.</span>
                                </li>
                            </ul>
                            <p className="text-slate-600 leading-relaxed mt-4">
                                If you would rather not do this yourself, email{" "}
                                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-snaptap-blue-dark font-semibold hover:underline">{SUPPORT_EMAIL}</a>{" "}
                                from your registered address and we will action the cancellation for you within 2 business days.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Refunds</h2>
                            <div className="rounded-brand border border-slate-200 bg-slate-50 p-5 sm:p-6 mb-6">
                                <p className="text-slate-700 leading-relaxed">
                                    <strong className="text-slate-900">Subscription fees and usage-based AR view charges are non-refundable.</strong> Your plan is provisioned the moment payment is confirmed and is consumed as you use it, so we do not issue refunds for a change of mind, for scan quota you did not use, or for cancelling part-way through a billing period.
                                </p>
                            </div>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                In particular, no refund is due where you cancel or downgrade mid-period, where you decide the platform is not a fit after using it, where a scan you uploaded did not meet your expectations, or where your account has been terminated for a breach of our{" "}
                                <a href="/navigations/terms" className="text-snaptap-blue-dark font-semibold hover:underline">Terms &amp; Conditions</a>. Upgrading and downgrading between plans is the intended way to adjust what you pay.
                            </p>

                            <h3 className="text-lg font-bold text-slate-800 mt-8 mb-3">Correction of erroneous charges</h3>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Separately from the above, if we take money we were never owed, we give it back. These are billing corrections rather than refunds of a delivered service, and we reverse them in full:
                            </p>
                            <ul className="space-y-3 text-slate-600">
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:check-circle-outline" className="text-emerald-600 mt-1 shrink-0" width={18} />
                                    <span><strong className="text-slate-800">Duplicate or double charge</strong> — the same invoice charged more than once.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:check-circle-outline" className="text-emerald-600 mt-1 shrink-0" width={18} />
                                    <span><strong className="text-slate-800">Charge after cancellation</strong> — any amount billed after we confirmed your cancellation.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:check-circle-outline" className="text-emerald-600 mt-1 shrink-0" width={18} />
                                    <span><strong className="text-slate-800">Plan never provisioned</strong> — a payment succeeded but the plan was never activated on your account, so nothing was delivered to you.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:check-circle-outline" className="text-emerald-600 mt-1 shrink-0" width={18} />
                                    <span><strong className="text-slate-800">Overcharge</strong> — any amount taken above the published price of your plan or your plan&apos;s stated per-view rate.</span>
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Returns &amp; Exchanges</h2>
                            <p className="text-slate-600 leading-relaxed">
                                As no physical product changes hands, there is nothing to return or exchange. The closest equivalent is a plan change: you can upgrade or downgrade your plan at any time from the Subscription page, and the difference is reflected on your next invoice. A 3D model itself cannot be exchanged in place — to replace one, delete the product and upload a fresh scan.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">6. How to Report a Charge You Believe Is Wrong</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Email{" "}
                                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-snaptap-blue-dark font-semibold hover:underline">{SUPPORT_EMAIL}</a>{" "}
                                from your registered email address with the subject line <strong className="text-slate-800">&quot;Billing query&quot;</strong>, and include your registered business name, the invoice number or the date and amount of the charge, and a short description of what looks wrong. You can also call{" "}
                                <a href={`tel:${SUPPORT_PHONE_PK.tel}`} className="text-snaptap-blue-dark font-semibold hover:underline">{SUPPORT_PHONE_PK.display}</a>{" "}
                                during business hours (Monday–Saturday, 10:00–19:00 PKT).
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                We investigate every query and reply in writing <strong className="text-slate-800">within 3 business days</strong>. Where we confirm a charge was taken in error, the reversal is issued to the original payment method used for that charge and normally reaches you <strong className="text-slate-800">within 7–10 business days</strong>, depending on your bank or card issuer. We cannot pay to a different card, account or wallet than the one charged. Amounts are returned in the currency of the original transaction; any difference caused by exchange-rate movement or bank charges is outside our control.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">7. Complaints Handling</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                If something has gone wrong — a billing issue, a refund you disagree with, or the quality of the Service — raise it with us directly and we will work through it with you.
                            </p>
                            <ul className="space-y-3 text-slate-600">
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:numeric-1-circle-outline" className="text-snaptap-blue-dark mt-1 shrink-0" width={18} />
                                    <span>Email{" "}
                                        <a href={`mailto:${SUPPORT_EMAIL}`} className="text-snaptap-blue-dark font-semibold hover:underline">{SUPPORT_EMAIL}</a>{" "}
                                        or call{" "}
                                        <a href={`tel:${SUPPORT_PHONE_PK.tel}`} className="text-snaptap-blue-dark font-semibold hover:underline">{SUPPORT_PHONE_PK.display}</a>. We acknowledge every complaint <strong className="text-slate-800">within 2 business days</strong>.
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:numeric-2-circle-outline" className="text-snaptap-blue-dark mt-1 shrink-0" width={18} />
                                    <span>We investigate and aim to give you a final answer <strong className="text-slate-800">within 7 business days</strong> of acknowledgement.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:numeric-3-circle-outline" className="text-snaptap-blue-dark mt-1 shrink-0" width={18} />
                                    <span>If an investigation needs longer — for example, when a bank or payment processor is involved — we tell you why and give you a revised date, and we keep you updated at least once a week until it is closed.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon icon="mdi:numeric-4-circle-outline" className="text-snaptap-blue-dark mt-1 shrink-0" width={18} />
                                    <span>Still unresolved? Write to {LEGAL_BUSINESS_NAME} at {REGISTERED_ADDRESS} marking your letter &quot;Escalation&quot;. Any remaining dispute is governed by the laws of the Islamic Republic of Pakistan, as set out in our Terms &amp; Conditions.</span>
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">8. Chargebacks</h2>
                            <p className="text-slate-600 leading-relaxed">
                                Please contact us before raising a chargeback with your bank — we can almost always resolve a billing issue faster and directly. Where a chargeback is raised without contacting us first, we may suspend the account until the dispute is settled with the payment processor.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">9. Contact Us</h2>
                            <p className="text-slate-600 leading-relaxed">
                                {LEGAL_BUSINESS_NAME} &middot; {REGISTERED_ADDRESS}
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
