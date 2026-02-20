"use client";

import { useState } from "react";
import Navbar from "../../app/components/navbar";
import Footer from "../../app/components/footer";
import { Icon } from "@iconify/react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Build mailto link with form data
        const mailtoSubject = encodeURIComponent(formData.subject || "Contact from Website");
        const mailtoBody = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
        );
        window.location.href = `mailto:admin@snaptap.pk?subject=${mailtoSubject}&body=${mailtoBody}`;
        setSubmitted(true);
    };

    return (
        <div className="bg-white min-h-screen font-sans text-slate-800">
            <Navbar />

            <main className="pt-32 pb-20 px-6 md:px-12 lg:px-24">
                <div className="max-w-5xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-16">
                        <div className="flex items-center gap-3 justify-center mb-4">
                            <div className="w-10 h-10 rounded-xl bg-[#007cae]/10 flex items-center justify-center">
                                <Icon icon="mdi:email-fast-outline" className="text-[#007cae]" width={24} />
                            </div>
                            <span className="text-sm font-semibold text-[#007cae] uppercase tracking-wider">Get in Touch</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Contact Us</h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Have questions, feedback, or need support? We&apos;d love to hear from you. Reach out and our team will get back to you as soon as possible.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Contact Info Cards */}
                        <div className="md:col-span-1 space-y-6">
                            {/* Email */}
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                <div className="w-10 h-10 rounded-xl bg-[#007cae]/10 flex items-center justify-center mb-4">
                                    <Icon icon="mdi:email-outline" className="text-[#007cae]" width={22} />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                                <a href="mailto:admin@snaptap.pk" className="text-[#007cae] hover:underline text-sm">
                                    admin@snaptap.pk
                                </a>
                            </div>

                            {/* Phone - Pakistan */}
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                <div className="w-10 h-10 rounded-xl bg-[#007cae]/10 flex items-center justify-center mb-4">
                                    <Icon icon="mdi:phone-outline" className="text-[#007cae]" width={22} />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-1">🇵🇰 Phone (Pakistan)</h3>
                                <a href="tel:+923001234567" className="text-[#007cae] hover:underline text-sm">
                                    +92 300 123 4567
                                </a>
                            </div>

                            {/* Phone - USA */}
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                <div className="w-10 h-10 rounded-xl bg-[#007cae]/10 flex items-center justify-center mb-4">
                                    <Icon icon="mdi:phone-outline" className="text-[#007cae]" width={22} />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-1">🇺🇸 Phone (USA)</h3>
                                <a href="tel:+12125551234" className="text-[#007cae] hover:underline text-sm">
                                    +1 (212) 555-1234
                                </a>
                            </div>

                            {/* Social */}
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                <div className="w-10 h-10 rounded-xl bg-[#007cae]/10 flex items-center justify-center mb-4">
                                    <Icon icon="mdi:instagram" className="text-[#007cae]" width={22} />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-1">Follow Us</h3>
                                <a
                                    href="https://www.instagram.com/snaptappk/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#007cae] hover:underline text-sm"
                                >
                                    @snaptappk
                                </a>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="md:col-span-2">
                            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>

                                {submitted ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                            <Icon icon="mdi:check-circle" className="text-green-500" width={36} />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">Email client opened!</h3>
                                        <p className="text-slate-600 mb-4">
                                            Your default email app should have opened with the message pre-filled. If it didn&apos;t open, please email us directly at{" "}
                                            <a href="mailto:admin@snaptap.pk" className="text-[#007cae] font-semibold hover:underline">admin@snaptap.pk</a>.
                                        </p>
                                        <button
                                            onClick={() => setSubmitted(false)}
                                            className="text-[#007cae] font-semibold hover:underline"
                                        >
                                            Send another message
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">
                                                    Your Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="John Doe"
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#007cae] focus:ring-2 focus:ring-[#007cae]/20 outline-none transition text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                                                    Your Email
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="john@example.com"
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#007cae] focus:ring-2 focus:ring-[#007cae]/20 outline-none transition text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-1.5">
                                                Subject
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#007cae] focus:ring-2 focus:ring-[#007cae]/20 outline-none transition text-sm bg-white"
                                            >
                                                <option value="">Select a topic</option>
                                                <option value="General Inquiry">General Inquiry</option>
                                                <option value="Technical Support">Technical Support</option>
                                                <option value="Bug Report">Bug Report / Issue</option>
                                                <option value="Feature Request">Feature Request</option>
                                                <option value="Partnership">Partnership</option>
                                                <option value="Billing">Billing &amp; Subscription</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1.5">
                                                Message
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={5}
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Tell us how we can help..."
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#007cae] focus:ring-2 focus:ring-[#007cae]/20 outline-none transition text-sm resize-none"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-[#007cae] text-white font-semibold py-3.5 rounded-full hover:bg-[#006080] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                        >
                                            Send Message
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
