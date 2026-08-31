/**
 * Abstract brand visual system used in place of photography: a horizon line,
 * faint compass rings and a longitude grid rendered in navy/teal. Keeps hero
 * and section backgrounds on-brand (no beaches, no stock cliches) until real
 * photography is commissioned.
 */
export function HeroHorizonArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1a2e" />
          <stop offset="55%" stopColor="#0f2540" />
          <stop offset="100%" stopColor="#163353" />
        </linearGradient>
        <radialGradient id="hero-glow" cx="78%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#ab8752" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#ab8752" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ab8752" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#hero-sky)" />
      <rect width="1600" height="900" fill="url(#hero-glow)" />
      {Array.from({ length: 5 }).map((_, i) => (
        <circle
          key={i}
          cx="1180"
          cy="380"
          r={60 + i * 70}
          fill="none"
          stroke="#c7a66f"
          strokeOpacity={0.14 - i * 0.02}
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <path
          key={i}
          d={`M ${i * 280 - 60} 0 C ${i * 280 + 120} 300, ${i * 280 - 120} 600, ${i * 280 + 60} 900`}
          fill="none"
          stroke="#dde1e6"
          strokeOpacity="0.05"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

/**
 * Horizon line + darkened footer band, pinned to the bottom of a navy
 * section independently of the background art's aspect-ratio scaling — this
 * keeps it clear of the section copy regardless of text length/locale.
 */
export function HorizonLine({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-x-0 bottom-0 ${className}`}>
      <div className="h-px w-full bg-teal/50" />
      <div className="h-full w-full bg-navy-950/55" />
    </div>
  );
}

export function BandHorizonArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 400"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="band-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f2540" />
          <stop offset="100%" stopColor="#0a1a2e" />
        </linearGradient>
      </defs>
      <rect width="1600" height="400" fill="url(#band-sky)" />
      <circle cx="1360" cy="120" r="90" fill="none" stroke="#c7a66f" strokeOpacity="0.25" />
      <circle cx="1360" cy="120" r="150" fill="none" stroke="#c7a66f" strokeOpacity="0.14" />
    </svg>
  );
}

export function CompassMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="100" cy="100" r="70" strokeWidth="1" strokeOpacity="0.5" />
      <circle cx="100" cy="100" r="46" strokeWidth="1" strokeOpacity="0.35" />
      <path
        d="M100 40 L110 95 L165 100 L110 105 L100 165 L90 105 L35 100 L90 95 Z"
        strokeWidth="1"
        strokeOpacity="0.7"
      />
    </svg>
  );
}
