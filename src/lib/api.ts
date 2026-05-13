import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, serverTimestamp, setDoc, Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

// ---- types ----

export type ApiProduct = {
  id: string;
  slug: string;
  name: string;
  arabic_name: string;
  tagline: string;
  category: string;
  botanical?: string;
  origin: string;
  description: string;
  story: string;
  features: string[];
  uses: string[];
  retail_packs: string[];
  bulk_packs: string[];
  fill_texture: string;
  window_image?: string;
  product_image?: string;
  coming_soon: boolean;
  active: boolean;
  retail_price?: number;
  wholesale_price?: number;
  currency: string;
};

export type ApiOrder = {
  id?: string;
  order_number?: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  customer_address?: string;
  items: OrderItem[];
  total_amount?: number;
  currency?: string;
  status?: string;
  notes?: string;
  whatsapp_sent?: boolean;
  created_at?: string;
};

export type OrderItem = {
  product_id: string;
  product_name: string;
  quantity: number;
  pack_size: string;
  unit_price: number;
};

// ---- helpers ----

function docToProduct(id: string, data: any): ApiProduct {
  return {
    id,
    slug:            data.slug            ?? '',
    name:            data.name            ?? '',
    arabic_name:     data.arabic_name     ?? '',
    tagline:         data.tagline         ?? '',
    category:        data.category        ?? '',
    botanical:       data.botanical,
    origin:          data.origin          ?? '',
    description:     data.description     ?? '',
    story:           data.story           ?? '',
    features:        data.features        ?? [],
    uses:            data.uses            ?? [],
    retail_packs:    data.retail_packs    ?? [],
    bulk_packs:      data.bulk_packs      ?? [],
    fill_texture:    data.fill_texture    ?? '',
    window_image:    data.window_image,
    product_image:   data.product_image,
    coming_soon:     data.coming_soon     ?? false,
    active:          data.active          ?? true,
    retail_price:    data.retail_price,
    wholesale_price: data.wholesale_price,
    currency:        data.currency        ?? 'AED',
  };
}

function docToOrder(id: string, data: any): ApiOrder {
  const ts = data.created_at;
  const created_at = ts instanceof Timestamp ? ts.toDate().toISOString() : (ts ?? '');
  return { id, ...data, created_at };
}

function docToRow(id: string, data: any) {
  const ts = data.created_at;
  const created_at = ts instanceof Timestamp ? ts.toDate().toISOString() : (ts ?? '');
  return { id, ...data, created_at };
}

// ---- public API ----

