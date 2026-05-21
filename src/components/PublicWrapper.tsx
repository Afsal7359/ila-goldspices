"use client";
import { usePathname } from "next/navigation";
import Nav from "./Nav";
import Footer from "./Footer";
import LoadingScreen from "./LoadingScreen";
import { ContentProvider, useContentLoading } from "@/lib/content";

function SiteShell({ children }: { children: React.ReactNode }) {
  const loading = useContentLoading();
  return (
    <>
      <LoadingScreen visible={loading} />
      <div className={`transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}>
        <Nav />
        <main className="overflow-x-clip">{children}</main>
        <Footer />
      </div>
    </>
  );
}

export default function PublicWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  if (isAdmin) return <>{children}</>;
  return (
    <ContentProvider>
      <SiteShell>{children}</SiteShell>
    </ContentProvider>
  );
}
