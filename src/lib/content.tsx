"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "./api";

interface ContentCtx {
  data: Record<string, string>;
  loading: boolean;
}

const Ctx = createContext<ContentCtx>({ data: {}, loading: true });

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [data, setData]       = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getContentFlat().then((d) => {
      if (d) setData(d);
      setLoading(false);
    });
  }, []);

  return <Ctx.Provider value={{ data, loading }}>{children}</Ctx.Provider>;
}

export function useContent() {
  const { data } = useContext(Ctx);
  return function c(key: string): string {
    return data[key] ?? "";
  };
}

export function useContentLoading() {
  return useContext(Ctx).loading;
}

/** Safely parse a JSON array stored as a string content value */
export function parseArr<T>(json: string, fallback: T[] = []): T[] {
  if (!json) return fallback;
  try { const r = JSON.parse(json); return Array.isArray(r) ? r : fallback; }
  catch { return fallback; }
}
