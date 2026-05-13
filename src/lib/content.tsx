"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "./api";

const Ctx = createContext<Record<string, string>>({});

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Record<string, string>>({});

  useEffect(() => {
    api.getContentFlat().then((d) => { if (d) setData(d); });
  }, []);

  return <Ctx.Provider value={data}>{children}</Ctx.Provider>;
}

export function useContent() {
  const data = useContext(Ctx);
  return function c(key: string, fallback = ""): string {
    return data[key] !== undefined ? data[key] : fallback;
  };
}

/** Safely parse a JSON array stored as a string content value */
export function parseArr<T>(json: string, fallback: T[] = []): T[] {
  try { const r = JSON.parse(json); return Array.isArray(r) ? r : fallback; }
  catch { return fallback; }
}
