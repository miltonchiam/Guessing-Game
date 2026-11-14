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

const POST_BACKDROPS = ['#C8F135', '#FFE3D3', '#EDE9FE', '#DBEAFE'];

export const CommunityEventsView: React.FC<CommunityEventsViewProps> = ({
  warranties,
  onRegisterWarranty,
  onOpenStudioWithCategory,
}) => {
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [rsvpIds, setRsvpIds] = useState<string[]>([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSaved, setNewsletterSaved] = useState(false);

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
      <div className="pb-6 border-b-2 border-[#111111] flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-mono font-bold text-[#2563EB]">
            COMPANION APP · DAILY ENGAGEMENT · WEEKLY NEWSLETTER · POP-UP EVENTS
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
            Crew Feed, Pop-Up Stores &amp; Warranty Hub
          </h1>
          <p className="mt-1.5 text-sm text-[#52525B] max-w-2xl">
            Daily social drops with KOL athletes, offline pop-up store RSVPs, corporate collab
            events, weekly newsletter dispatches, and 1-year warranty management.
          </p>
        </div>
      </div>

      {/* Section 1: Daily Social Engagement & KOL Collaborations */}
      <section className="space-y-6">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-2xl font-extrabold text-[#111111]">
            Daily Social Feed &amp; KOL Drops
          </h2>
          <span className="text-xs font-mono font-bold text-[#52525B]">
            UPDATED DAILY · ONLINE CHANNELS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMMUNITY_POSTS.map((post, idx) => {
            const liked = likedIds.includes(post.id);
            const displayLikes = post.likes + (liked ? 1 : 0);

            return (
              <article
                key={post.id}
                className="bg-white border-2 border-[#111111] rounded-2xl shadow-[4px_4px_0px_0px_#111111] overflow-hidden flex flex-col justify-between transition-transform hover:-translate-y-1"
              >
                <div
                  className="aspect-[4/3] border-b-2 border-[#111111] p-4 flex items-center justify-center"
                  style={{ backgroundColor: POST_BACKDROPS[idx % POST_BACKDROPS.length] }}
                >
                  <ProductArtwork
                    category={post.gearCategory}
                    shellHex={post.shellHex}
                    accentHex={post.accentHex}
                    pattern={post.pattern}
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs font-medium text-[#52525B]">
                      <span>{post.dayLabel}</span>
                      <span className="font-bold text-[#111111]">{post.segment}</span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-extrabold text-[#111111]">
                      {post.author}
                    </h3>
                    <p className="text-xs font-bold text-[#2563EB]">{post.role}</p>
                    <p className="mt-2.5 text-sm text-[#3F3F46] leading-relaxed">
                      {post.caption}
                    </p>
                  </div>

                  <div className="pt-3 border-t-2 border-[#111111]/10 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => toggleLike(post.id)}
                      className={`inline-flex items-center gap-1.5 text-xs font-bold cursor-pointer transition-colors ${
                        liked ? 'text-[#F43F5E]' : 'text-[#52525B] hover:text-[#111111]'
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
                      className="text-xs font-bold text-[#111111] hover:text-[#2563EB] cursor-pointer"
                    >
                      Remix Look →
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
          <h2 className="font-display text-2xl font-extrabold text-[#111111]">
            Offline Pop-Up Stores &amp; Corporate Events
          </h2>
          <span className="text-xs font-mono font-bold text-[#52525B]">
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
                className="bg-white border-2 border-[#111111] rounded-2xl shadow-[4px_4px_0px_0px_#111111] p-6 flex flex-col justify-between space-y-5"
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#2563EB]">{evt.type}</span>
                    <span className="font-medium text-[#52525B]">{evt.partner}</span>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-extrabold text-[#111111]">
                    {evt.title}
                  </h3>
                  <div className="mt-3 space-y-1.5 text-xs font-medium text-[#3F3F46]">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#111111]" aria-hidden="true" />
                      <span>{evt.date}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#111111]" aria-hidden="true" />
                      <span>{evt.location}</span>
                    </p>
                  </div>
                  <p className="mt-3 text-sm text-[#52525B] leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-[#111111]/10 flex items-center justify-between gap-4">
                  <span className="font-mono text-xs font-bold text-[#111111] tabular-nums">
                    {spots} spots open
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleRsvp(evt.id)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] transition-all cursor-pointer whitespace-nowrap ${
                      isGoing
                        ? 'bg-[#C8F135] text-[#111111]'
                        : 'bg-[#FF6B2C] hover:bg-[#FF8552] text-[#111111]'
                    }`}
                  >
                    {isGoing ? 'RSVP Confirmed!' : 'Reserve Spot'}
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
        <div className="lg:col-span-5 bg-[#C8F135] border-2 border-[#111111] rounded-2xl shadow-[6px_6px_0px_0px_#111111] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#111111]">
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>WEEKLY NEWSLETTER · CUSTOMER RELATIONSHIP</span>
            </div>
            <h2 className="mt-3 font-display text-2xl font-extrabold text-[#111111]">
              Weekly Gear &amp; Active Dispatch
            </h2>
            <p className="mt-2 text-sm text-[#27272A] leading-relaxed">
              Once every week: fresh Designer Series drops, pop-up store dates, running &amp; gym
              hydration guides, and early access to custom colorways.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="mt-6 space-y-3">
            {newsletterSaved ? (
              <div className="p-4 bg-white border-2 border-[#111111] rounded-xl text-sm font-bold text-[#111111]">
                Subscribed <span className="font-mono">{newsletterEmail}</span> to our weekly
                dispatch!
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
                  className="flex-1 px-4 py-2.5 text-sm bg-white border-2 border-[#111111] rounded-xl text-[#111111] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-bold text-white bg-[#111111] hover:bg-[#2563EB] border-2 border-[#111111] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Join Weekly
                </button>
              </div>
            )}
          </form>
        </div>

        {/* 1-Year Manufacturing Defect Warranty Verification & Registration */}
        <div className="lg:col-span-7 bg-white border-2 border-[#111111] rounded-2xl shadow-[6px_6px_0px_0px_#111111] p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#059669]">
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              <span>1-YEAR MANUFACTURING DEFECT WARRANTY</span>
            </div>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-[#111111]">
              Warranty Lookup &amp; Registration
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label
                htmlFor="warranty-lookup"
                className="block text-xs font-bold text-[#111111]"
              >
                Verify Existing Warranty Code
              </label>
              <input
                id="warranty-lookup"
                type="text"
                value={lookupCode}
                onChange={(e) => setLookupCode(e.target.value)}
                placeholder="e.g. FS-WR-88412"
                className="w-full px-3.5 py-2 text-sm font-mono font-bold uppercase bg-[#FAF9F5] border-2 border-[#111111] rounded-xl text-[#111111] focus:outline-none focus:bg-white"
              />
              {matchedWarranty ? (
                <div className="p-3.5 bg-[#FAF9F5] border-2 border-[#111111] rounded-xl text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#111111]">
                      {matchedWarranty.code}
                    </span>
                    <span className="font-bold text-[#059669]">
                      {matchedWarranty.status}
                    </span>
                  </div>
                  <p className="text-[#111111] font-semibold">{matchedWarranty.productName}</p>
                  <p className="text-[#52525B] font-mono">
                    Valid: {matchedWarranty.purchaseDate} → {matchedWarranty.expiresDate}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-[#52525B]">
                  Sample codes: {INITIAL_WARRANTIES.map((w) => w.code).join(', ')}
                </p>
              )}
            </div>

            <form onSubmit={handleWarrantyRegister} className="space-y-3">
              <span className="block text-xs font-bold text-[#111111]">
                Register New Gear Protection
              </span>
              <select
                value={newWarrantyProduct}
                onChange={(e) => setNewWarrantyProduct(e.target.value)}
                aria-label="Select purchased product"
                className="w-full px-3 py-2 text-sm font-medium bg-[#FAF9F5] border-2 border-[#111111] rounded-xl text-[#111111] focus:outline-none focus:bg-white"
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
                  className="flex-1 px-3 py-2 text-sm bg-[#FAF9F5] border-2 border-[#111111] rounded-xl text-[#111111] focus:outline-none focus:bg-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-[#111111] bg-[#FF6B2C] hover:bg-[#FF8552] border-2 border-[#111111] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Register
                </button>
              </div>
              {warrantyNotice && (
                <p className="text-xs font-bold text-[#059669]">{warrantyNotice}</p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
