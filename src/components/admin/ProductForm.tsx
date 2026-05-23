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
  const [imgSaved, setImgSaved] = useState<string | null>(null);
  const widgetRef = useRef<any>(null);
  const galleryWidgetRef = useRef<any>(null);
  const activeFieldRef = useRef<"window_image" | "product_image">("window_image");
  const galleryRef = useRef<string[]>(Array.isArray(initial?.gallery_images) ? initial!.gallery_images! : []);

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
    gallery_images:  Array.isArray(initial?.gallery_images) ? initial!.gallery_images! : [] as string[],
    coming_soon:     initial?.coming_soon     ?? false,
    active:          initial?.active          ?? true,
    position:        String(initial?.position ?? ""),
    retail_price:    String(initial?.retail_price    ?? ""),
    wholesale_price: String(initial?.wholesale_price ?? ""),
    currency:        initial?.currency        ?? "AED",
  });

  function set(key: string, value: unknown) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  // Initialise the Cloudinary upload widgets once
  useEffect(() => {
    if (!CLOUD_NAME || !UPLOAD_PRESET || typeof window === "undefined") return;

    function initWidgets() {
      if (!widgetRef.current) {
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
          async (error: any, result: any) => {
            if (!error && result?.event === "success") {
              const url = result.info.secure_url;
              const field = activeFieldRef.current;
              set(field, url);
              if (initial?.id) {
                await api.upsertProduct({ id: initial.id, [field]: url });
                setImgSaved(field);
                setTimeout(() => setImgSaved(null), 2500);
              }
            }
          }
        );
      }

      if (!galleryWidgetRef.current) {
        galleryWidgetRef.current = (window as any).cloudinary.createUploadWidget(
          {
            cloudName:    CLOUD_NAME,
            uploadPreset: UPLOAD_PRESET,
            folder:       "ila-gold-spices/gallery",
            multiple:     true,
            sources:      ["local", "url"],
            clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
            maxFileSize:  5_000_000,
          },
          async (error: any, result: any) => {
            if (!error && result?.event === "success") {
              const url = result.info.secure_url;
              const next = [...galleryRef.current, url];
              galleryRef.current = next;
              setForm((f) => ({ ...f, gallery_images: next }));
              if (initial?.id) {
                await api.upsertProduct({ id: initial.id, gallery_images: next });
                setImgSaved("gallery_images");
                setTimeout(() => setImgSaved(null), 2500);
              }
            }
          }
        );
      }
    }

    if ((window as any).cloudinary) {
      initWidgets();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/global/all.js";
    script.onload = initWidgets;
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

  function openGalleryUpload() {
    if (galleryWidgetRef.current) {
      galleryWidgetRef.current.open();
    } else {
      alert("Cloudinary not loaded. Check NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.local");
    }
  }

  async function removeGalleryImage(index: number) {
    const next = galleryRef.current.filter((_, i) => i !== index);
    galleryRef.current = next;
    setForm((f) => ({ ...f, gallery_images: next }));
    if (initial?.id) {
      await api.upsertProduct({ id: initial.id, gallery_images: next });
      setImgSaved("gallery_images");
      setTimeout(() => setImgSaved(null), 2500);
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
      gallery_images:  form.gallery_images,
      position:        form.position ? parseInt(form.position, 10) : undefined,
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
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={form[key] ?? ""}
          onChange={(e) => set(key, e.target.value)}
          placeholder="https://res.cloudinary.com/…  or  /images/…"
          className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-forest-600"
        />
        <button
          type="button"
          onClick={() => openUpload(key)}
          className="shrink-0 bg-amber-600 text-white px-3 py-2 rounded text-xs hover:bg-amber-700 transition-colors"
        >
          Upload
        </button>
        {imgSaved === key && (
          <span className="text-xs text-green-600 font-medium whitespace-nowrap">Saved ✓</span>
        )}
      </div>
      {form[key] && (
        <img
          src={form[key]}
          alt={label}
          className="mt-2 h-28 w-auto object-contain border border-gray-200 rounded bg-gray-50 p-2"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
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

          {/* Gallery */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gallery Images (shown at bottom of detail page)
              </label>
              {imgSaved === "gallery_images" && (
                <span className="text-xs text-green-600 font-medium">Saved ✓</span>
              )}
            </div>
            <p className="text-xs text-gray-400 mb-3">
              Upload one or more images. They appear in a grid at the bottom of the product detail page.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-3">
              {form.gallery_images.map((url, i) => (
                <div key={`${url}-${i}`} className="relative group border border-gray-200 rounded bg-gray-50 overflow-hidden">
                  <img
                    src={url}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-28 object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(i)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    aria-label={`Remove image ${i + 1}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={openGalleryUpload}
                className="border-2 border-dashed border-gray-300 rounded h-28 flex items-center justify-center text-xs text-gray-500 hover:border-amber-500 hover:text-amber-600 transition-colors"
              >
                + Add Image
              </button>
            </div>
            {form.gallery_images.length > 0 && (
              <p className="text-xs text-gray-400">
                {form.gallery_images.length} image{form.gallery_images.length === 1 ? "" : "s"} in gallery.
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold text-forest-700 mb-4">Visibility & Display Order</h3>
          <div className="flex flex-wrap gap-6 items-center">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.active} onChange={(e) => set("active", e.target.checked)} className="w-4 h-4" />
              Active (visible on website)
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.coming_soon} onChange={(e) => set("coming_soon", e.target.checked)} className="w-4 h-4" />
              Show "Coming Soon" badge
            </label>
            <div className="flex items-center gap-2 text-sm">
              <label htmlFor="position-input" className="text-gray-600">Display position</label>
              <input
                id="position-input"
                type="number"
                value={form.position}
                onChange={(e) => set("position", e.target.value)}
                placeholder="e.g. 1"
                min={0}
                className="w-24 border border-gray-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-forest-600"
              />
              <span className="text-xs text-gray-400">(lower = shown first)</span>
            </div>
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
