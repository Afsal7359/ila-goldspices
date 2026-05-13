"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { api, ApiProduct } from "@/lib/api";

const CATEGORIES = ["Cardamom", "Pepper", "Nuts", "Dates"];
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

type Props = { initial?: Partial<ApiProduct>; isNew?: boolean };

export default function ProductForm({ initial, isNew }: Props) {
  const router  = useRouter();
  const [saving, setSaving] = useState(false);
  const widgetRef = useRef<any>(null);
  const activeFieldRef = useRef<"window_image" | "product_image">("window_image");

  const [form, setForm] = useState({
    id:              initial?.id              ?? "",
    slug:            initial?.slug            ?? "",
    name:            initial?.name            ?? "",
    arabic_name:     initial?.arabic_name     ?? "",
    tagline:         initial?.tagline         ?? "",
    category:        initial?.category        ?? "Cardamom",
    botanical:       initial?.botanical       ?? "",
    origin:          initial?.origin          ?? "",
    description:     initial?.description     ?? "",
    story:           initial?.story           ?? "",
    features:        Array.isArray(initial?.features) ? initial.features.join("\n") : (initial?.features ?? ""),
    uses:            Array.isArray(initial?.uses)     ? initial.uses.join("\n")     : (initial?.uses     ?? ""),
    retail_packs:    Array.isArray(initial?.retail_packs) ? initial.retail_packs.join(", ") : (initial?.retail_packs ?? ""),
    bulk_packs:      Array.isArray(initial?.bulk_packs)   ? initial.bulk_packs.join(", ")   : (initial?.bulk_packs   ?? ""),
    window_image:    initial?.window_image    ?? "",
    product_image:   initial?.product_image   ?? "",
    coming_soon:     initial?.coming_soon     ?? false,
    active:          initial?.active          ?? true,
    retail_price:    String(initial?.retail_price    ?? ""),
    wholesale_price: String(initial?.wholesale_price ?? ""),
    currency:        initial?.currency        ?? "AED",
  });

  function set(key: string, value: unknown) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  // Initialise the Cloudinary upload widget once
  useEffect(() => {
    if (!CLOUD_NAME || !UPLOAD_PRESET || typeof window === "undefined") return;

    function initWidget() {
      if (widgetRef.current) return;
      widgetRef.current = (window as any).cloudinary.createUploadWidget(
        {
          cloudName:    CLOUD_NAME,
          uploadPreset: UPLOAD_PRESET,
          folder:       "ila-gold-spices",
          multiple:     false,
          sources:      ["local", "url"],
          clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
          maxFileSize:  5_000_000,
        },
        (error: any, result: any) => {
          if (!error && result?.event === "success") {
            set(activeFieldRef.current, result.info.secure_url);
          }
        }
      );
    }

    if ((window as any).cloudinary) {
      initWidget();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/global/all.js";
    script.onload = initWidget;
    document.head.appendChild(script);
  }, []);

  function openUpload(field: "window_image" | "product_image") {
    activeFieldRef.current = field;
    if (widgetRef.current) {
      widgetRef.current.open();
    } else {
      alert("Cloudinary not loaded. Check NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.local");
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload: Partial<ApiProduct> = {
      ...form,
      features:        form.features.split("\n").map((s: string) => s.trim()).filter(Boolean),
      uses:            form.uses.split("\n").map((s: string) => s.trim()).filter(Boolean),
      retail_packs:    form.retail_packs.split(",").map((s: string) => s.trim()).filter(Boolean),
      bulk_packs:      form.bulk_packs.split(",").map((s: string) => s.trim()).filter(Boolean),
      retail_price:    form.retail_price    ? parseFloat(form.retail_price)    : undefined,
      wholesale_price: form.wholesale_price ? parseFloat(form.wholesale_price) : undefined,
    };

    await api.upsertProduct(payload);
    setSaving(false);
    router.push("/admin/products");
  }

  const field = (label: string, key: keyof typeof form, type = "text", placeholder = "") => (
    <div>
      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{label}</label>
      <input type={type} value={form[key] as string}
        onChange={(e) => set(key, e.target.value)} placeholder={placeholder}
        className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-forest-600" />
    </div>
  );

  const textarea = (label: string, key: keyof typeof form, rows = 3, hint = "") => (
    <div>
      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{label}</label>
      {hint && <p className="text-xs text-gray-400 mb-1">{hint}</p>}
      <textarea rows={rows} value={form[key] as string}
        onChange={(e) => set(key, e.target.value)}
        className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-forest-600 resize-y" />
    </div>
  );

  const imageField = (label: string, key: "window_image" | "product_image") => (
    <div>
      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{label}</label>
      <div className="flex gap-2 items-start">
        <input
          type="text"
          value={form[key]}
          onChange={(e) => set(key, e.target.value)}
          placeholder="https://res.cloudinary.com/…  or  /images/…"
          className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-forest-600"
        />
        <button
          type="button"
          onClick={() => openUpload(key)}
          className="shrink-0 bg-forest-700 text-white px-3 py-2 rounded text-xs hover:bg-forest-800 transition-colors"
        >
          Upload
        </button>
      </div>
      {form[key] && (
        <img
          src={form[key]}
          alt={label}
          className="mt-2 h-20 w-auto object-contain border border-gray-200 rounded p-1"
        />
      )}
    </div>
  );

  return (
    <form onSubmit={handleSave} className="space-y-5">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold text-forest-700 mb-4">Basic Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {field("Slug (URL key)", "slug",        "text", "whole-green-cardamom")}
            {field("Product Name",   "name")}
            {field("Arabic Name",    "arabic_name")}
            {field("Tagline",        "tagline")}
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Category</label>
              <select value={form.category} onChange={(e) => set("category", e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-forest-600">
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            {field("Botanical",  "botanical", "text", "Elettaria cardamomum")}
            {field("Origin",     "origin",    "text", "Kerala, India")}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold text-forest-700 mb-4">Content</h3>
          <div className="space-y-4">
            {textarea("Short Description", "description", 2)}
            {textarea("Full Story",        "story",       5)}
            {textarea("Features",          "features",    5, "One feature per line")}
            {textarea("Typical Uses",      "uses",        4, "One use per line")}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold text-forest-700 mb-4">Pack Sizes & Pricing</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {field("Retail Packs",    "retail_packs",    "text", "50 g, 100 g, 200 g, 500 g")}
            {field("Bulk Packs",      "bulk_packs",      "text", "1 kg, 5 kg, 10–25 kg cartons")}
            {field("Currency",        "currency",        "text", "AED")}
            {field("Retail Price",    "retail_price",    "number")}
            {field("Wholesale Price", "wholesale_price", "number")}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold text-forest-700 mb-4">Images</h3>
          {CLOUD_NAME ? (
            <p className="text-xs text-green-600 mb-4">
              ✓ Cloudinary connected — click Upload to choose an image from your computer.
            </p>
          ) : (
            <p className="text-xs text-amber-600 mb-4">
              ⚠ Cloudinary not configured. Add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET to .env.local to enable image uploads.
            </p>
          )}
          <div className="grid md:grid-cols-2 gap-6">
            {imageField("Window Image (product card background)", "window_image")}
            {imageField("Product Image (detail page hero)",        "product_image")}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold text-forest-700 mb-4">Visibility</h3>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.active} onChange={(e) => set("active", e.target.checked)} className="w-4 h-4" />
              Active (visible on website)
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.coming_soon} onChange={(e) => set("coming_soon", e.target.checked)} className="w-4 h-4" />
              Show "Coming Soon" badge
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={saving}
            className="bg-forest-700 text-white px-6 py-2.5 rounded text-sm font-medium hover:bg-forest-800 transition-colors disabled:opacity-60">
            {saving ? "Saving…" : (isNew ? "Create Product" : "Save Changes")}
          </button>
          <button type="button" onClick={() => router.push("/admin/products")}
            className="border border-gray-200 text-gray-600 px-6 py-2.5 rounded text-sm hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>
    </form>
  );
}
