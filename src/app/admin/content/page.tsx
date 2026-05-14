"use client";
import { useEffect, useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/admin/Sidebar";
import { api } from "@/lib/api";

type FieldType = "text" | "textarea" | "json";

interface Field {
  key: string;
  label: string;
  type: FieldType;
}

interface Section {
  id: string;
  label: string;
  fields: Field[];
}

const SCHEMA: Section[] = [
  {
    id: "settings", label: "⚙️ Company Settings",
    fields: [
      { key: "company_name",               label: "Company Name",             type: "text" },
      { key: "company_email",              label: "Email Address",            type: "text" },
      { key: "company_phone_display",      label: "Phone (displayed)",        type: "text" },
      { key: "company_phone_raw",          label: "Phone for links (no + prefix)", type: "text" },
      { key: "company_whatsapp",           label: "WhatsApp number (no +)",   type: "text" },
      { key: "company_address_registered", label: "Registered Office Address", type: "textarea" },
      { key: "company_address_trading",    label: "Trading Address",          type: "textarea" },
      { key: "company_no",                 label: "Company Number",           type: "text" },
      { key: "company_eori",               label: "EORI Number",              type: "text" },
      { key: "company_fssai",              label: "FSSAI Licence Number",     type: "text" },
    ],
  },
  {
    id: "home", label: "🏠 Homepage",
    fields: [
      { key: "home_hero_eyebrow",        label: "Hero Eyebrow",             type: "text" },
      { key: "home_hero_headline",       label: "Hero Headline",            type: "textarea" },
      { key: "home_hero_description",    label: "Hero Description",         type: "textarea" },
      { key: "home_story_eyebrow",       label: "Story Image Eyebrow",      type: "text" },
      { key: "home_story_headline",      label: "Story Image Headline",     type: "textarea" },
      { key: "home_story_quote",         label: "Story Image Quote",        type: "textarea" },
      { key: "home_about_eyebrow",       label: "About Section Eyebrow",    type: "text" },
      { key: "home_about_headline",      label: "About Section Headline",   type: "textarea" },
      { key: "home_about_para1",         label: "About Paragraph 1",        type: "textarea" },
      { key: "home_about_para2",         label: "About Paragraph 2",        type: "textarea" },
      { key: "home_quality_eyebrow",     label: "Quality Section Eyebrow",  type: "text" },
      { key: "home_quality_headline",    label: "Quality Section Headline", type: "textarea" },
      { key: "home_quality_description", label: "Quality Section Description", type: "textarea" },
      { key: "home_quality_pillars",     label: "Quality Pillars (JSON array: [{title, body}])", type: "json" },
      { key: "home_who_eyebrow",         label: "Who We Supply Eyebrow",    type: "text" },
      { key: "home_who_headline",        label: "Who We Supply Headline",   type: "textarea" },
      { key: "home_who_supply",          label: "Who We Supply List (JSON array of strings)", type: "json" },
      { key: "home_cta_headline",        label: "CTA Section Headline",     type: "textarea" },
      { key: "home_cta_description",     label: "CTA Section Description",  type: "textarea" },
      { key: "home_video_url",           label: "YouTube Video URL (leave blank to hide video section)", type: "text" },
      { key: "home_video_eyebrow",       label: "Video Section Eyebrow",    type: "text" },
      { key: "home_video_headline",      label: "Video Section Headline",   type: "textarea" },
    ],
  },
  {
    id: "about", label: "👤 About Page",
    fields: [
      { key: "about_hero_eyebrow",     label: "Hero Eyebrow",          type: "text" },
      { key: "about_hero_headline",    label: "Hero Headline",         type: "textarea" },
      { key: "about_hero_description", label: "Hero Description",      type: "textarea" },
      { key: "about_founder_name",     label: "Founder First Name",    type: "text" },
      { key: "about_founder_surname",  label: "Founder Surname",       type: "text" },
      { key: "about_founder_title",    label: "Founder Title",         type: "text" },
      { key: "about_story_para1",      label: "Story Paragraph 1",     type: "textarea" },
      { key: "about_story_para2",      label: "Story Paragraph 2",     type: "textarea" },
      { key: "about_values_headline",  label: "Values Headline",       type: "text" },
      { key: "about_values",           label: "Values (JSON array: [{title, body}])", type: "json" },
      { key: "about_cta_headline",     label: "CTA Headline",          type: "textarea" },
    ],
  },
  {
    id: "quality", label: "✅ Quality Page",
    fields: [
      { key: "quality_hero_eyebrow",     label: "Hero Eyebrow",                type: "text" },
      { key: "quality_hero_headline",    label: "Hero Headline",               type: "textarea" },
      { key: "quality_hero_description", label: "Hero Description",            type: "textarea" },
      { key: "quality_pillars",          label: "Quality Pillars (JSON array: [{title, image, headline, body:[], details:[]}])", type: "json" },
      { key: "quality_certs_eyebrow",    label: "Certifications Eyebrow",      type: "text" },
      { key: "quality_certs_headline",   label: "Certifications Headline",     type: "textarea" },
      { key: "quality_certs",            label: "Certifications (JSON array: [{title, body}])", type: "json" },
      { key: "quality_certs_note",       label: "Certifications Disclaimer",   type: "textarea" },
      { key: "quality_cta_headline",     label: "CTA Headline",                type: "textarea" },
      { key: "quality_cta_description",  label: "CTA Description",             type: "textarea" },
    ],
  },
  {
    id: "contact", label: "📧 Contact Page",
    fields: [
      { key: "contact_hero_eyebrow",     label: "Hero Eyebrow",    type: "text" },
      { key: "contact_hero_headline",    label: "Hero Headline",   type: "textarea" },
      { key: "contact_hero_description", label: "Hero Description", type: "textarea" },
    ],
  },
  {
    id: "order", label: "📦 How to Order Page",
    fields: [
      { key: "order_hero_eyebrow",         label: "Hero Eyebrow",              type: "text" },
      { key: "order_hero_headline",        label: "Hero Headline",             type: "textarea" },
      { key: "order_steps_eyebrow",        label: "Steps Section Eyebrow",     type: "text" },
      { key: "order_steps_headline",       label: "Steps Section Headline",    type: "textarea" },
      { key: "order_steps",                label: "Order Steps (JSON array: [{title, body}])", type: "json" },
      { key: "order_export_eyebrow",       label: "Export Section Eyebrow",    type: "text" },
      { key: "order_export_headline",      label: "Export Section Headline",   type: "textarea" },
      { key: "order_export_description",   label: "Export Description",        type: "textarea" },
      { key: "order_export_features",      label: "Export Features (JSON array: [{title, body}])", type: "json" },
      { key: "order_export_note",          label: "Quotation Note",            type: "textarea" },
      { key: "order_cta_headline",         label: "CTA Headline",              type: "textarea" },
    ],
  },
  {
    id: "wholesale", label: "🏭 Wholesale Page",
    fields: [
      { key: "wholesale_hero_eyebrow",     label: "Hero Eyebrow",               type: "text" },
      { key: "wholesale_hero_headline",    label: "Hero Headline",              type: "textarea" },
      { key: "wholesale_hero_description", label: "Hero Description",           type: "textarea" },
      { key: "wholesale_offerings",        label: "Offerings (JSON array: [{eyebrow, title, body, points:[], featured:bool}])", type: "json" },
      { key: "wholesale_process_eyebrow",  label: "Process Section Eyebrow",    type: "text" },
      { key: "wholesale_process_headline", label: "Process Section Headline",   type: "textarea" },
      { key: "wholesale_process_steps",    label: "Process Steps (JSON array: [{step, title, body}])", type: "json" },
      { key: "wholesale_process_note",     label: "Process Disclaimer",         type: "textarea" },
      { key: "wholesale_form_headline",    label: "Form Headline",              type: "textarea" },
      { key: "wholesale_form_description", label: "Form Description",           type: "textarea" },
    ],
  },
  {
    id: "footer", label: "🔻 Footer",
    fields: [
      { key: "footer_tagline",     label: "Footer Tagline",  type: "textarea" },
      { key: "footer_brand_label", label: "Brand Label",     type: "text" },
    ],
  },
];

export default function AdminContent() {
  const [values, setValues]         = useState<Record<string, string>>({});
  const [loading, setLoading]       = useState(true);
  const [saving, setSaving]         = useState<string | null>(null);
  const [savedKey, setSavedKey]     = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string>(SCHEMA[0].id);

  async function load() {
    const data = await api.getAllContent();
    if (data) {
      const init: Record<string, string> = {};
      data.forEach((item) => { init[item.key] = item.value ?? ""; });
      setValues(init);
    }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function save(key: string) {
    setSaving(key);
    await api.updateContent(key, values[key] ?? "");
    setSaving(null);
    setSavedKey(key);
    setTimeout(() => setSavedKey(null), 2000);
  }

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="ml-60 flex-1 p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-forest-700">Site Content</h2>
            <p className="text-sm text-gray-500 mt-1">Edit all public text by section. Changes are saved to Firestore and appear on the live site immediately.</p>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                  <div className="h-5 bg-gray-200 rounded w-48 mb-4" />
                  <div className="h-9 bg-gray-100 rounded w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {SCHEMA.map((section) => (
                <div key={section.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  {/* Section header / accordion toggle */}
                  <button
                    onClick={() => setOpenSection(openSection === section.id ? "" : section.id)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-forest-700 text-base">{section.label}</span>
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform ${openSection === section.id ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {openSection === section.id && (
                    <div className="border-t border-gray-100 divide-y divide-gray-50">
                      {section.fields.map((field) => (
                        <div key={field.key} className="px-6 py-5">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <label className="block text-sm font-medium text-gray-700">
                              {field.label}
                            </label>
                            <span className="text-xs font-mono text-gray-400 shrink-0">{field.key}</span>
                          </div>

                          {field.type === "json" && (
                            <p className="text-xs text-amber-600 mb-2">
                              JSON format — see label for structure. Must be a valid JSON array.
                            </p>
                          )}

                          <div className="flex gap-3 items-start">
                            {field.type === "text" ? (
                              <input
                                type="text"
                                value={values[field.key] ?? ""}
                                onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                                className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-forest-600"
                              />
                            ) : (
                              <textarea
                                rows={field.type === "json" ? 6 : 3}
                                value={values[field.key] ?? ""}
                                onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                                className={`flex-1 border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-forest-600 resize-y ${
                                  field.type === "json" ? "font-mono text-xs" : ""
                                }`}
                              />
                            )}
                            <button
                              onClick={() => save(field.key)}
                              disabled={saving === field.key}
                              className="bg-forest-700 text-white px-4 py-2 rounded text-sm hover:bg-forest-800 transition-colors disabled:opacity-60 whitespace-nowrap shrink-0"
                            >
                              {saving === field.key
                                ? "Saving…"
                                : savedKey === field.key
                                ? "Saved ✓"
                                : "Save"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </AdminGuard>
  );
}