export const api = {
  /** Active products for public site */
  getProducts: async (): Promise<ApiProduct[] | null> => {
    try {
      const q = query(collection(db, 'products'), where('active', '==', true));
      const snap = await getDocs(q);
      return snap.docs.map(d => docToProduct(d.id, d.data()));
    } catch { return null; }
  },

  /** Single product by slug */
  getProduct: async (slug: string): Promise<ApiProduct | null> => {
    try {
      const q = query(collection(db, 'products'), where('slug', '==', slug), where('active', '==', true));
      const snap = await getDocs(q);
      if (snap.empty) return null;
      const d = snap.docs[0];
      return docToProduct(d.id, d.data());
    } catch { return null; }
  },

  /** Site content key-value map */
  getSiteContent: async (): Promise<Record<string, { value: string; label: string }> | null> => {
    try {
      const snap = await getDocs(collection(db, 'site_content'));
      const result: Record<string, { value: string; label: string }> = {};
      snap.docs.forEach(d => {
        const data = d.data();
        result[data.key ?? d.id] = { value: data.value ?? '', label: data.label ?? data.key ?? d.id };
      });
      return result;
    } catch { return null; }
  },

  /** Save a WhatsApp order */
  saveOrder: async (data: ApiOrder): Promise<{ success: boolean; id: string } | null> => {
    try {
      const ref = await addDoc(collection(db, 'orders'), {
        ...data,
        status: data.status ?? 'pending',
        order_number: `ILA-${Date.now()}`,
        created_at: serverTimestamp(),
      });
      return { success: true, id: ref.id };
    } catch { return null; }
  },

  /** Save a wholesale inquiry */
  saveWholesaleInquiry: async (data: object): Promise<{ success: boolean } | null> => {
    try {
      await addDoc(collection(db, 'wholesale_inquiries'), { ...data, status: 'new', created_at: serverTimestamp() });
      return { success: true };
    } catch { return null; }
  },

  /** Save a contact message */
  saveContactMessage: async (data: object): Promise<{ success: boolean } | null> => {
    try {
      await addDoc(collection(db, 'contact_messages'), { ...data, status: 'new', created_at: serverTimestamp() });
      return { success: true };
    } catch { return null; }
  },

  // ---- admin API (Firebase Auth protects these via Firestore rules) ----

  /** Dashboard stats */
  getStats: async (): Promise<{ products: number; orders: number; wholesale: number; contacts: number } | null> => {
    try {
      const [p, o, w, c] = await Promise.all([
        getDocs(collection(db, 'products')),
        getDocs(collection(db, 'orders')),
        getDocs(collection(db, 'wholesale_inquiries')),
        getDocs(collection(db, 'contact_messages')),
      ]);
      return { products: p.size, orders: o.size, wholesale: w.size, contacts: c.size };
    } catch { return null; }
  },

  /** Admin: all products (including hidden) */
  getAllProducts: async (): Promise<ApiProduct[] | null> => {
    try {
      const snap = await getDocs(collection(db, 'products'));
      return snap.docs.map(d => docToProduct(d.id, d.data()));
    } catch { return null; }
  },

  /** Admin: all orders newest first */
  getOrders: async (): Promise<ApiOrder[] | null> => {
    try {
      const q = query(collection(db, 'orders'), orderBy('created_at', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map(d => docToOrder(d.id, d.data()));
    } catch { return null; }
  },

  /** Admin: wholesale inquiries newest first */
  getWholesaleInquiries: async (): Promise<any[] | null> => {
    try {
      const q = query(collection(db, 'wholesale_inquiries'), orderBy('created_at', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map(d => docToRow(d.id, d.data()));
    } catch { return null; }
  },

  /** Admin: contact messages newest first */
  getContactMessages: async (): Promise<any[] | null> => {
    try {
      const q = query(collection(db, 'contact_messages'), orderBy('created_at', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map(d => docToRow(d.id, d.data()));
    } catch { return null; }
  },

  /** Admin: create or update product */
  upsertProduct: async (data: Partial<ApiProduct>): Promise<{ success: boolean; id: string } | null> => {
    try {
      const { id, ...rest } = data;
      if (id) {
        await updateDoc(doc(db, 'products', id), { ...rest, updated_at: serverTimestamp() });
        return { success: true, id };
      } else {
        const ref = await addDoc(collection(db, 'products'), { ...rest, created_at: serverTimestamp() });
        return { success: true, id: ref.id };
      }
    } catch { return null; }
  },

  /** Admin: delete product */
  deleteProduct: async (id: string): Promise<{ success: boolean } | null> => {
    try {
      await deleteDoc(doc(db, 'products', id));
      return { success: true };
    } catch { return null; }
  },

  /** Admin: update order status */
  updateOrderStatus: async (id: string, status: string): Promise<{ success: boolean } | null> => {
    try {
      await updateDoc(doc(db, 'orders', id), { status, updated_at: serverTimestamp() });
      return { success: true };
    } catch { return null; }
  },

  /** Admin: update wholesale inquiry status */
  updateWholesaleStatus: async (id: string, status: string): Promise<{ success: boolean } | null> => {
    try {
      await updateDoc(doc(db, 'wholesale_inquiries', id), { status });
      return { success: true };
    } catch { return null; }
  },

  /** Admin: update contact message status */
  updateContactStatus: async (id: string, status: string): Promise<{ success: boolean } | null> => {
    try {
      await updateDoc(doc(db, 'contact_messages', id), { status });
      return { success: true };
    } catch { return null; }
  },

  /** Admin: update site content value */
  updateContent: async (key: string, value: string): Promise<{ success: boolean } | null> => {
    try {
      const q = query(collection(db, 'site_content'), where('key', '==', key));
      const snap = await getDocs(q);
      if (!snap.empty) {
        await updateDoc(snap.docs[0].ref, { value, updated_at: serverTimestamp() });
      } else {
        await addDoc(collection(db, 'site_content'), { key, value, label: key, updated_at: serverTimestamp() });
      }
      return { success: true };
    } catch { return null; }
  },

  /** Admin: all site content as array */
  getAllContent: async (): Promise<{ key: string; value: string; label: string }[] | null> => {
    try {
      const snap = await getDocs(collection(db, 'site_content'));
      return snap.docs.map(d => {
        const data = d.data();
        return { key: data.key ?? d.id, value: data.value ?? '', label: data.label ?? data.key ?? d.id };
      });
    } catch { return null; }
  },

  /** Flat map of all site content key → value (for use in public pages) */
  getContentFlat: async (): Promise<Record<string, string> | null> => {
    try {
      const snap = await getDocs(collection(db, 'site_content'));
      const result: Record<string, string> = {};
      snap.docs.forEach(d => {
        const data = d.data();
        result[data.key ?? d.id] = data.value ?? '';
      });
      return result;
    } catch { return null; }
  },
};
