import React, { useMemo, useState } from 'react';
import { Building2, CheckCircle2, GraduationCap } from 'lucide-react';
import { ProductCategory } from '../types';
import { ProductArtwork } from './ProductArtwork';

interface SubmittedQuote {
  quoteId: string;
  orgName: string;
  orgType: string;
  units: number;
  totalValue: number;
  monogram: string;
}

const ORG_PACKAGES: {
  id: string;
  label: string;
  category: ProductCategory;
  baseUnitPrice: number;
  description: string;
  defaultColor: string;
  defaultAccent: string;
}[] = [
  {
    id: 'school-hydration',
    label: 'School Hydration + Boot Pack',
    category: 'bottle',
    baseUnitPrice: 44,
    description:
      'Co-produced with our bottle manufacturer for school athletic squads, campus clubs, and student orientation packs.',
    defaultColor: '#141D2F',
    defaultAccent: '#F3E16B',
  },
  {
    id: 'corporate-commute',
    label: 'Corporate Commute Laptop + Phone Kit',
    category: 'laptop',
    baseUnitPrice: 64,
    description:
      'Branded 360° impact laptop sleeves for corporate wellness events, conferences, and employee onboarding.',
    defaultColor: '#111111',
    defaultAccent: '#0047FF',
  },
  {
    id: 'gym-member-vault',
    label: 'Gym Member Earbud & Bottle Bundle',
    category: 'earbuds',
    baseUnitPrice: 32,
    description:
      'Latch-locked earbud armor with gym-branded carabiner clips for fitness member milestone rewards.',
    defaultColor: '#4E5B3C',
    defaultAccent: '#F3E16B',
  },
];

