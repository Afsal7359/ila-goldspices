"use client";
import { useEffect, useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/admin/Sidebar";
import { api } from "@/lib/api";

type Tab = "wholesale" | "contact";

export default function AdminInquiries() {
  const [tab, setTab]             = useState<Tab>("wholesale");
  const [wholesale, setWholesale] = useState<any[]>([]);
  const [contacts, setContacts]   = useState<any[]>([]);
  const [loading, setLoading]     = useState(true);
  const [expanded, setExpanded]   = useState<string | null>(null);

  async function load() {
    const [w, c] = await Promise.all([
      api.getWholesaleInquiries(),
      api.getContactMessages(),
    ]);
    setWholesale(w ?? []);
    setContacts(c ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const data = tab === "wholesale" ? wholesale : contacts;

  async function updateStatus(id: string, status: string) {
    if (tab === "wholesale") await api.updateWholesaleStatus(id, status);
    else                     await api.updateContactStatus(id, status);
    load();
  }

  const statusBadge = (s: string) => {
    if (s === "new")       return "bg-amber-100 text-amber-700";
    if (s === "contacted" || s === "read") return "bg-blue-100 text-blue-700";
    if (s === "replied" || s === "qualified") return "bg-green-100 text-green-700";
    return "bg-gray-100 text-gray-500";
  };

  const wholesaleStatuses = ["new","contacted","qualified","closed"];
  const contactStatuses   = ["new","read","replied"];

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="ml-60 flex-1 p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-forest-700">Inquiries & Messages</h2>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-6 bg-white rounded-lg shadow-sm p-1 w-fit">
            {(["wholesale","contact"] as Tab[]).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-5 py-2 rounded text-sm font-medium transition-colors ${tab === t ? "bg-forest-700 text-white" : "text-gray-500 hover:text-forest-700"}`}>
                {t === "wholesale" ? `Wholesale (${wholesale.length})` : `Contact (${contacts.length})`}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {loading ? (
              <p className="px-6 py-12 text-center text-gray-400 text-sm">Loading…</p>
            ) : data.length === 0 ? (
              <p className="px-6 py-12 text-center text-gray-400 text-sm">No {tab === "wholesale" ? "wholesale inquiries" : "contact messages"} yet</p>
            ) : (
              <div className="divide-y">
                {data.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <p className="font-semibold text-forest-700">{item.contact_name || item.name}</p>
                          {tab === "wholesale" && item.company_name && (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{item.company_name}</span>
                          )}
                          <span className={`text-xs px-2 py-0.5 rounded-full ${statusBadge(item.status)}`}>{item.status}</span>
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-2">
                          {item.email   && <span>{item.email}</span>}
                          {item.phone   && <span>{item.phone}</span>}
                          {item.country && <span>{item.country}</span>}
                          <span>{item.created_at ? new Date(item.created_at).toLocaleDateString() : ""}</span>
                        </div>
                        {tab === "wholesale" && (item.products_interested || item.quantity) && (
                          <p className="text-sm text-gray-600 mb-1">
                            {item.products_interested && `Products: ${item.products_interested}`}
                            {item.products_interested && item.quantity && " · "}
                            {item.quantity && `Qty: ${item.quantity}`}
                          </p>
                        )}
                        {tab === "contact" && item.subject && (
                          <p className="text-sm font-medium text-gray-700 mb-1">Subject: {item.subject}</p>
                        )}
                        {expanded === item.id && item.message && (
                          <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-3 rounded whitespace-pre-wrap">{item.message}</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 items-end shrink-0">
                        <select value={item.status}
                          onChange={(e) => updateStatus(item.id, e.target.value)}
                          className="text-xs border border-gray-200 rounded px-2 py-1">
                          {(tab === "wholesale" ? wholesaleStatuses : contactStatuses).map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        {item.message && (
                          <button onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                            className="text-xs text-forest-600 hover:underline">
                            {expanded === item.id ? "Hide message" : "Read message"}
                          </button>
                        )}
                        <a href={`mailto:${item.email}`} className="text-xs text-gold-600 hover:underline">Reply by email</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
