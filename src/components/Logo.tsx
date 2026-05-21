type Props = { className?: string; textClass?: string; subClass?: string };

export default function Logo({ className = "", textClass = "text-gold-300", subClass = "text-gold-400/70" }: Props) {
  return (
    <div className={`flex items-end gap-2 leading-none ${className}`}>
      {/* Leaf icon */}
      <div className="relative flex-shrink-0 self-stretch flex items-end pb-1">
        <svg width="18" height="32" viewBox="0 0 18 32" fill="none" className="text-green-400">
          <path
            d="M9 0C4 4 0 10 0 16c0 4.5 2 8 5 10.5L9 32l4-5.5C16 24 18 20.5 18 16 18 10 14 4 9 0z"
            fill="currentColor"
            opacity="0.85"
          />
          <line x1="9" y1="16" x2="9" y2="32" stroke="#0E3B2E" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col items-start">
        <span className={`font-display italic font-bold leading-none tracking-tight text-[1.75rem] ${textClass}`}>
          ila
        </span>
        <span className={`font-sans font-semibold text-[0.48rem] tracking-[0.3em] uppercase leading-none mt-0.5 ${subClass}`}>
          Gold Spices
        </span>
      </div>
    </div>
  );
}
