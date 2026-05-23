"use client";
import Image from "next/image";

export default function LoadingScreen({ visible }: { visible: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-[200] bg-forest-700 flex flex-col items-center justify-center gap-8 transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <Image
        src="/images/logo.png"
        alt="Ila Gold Spices"
        width={160}
        height={149}
        className="animate-pulse"
        priority
      />
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-gold-400"
            style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </div>
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
