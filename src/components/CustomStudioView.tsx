import React, { useMemo, useState } from 'react';
import { Check, RotateCcw, ShieldCheck } from 'lucide-react';
import {
  CUSTOMER_SEGMENTS,
  STUDIO_ACCENT_SWATCHES,
  STUDIO_SHELL_COLORS,
} from '../data/storeData';
import {
  ActiveAddon,
  CartItem,
  CustomerSegment,
  PatternStyle,
  ProductCategory,
} from '../types';
import { ProductArtwork } from './ProductArtwork';

interface CustomStudioViewProps {
  initialCategory?: ProductCategory;
  onAddToCart: (item: Omit<CartItem, 'cartId'>) => void;
}

const CATEGORY_OPTIONS: {
  id: ProductCategory;
  label: string;
  basePrice: number;
  defaultAddon: ActiveAddon;
}[] = [
  { id: 'phone', label: 'Phone Armor Case', basePrice: 46, defaultAddon: 'tether' },
  { id: 'earbuds', label: 'Earbud Lock Shell', basePrice: 38, defaultAddon: 'carabiner' },
  { id: 'laptop', label: 'Laptop Shield Sleeve', basePrice: 72, defaultAddon: 'none' },
  { id: 'bottle', label: 'Insulated Bottle + Boot', basePrice: 52, defaultAddon: 'hydration-loop' },
];

const PATTERN_OPTIONS: { id: PatternStyle; label: string; upcharge: number }[] = [
  { id: 'solid', label: 'Matte Solid', upcharge: 0 },
  { id: 'ridge', label: 'Grip Ridge', upcharge: 4 },
  { id: 'topo', label: 'Trail Topo', upcharge: 6 },
  { id: 'carbon', label: 'Carbon Weave', upcharge: 6 },
  { id: 'stripe', label: 'Varsity Stripe', upcharge: 4 },
];

const ADDON_OPTIONS: { id: ActiveAddon; label: string; upcharge: number }[] = [
  { id: 'none', label: 'Standard', upcharge: 0 },
  { id: 'carabiner', label: 'Carabiner Clip', upcharge: 6 },
  { id: 'tether', label: 'Active Tether', upcharge: 8 },
  { id: 'hydration-loop', label: 'Carry Loop', upcharge: 5 },
];

const SEGMENT_PRESETS: Record<
  CustomerSegment,
  {
    shellIdx: number;
    accentIdx: number;
    pattern: PatternStyle;
    addon: ActiveAddon;
    monogram: string;
  }
> = {
  Runners: {
    shellIdx: 0,
    accentIdx: 3,
    pattern: 'topo',
    addon: 'tether',
    monogram: 'RUN 10K',
  },
  'Gym Members': {
    shellIdx: 4,
    accentIdx: 0,
    pattern: 'ridge',
    addon: 'hydration-loop',
    monogram: 'LIFT',
  },
  Students: {
    shellIdx: 2,
    accentIdx: 0,
    pattern: 'stripe',
    addon: 'carabiner',
    monogram: 'CLASS 26',
  },
  'Office Workers': {
    shellIdx: 3,
    accentIdx: 3,
    pattern: 'carbon',
    addon: 'none',
    monogram: 'STUDIO',
  },
  Children: {
    shellIdx: 1,
    accentIdx: 0,
    pattern: 'stripe',
    addon: 'hydration-loop',
    monogram: 'PLAY',
  },
};

