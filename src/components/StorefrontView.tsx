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
    <div className="space-y-16 pb-16">
      {/* Section 1: Storefront Hero + 4-Column Value Strip */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-8 lg:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between bg-white border border-black/10 rounded-xl p-8 lg:p-10">
            <div>
              <p className="text-xs font-medium text-[#52525B] tracking-wide">
                Active Gear Protection · Phones · Earbuds · Laptops · Bottles
              </p>
              <h1
                className="mt-4 font-display font-bold tracking-tight text-[#141416] leading-[1.06]"
                style={{
                  fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
                  textWrap: 'balance',
                }}
              >
                Wholistic protection in style for active life.
              </h1>
              <p className="mt-5 text-base text-[#52525B] leading-relaxed max-w-xl">
                Built for runners, gym members, students, office commuters, and kids. Choose
                our curated Designer Series or build your own protector in the Custom Studio.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-black/10 flex flex-wrap items-center gap-3">
              <a
                href="#catalog"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#141416] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => onNavigateTab('studio')}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#141416] bg-[#ECECE8] hover:bg-[#E2E2DC] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
                <span>Launch Custom Studio</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <HeroGearShowcase />
          </div>
        </div>

        {/* 4-column Key Propositions Strip */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-black/10 rounded-xl p-5">
            <p className="text-xs font-mono text-[#1D4ED8]">01 · CUSTOMIZABLE</p>
            <h2 className="mt-1.5 font-display text-base font-semibold text-[#141416]">
              Uniquely Designed By You
            </h2>
            <p className="mt-1 text-sm text-[#52525B]">
              Customize shell colors, accent bumpers, surface textures, and monograms.
            </p>
          </div>
          <div className="bg-white border border-black/10 rounded-xl p-5">
            <p className="text-xs font-mono text-[#1D4ED8]">02 · HEALTHY LIFESTYLE</p>
            <h2 className="mt-1.5 font-display text-base font-semibold text-[#141416]">
              Hydration &amp; Tech Gear
            </h2>
            <p className="mt-1 text-sm text-[#52525B]">
              Insulated bottles and sweatproof gadget armor built for daily movement.
            </p>
          </div>
          <div className="bg-white border border-black/10 rounded-xl p-5">
            <p className="text-xs font-mono text-[#1D4ED8]">03 · DESIGNER SERIES</p>
            <h2 className="mt-1.5 font-display text-base font-semibold text-[#141416]">
              KOL &amp; Studio Capsules
            </h2>
            <p className="mt-1 text-sm text-[#52525B]">
              Limited seasonal collaborations created with athletes and industrial designers.
            </p>
          </div>
          <div className="bg-white border border-black/10 rounded-xl p-5">
            <p className="text-xs font-mono text-[#1D4ED8]">04 · COVERAGE</p>
            <h2 className="mt-1.5 font-display text-base font-semibold text-[#141416]">
              1-Year Defect Warranty
            </h2>
            <p className="mt-1 text-sm text-[#52525B]">
              Every protector and bottle includes 1-year manufacturing defect protection.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Featured Collection & Interactive Filters */}
      <section id="catalog" className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-black/10">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#141416]">
              Protective Catalog &amp; Designer Series
            </h2>
            <p className="mt-1.5 text-sm text-[#52525B]">
              Filter by accessory category or target lifestyle segment. All items carry a 1-year warranty.
            </p>
          </div>

          <div className="relative w-full lg:w-72">
            <Search
              className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cases, bottles, KOL..."
              aria-label="Search catalog"
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-black/15 rounded-lg text-[#141416] placeholder:text-[#71717A] focus:outline-none focus:border-[#1D4ED8]"
            />
          </div>
        </div>

        {/* Category Segmented Tabs & Segment Filter Bar */}
        <div className="mt-6 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Product categories"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#ECECE8] rounded-lg w-fit"
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
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-white text-[#141416] shadow-xs'
                      : 'text-[#52525B] hover:text-[#141416]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-medium text-[#52525B] mr-1">Segment:</span>
            <button
              type="button"
              onClick={() => setSegmentFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                segmentFilter === 'all'
                  ? 'bg-[#141416] text-white border-[#141416]'
                  : 'bg-white text-[#52525B] border-black/10 hover:text-[#141416]'
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
                  className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]'
                      : 'bg-white text-[#52525B] border-black/10 hover:text-[#141416]'
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
          <div className="mt-10 bg-white border border-black/10 rounded-xl p-12 text-center">
            <p className="font-display text-lg font-semibold text-[#141416]">
              No matching gear in this filter
            </p>
            <p className="mt-1 text-sm text-[#52525B]">
              Try clearing your segment or search filter, or design a custom build from scratch.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setCategoryFilter('all');
                  setSegmentFilter('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-xs font-semibold bg-[#ECECE8] text-[#141416] rounded-lg cursor-pointer"
              >
                Reset Filters
              </button>
              <button
                type="button"
                onClick={() => onNavigateTab('studio')}
                className="px-4 py-2 text-xs font-semibold bg-[#141416] text-white rounded-lg cursor-pointer"
              >
                Open Custom Studio
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const colorIdx = selectedColors[product.id] ?? 0;
              const activeVariant = product.colors[colorIdx] ?? product.colors[0];
              const isAdded = recentlyAddedId === product.id;

              return (
                <article
                  key={product.id}
                  className="group bg-white border border-black/10 rounded-xl overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  {/* Visual Studio Backdrop */}
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className="relative w-full aspect-[4/3] bg-[#F2F2EE] p-4 flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
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
                      {/* Zero-pill quiet metadata line */}
                      <div className="flex items-center justify-between gap-2 text-xs text-[#52525B]">
                        <span className="truncate">
                          {product.categoryLabel}
                          {product.isDesignerSeries ? ' · Designer Series' : ' · Core Protection'}
                        </span>
                        <span className="font-mono text-[11px] shrink-0">{product.dropRating}</span>
                      </div>

                      <div className="mt-2 flex items-baseline justify-between gap-4">
                        <h3 className="font-display text-lg font-semibold text-[#141416]">
                          <button
                            type="button"
                            onClick={() => onSelectProduct(product)}
                            className="text-left hover:text-[#1D4ED8] transition-colors cursor-pointer"
                          >
                            {product.name}
                          </button>
                        </h3>
                        <span className="font-mono text-base font-semibold text-[#141416] tabular-nums shrink-0">
                          ${product.price}
                        </span>
                      </div>

                      {product.designerCollab && (
                        <p className="mt-1 text-xs font-medium text-[#1D4ED8]">
                          {product.designerCollab}
                        </p>
                      )}

                      <p className="mt-2 text-sm text-[#52525B] line-clamp-2">
                        {product.summary}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-black/10 space-y-4">
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
                                    ? 'ring-2 ring-[#1D4ED8] ring-offset-2 border-black/30 scale-110'
                                    : 'border-black/20 hover:scale-105'
                                }`}
                                style={{ backgroundColor: variant.shellHex }}
                              />
                            );
                          })}
                          <span className="text-xs text-[#52525B] ml-1 truncate max-w-[120px]">
                            {activeVariant.name}
                          </span>
                        </div>
                        <span className="text-xs text-[#52525B] truncate">
                          {product.segments.slice(0, 2).join(' · ')}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleQuickAdd(product)}
                          className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            isAdded
                              ? 'bg-[#059669] text-white'
                              : 'bg-[#141416] text-white hover:bg-[#1D4ED8]'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Added</span>
                            </>
                          ) : (
                            <span>Add to Bag</span>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenStudioWithCategory(product.category)}
                          className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-[#141416] bg-[#ECECE8] hover:bg-[#E2E2DC] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
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

      {/* Section 3: Craftsmanship, Healthy Lifestyle & B2B / School Access */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="bg-[#141416] text-white rounded-xl p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#93C5FD]">
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              <span>1-YEAR MANUFACTURING DEFECT WARRANTY · B2C &amp; B2B/SCHOOL</span>
            </div>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              Outfitting teams, schools, and corporate wellness events.
            </h2>
            <p className="text-sm sm:text-base text-[#D4D4D8] max-w-2xl leading-relaxed">
              Partnering directly with our bottle manufacturer and KOL athletes, we deliver
              custom-branded hydration and gadget armor kits for schools, running clubs, gyms,
              and corporate brand collaborations.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3">
            <button
              type="button"
              onClick={() => onNavigateTab('b2b')}
              className="px-5 py-3 text-sm font-semibold bg-[#1D4ED8] hover:bg-[#2563EB] text-white rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              B2B &amp; School Bulk Orders
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('community')}
              className="px-5 py-3 text-sm font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Pop-Ups &amp; Warranty
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
