import React from 'react';
import { ActiveAddon, PatternStyle, ProductCategory } from '../types';

interface ProductArtworkProps {
  category: ProductCategory;
  shellHex: string;
  accentHex: string;
  pattern?: PatternStyle;
  addon?: ActiveAddon;
  monogram?: string;
  className?: string;
}

function getContrastTextColor(hex: string): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16) || 24;
  const g = parseInt(clean.substring(2, 4), 16) || 24;
  const b = parseInt(clean.substring(4, 6), 16) || 27;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.62 ? '#141416' : '#F7F7F5';
}

export const ProductArtwork: React.FC<ProductArtworkProps> = ({
  category,
  shellHex,
  accentHex,
  pattern = 'solid',
  addon = 'none',
  monogram = '',
  className = '',
}) => {
  const uid = React.useId().replace(/:/g, '');
  const textOnShell = getContrastTextColor(shellHex);
  const displayMonogram = monogram.trim().toUpperCase().slice(0, 12);

  const renderPatternDefs = () => (
    <defs>
      <filter id={`shadow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#141416" floodOpacity="0.14" />
      </filter>
      <pattern id={`ridge-${uid}`} width="16" height="16" patternUnits="userSpaceOnUse">
        <path
          d="M 0 8 L 16 8"
          stroke={textOnShell}
          strokeOpacity="0.12"
          strokeWidth="1.5"
        />
      </pattern>
      <pattern id={`carbon-${uid}`} width="12" height="12" patternUnits="userSpaceOnUse">
        <rect width="6" height="6" fill={textOnShell} fillOpacity="0.08" />
        <rect x="6" y="6" width="6" height="6" fill={textOnShell} fillOpacity="0.08" />
      </pattern>
      <pattern id={`topo-${uid}`} width="48" height="48" patternUnits="userSpaceOnUse">
        <path
          d="M0 24 Q 12 12, 24 24 T 48 24 M0 40 Q 12 28, 24 40 T 48 40 M0 8 Q 12 -4, 24 8 T 48 8"
          fill="none"
          stroke={accentHex}
          strokeOpacity="0.32"
          strokeWidth="1.4"
        />
      </pattern>
    </defs>
  );

  const renderSurfaceFill = (x: number, y: number, w: number, h: number, rx: number) => {
    if (pattern === 'ridge') {
      return <rect x={x} y={y} width={w} height={h} rx={rx} fill={`url(#ridge-${uid})`} />;
    }
    if (pattern === 'carbon') {
      return <rect x={x} y={y} width={w} height={h} rx={rx} fill={`url(#carbon-${uid})`} />;
    }
    if (pattern === 'topo') {
      return <rect x={x} y={y} width={w} height={h} rx={rx} fill={`url(#topo-${uid})`} />;
    }
    if (pattern === 'stripe') {
      return (
        <g>
          <rect
            x={x + w * 0.14}
            y={y}
            width={w * 0.12}
            height={h}
            fill={accentHex}
            fillOpacity="0.92"
          />
          <rect
            x={x + w * 0.3}
            y={y}
            width={w * 0.04}
            height={h}
            fill={accentHex}
            fillOpacity="0.55"
          />
        </g>
      );
    }
    return null;
  };

  return (
    <svg
      viewBox="0 0 360 270"
      className={`w-full h-full select-none ${className}`}
      role="img"
      aria-label={`${category} protective product illustration`}
    >
      {renderPatternDefs()}
      {/* Studio surface horizon */}
      <ellipse cx="180" cy="234" rx="108" ry="12" fill="#141416" fillOpacity="0.06" />

      {category === 'phone' && (
        <g filter={`url(#shadow-${uid})`}>
          {/* Outer protective accent bumper */}
          <rect x="116" y="26" width="128" height="212" rx="24" fill={accentHex} />
          {/* Primary shell */}
          <rect x="121" y="31" width="118" height="202" rx="20" fill={shellHex} />
          {renderSurfaceFill(121, 31, 118, 202, 20)}

          {/* Camera island */}
          <rect
            x="131"
            y="41"
            width="46"
            height="48"
            rx="11"
            fill="#111113"
            stroke={accentHex}
            strokeWidth="2.5"
          />
          <circle cx="144" cy="54" r="7.5" fill="#27272A" stroke="#52525B" strokeWidth="1.5" />
          <circle cx="144" cy="54" r="3.2" fill="#09090B" />
          <circle cx="164" cy="65" r="7.5" fill="#27272A" stroke="#52525B" strokeWidth="1.5" />
          <circle cx="164" cy="65" r="3.2" fill="#09090B" />
          <circle cx="144" cy="76" r="5" fill="#27272A" />
          <circle cx="164" cy="49" r="3" fill="#E4E4E7" fillOpacity="0.7" />

          {/* MagSafe architectural ring */}
          <circle
            cx="180"
            cy="134"
            r="26"
            fill="none"
            stroke={textOnShell}
            strokeOpacity="0.22"
            strokeWidth="4"
          />
          <rect
            x="178"
            y="167"
            width="4"
            height="14"
            rx="2"
            fill={textOnShell}
            fillOpacity="0.22"
          />

          {/* Monogram */}
          {displayMonogram && (
            <text
              x="180"
              y="206"
              textAnchor="middle"
              fill={textOnShell}
              fontSize="12"
              fontWeight="700"
              fontFamily="Outfit, sans-serif"
              letterSpacing="2.2"
            >
              {displayMonogram}
            </text>
          )}

          {/* Active tether addon */}
          {addon === 'tether' && (
            <g>
              <rect x="171" y="233" width="18" height="7" rx="3" fill={accentHex} />
              <path
                d="M 180 240 C 180 258, 224 256, 232 238"
                fill="none"
                stroke={accentHex}
                strokeWidth="4"
                strokeLinecap="round"
              />
            </g>
          )}
          {addon === 'carabiner' && (
            <g>
              <rect x="174" y="233" width="12" height="6" rx="2" fill="#52525B" />
              <rect
                x="170"
                y="238"
                width="20"
                height="24"
                rx="9"
                fill="none"
                stroke="#3F3F46"
                strokeWidth="4"
              />
            </g>
          )}
        </g>
      )}

      {category === 'earbuds' && (
        <g filter={`url(#shadow-${uid})`}>
          {/* Carabiner attachment */}
          {(addon === 'carabiner' || addon === 'tether') && (
            <g>
              <rect x="224" y="96" width="18" height="10" rx="3" fill={accentHex} />
              <rect
                x="236"
                y="84"
                width="32"
                height="48"
                rx="14"
                fill="none"
                stroke="#27272A"
                strokeWidth="5"
              />
              <line
                x1="268"
                y1="98"
                x2="268"
                y2="118"
                stroke={accentHex}
                strokeWidth="5"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Outer bumper armor */}
          <rect x="108" y="66" width="126" height="134" rx="36" fill={accentHex} />
          {/* Inner shell */}
          <rect x="114" y="72" width="114" height="122" rx="31" fill={shellHex} />
          {renderSurfaceFill(114, 72, 114, 122, 31)}

          {/* Lid seam & latch */}
          <line
            x1="114"
            y1="114"
            x2="228"
            y2="114"
            stroke={accentHex}
            strokeWidth="3.5"
          />
          <rect x="155" y="108" width="32" height="12" rx="4" fill={accentHex} />
          <circle cx="171" cy="134" r="3" fill={accentHex} />

          {/* Side impact ribs */}
          <rect x="104" y="122" width="6" height="30" rx="3" fill={accentHex} />
          <rect x="232" y="122" width="6" height="30" rx="3" fill={accentHex} />

          {displayMonogram && (
            <text
              x="171"
              y="168"
              textAnchor="middle"
              fill={textOnShell}
              fontSize="12"
              fontWeight="700"
              fontFamily="Outfit, sans-serif"
              letterSpacing="2"
            >
              {displayMonogram}
            </text>
          )}
        </g>
      )}

      {category === 'laptop' && (
        <g filter={`url(#shadow-${uid})`}>
          {/* Outer corner-suspension bumper frame */}
          <rect x="44" y="54" width="272" height="172" rx="18" fill={accentHex} />
          {/* Technical weave body */}
          <rect x="50" y="60" width="260" height="160" rx="14" fill={shellHex} />
          {renderSurfaceFill(50, 60, 260, 160, 14)}

          {/* Protective corner guards */}
          <path d="M 44 82 L 44 68 Q 44 54 58 54 L 72 54" fill="none" stroke={accentHex} strokeWidth="7" strokeLinecap="round" />
          <path d="M 316 82 L 316 68 Q 316 54 302 54 L 288 54" fill="none" stroke={accentHex} strokeWidth="7" strokeLinecap="round" />
          <path d="M 44 198 L 44 212 Q 44 226 58 226 L 72 226" fill="none" stroke={accentHex} strokeWidth="7" strokeLinecap="round" />
          <path d="M 316 198 L 316 212 Q 316 226 302 226 L 288 226" fill="none" stroke={accentHex} strokeWidth="7" strokeLinecap="round" />

          {/* Front pocket seam */}
          <line
            x1="50"
            y1="108"
            x2="310"
            y2="108"
            stroke={textOnShell}
            strokeOpacity="0.22"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <rect x="160" y="99" width="40" height="18" rx="4" fill={accentHex} />
          <text
            x="180"
            y="111"
            textAnchor="middle"
            fill={getContrastTextColor(accentHex)}
            fontSize="8.5"
            fontWeight="700"
            fontFamily="JetBrains Mono, monospace"
          >
            360°
          </text>

          {displayMonogram && (
            <text
              x="180"
              y="188"
              textAnchor="middle"
              fill={textOnShell}
              fontSize="14"
              fontWeight="700"
              fontFamily="Outfit, sans-serif"
              letterSpacing="2.5"
            >
              {displayMonogram}
            </text>
          )}
        </g>
      )}

      {category === 'bottle' && (
        <g filter={`url(#shadow-${uid})`}>
          {/* Carry loop & Sport Cap */}
          {addon === 'hydration-loop' && (
            <path
              d="M 155 44 C 134 44, 132 18, 158 18 L 202 18 C 228 18, 226 44, 205 44"
              fill="none"
              stroke={accentHex}
              strokeWidth="6"
              strokeLinecap="round"
            />
          )}
          <rect x="150" y="28" width="60" height="22" rx="6" fill="#27272A" />
          <rect x="146" y="45" width="68" height="10" rx="4" fill={accentHex} />

          {/* Bottle neck */}
          <path d="M 152 55 L 208 55 L 222 78 L 138 78 Z" fill={shellHex} />

          {/* Main insulated stainless body */}
          <rect x="136" y="76" width="88" height="150" rx="14" fill={shellHex} />
          {renderSurfaceFill(136, 76, 88, 150, 14)}

          {/* Subtle vertical specular highlight */}
          <rect
            x="148"
            y="84"
            width="8"
            height="86"
            rx="4"
            fill="#FFFFFF"
            fillOpacity="0.14"
          />

          {/* Protective silicone base boot */}
          <path
            d="M 134 176 L 226 176 L 226 218 Q 226 232 212 232 L 148 232 Q 134 232 134 218 Z"
            fill={accentHex}
          />
          <line
            x1="142"
            y1="192"
            x2="218"
            y2="192"
            stroke={getContrastTextColor(accentHex)}
            strokeOpacity="0.22"
            strokeWidth="2"
          />
          <line
            x1="142"
            y1="202"
            x2="218"
            y2="202"
            stroke={getContrastTextColor(accentHex)}
            strokeOpacity="0.22"
            strokeWidth="2"
          />

          {displayMonogram && (
            <text
              x="180"
              y="142"
              textAnchor="middle"
              fill={textOnShell}
              fontSize="13"
              fontWeight="700"
              fontFamily="Outfit, sans-serif"
              letterSpacing="2"
            >
              {displayMonogram}
            </text>
          )}
        </g>
      )}
    </svg>
  );
};

export const HeroGearShowcase: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[360px] lg:min-h-[460px] bg-[#141D2F] border border-white/15 rounded-sm overflow-hidden flex flex-col justify-between p-6 lg:p-8">
      <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
        <span>4-PIECE ACTIVE SYSTEM</span>
        <span>1-YR WARRANTY</span>
      </div>

      <div className="grid grid-cols-2 gap-3.5 my-auto py-4">
        <div className="bg-[#F4F4F4] rounded-sm p-3 flex flex-col items-center group">
          <div className="w-full h-32 transition-transform duration-200 group-hover:scale-105">
            <ProductArtwork
              category="phone"
              shellHex="#111111"
              accentHex="#0047FF"
              pattern="ridge"
              addon="tether"
            />
          </div>
          <span className="mt-1 text-xs font-semibold text-[#0A0A0A]">Stride Phone Armor</span>
        </div>
        <div className="bg-[#F4F4F4] rounded-sm p-3 flex flex-col items-center group">
          <div className="w-full h-32 transition-transform duration-200 group-hover:scale-105">
            <ProductArtwork
              category="bottle"
              shellHex="#4E5B3C"
              accentHex="#F3E16B"
              pattern="solid"
              addon="hydration-loop"
            />
          </div>
          <span className="mt-1 text-xs font-semibold text-[#0A0A0A]">HydraGuard 750ml</span>
        </div>
        <div className="bg-[#F4F4F4] rounded-sm p-3 flex flex-col items-center group">
          <div className="w-full h-32 transition-transform duration-200 group-hover:scale-105">
            <ProductArtwork
              category="earbuds"
              shellHex="#0047FF"
              accentHex="#F4F4F4"
              pattern="solid"
              addon="carabiner"
            />
          </div>
          <span className="mt-1 text-xs font-semibold text-[#0A0A0A]">Pulse Earbud Shell</span>
        </div>
        <div className="bg-[#F4F4F4] rounded-sm p-3 flex flex-col items-center group">
          <div className="w-full h-32 transition-transform duration-200 group-hover:scale-105">
            <ProductArtwork
              category="laptop"
              shellHex="#4A3525"
              accentHex="#F3E16B"
              pattern="carbon"
            />
          </div>
          <span className="mt-1 text-xs font-semibold text-[#0A0A0A]">Transit 14&quot; Sleeve</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/15 text-xs text-[#CBD5E1]">
        <span>Phones · Earbuds · Laptops · Bottles</span>
        <span className="font-mono text-white font-semibold">Custom or Designer Series</span>
      </div>
    </div>
  );
};