export const B2BPortalView: React.FC = () => {
  const [selectedPkgId, setSelectedPkgId] = useState(ORG_PACKAGES[0].id);
  const [orgType, setOrgType] = useState<'School / University' | 'Corporate Event' | 'Gym / Club'>(
    'School / University',
  );
  const [orgName, setOrgName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [monogram, setMonogram] = useState('WESTVIEW');
  const [units, setUnits] = useState(100);
  const [submittedQuote, setSubmittedQuote] = useState<SubmittedQuote | null>(null);

  const selectedPkg =
    ORG_PACKAGES.find((p) => p.id === selectedPkgId) ?? ORG_PACKAGES[0];

  const pricing = useMemo(() => {
    const discountRate = units >= 250 ? 0.25 : units >= 100 ? 0.18 : 0.12;
    const unitPrice = Math.round(selectedPkg.baseUnitPrice * (1 - discountRate) * 100) / 100;
    const total = Math.round(unitPrice * units);
    return {
      discountPct: Math.round(discountRate * 100),
      unitPrice,
      total,
    };
  }, [selectedPkg, units]);

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim() || !contactEmail.trim()) return;
    setSubmittedQuote({
      quoteId: `B2B-${Math.floor(10000 + Math.random() * 90000)}`,
      orgName: orgName.trim(),
      orgType,
      units,
      totalValue: pricing.total,
      monogram: monogram.trim().toUpperCase() || 'CUSTOM',
    });
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 lg:py-12 space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-black/15">
        <div>
          <p className="text-xs font-mono font-semibold text-[#0047FF]">
            B2B / SCHOOL &amp; CORPORATE COLLAB PORTAL
          </p>
          <h1 className="mt-1 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0A0A0A]">
            Bulk Custom Gear for Schools &amp; Brand Events
          </h1>
          <p className="mt-1.5 text-sm text-[#52525B] max-w-2xl">
            Direct manufacturing runs for campus bookstores, sports teams, gym memberships,
            and corporate brand collaborations. Includes 1-year manufacturing defect warranty on
            every unit.
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono text-[#6B7280]">
          <div>
            <span className="block">TARGET B2B STREAM</span>
            <span className="text-sm font-semibold text-[#0A0A0A] tabular-nums">
              $10,000 / mo · $120,000 / yr
            </span>
          </div>
          <div>
            <span className="block">VOLUME TIER</span>
            <span className="text-sm font-semibold text-[#0047FF] tabular-nums">
              12% – 25% Off Retail
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Live Custom Branded Preview */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-[#F4F4F4] rounded-sm p-6 sm:p-8">
            <div className="flex items-center justify-between text-xs font-mono text-[#6B7280] mb-3">
              <span>CO-BRANDED SAMPLE</span>
              <span>MIN 25 UNITS</span>
            </div>
            <div className="aspect-[4/3] flex items-center justify-center">
              <ProductArtwork
                category={selectedPkg.category}
                shellHex={selectedPkg.defaultColor}
                accentHex={selectedPkg.defaultAccent}
                pattern="stripe"
                addon={selectedPkg.category === 'bottle' ? 'hydration-loop' : 'carabiner'}
                monogram={monogram}
              />
            </div>
            <div className="mt-4 pt-4 border-t border-black/10">
              <h2 className="font-display text-xl font-bold text-[#0A0A0A]">
                {selectedPkg.label}
              </h2>
              <p className="mt-1 text-sm text-[#52525B]">{selectedPkg.description}</p>
            </div>
          </div>

          <div className="bg-[#141D2F] text-white rounded-sm p-6 space-y-2.5">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Building2 className="w-4 h-4 text-[#F3E16B]" aria-hidden="true" />
              <span>Bottle Manufacturer &amp; Corporate Collab Ready</span>
            </div>
            <p className="text-xs text-[#CBD5E1] leading-relaxed">
              Direct production scheduling with our bottle manufacturer partner ensures unified
              color matching across bottles, phone cases, earbud vaults, and laptop sleeves.
            </p>
          </div>
        </div>

        {/* Right: Wholesale Configurator & Quote Form */}
        <div className="lg:col-span-7 bg-white border border-black/10 rounded-sm p-6 sm:p-8">
          {submittedQuote ? (
            <div className="py-8 space-y-5">
              <div className="flex items-center gap-3 text-[#059669]">
                <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                <span className="font-mono text-sm font-semibold">
                  QUOTE REGISTERED · {submittedQuote.quoteId}
                </span>
              </div>
              <h2 className="font-display text-2xl font-extrabold text-[#0A0A0A]">
                Thank you, {submittedQuote.orgName}
              </h2>
              <p className="text-sm text-[#52525B]">
                Your custom {submittedQuote.orgType} request for{' '}
                <strong className="text-[#0A0A0A] tabular-nums">
                  {submittedQuote.units} units
                </strong>{' '}
                (engraved <span className="font-mono">{submittedQuote.monogram}</span>) totaling{' '}
                <strong className="text-[#0A0A0A] font-mono tabular-nums">
                  ${submittedQuote.totalValue.toLocaleString()}
                </strong>{' '}
                has been queued for our B2B &amp; corporate events team.
              </p>
              <button
                type="button"
                onClick={() => setSubmittedQuote(null)}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0A0A0A] hover:bg-[#0047FF] rounded-sm transition-colors cursor-pointer"
              >
                Configure Another Bulk Order
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitQuote} className="space-y-6">
              <div>
                <span className="block text-xs font-semibold text-[#0A0A0A] mb-2.5">
                  01. Select Partner Organization Type
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {(['School / University', 'Corporate Event', 'Gym / Club'] as const).map(
                    (type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setOrgType(type)}
                        className={`px-3.5 py-2.5 text-xs font-semibold rounded-sm border text-left transition-colors cursor-pointer flex items-center gap-2 ${
                          orgType === type
                            ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white'
                            : 'border-black/10 bg-[#F4F4F4] text-[#52525B] hover:text-[#0A0A0A]'
                        }`}
                      >
                        <GraduationCap className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{type}</span>
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div>
                <span className="block text-xs font-semibold text-[#0A0A0A] mb-2.5">
                  02. Select Co-Branded Kit
                </span>
                <div className="space-y-2">
                  {ORG_PACKAGES.map((pkg) => {
                    const active = pkg.id === selectedPkgId;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPkgId(pkg.id)}
                        className={`w-full p-3.5 rounded-sm border text-left flex items-center justify-between gap-4 cursor-pointer transition-colors ${
                          active
                            ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white'
                            : 'border-black/10 bg-[#F4F4F4] text-[#0A0A0A] hover:border-black/25'
                        }`}
                      >
                        <span className="text-sm font-semibold">{pkg.label}</span>
                        <span className="font-mono text-xs opacity-80 tabular-nums">
                          Retail ${pkg.baseUnitPrice}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="b2b-units" className="text-xs font-semibold text-[#0A0A0A]">
                      03. Order Quantity
                    </label>
                    <span className="font-mono text-xs font-semibold text-[#0047FF] tabular-nums">
                      {units} units ({pricing.discountPct}% off)
                    </span>
                  </div>
                  <input
                    id="b2b-units"
                    type="range"
                    min={25}
                    max={500}
                    step={25}
                    value={units}
                    onChange={(e) => setUnits(Number(e.target.value))}
                    className="w-full accent-[#0047FF] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-[#6B7280] mt-1">
                    <span>25</span>
                    <span>100 (18% off)</span>
                    <span>250+ (25% off)</span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="b2b-monogram"
                    className="block text-xs font-semibold text-[#0A0A0A] mb-1.5"
                  >
                    04. Organization Stamp / Text
                  </label>
                  <input
                    id="b2b-monogram"
                    type="text"
                    maxLength={12}
                    value={monogram}
                    onChange={(e) => setMonogram(e.target.value)}
                    placeholder="SCHOOL OR BRAND"
                    className="w-full px-3.5 py-2 text-sm font-mono uppercase bg-[#F4F4F4] border border-black/10 rounded-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="b2b-org-name"
                    className="block text-xs font-semibold text-[#0A0A0A] mb-1.5"
                  >
                    Organization / School Name
                  </label>
                  <input
                    id="b2b-org-name"
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="e.g. Northside High Athletics"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F4F4F4] border border-black/10 rounded-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="b2b-email"
                    className="block text-xs font-semibold text-[#0A0A0A] mb-1.5"
                  >
                    Coordinator Email
                  </label>
                  <input
                    id="b2b-email"
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="procurement@school.edu"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F4F4F4] border border-black/10 rounded-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>
              </div>

              <div className="p-4 bg-[#F4F4F4] rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-[#52525B]">Estimated Wholesale Subtotal</p>
                  <p className="font-mono text-2xl font-bold text-[#0A0A0A] tabular-nums">
                    ${pricing.total.toLocaleString()}{' '}
                    <span className="text-xs font-normal text-[#52525B]">
                      (${pricing.unitPrice.toFixed(2)} / unit)
                    </span>
                  </p>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-semibold text-white bg-[#0A0A0A] hover:bg-[#0047FF] rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Request Bulk Production Quote
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