export const CustomStudioView: React.FC<CustomStudioViewProps> = ({
  initialCategory = 'phone',
  onAddToCart,
}) => {
  const [category, setCategory] = useState<ProductCategory>(initialCategory);
  const [shellIdx, setShellIdx] = useState(0);
  const [accentIdx, setAccentIdx] = useState(3);
  const [pattern, setPattern] = useState<PatternStyle>('ridge');
  const [addon, setAddon] = useState<ActiveAddon>('tether');
  const [monogram, setMonogram] = useState('ACTIVE');
  const [segment, setSegment] = useState<CustomerSegment>('Runners');
  const [addedFeedback, setAddedFeedback] = useState(false);

  const selectedCategoryObj =
    CATEGORY_OPTIONS.find((c) => c.id === category) ?? CATEGORY_OPTIONS[0];
  const shellVariant = STUDIO_SHELL_COLORS[shellIdx] ?? STUDIO_SHELL_COLORS[0];
  const accentSwatch = STUDIO_ACCENT_SWATCHES[accentIdx] ?? STUDIO_ACCENT_SWATCHES[0];
  const patternObj = PATTERN_OPTIONS.find((p) => p.id === pattern) ?? PATTERN_OPTIONS[0];
  const addonObj = ADDON_OPTIONS.find((a) => a.id === addon) ?? ADDON_OPTIONS[0];
  const monogramCost = monogram.trim().length > 0 ? 5 : 0;

  const totalPrice = useMemo(() => {
    return (
      selectedCategoryObj.basePrice + patternObj.upcharge + addonObj.upcharge + monogramCost
    );
  }, [selectedCategoryObj, patternObj, addonObj, monogramCost]);

  const applySegmentPreset = (seg: CustomerSegment) => {
    const preset = SEGMENT_PRESETS[seg];
    setSegment(seg);
    setShellIdx(preset.shellIdx);
    setAccentIdx(preset.accentIdx);
    setPattern(preset.pattern);
    setAddon(preset.addon);
    setMonogram(preset.monogram);
  };

  const resetDesign = () => {
    setShellIdx(0);
    setAccentIdx(3);
    setPattern('solid');
    setAddon('none');
    setMonogram('');
  };

  const handleAddCustomToBag = () => {
    onAddToCart({
      productId: `custom-${category}-${Date.now()}`,
      name: `Custom ${selectedCategoryObj.label}`,
      category,
      price: totalPrice,
      quantity: 1,
      shellHex: shellVariant.shellHex,
      accentHex: accentSwatch.hex,
      colorLabel: `${shellVariant.name} / ${accentSwatch.name}`,
      pattern,
      addon,
      monogram: monogram.trim().toUpperCase(),
      isCustom: true,
    });
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 1400);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 lg:py-12 space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b-2 border-[#111111]">
        <div>
          <p className="text-xs font-mono font-bold text-[#2563EB]">
            CUSTOM STUDIO · UNIQUELY DESIGNED BY YOU
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
            Remix Your Active Gear Protector
          </h1>
          <p className="mt-1.5 text-sm text-[#52525B]">
            Mix shell colors, shock-absorbing bumper trims, surface textures, custom text, and
            carry hardware.
          </p>
        </div>

        <button
          type="button"
          onClick={resetDesign}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#111111] bg-white border-2 border-[#111111] hover:bg-[#FAF9F5] rounded-xl shadow-[3px_3px_0px_0px_#111111] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all w-fit cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Reset Build</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Live Preview Canvas */}
        <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-5">
          <div className="bg-[#EDE9FE] border-2 border-[#111111] rounded-2xl shadow-[6px_6px_0px_0px_#111111] p-6 sm:p-10">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-[#111111] mb-4">
              <span>LIVE STUDIO · {selectedCategoryObj.label.toUpperCase()}</span>
              <span>{segment.toUpperCase()} SPEC</span>
            </div>
            <div className="aspect-[4/3] w-full bg-white border-2 border-[#111111] rounded-xl p-4 flex items-center justify-center">
              <ProductArtwork
                category={category}
                shellHex={shellVariant.shellHex}
                accentHex={accentSwatch.hex}
                pattern={pattern}
                addon={addon}
                monogram={monogram}
              />
            </div>
            <div className="mt-6 pt-4 border-t-2 border-[#111111] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <p className="text-[#52525B] font-medium">Shell</p>
                <p className="font-bold text-[#111111] truncate">{shellVariant.name}</p>
              </div>
              <div>
                <p className="text-[#52525B] font-medium">Bumper</p>
                <p className="font-bold text-[#111111] truncate">{accentSwatch.name}</p>
              </div>
              <div>
                <p className="text-[#52525B] font-medium">Pattern</p>
                <p className="font-bold text-[#111111] truncate">{patternObj.label}</p>
              </div>
              <div>
                <p className="text-[#52525B] font-medium">Add-On</p>
                <p className="font-bold text-[#111111] truncate">{addonObj.label}</p>
              </div>
            </div>
          </div>

          {/* Segment Quick-Load Presets */}
          <div className="bg-white border-2 border-[#111111] rounded-2xl shadow-[4px_4px_0px_0px_#111111] p-5">
            <p className="text-xs font-bold text-[#111111] mb-3">
              Load Crew Colorway Preset
            </p>
            <div className="flex flex-wrap gap-2">
              {CUSTOMER_SEGMENTS.map((seg) => (
                <button
                  key={seg.id}
                  type="button"
                  onClick={() => applySegmentPreset(seg.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border-2 border-[#111111] transition-all cursor-pointer whitespace-nowrap ${
                    segment === seg.id
                      ? 'bg-[#C8F135] text-[#111111] shadow-[2px_2px_0px_0px_#111111]'
                      : 'bg-[#FAF9F5] text-[#52525B] hover:text-[#111111]'
                  }`}
                >
                  {seg.headline}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Configurator Controls */}
        <div className="lg:col-span-6 bg-white border-2 border-[#111111] rounded-2xl shadow-[6px_6px_0px_0px_#111111] p-6 sm:p-8 space-y-7">
          {/* 1. Accessory Type */}
          <div>
            <label className="block text-xs font-bold text-[#111111] mb-3">
              01. Choose Gadget or Supply
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {CATEGORY_OPTIONS.map((opt) => {
                const active = category === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setCategory(opt.id);
                      setAddon(opt.defaultAddon);
                    }}
                    className={`p-3.5 text-left rounded-xl border-2 border-[#111111] transition-all cursor-pointer ${
                      active
                        ? 'bg-[#C8F135] shadow-[3px_3px_0px_0px_#111111]'
                        : 'bg-[#FAF9F5] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-[#111111]">{opt.label}</span>
                      <span className="font-mono text-xs font-bold text-[#111111] tabular-nums">
                        ${opt.basePrice}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Shell Colorway */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#111111]">02. Shell Finish</span>
              <span className="text-xs font-semibold text-[#52525B]">{shellVariant.name}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {STUDIO_SHELL_COLORS.map((swatch, idx) => (
                <button
                  key={swatch.name}
                  type="button"
                  onClick={() => setShellIdx(idx)}
                  aria-label={`Shell ${swatch.name}`}
                  className={`w-10 h-10 rounded-xl border-2 border-[#111111] cursor-pointer transition-transform ${
                    shellIdx === idx
                      ? 'ring-2 ring-[#2563EB] ring-offset-2 scale-110 shadow-[2px_2px_0px_0px_#111111]'
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: swatch.shellHex }}
                />
              ))}
            </div>
          </div>

          {/* 3. Accent Bumper Trim */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#111111]">
                03. Impact Bumper Accent
              </span>
              <span className="text-xs font-semibold text-[#52525B]">{accentSwatch.name}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {STUDIO_ACCENT_SWATCHES.map((swatch, idx) => (
                <button
                  key={swatch.name}
                  type="button"
                  onClick={() => setAccentIdx(idx)}
                  aria-label={`Accent ${swatch.name}`}
                  className={`w-10 h-10 rounded-xl border-2 border-[#111111] cursor-pointer transition-transform ${
                    accentIdx === idx
                      ? 'ring-2 ring-[#2563EB] ring-offset-2 scale-110 shadow-[2px_2px_0px_0px_#111111]'
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: swatch.hex }}
                />
              ))}
            </div>
          </div>

          {/* 4. Surface Texture & Pattern */}
          <div>
            <span className="block text-xs font-bold text-[#111111] mb-3">
              04. Surface Texture &amp; Pattern
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {PATTERN_OPTIONS.map((p) => {
                const active = pattern === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPattern(p.id)}
                    className={`px-3 py-2.5 text-xs font-bold rounded-xl border-2 border-[#111111] flex items-center justify-between cursor-pointer transition-all ${
                      active
                        ? 'bg-[#FFE3D3] text-[#111111] shadow-[2px_2px_0px_0px_#111111]'
                        : 'bg-[#FAF9F5] text-[#52525B] hover:text-[#111111]'
                    }`}
                  >
                    <span>{p.label}</span>
                    <span className="font-mono text-[11px]">
                      {p.upcharge > 0 ? `+$${p.upcharge}` : 'Incl.'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Active Attachment */}
          <div>
            <span className="block text-xs font-bold text-[#111111] mb-3">
              05. Active Hardware Attachment
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {ADDON_OPTIONS.map((opt) => {
                const active = addon === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setAddon(opt.id)}
                    className={`px-3 py-2.5 text-xs font-bold rounded-xl border-2 border-[#111111] flex items-center justify-between cursor-pointer transition-all ${
                      active
                        ? 'bg-[#DBEAFE] text-[#111111] shadow-[2px_2px_0px_0px_#111111]'
                        : 'bg-[#FAF9F5] text-[#52525B] hover:text-[#111111]'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span className="font-mono text-[11px]">
                      {opt.upcharge > 0 ? `+$${opt.upcharge}` : 'Incl.'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6. Custom Monogram Engraving */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="custom-monogram" className="text-xs font-bold text-[#111111]">
                06. Laser Monogram / Crew Tag (Max 12 chars)
              </label>
              <span className="font-mono text-xs font-semibold text-[#52525B]">
                {monogram.trim() ? '+$5' : 'Optional'}
              </span>
            </div>
            <input
              id="custom-monogram"
              type="text"
              maxLength={12}
              value={monogram}
              onChange={(e) => setMonogram(e.target.value)}
              placeholder="e.g. ALEX R. or TRACK"
              className="w-full px-3.5 py-2.5 text-sm font-mono font-bold uppercase bg-[#FAF9F5] border-2 border-[#111111] rounded-xl text-[#111111] focus:outline-none focus:bg-white"
            />
          </div>

          {/* Total & CTA */}
          <div className="pt-5 border-t-2 border-[#111111]/15 space-y-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#52525B]">
              <span className="inline-flex items-center gap-1.5 text-[#111111] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#059669]" aria-hidden="true" />
                1-Year Manufacturing Defect Warranty Included
              </span>
              <span className="font-mono">Ships in 3–5 days</span>
            </div>

            <button
              type="button"
              onClick={handleAddCustomToBag}
              className={`w-full py-3.5 px-6 rounded-xl border-2 border-[#111111] text-sm font-bold shadow-[4px_4px_0px_0px_#111111] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer ${
                addedFeedback
                  ? 'bg-[#C8F135] text-[#111111]'
                  : 'bg-[#FF6B2C] hover:bg-[#FF8552] text-[#111111]'
              }`}
            >
              {addedFeedback ? (
                <>
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Custom Build Added to Bag!</span>
                </>
              ) : (
                <span className="tabular-nums">
                  Add Custom {selectedCategoryObj.label} to Bag · ${totalPrice}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
