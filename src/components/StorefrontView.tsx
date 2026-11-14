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

const CARD_BACKDROPS = ['#F3F4F6', '#FFE8DC', '#EDE9FE', '#ECFCCB', '#DBEAFE', '#FEF3C7'];

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
    <div className="space-y-16 pb-16">
      {/* Section 1: Storefront Hero + 4-Column Color-Blocked Strip */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-8 lg:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between bg-white border-2 border-[#111111] rounded-2xl shadow-[6px_6px_0px_0px_#111111] p-8 lg:p-10">
            <div>
              <p className="text-xs font-mono font-bold text-[#2563EB] tracking-wide">
                Active Gear Protection · Phones · Earbuds · Laptops · Bottles
              </p>
              <h1
                className="mt-4 font-display font-extrabold tracking-tight text-[#111111] leading-[1.03]"
                style={{
                  fontSize: 'clamp(2.35rem, 4.2vw, 3.75rem)',
                  textWrap: 'balance',
                }}
              >
                Bold gear armor built to move with you.
              </h1>
              <p className="mt-5 text-base text-[#3F3F46] leading-relaxed max-w-xl">
                Wholistic protection in style for runners, gym crews, students, commuters, and
                kids. Remix your own gear in the Custom Studio or grab a limited Designer Series
                drop.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-[#111111] flex flex-wrap items-center gap-3.5">
              <a
                href="#catalog"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-[#111111] bg-[#FF6B2C] hover:bg-[#FF8552] border-2 border-[#111111] rounded-xl shadow-[3px_3px_0px_0px_#111111] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all whitespace-nowrap shrink-0"
              >
                <span>Shop the Drop</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => onNavigateTab('studio')}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-[#111111] bg-[#C8F135] hover:bg-[#D6F65C] border-2 border-[#111111] rounded-xl shadow-[3px_3px_0px_0px_#111111] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all whitespace-nowrap shrink-0 cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
                <span>Remix in Custom Studio</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <HeroGearShowcase />
          </div>
        </div>

        {/* 4-column Color-Blocked Key Propositions Strip */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#FFE3D3] border-2 border-[#111111] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#111111]">
            <p className="text-xs font-mono font-bold text-[#111111]">01 · CUSTOMIZABLE</p>
            <h2 className="mt-1.5 font-display text-lg font-extrabold text-[#111111]">
              Uniquely Designed By You
            </h2>
            <p className="mt-1 text-sm text-[#27272A]">
              Pick vibrant shell finishes, bumpers, patterns, and laser monograms.
            </p>
          </div>
          <div className="bg-[#DBEAFE] border-2 border-[#111111] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#111111]">
            <p className="text-xs font-mono font-bold text-[#111111]">02 · HEALTHY LIFESTYLE</p>
            <h2 className="mt-1.5 font-display text-lg font-extrabold text-[#111111]">
              Hydration &amp; Tech Gear
            </h2>
            <p className="mt-1 text-sm text-[#27272A]">
              Insulated bottles and sweatproof gadget armor built for daily movement.
            </p>
          </div>
          <div className="bg-[#EDE9FE] border-2 border-[#111111] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#111111]">
            <p className="text-xs font-mono font-bold text-[#111111]">03 · DESIGNER SERIES</p>
            <h2 className="mt-1.5 font-display text-lg font-extrabold text-[#111111]">
              KOL &amp; Studio Capsules
            </h2>
            <p className="mt-1 text-sm text-[#27272A]">
              Limited capsules co-created with trail runners, coaches, and artists.
            </p>
          </div>
          <div className="bg-[#C8F135] border-2 border-[#111111] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#111111]">
            <p className="text-xs font-mono font-bold text-[#111111]">04 · COVERAGE</p>
            <h2 className="mt-1.5 font-display text-lg font-extrabold text-[#111111]">
              1-Year Defect Warranty
            </h2>
            <p className="mt-1 text-sm text-[#27272A]">
              Every protector and bottle comes backed by a full 1-year warranty.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Featured Collection & Interactive Filters */}
      <section id="catalog" className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b-2 border-[#111111]">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
              Protective Catalog &amp; Designer Series
            </h2>
            <p className="mt-1.5 text-sm text-[#52525B]">
              Filter by gear type or lifestyle crew. All items carry a 1-year defect warranty.
            </p>
          </div>

          <div className="relative w-full lg:w-72">
            <Search
              className="w-4 h-4 text-[#111111] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cases, bottles, KOL..."
              aria-label="Search catalog"
              className="w-full pl-10 pr-4 py-2.5 text-sm font-medium bg-white border-2 border-[#111111] rounded-xl text-[#111111] placeholder:text-[#71717A] focus:outline-none focus:bg-[#FAF9F5] shadow-[3px_3px_0px_0px_#111111]"
            />
          </div>
        </div>

        {/* Category Segmented Tabs & Segment Filter Bar */}
        <div className="mt-6 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Product categories"
            className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-white border-2 border-[#111111] rounded-xl w-fit shadow-[3px_3px_0px_0px_#111111]"
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
                  className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#111111] text-[#C8F135]'
                      : 'text-[#52525B] hover:text-[#111111] hover:bg-[#FAF9F5]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#111111] mr-1">Crew:</span>
            <button
              type="button"
              onClick={() => setSegmentFilter('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border-2 border-[#111111] transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                segmentFilter === 'all'
                  ? 'bg-[#FF6B2C] text-[#111111] shadow-[2px_2px_0px_0px_#111111]'
                  : 'bg-white text-[#52525B] hover:text-[#111111]'
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
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border-2 border-[#111111] transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#C8F135] text-[#111111] shadow-[2px_2px_0px_0px_#111111]'
                      : 'bg-white text-[#52525B] hover:text-[#111111]'
                  }`}
                >
                  {seg.headline}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Column Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="mt-10 bg-white border-2 border-[#111111] rounded-2xl shadow-[5px_5px_0px_0px_#111111] p-12 text-center">
            <p className="font-display text-xl font-bold text-[#111111]">
              No matching gear in this filter
            </p>
            <p className="mt-1 text-sm text-[#52525B]">
              Clear your filters or build a custom piece from scratch in the Studio.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setCategoryFilter('all');
                  setSegmentFilter('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-xs font-bold bg-[#FAF9F5] border-2 border-[#111111] text-[#111111] rounded-xl cursor-pointer"
              >
                Reset Filters
              </button>
              <button
                type="button"
                onClick={() => onNavigateTab('studio')}
                className="px-4 py-2 text-xs font-bold bg-[#C8F135] border-2 border-[#111111] text-[#111111] rounded-xl shadow-[3px_3px_0px_0px_#111111] cursor-pointer"
              >
                Open Custom Studio
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, cardIndex) => {
              const colorIdx = selectedColors[product.id] ?? 0;
              const activeVariant = product.colors[colorIdx] ?? product.colors[0];
              const isAdded = recentlyAddedId === product.id;
              const backdropColor = CARD_BACKDROPS[cardIndex % CARD_BACKDROPS.length];

              return (
                <article
                  key={product.id}
                  className="group bg-white border-2 border-[#111111] rounded-2xl overflow-hidden flex flex-col shadow-[4px_4px_0px_0px_#111111] transition-transform duration-200 hover:-translate-y-1"
                >
                  {/* Visual Studio Backdrop */}
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className="relative w-full aspect-[4/3] border-b-2 border-[#111111] p-4 flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2563EB]"
                    style={{ backgroundColor: backdropColor }}
                  >
                    <ProductArtwork
                      category={product.category}
                      shellHex={activeVariant.shellHex}
                      accentHex={activeVariant.accentHex}
                      pattern={product.defaultPattern}
                      addon={product.defaultAddon}
                    />
                  </button>

                  {/* Product Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 text-xs font-medium text-[#52525B]">
                        <span className="truncate">
                          {product.categoryLabel}
                          {product.isDesignerSeries ? ' · Designer Series' : ' · Core Line'}
                        </span>
                        <span className="font-mono text-[11px] font-semibold text-[#111111] shrink-0">
                          {product.dropRating}
                        </span>
                      </div>

                      <div className="mt-2 flex items-baseline justify-between gap-4">
                        <h3 className="font-display text-lg font-extrabold text-[#111111]">
                          <button
                            type="button"
                            onClick={() => onSelectProduct(product)}
                            className="text-left hover:text-[#2563EB] transition-colors cursor-pointer"
                          >
                            {product.name}
                          </button>
                        </h3>
                        <span className="font-mono text-lg font-bold text-[#111111] tabular-nums shrink-0">
                          ${product.price}
                        </span>
                      </div>

                      {product.designerCollab && (
                        <p className="mt-1 text-xs font-bold text-[#2563EB]">
                          {product.designerCollab}
                        </p>
                      )}

                      <p className="mt-2 text-sm text-[#52525B] line-clamp-2">
                        {product.summary}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t-2 border-[#111111]/10 space-y-4">
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
                                className={`w-6 h-6 rounded-full border-2 border-[#111111] transition-transform cursor-pointer ${
                                  selected ? 'ring-2 ring-[#2563EB] ring-offset-2 scale-110' : 'hover:scale-105'
                                }`}
                                style={{ backgroundColor: variant.shellHex }}
                              />
                            );
                          })}
                          <span className="text-xs font-medium text-[#52525B] ml-1 truncate max-w-[115px]">
                            {activeVariant.name}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-[#52525B] truncate">
                          {product.segments.slice(0, 2).join(' · ')}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleQuickAdd(product)}
                          className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl border-2 border-[#111111] transition-all whitespace-nowrap shrink-0 cursor-pointer active:translate-x-[1px] active:translate-y-[1px] ${
                            isAdded
                              ? 'bg-[#C8F135] text-[#111111]'
                              : 'bg-[#111111] text-white hover:bg-[#2563EB]'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Added!</span>
                            </>
                          ) : (
                            <span>Add to Bag</span>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenStudioWithCategory(product.category)}
                          className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold text-[#111111] bg-[#FAF9F5] hover:bg-[#C8F135] border-2 border-[#111111] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          Remix
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

      {/* Section 3: Bold B2B, School & Corporate Collab Callout */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="bg-[#2563EB] text-white border-2 border-[#111111] rounded-2xl shadow-[6px_6px_0px_0px_#111111] p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C8F135]">
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              <span>1-YEAR MANUFACTURING DEFECT WARRANTY · B2C &amp; B2B/SCHOOL</span>
            </div>
            <h2
              className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              Outfitting teams, campus clubs, and brand pop-ups.
            </h2>
            <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
              Co-producing directly with our bottle manufacturer and KOL athletes, we build
              custom-stamped hydration and tech kits for schools, running clubs, gyms, and
              corporate events.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3.5">
            <button
              type="button"
              onClick={() => onNavigateTab('b2b')}
              className="px-5 py-3 text-sm font-bold bg-[#C8F135] hover:bg-[#D6F65C] text-[#111111] border-2 border-[#111111] rounded-xl shadow-[3px_3px_0px_0px_#111111] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              B2B &amp; School Bulk Orders
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('community')}
              className="px-5 py-3 text-sm font-bold bg-[#FF6B2C] hover:bg-[#FF8552] text-[#111111] border-2 border-[#111111] rounded-xl shadow-[3px_3px_0px_0px_#111111] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              Pop-Ups &amp; Warranty
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
