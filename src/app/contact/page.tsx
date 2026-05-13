"use client";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import { Flourish } from "@/components/Ornaments";
import { api } from "@/lib/api";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { useContent } from "@/lib/content";

export default function ContactPage() {
  const c = useContent();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    interest: "cardamom",
    message: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Save to Google Sheets
    await api.saveContactMessage({
      name:    form.name,
      email:   form.email,
      phone:   form.phone,
      subject: `Enquiry: ${form.interest}${form.company ? ` — ${form.company}` : ""}`,
      message: form.message,
    });

    // Redirect to WhatsApp with enquiry details
    const msg = `🌿 *Enquiry — Ila Gold Spices*\n\nName: ${form.name}${form.company ? `\nCompany: ${form.company}` : ""}\nEmail: ${form.email}${form.phone ? `\nPhone: ${form.phone}` : ""}\nProduct: ${form.interest}\n\nMessage:\n${form.message}`;
    window.open(getWhatsAppLink(msg), "_blank");
    setSubmitted(true);
  };

  const registeredLines = c("company_address_registered", "15 Park Street\nCoventry CV6 5AT\nUnited Kingdom").split("\n");
  const tradingLines = c("company_address_trading", "4 Maycroft Garden\nGrays RM17 6BH\nUnited Kingdom").split("\n");
  const phoneRaw = c("company_phone_raw", "447733058067");
  const phoneDisplay = c("company_phone_display", "+44 7733 058 067");
  const email = c("company_email", "aavglobaltraders@gmail.com");
  const whatsapp = c("company_whatsapp", "447733058067");

  return (
    <>
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-20 bg-hero-gradient grain overflow-hidden">
        <div className="absolute inset-0 pattern-arabesque opacity-40" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <div className="eyebrow text-gold-700 mb-5 animate-fade-up">
              {c("contact_hero_eyebrow", "Let's talk")}
            </div>
            <h1
              className="font-display text-5xl sm:text-6xl lg:text-8xl text-forest-700 leading-[0.98] animate-fade-up"
              style={{ animationDelay: "150ms" }}
            >
              {c("contact_hero_headline", "Samples, prices, conversations.")}
            </h1>
            <p
              className="mt-8 text-xl text-forest-700/80 leading-relaxed max-w-2xl animate-fade-up"
              style={{ animationDelay: "300ms" }}
            >
              {c("contact_hero_description", "We aim to reply to all messages within 1–2 working days. For urgent wholesale enquiries, please message us directly on WhatsApp.")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-cream-100 grain">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Contact details */}
          <Reveal className="lg:col-span-5">
            <div className="bg-forest-700 text-cream-200 p-10 h-full relative overflow-hidden">
              <div className="absolute inset-0 pattern-arabesque opacity-30" />
              <div className="relative">
                <div className="eyebrow text-gold-500 mb-5">Reach us</div>
                <h2 className="font-display text-3xl lg:text-4xl text-gold-200 leading-tight mb-10">
                  {c("company_name", "AAV Global Traders Ltd")}
                </h2>

                <div className="space-y-6 text-sm">
                  <ContactRow label="Registered office">
                    {registeredLines.map((line, i) => (
                      <span key={i}>{line}{i < registeredLines.length - 1 && <br />}</span>
                    ))}
                  </ContactRow>
                  <ContactRow label="Trading address">
                    {tradingLines.map((line, i) => (
                      <span key={i}>{line}{i < tradingLines.length - 1 && <br />}</span>
                    ))}
                  </ContactRow>
                  <ContactRow label="Telephone · WhatsApp">
                    <a
                      href={`tel:+${phoneRaw}`}
                      className="hover:text-gold-300 transition-colors"
                    >
                      {phoneDisplay}
                    </a>
                  </ContactRow>
                  <ContactRow label="Email">
                    <a
                      href={`mailto:${email}`}
                      className="hover:text-gold-300 transition-colors break-all"
                    >
                      {email}
                    </a>
                  </ContactRow>
                </div>

                <div className="mt-10 pt-6 border-t border-gold-500/30">
                  <div className="eyebrow text-gold-500 mb-3">Registration</div>
                  <div className="space-y-1 text-sm text-cream-200/85">
                    <div>Company No. {c("company_no", "16881661")}</div>
                    <div>EORI {c("company_eori", "GB045558502000")}</div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${whatsapp}`}
                  className="mt-10 inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-forest-700 text-[0.75rem] tracking-[0.15em] uppercase font-medium hover:bg-gold-400 transition-colors"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
                    <path d="M20.52 3.449A11.9 11.9 0 0012.05 0C5.495 0 .16 5.335.16 11.89c0 2.096.547 4.142 1.588 5.945L.057 24l6.304-1.654a11.87 11.87 0 005.69 1.448h.005c6.555 0 11.89-5.335 11.89-11.89a11.82 11.82 0 00-3.426-8.455zm-8.47 18.29h-.004a9.87 9.87 0 01-5.03-1.378l-.36-.214-3.74.981 1-3.647-.235-.374a9.86 9.86 0 01-1.511-5.217c0-5.45 4.436-9.884 9.886-9.884a9.86 9.86 0 019.88 9.892c-.002 5.45-4.437 9.84-9.886 9.84z" />
                  </svg>
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal className="lg:col-span-7" delay={150}>
            {submitted ? (
              <div className="bg-cream-50 border border-gold-500/40 p-12 text-center">
                <Flourish className="w-24 h-6 text-gold-500 mx-auto mb-6" />
                <h3 className="font-display text-3xl text-forest-700 mb-4">
                  Thank you.
                </h3>
                <p className="text-forest-700/80">
                  Your enquiry has been saved and sent to our WhatsApp. We'll reply within 1–2 working days.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="eyebrow text-gold-700 mb-2">Enquiry form</div>
                <h2 className="font-display text-4xl lg:text-5xl text-forest-700 leading-tight mb-6">
                  Tell us what
                  <br />
                  <span className="italic text-gold-700">you need.</span>
                </h2>

                <div className="grid sm:grid-cols-2 gap-6">
                  <Field label="Name" name="name" value={form.name} onChange={onChange} required />
                  <Field label="Company" name="company" value={form.company} onChange={onChange} />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    required
                  />
                  <Field
                    label="Phone / WhatsApp"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={onChange}
                  />
                </div>

                <div>
                  <label className="eyebrow text-forest-700/70 block mb-2">
                    Product interest
                  </label>
                  <select
                    name="interest"
                    value={form.interest}
                    onChange={onChange}
                    className="w-full bg-transparent border-b border-forest-700/30 py-3 px-1 focus:border-gold-700 focus:outline-none text-forest-700"
                  >
                    <option value="cardamom">Cardamom (whole / ground)</option>
                    <option value="pepper">Black pepper</option>
                    <option value="cashew">Cashew nuts</option>
                    <option value="mixed-nuts">Mixed nuts</option>
                    <option value="dates">Dates</option>
                    <option value="private-label">Private-label project</option>
                    <option value="other">Other / multiple</option>
                  </select>
                </div>

                <div>
                  <label className="eyebrow text-forest-700/70 block mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    required
                    rows={5}
                    placeholder="Approximate volumes, target market, any specific requirements…"
                    className="w-full bg-transparent border-b border-forest-700/30 py-3 px-1 focus:border-gold-700 focus:outline-none text-forest-700 placeholder:text-forest-700/40 resize-none"
                  />
                </div>

                <button type="submit" className="btn-primary">
                  Send enquiry
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
                    <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
                  </svg>
                </button>
                <p className="text-xs text-forest-700/50">
                  Submitting will open your email client with a pre-filled message.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  ...props
}: {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="eyebrow text-forest-700/70 block mb-2">{label}</label>
      <input
        {...props}
        className="w-full bg-transparent border-b border-forest-700/30 py-3 px-1 focus:border-gold-700 focus:outline-none text-forest-700"
      />
    </div>
  );
}

function ContactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="eyebrow text-gold-500/80 mb-2">{label}</div>
      <div className="text-cream-100 leading-relaxed">{children}</div>
    </div>
  );
}
