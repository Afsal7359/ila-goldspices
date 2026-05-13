"use client";
import { usePathname } from "next/navigation";
import Nav from "./Nav";
import Footer from "./Footer";
import { ContentProvider } from "@/lib/content";

export default function PublicWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  if (isAdmin) return <>{children}</>;
  return (
    <ContentProvider>
      <Nav />
      <main className="overflow-x-clip">{children}</main>
      <Footer />
    </ContentProvider>
  );
}
