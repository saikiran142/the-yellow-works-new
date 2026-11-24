import type { PropertyType } from "@/config/demo-realty";

/** Simple illustrations stand in for photographs. A real property site needs real, licensed photography. */
export function PropertyArt({ type, label }: { type: PropertyType; label: string }) {
  return (
    <svg viewBox="0 0 320 200" role="img" aria-label={label} className="dr-art-svg">
      <rect width="320" height="200" fill="#dfe8f7" />
      <circle cx="262" cy="46" r="22" fill="#f3d58a" />
      <rect y="150" width="320" height="50" fill="#bfd0ec" />
      {type === "Apartment" && (
        <g>
          <rect x="70" y="38" width="110" height="122" rx="4" fill="#12203f" />
          <rect x="170" y="70" width="82" height="90" rx="4" fill="#2e4a8f" />
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x={84 + (i % 3) * 32} y={52 + Math.floor(i / 3) * 26} width="18" height="14" rx="2" fill={i === 5 ? "#d9a441" : "#c9d6ee"} />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <rect key={`b${i}`} x={182 + (i % 2) * 34} y={84 + Math.floor(i / 2) * 24} width="18" height="12" rx="2" fill="#c9d6ee" />
          ))}
        </g>
      )}
      {type === "Villa" && (
        <g>
          <rect x="70" y="92" width="180" height="68" rx="4" fill="#2e4a8f" />
          <path d="M58 96L160 40l102 56z" fill="#12203f" />
          <rect x="145" y="116" width="30" height="44" rx="3" fill="#d9a441" />
          <rect x="90" y="108" width="34" height="26" rx="2" fill="#c9d6ee" />
          <rect x="196" y="108" width="34" height="26" rx="2" fill="#c9d6ee" />
          <circle cx="48" cy="140" r="16" fill="#7aa2d6" /><rect x="46" y="150" width="4" height="12" fill="#12203f" />
        </g>
      )}
      {type === "Plot" && (
        <g>
          <path d="M40 160L120 110h150l30 50z" fill="#9fc08a" />
          <path d="M120 110L88 160M200 110L190 160M270 110L300 160" stroke="#fff" strokeWidth="3" fill="none" />
          <rect x="130" y="70" width="6" height="42" fill="#12203f" />
          <path d="M136 70h38l-10 10 10 10h-38z" fill="#d9a441" />
        </g>
      )}
    </svg>
  );
}
