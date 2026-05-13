"use client";

import { useState } from "react";
import { ApiProduct, OrderItem } from "@/lib/api";
import { saveOrderAndGetWhatsAppLink } from "@/lib/whatsapp";

type Props = {
  product: ApiProduct;
  onClose: () => void;
};

export default function OrderModal({ product, onClose }: Props) {
  const packs = product.retail_packs;
  const [selectedPack, setSelectedPack] = useState(packs[0]);
  const [quantity, setQuantity]         = useState(1);
  const [name, setName]                 = useState("");
  const [phone, setPhone]               = useState("");
  const [email, setEmail]               = useState("");
  const [address, setAddress]           = useState("");
  const [notes, setNotes]               = useState("");
  const [loading, setLoading]           = useState(false);

  const unitPrice = product.retail_price ?? 0;
  const total     = unitPrice * quantity;

  async function handleOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone) return;
    setLoading(true);

    const item: OrderItem = {
      product_id:   product.slug,
      product_name: product.name,
      quantity,
      pack_size:    selectedPack,
      unit_price:   unitPrice,
    };

    const link = await saveOrderAndGetWhatsAppLink({
      customer_name:    name,
      customer_phone:   phone,
      customer_email:   email,
      customer_address: address,
      items:            [item],
      total_amount:     total,
      currency:         product.currency ?? "AED",
      notes,
    });

    setLoading(false);
    window.open(link, "_blank");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm">
      <div className="bg-cream-50 w-full max-w-md rounded-sm shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="bg-forest-700 text-cream-100 px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs tracking-widest uppercase text-gold-300 mb-0.5">Order via WhatsApp</p>
            <h2 className="font-display text-lg font-semibold">{product.name}</h2>
          </div>
          <button onClick={onClose} className="text-cream-300 hover:text-white text-2xl leading-none">×</button>
        </div>

        <form onSubmit={handleOrder} className="p-6 space-y-4">
          <div>
            <label className="block text-xs tracking-widest uppercase text-forest-600 mb-2">Pack Size</label>
            <div className="flex flex-wrap gap-2">
              {packs.map((p) => (
                <button type="button" key={p} onClick={() => setSelectedPack(p)}
                  className={`px-3 py-1.5 text-sm border transition-colors ${
                    selectedPack === p
                      ? "bg-forest-700 text-cream-50 border-forest-700"
                      : "bg-transparent text-forest-700 border-forest-300 hover:border-forest-700"
                  }`}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase text-forest-600 mb-2">Quantity</label>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 border border-forest-300 text-forest-700 hover:bg-forest-50 flex items-center justify-center text-lg">−</button>
              <span className="font-display text-xl w-8 text-center">{quantity}</span>
              <button type="button" onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 border border-forest-300 text-forest-700 hover:bg-forest-50 flex items-center justify-center text-lg">+</button>
              {unitPrice > 0 && (
                <span className="ml-2 text-forest-700 font-semibold">
                  = {product.currency ?? "AED"} {total.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <hr className="border-cream-300" />

          <div className="space-y-3">
            {[
              { label: "Full Name *",         value: name,    set: setName,    required: true,  placeholder: "Your name" },
              { label: "WhatsApp / Phone *",  value: phone,   set: setPhone,   required: true,  placeholder: "+971 50 000 0000" },
              { label: "Email",               value: email,   set: setEmail,   required: false, placeholder: "your@email.com" },
              { label: "Delivery Address",    value: address, set: setAddress, required: false, placeholder: "City, country" },
            ].map(({ label, value, set, required, placeholder }) => (
              <div key={label}>
                <label className="block text-xs tracking-widest uppercase text-forest-600 mb-1">{label}</label>
                <input required={required} value={value} onChange={(e) => set(e.target.value)} placeholder={placeholder}
                  className="w-full border border-cream-300 px-3 py-2 text-sm focus:outline-none focus:border-forest-600 bg-white" />
              </div>
            ))}
            <div>
              <label className="block text-xs tracking-widest uppercase text-forest-600 mb-1">Notes</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2}
                placeholder="Any special requirements..."
                className="w-full border border-cream-300 px-3 py-2 text-sm focus:outline-none focus:border-forest-600 bg-white resize-none" />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-[#25D366] hover:bg-[#1ebe5c] text-white py-3 text-sm tracking-widest uppercase font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            {loading ? "Saving…" : "Order on WhatsApp"}
          </button>
          <p className="text-xs text-center text-forest-600/60">
            Your order details will be sent to our WhatsApp. We&apos;ll confirm within 24 hours.
          </p>
        </form>
      </div>
    </div>
  );
}
