import React, { useState } from 'react';
import { Calendar, Heart, Mail, MapPin, ShieldCheck } from 'lucide-react';
import {
  BRAND_EVENTS,
  COMMUNITY_POSTS,
  INITIAL_WARRANTIES,
} from '../data/storeData';
import { ProductCategory, WarrantyRecord } from '../types';
import { ProductArtwork } from './ProductArtwork';

interface CommunityEventsViewProps {
  warranties: WarrantyRecord[];
  onRegisterWarranty: (record: WarrantyRecord) => void;
  onOpenStudioWithCategory: (category: ProductCategory) => void;
}

export const CommunityEventsView: React.FC<CommunityEventsViewProps> = ({
  warranties,
  onRegisterWarranty,
  onOpenStudioWithCategory,
}) => {
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [rsvpIds, setRsvpIds] = useState<string[]>([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSaved, setNewsletterSaved] = useState(false);

  // Warranty lookup / registration state
  const [lookupCode, setLookupCode] = useState('FS-WR-88412');
  const [newWarrantyProduct, setNewWarrantyProduct] = useState('Stride Armor Phone Case');
  const [newWarrantyEmail, setNewWarrantyEmail] = useState('');
  const [warrantyNotice, setWarrantyNotice] = useState<string | null>(null);

  const matchedWarranty = warranties.find(
    (w) => w.code.toLowerCase() === lookupCode.trim().toLowerCase(),
  );

  const toggleLike = (id: string) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleRsvp = (id: string) => {
    setRsvpIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSaved(true);
  };

  const handleWarrantyRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWarrantyEmail.trim()) return;
    const code = `FS-WR-${Math.floor(10000 + Math.random() * 89999)}`;
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);

    const record: WarrantyRecord = {
      code,
      productName: newWarrantyProduct,
      purchaseDate: today.toISOString().slice(0, 10),
      expiresDate: nextYear.toISOString().slice(0, 10),
      ownerEmail: newWarrantyEmail.trim(),
      status: 'Active Coverage',
    };
    onRegisterWarranty(record);
    setLookupCode(code);
    setNewWarrantyEmail('');
    setWarrantyNotice(`Registered ${code} for 1-year manufacturing defect coverage.`);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 lg:py-12 space-y-14">
      {/* Header */}
      <div className="pb-6 border-b border-black/10 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-[#1D4ED8]">
            COMPANION APP · DAILY ENGAGEMENT · WEEKLY NEWSLETTER · POP-UP EVENTS
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#141416]">
            Community Feed, Pop-Up Stores &amp; Warranty Hub
          </h1>
          <p className="mt-1.5 text-sm text-[#52525B] max-w-2xl">
            Daily social drops with KOL athletes, offline pop-up store RSVPs, corporate collab
            events, weekly newsletter updates, and 1-year warranty management.
          </p>
        </div>
      </div>

      {/* Section 1: Daily Social Engagement & KOL Collaborations */}
      <section className="space-y-6">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-[#141416]">
            Daily Social Feed &amp; KOL Drops
          </h2>
          <span className="text-xs font-mono text-[#52525B]">
            UPDATED DAILY · ONLINE CHANNELS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMMUNITY_POSTS.map((post) => {
            const liked = likedIds.includes(post.id);
            const displayLikes = post.likes + (liked ? 1 : 0);

            return (
              <article
                key={post.id}
                className="bg-white border border-black/10 rounded-xl overflow-hidden flex flex-col justify-between"
              >
                <div className="aspect-[4/3] bg-[#F2F2EE] p-4 flex items-center justify-center">
                  <ProductArtwork
                    category={post.gearCategory}
                    shellHex={post.shellHex}
                    accentHex={post.accentHex}
                    pattern={post.pattern}
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#52525B]">
                      <span>{post.dayLabel}</span>
                      <span>{post.segment}</span>
                    </div>
                    <h3 className="mt-2 font-display text-base font-semibold text-[#141416]">
                      {post.author}
                    </h3>
                    <p className="text-xs text-[#1D4ED8]">{post.role}</p>
                    <p className="mt-2.5 text-sm text-[#52525B] leading-relaxed">
                      {post.caption}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-black/10 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => toggleLike(post.id)}
                      className={`inline-flex items-center gap-1.5 text-xs font-medium cursor-pointer transition-colors ${
                        liked ? 'text-[#DC2626]' : 'text-[#52525B] hover:text-[#141416]'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${liked ? 'fill-current' : ''}`}
                        aria-hidden="true"
                      />
                      <span className="tabular-nums">{displayLikes}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenStudioWithCategory(post.gearCategory)}
                      className="text-xs font-semibold text-[#141416] hover:text-[#1D4ED8] cursor-pointer"
                    >
                      Build Similar →
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Section 2: Offline Pop-Up Stores & Corporate Collab Events */}
      <section className="space-y-6">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-[#141416]">
            Offline Pop-Up Stores &amp; Corporate Events
          </h2>
          <span className="text-xs font-mono text-[#52525B]">
            CHANNELS · IN-PERSON &amp; BRAND COLLABS
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {BRAND_EVENTS.map((evt) => {
            const isGoing = rsvpIds.includes(evt.id);
            const spots = evt.spotsLeft - (isGoing ? 1 : 0);

            return (
              <div
                key={evt.id}
                className="bg-white border border-black/10 rounded-xl p-6 flex flex-col justify-between space-y-5"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#52525B]">
                    <span className="font-semibold text-[#1D4ED8]">{evt.type}</span>
                    <span>{evt.partner}</span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold text-[#141416]">
                    {evt.title}
                  </h3>
                  <div className="mt-3 space-y-1.5 text-xs text-[#52525B]">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#141416]" aria-hidden="true" />
                      <span>{evt.date}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#141416]" aria-hidden="true" />
                      <span>{evt.location}</span>
                    </p>
                  </div>
                  <p className="mt-3 text-sm text-[#52525B] leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/10 flex items-center justify-between gap-4">
                  <span className="font-mono text-xs text-[#52525B] tabular-nums">
                    {spots} spots open
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleRsvp(evt.id)}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      isGoing
                        ? 'bg-[#059669] text-white'
                        : 'bg-[#141416] text-white hover:bg-[#1D4ED8]'
                    }`}
                  >
                    {isGoing ? 'RSVP Confirmed' : 'Reserve Spot'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 3: Weekly Newsletter & 1-Year Warranty Portal */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weekly Newsletter */}
        <div className="lg:col-span-5 bg-white border border-black/10 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#1D4ED8]">
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>WEEKLY NEWSLETTER · CUSTOMER RELATIONSHIP</span>
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold text-[#141416]">
              Weekly Gear &amp; Healthy Lifestyle Dispatch
            </h2>
            <p className="mt-2 text-sm text-[#52525B] leading-relaxed">
              Once every week: new Designer Series drops, pop-up store dates, running &amp; gym
              hydration guides, and early access to custom colors.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="mt-6 space-y-3">
            {newsletterSaved ? (
              <div className="p-4 bg-[#ECFDF5] border border-[#059669]/25 rounded-lg text-sm text-[#065F46]">
                Subscribed <span className="font-mono">{newsletterEmail}</span> to our weekly
                dispatch.
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="you@domain.com"
                  aria-label="Newsletter email address"
                  className="flex-1 px-4 py-2.5 text-sm bg-[#F7F7F5] border border-black/15 rounded-lg text-[#141416] focus:outline-none focus:border-[#1D4ED8]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-[#141416] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Join Weekly
                </button>
              </div>
            )}
          </form>
        </div>

        {/* 1-Year Manufacturing Defect Warranty Verification & Registration */}
        <div className="lg:col-span-7 bg-white border border-black/10 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#059669]">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                <span>1-YEAR MANUFACTURING DEFECT WARRANTY</span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold text-[#141416]">
                Warranty Lookup &amp; Registration
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lookup */}
            <div className="space-y-3">
              <label
                htmlFor="warranty-lookup"
                className="block text-xs font-semibold text-[#141416]"
              >
                Verify Existing Warranty Code
              </label>
              <input
                id="warranty-lookup"
                type="text"
                value={lookupCode}
                onChange={(e) => setLookupCode(e.target.value)}
                placeholder="e.g. FS-WR-88412"
                className="w-full px-3.5 py-2 text-sm font-mono uppercase bg-[#F7F7F5] border border-black/15 rounded-lg text-[#141416] focus:outline-none focus:border-[#1D4ED8]"
              />
              {matchedWarranty ? (
                <div className="p-3.5 bg-[#F7F7F5] border border-black/10 rounded-lg text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-semibold text-[#141416]">
                      {matchedWarranty.code}
                    </span>
                    <span className="font-semibold text-[#059669]">
                      {matchedWarranty.status}
                    </span>
                  </div>
                  <p className="text-[#141416] font-medium">{matchedWarranty.productName}</p>
                  <p className="text-[#52525B] font-mono">
                    Valid: {matchedWarranty.purchaseDate} → {matchedWarranty.expiresDate}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-[#71717A]">
                  Sample codes: {INITIAL_WARRANTIES.map((w) => w.code).join(', ')}
                </p>
              )}
            </div>

            {/* Register */}
            <form onSubmit={handleWarrantyRegister} className="space-y-3">
              <span className="block text-xs font-semibold text-[#141416]">
                Register New Gear Protection
              </span>
              <select
                value={newWarrantyProduct}
                onChange={(e) => setNewWarrantyProduct(e.target.value)}
                aria-label="Select purchased product"
                className="w-full px-3 py-2 text-sm bg-[#F7F7F5] border border-black/15 rounded-lg text-[#141416] focus:outline-none focus:border-[#1D4ED8]"
              >
                <option>Stride Armor Phone Case</option>
                <option>Pulse Lock Earbud Shell</option>
                <option>Transit Shield Laptop Sleeve 14&quot;</option>
                <option>HydraGuard Insulated Bottle 750ml</option>
                <option>Custom Studio Build</option>
              </select>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newWarrantyEmail}
                  onChange={(e) => setNewWarrantyEmail(e.target.value)}
                  placeholder="Owner email"
                  aria-label="Owner email for warranty"
                  className="flex-1 px-3 py-2 text-sm bg-[#F7F7F5] border border-black/15 rounded-lg text-[#141416] focus:outline-none focus:border-[#1D4ED8]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#141416] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Register
                </button>
              </div>
              {warrantyNotice && (
                <p className="text-xs font-medium text-[#059669]">{warrantyNotice}</p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
