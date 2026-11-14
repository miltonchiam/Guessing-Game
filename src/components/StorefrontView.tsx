import React, { useMemo, useState } from 'react';
import { ArrowRight, Check, Search, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { CUSTOMER_SEGMENTS, PRODUCTS } from '../data/storeData';
import {
  AppTab,
  CartItem,
  CustomerSegment,
  Product,
  ProductCategory,
} from '../types';
import { HeroGearShowcase, ProductArtwork } from './ProductArtwork';

interface StorefrontViewProps {
  onAddToCart: (item: Omit<CartItem, 'cartId'>) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateTab: (tab: AppTab) => void;
  onOpenStudioWithCategory: (category: ProductCategory) => void;
}

type CategoryFilter = 'all' | ProductCategory | 'designer';

export const StorefrontView: React.FC<StorefrontViewProps> = ({
  onAddToCart,
  onSelectProduct,
  onNavigateTab,
  onOpenStudioWithCategory,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [segmentFilter, setSegmentFilter] = useState<'all' | CustomerSegment>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColors, setSelectedColors] = useState<Record<string, number>>({});
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        categoryFilter === 'all'
          ? true
          : categoryFilter === 'designer'
            ? product.isDesignerSeries
            : product.category === categoryFilter;

      const matchesSegment =
        segmentFilter === 'all' ? true : product.segments.includes(segmentFilter);

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.summary.toLowerCase().includes(q) ||
        product.categoryLabel.toLowerCase().includes(q) ||
        (product.designerCollab?.toLowerCase().includes(q) ?? false);

      return matchesCategory && matchesSegment && matchesSearch;
    });
  }, [categoryFilter, segmentFilter, searchQuery]);

  const handleQuickAdd = (product: Product) => {
    const colorIndex = selectedColors[product.id] ?? 0;
    const variant = product.colors[colorIndex] ?? product.colors[0];

    onAddToCart({
      productId: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: 1,
      shellHex: variant.shellHex,
      accentHex: variant.accentHex,
      colorLabel: variant.name,
      pattern: product.defaultPattern,
      addon: product.defaultAddon,
      isCustom: false,
      designerCollab: product.designerCollab,
    });

    setRecentlyAddedId(product.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === product.id ? null : prev));
    }, 1200);
  };

  return (
    <div className="space-y-14 pb-16">
      {/* Section 1: LSKD-Style Stark Monochrome Dark Campaign Hero */}
      <section className="bg-[#0A0A0A] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between py-2">
              <div>
                <p className="text-xs font-mono font-semibold text-[#8BB8E8] tracking-wider">
                  Run · Train · Commute · All Day Active
                </p>
                <h1
                  className="mt-4 font-display font-extrabold tracking-tight text-white leading-[0.98]"
                  style={{
                    fontSize: 'clamp(2.75rem, 5vw, 4.5rem)',
                    textWrap: 'balance',
                  }}
                >
                  Wholistic Gear Armor. 1% Better Every Drop.
                </h1>
                <p className="mt-5 text-base text-[#CBD5E1] leading-relaxed max-w-xl">
                  Built for runners, gym crews, students, commuters, and kids. Customize every
                  phone case, earbud shell, laptop sleeve, and insulated bottle—or shop limited
                  KOL Designer Series capsules.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center gap-3">
                <a
                  href="#catalog"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#0A0A0A] bg-white hover:bg-[#F3E16B] rounded-sm transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Shop All Gear</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={() => onNavigateTab('studio')}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#0047FF] hover:bg-[#1D4ED8] rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
                  <span>Custom Studio</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <HeroGearShowcase />
            </div>
          </div>

          {/* 4-column Architectural Value Strip */}
          <div className="mt-10 pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-xs font-mono text-[#F3E16B]">01 · CUSTOMIZABLE</p>
              <h2 className="mt-1 font-display text-xl font-bold text-white">
                Uniquely Designed By You
              </h2>
              <p className="mt-1 text-sm text-[#94A3B8]">
                Pick shell tones, bumper accents, grip patterns, and custom monograms.
              </p>
            </div>
            <div>
              <p className="text-xs font-mono text-[#8BB8E8]">02 · ACTIVE LIFESTYLE</p>
              <h2 className="mt-1 font-display text-xl font-bold text-white">
                Hydration &amp; Tech Gear
              </h2>
              <p className="mt-1 text-sm text-[#94A3B8]">
                Insulated bottles and sweatproof gadget armor engineered for daily movement.
              </p>
            </div>
            <div>
              <p className="text-xs font-mono text-[#F3E16B]">03 · DESIGNER SERIES</p>
              <h2 className="mt-1 font-display text-xl font-bold text-white">
                KOL &amp; Studio Capsules
              </h2>
              <p className="mt-1 text-sm text-[#94A3B8]">
                Limited-run editions co-created with endurance runners and coaches.
              </p>
            </div>
            <div>
              <p className="text-xs font-mono text-[#8BB8E8]">04 · COVERAGE</p>
              <h2 className="mt-1 font-display text-xl font-bold text-white">
                1-Year Defect Warranty
              </h2>
              <p className="mt-1 text-sm text-[#94A3B8]">
                Every protector and bottle includes 1-year manufacturing defect protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Featured Collection & Shop by Crew Filters */}
      <section id="catalog" className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-black/15">
          <div>
            <p className="text-xs font-mono font-semibold text-[#0047FF]">
              SHOP BY CATEGORY &amp; ACTIVITY
            </p>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0A0A0A]">
              Protective Gear &amp; Designer Drops
            </h2>
          </div>

          <div className="relative w-full lg:w-72">
            <Search
              className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cases, bottles, KOL..."
              aria-label="Search catalog"
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F4F4F4] border border-black/10 rounded-sm text-[#0A0A0A] placeholder:text-[#6B7280] focus:outline-none focus:border-[#0A0A0A]"
            />
          </div>
        </div>

        {/* Category Segmented Tabs & Segment Filter Bar */}
        <div className="mt-6 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Product categories"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#F4F4F4] rounded-sm w-fit"
          >
            {(
              [
                { id: 'all', label: 'All Gear' },
                { id: 'phone', label: 'Phones' },
                { id: 'earbuds', label: 'Earbuds' },
                { id: 'laptop', label: 'Laptops' },
                { id: 'bottle', label: 'Bottles' },
                { id: 'designer', label: 'Designer Series' },
              ] as { id: CategoryFilter; label: string }[]
            ).map((tab) => {
              const active = categoryFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setCategoryFilter(tab.id)}
                  className={`px-4 py-2 text-xs font-semibold rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#0A0A0A] text-white'
                      : 'text-[#52525B] hover:text-[#0A0A0A]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-[#6B7280] mr-1">Activity Crew:</span>
            <button
              type="button"
              onClick={() => setSegmentFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-sm border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                segmentFilter === 'all'
                  ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                  : 'bg-white text-[#52525B] border-black/15 hover:border-[#0A0A0A] hover:text-[#0A0A0A]'
              }`}
            >
              All
            </button>
            {CUSTOMER_SEGMENTS.map((seg) => {
              const active = segmentFilter === seg.id;
              return (
                <button
                  key={seg.id}
                  type="button"
                  onClick={() => setSegmentFilter(seg.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-sm border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#0047FF] text-white border-[#0047FF]'
                      : 'bg-white text-[#52525B] border-black/15 hover:border-[#0A0A0A] hover:text-[#0A0A0A]'
                  }`}
                >
                  {seg.headline}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Column LSKD Studio Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="mt-10 bg-[#F4F4F4] rounded-sm p-12 text-center">
            <p className="font-display text-2xl font-bold text-[#0A0A0A]">
              No matching gear in this filter
            </p>
            <p className="mt-1 text-sm text-[#52525B]">
              Reset your filters or build a custom piece in the Studio.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setCategoryFilter('all');
                  setSegmentFilter('all');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 text-xs font-semibold bg-white border border-black/20 text-[#0A0A0A] rounded-sm cursor-pointer"
              >
                Reset Filters
              </button>
              <button
                type="button"
                onClick={() => onNavigateTab('studio')}
                className="px-5 py-2.5 text-xs font-semibold bg-[#0A0A0A] text-white rounded-sm cursor-pointer"
              >
                Open Custom Studio
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {filteredProducts.map((product) => {
              const colorIdx = selectedColors[product.id] ?? 0;
              const activeVariant = product.colors[colorIdx] ?? product.colors[0];
              const isAdded = recentlyAddedId === product.id;

              return (
                <article key={product.id} className="group flex flex-col">
                  {/* Studio Product Image Surface (#F4F4F4 like LSKD) */}
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className="relative w-full aspect-[4/3] bg-[#F4F4F4] rounded-sm p-6 flex items-center justify-center overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0047FF]"
                  >
                    <div className="w-full h-full transition-transform duration-200 group-hover:scale-[1.03]">
                      <ProductArtwork
                        category={product.category}
                        shellHex={activeVariant.shellHex}
                        accentHex={activeVariant.accentHex}
                        pattern={product.defaultPattern}
                        addon={product.defaultAddon}
                      />
                    </div>
                  </button>

                  {/* Product Metadata & Actions */}
                  <div className="pt-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 text-xs text-[#6B7280]">
                        <span className="truncate">
                          {product.categoryLabel}
                          {product.isDesignerSeries ? ' · Designer Series' : ' · Core'}
                        </span>
                        <span className="font-mono text-[11px] shrink-0">{product.dropRating}</span>
                      </div>

                      <div className="mt-1.5 flex items-baseline justify-between gap-4">
                        <h3 className="font-display text-xl font-bold text-[#0A0A0A]">
                          <button
                            type="button"
                            onClick={() => onSelectProduct(product)}
                            className="text-left hover:text-[#0047FF] transition-colors cursor-pointer"
                          >
                            {product.name}
                          </button>
                        </h3>
                        <span className="font-mono text-base font-semibold text-[#0A0A0A] tabular-nums shrink-0">
                          ${product.price}
                        </span>
                      </div>

                      {product.designerCollab && (
                        <p className="mt-0.5 text-xs font-semibold text-[#0047FF]">
                          {product.designerCollab}
                        </p>
                      )}

                      <p className="mt-1.5 text-sm text-[#52525B] line-clamp-2">
                        {product.summary}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-black/10 space-y-3.5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          {product.colors.map((variant, idx) => {
                            const selected = idx === colorIdx;
                            return (
                              <button
                                key={variant.name}
                                type="button"
                                onClick={() =>
                                  setSelectedColors((prev) => ({ ...prev, [product.id]: idx }))
                                }
                                title={variant.name}
                                aria-label={`Select ${variant.name} colorway`}
                                className={`w-5 h-5 rounded-full border transition-transform cursor-pointer ${
                                  selected
                                    ? 'ring-2 ring-[#0A0A0A] ring-offset-2 border-black/30 scale-110'
                                    : 'border-black/20 hover:scale-105'
                                }`}
                                style={{ backgroundColor: variant.shellHex }}
                              />
                            );
                          })}
                          <span className="text-xs text-[#6B7280] ml-1 truncate max-w-[125px]">
                            {activeVariant.name}
                          </span>
                        </div>
                        <span className="text-xs text-[#6B7280] truncate">
                          {product.segments.slice(0, 2).join(' · ')}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => handleQuickAdd(product)}
                          className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            isAdded
                              ? 'bg-[#0047FF] text-white'
                              : 'bg-[#0A0A0A] text-white hover:bg-[#0047FF]'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Added</span>
                            </>
                          ) : (
                            <span>Quick Add</span>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenStudioWithCategory(product.category)}
                          className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-[#0A0A0A] bg-[#F4F4F4] hover:bg-[#E5E5E5] rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          Customize
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Section 3: LSKD Future Navy Community & B2B Banner */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="bg-[#141D2F] text-white rounded-sm p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-mono text-[#F3E16B]">
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              <span>1-YEAR MANUFACTURING DEFECT WARRANTY · B2C &amp; B2B/SCHOOL</span>
            </div>
            <h2
              className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              Outfitting teams, campus clubs, and corporate pop-ups.
            </h2>
            <p className="text-sm sm:text-base text-[#CBD5E1] max-w-2xl leading-relaxed">
              Co-producing directly with our bottle manufacturer and KOL athletes, we build
              custom-branded hydration and gadget armor kits for schools, running clubs, gyms,
              and corporate events.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3">
            <button
              type="button"
              onClick={() => onNavigateTab('b2b')}
              className="px-6 py-3 text-sm font-semibold bg-white hover:bg-[#F3E16B] text-[#0A0A0A] rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              B2B &amp; School Bulk Orders
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('community')}
              className="px-6 py-3 text-sm font-semibold bg-[#0047FF] hover:bg-[#1D4ED8] text-white rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Pop-Ups &amp; Warranty
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
