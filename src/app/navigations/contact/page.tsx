"use client";

import { useState } from "react";
import Navbar from "../../app/components/navbar";
import Footer from "../../app/components/footer";
import { Icon } from "@iconify/react";
import { SUPPORT_EMAIL } from "@/app/utils/site";
import {
  Button,
  Card,
  Input,
  Select,
  Textarea,
  type SelectOption,
} from "@/app/app/components/ui";

const CONTACT_SUBJECTS: SelectOption[] = [
  { value: "General Inquiry", label: "General Inquiry" },
  { value: "Technical Support", label: "Technical Support" },
  { value: "Bug Report", label: "Bug Report / Issue" },
  { value: "Feature Request", label: "Feature Request" },
  { value: "Partnership", label: "Partnership" },
  { value: "Billing", label: "Billing & Subscription" },
  { value: "Other", label: "Other" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build mailto link with form data
    const mailtoSubject = encodeURIComponent(
      formData.subject || "Contact from Website",
    );
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`,
    );
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;
    setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen font-sans text-slate-800">
      <Navbar />

      <main className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="w-10 h-10 rounded-brand bg-snaptap-blue-dark/10 flex items-center justify-center">
                <Icon
                  icon="mdi:email-fast-outline"
                  className="text-snaptap-blue-dark"
                  width={24}
                />
              </div>
              <span className="text-sm font-semibold text-snaptap-blue-dark uppercase tracking-wider">
                Get in Touch
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Have questions, feedback, or need support? We&apos;d love to hear
              from you. Reach out and our team will get back to you as soon as
              possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
            {/* Contact Info Cards */}
            <div className="md:col-span-1 space-y-6">
              {/* Email */}
              <div className="bg-slate-50 rounded-brand p-6 border border-slate-100">
                <div className="w-10 h-10 rounded-brand bg-snaptap-blue-dark/10 flex items-center justify-center mb-4">
                  <Icon
                    icon="mdi:email-outline"
                    className="text-snaptap-blue-dark"
                    width={22}
                  />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="text-snaptap-blue-dark hover:underline text-sm"
                >
                  {SUPPORT_EMAIL}
                </a>
              </div>

              {/* Phone - Pakistan */}
              <div className="bg-slate-50 rounded-brand p-6 border border-slate-100">
                <div className="w-10 h-10 rounded-brand bg-snaptap-blue-dark/10 flex items-center justify-center mb-4">
                  <Icon
                    icon="mdi:phone-outline"
                    className="text-snaptap-blue-dark"
                    width={22}
                  />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">
                  🇵🇰 Phone (Pakistan)
                </h3>
                <a
                  href="tel:+923001234567"
                  className="text-snaptap-blue-dark hover:underline text-sm"
                >
                  +92 342 44 97829
                </a>
              </div>

              {/* Phone - USA */}
              <div className="bg-slate-50 rounded-brand p-6 border border-slate-100">
                <div className="w-10 h-10 rounded-brand bg-snaptap-blue-dark/10 flex items-center justify-center mb-4">
                  <Icon
                    icon="mdi:phone-outline"
                    className="text-snaptap-blue-dark"
                    width={22}
                  />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">
                  🇺🇸 Phone (USA)
                </h3>
                <a
                  href="tel:+13029813030"
                  className="text-snaptap-blue-dark hover:underline text-sm"
                >
                  +1 (302) 981-3030
                </a>
              </div>

              {/* Social */}
              <div className="bg-slate-50 rounded-brand p-6 border border-slate-100">
                <div className="w-10 h-10 rounded-brand bg-snaptap-blue-dark/10 flex items-center justify-center mb-4">
                  <Icon
                    icon="mdi:instagram"
                    className="text-snaptap-blue-dark"
                    width={22}
                  />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">Follow Us</h3>
                <a
                  href="https://www.instagram.com/gosnaptap/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-snaptap-blue-dark hover:underline text-sm"
                >
                  @gosnaptap
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <Card variant="raised" padding="none" className="p-5 sm:p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Send us a Message
                </h2>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-brand bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <Icon
                        icon="mdi:check-circle"
                        className="text-green-500"
                        width={36}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      Email client opened!
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Your default email app should have opened with the message
                      pre-filled. If it didn&apos;t open, please email us
                      directly at{" "}
                      <a
                        href={`mailto:${SUPPORT_EMAIL}`}
                        className="text-snaptap-blue-dark font-semibold hover:underline"
                      >
                        {SUPPORT_EMAIL}
                      </a>
                      .
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-snaptap-blue-dark font-semibold hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label="Your Name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                      />
                      <Input
                        label="Your Email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                      />
                    </div>

                    <Select
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Select a topic"
                      options={CONTACT_SUBJECTS}
                    />

                    <Textarea
                      label="Message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                    />

                    <Button type="submit" fullWidth>
                      Send Message
                    </Button>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
