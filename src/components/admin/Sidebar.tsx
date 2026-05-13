"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const nav = [
  { href: "/admin/dashboard",  label: "Dashboard",    icon: "▦" },
  { href: "/admin/products",   label: "Products",     icon: "◈" },
  { href: "/admin/orders",     label: "Orders",       icon: "◇" },
  { href: "/admin/inquiries",  label: "Inquiries",    icon: "◉" },
  { href: "/admin/content",    label: "Site Content", icon: "◎" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router   = useRouter();

  async function logout() {
    await signOut(auth);
    router.push("/admin/login");
  }

  return (
    <aside className="w-60 min-h-screen bg-forest-700 text-white flex flex-col fixed left-0 top-0 z-40 shadow-xl">
      <div className="px-6 py-5 border-b border-white/10">
        <p className="text-[10px] tracking-[0.2em] uppercase text-gold-400 mb-0.5">Admin Panel</p>
        <h1 className="font-display text-xl text-gold-400 leading-tight">Ila Gold<br/>Spices</h1>
      </div>

      <nav className="flex-1 py-3">
        {nav.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                active
                  ? "bg-white/10 text-gold-400 border-r-2 border-gold-400"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}>
              <span className="text-base w-5 text-center">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-4 border-t border-white/10 space-y-2">
        <Link href="/" target="_blank"
          className="block text-xs text-white/40 hover:text-white/70 transition-colors">
          ↗ View website
        </Link>
        <button onClick={logout} className="block text-xs text-white/40 hover:text-red-300 transition-colors">
          Sign out
        </button>
      </div>
    </aside>
  );
}
