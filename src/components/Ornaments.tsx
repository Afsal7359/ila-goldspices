export function Flourish({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M 2 12 L 40 12"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.6"
      />
      <path
        d="M 80 12 L 118 12"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.6"
      />
      <path
        d="M 48 12 Q 54 4, 60 12 Q 66 20, 72 12"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <circle cx="60" cy="12" r="2" fill="currentColor" />
      <circle cx="44" cy="12" r="1" fill="currentColor" opacity="0.7" />
      <circle cx="76" cy="12" r="1" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

export function LeafIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M 20 4 Q 34 14, 30 32 Q 16 28, 10 18 Q 14 10, 20 4 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M 20 6 Q 22 18, 27 30"
        stroke="white"
        strokeWidth="0.8"
        opacity="0.4"
        fill="none"
      />
    </svg>
  );
}

export function SealIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      <circle cx="30" cy="30" r="24" stroke="currentColor" strokeWidth="0.6" />
      <path d="M 20 30 L 27 37 L 40 22" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  );
}
