/**
 * The logo cube as inline SVG so its parts animate with CSS alone (no JS, no WebGL).
 * Faces rise in, the three Y arms light up one after another, then a soft pulse keeps running
 * through the arms with an occasional light sweep. Reduced motion shows the finished mark.
 * Colours: navy faces and sun yellow only.
 */
const ARM_L = "M65.75 52.04 L13.79 22.04 L2.29 41.96 L54.25 71.96 Z";
const ARM_R = "M65.75 71.96 L117.71 41.96 L106.21 22.04 L54.25 52.04 Z";
const STEM = "M48.5 62 L48.5 122 L71.5 122 L71.5 62 Z";

export function HeroMark() {
  return (
    <svg className="mk" viewBox="-16 -18 152 156" width={152} height={156} style={{ width: "100%", height: "auto" }} focusable="false">
      <defs>
        <radialGradient id="hm-ag" gradientUnits="userSpaceOnUse" cx="60" cy="62" r="56">
          <stop offset="0" stopColor="#FFFDF0" />
          <stop offset=".25" stopColor="#FFF1B8" />
          <stop offset=".55" stopColor="#FFD52A" />
          <stop offset="1" stopColor="#D9A400" />
        </radialGradient>
        <linearGradient id="hm-sw" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".85" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="hm-hex"><polygon points="60,12 103.3,37 103.3,87 60,112 16.7,87 16.7,37" /></clipPath>
        <clipPath id="hm-y"><path d={`${ARM_L} ${ARM_R} ${STEM}`} /><circle cx="60" cy="62" r="9.5" /></clipPath>
        <filter id="hm-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="7.3" /></filter>
      </defs>

      <g className="mk-glow" filter="url(#hm-blur)">
        <path d={`${ARM_L} ${ARM_R} ${STEM}`} fill="#FFD52A" />
        <circle cx="60" cy="62" r="12.5" fill="#FFD52A" />
      </g>

      <polygon className="mk-f f1" points="60,12 103.3,37 60,62 16.7,37" fill="#3A3763" />
      <polygon className="mk-f f2" points="16.7,37 60,62 60,112 16.7,87" fill="#2A2560" />
      <polygon className="mk-f f3" points="60,62 103.3,37 103.3,87 60,112" fill="#1E1A48" />

      <g clipPath="url(#hm-hex)">
        <path className="mk-arm a1" d={ARM_L} fill="url(#hm-ag)" />
        <path className="mk-arm a2" d={ARM_R} fill="url(#hm-ag)" />
        <path className="mk-arm a3" d={STEM} fill="url(#hm-ag)" />
        <circle className="mk-hub" cx="60" cy="62" r="9.5" fill="url(#hm-ag)" />
        <g clipPath="url(#hm-y)">
          <g transform="skewX(-20)"><rect className="mk-sweep" x="-60" y="-20" width="26" height="170" fill="url(#hm-sw)" /></g>
        </g>
      </g>
    </svg>
  );
}
