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
    defaultColor: '#2563EB',
    defaultAccent: '#C8F135',
  },
  {
    id: 'corporate-commute',
    label: 'Corporate Commute Laptop + Phone Kit',
    category: 'laptop',
    baseUnitPrice: 64,
    description:
      'Branded 360° impact laptop sleeves for corporate wellness events, conferences, and employee onboarding.',
    defaultColor: '#18181B',
    defaultAccent: '#FF6B2C',
  },
  {
    id: 'gym-member-vault',
    label: 'Gym Member Earbud & Bottle Bundle',
    category: 'earbuds',
    baseUnitPrice: 32,
    description:
      'Latch-locked earbud armor with gym-branded carabiner clips for fitness member milestone rewards.',
    defaultColor: '#FF6B2C',
    defaultAccent: '#111111',
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
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b-2 border-[#111111]">
        <div>
          <p className="text-xs font-mono font-bold text-[#2563EB]">
            B2B / SCHOOL &amp; CORPORATE COLLAB PORTAL
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
            Squad Packs for Schools &amp; Brand Collabs
          </h1>
          <p className="mt-1.5 text-sm text-[#52525B] max-w-2xl">
            Direct manufacturing runs for campus bookstores, sports teams, gym memberships,
            and corporate brand collaborations. Includes 1-year defect warranty on every unit.
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono">
          <div>
            <span className="block text-[#52525B]">TARGET B2B STREAM</span>
            <span className="text-sm font-bold text-[#111111] tabular-nums">
              $10,000 / mo · $120,000 / yr
            </span>
          </div>
          <div>
            <span className="block text-[#52525B]">VOLUME TIER</span>
            <span className="text-sm font-bold text-[#2563EB] tabular-nums">
              12% – 25% Off Retail
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Live Custom Branded Preview */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-[#DBEAFE] border-2 border-[#111111] rounded-2xl shadow-[6px_6px_0px_0px_#111111] p-6 sm:p-8">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-[#111111] mb-3">
              <span>CO-BRANDED SAMPLE</span>
              <span>MIN 25 UNITS</span>
            </div>
            <div className="aspect-[4/3] bg-white border-2 border-[#111111] rounded-xl flex items-center justify-center p-4">
              <ProductArtwork
                category={selectedPkg.category}
                shellHex={selectedPkg.defaultColor}
                accentHex={selectedPkg.defaultAccent}
                pattern="stripe"
                addon={selectedPkg.category === 'bottle' ? 'hydration-loop' : 'carabiner'}
                monogram={monogram}
              />
            </div>
            <div className="mt-4 pt-4 border-t-2 border-[#111111]">
              <h2 className="font-display text-lg font-extrabold text-[#111111]">
                {selectedPkg.label}
              </h2>
              <p className="mt-1 text-sm text-[#27272A]">{selectedPkg.description}</p>
            </div>
          </div>

          <div className="bg-[#C8F135] border-2 border-[#111111] rounded-2xl shadow-[4px_4px_0px_0px_#111111] p-6 space-y-2.5">
            <div className="flex items-center gap-2 text-sm font-bold text-[#111111]">
              <Building2 className="w-4 h-4" aria-hidden="true" />
              <span>Bottle Manufacturer &amp; Corporate Collab Ready</span>
            </div>
            <p className="text-xs text-[#27272A] leading-relaxed">
              Direct production scheduling with our bottle manufacturer partner ensures unified
              color matching across bottles, phone cases, earbud vaults, and laptop sleeves.
            </p>
          </div>
        </div>

        {/* Right: Wholesale Configurator & Quote Form */}
        <div className="lg:col-span-7 bg-white border-2 border-[#111111] rounded-2xl shadow-[6px_6px_0px_0px_#111111] p-6 sm:p-8">
          {submittedQuote ? (
            <div className="py-8 space-y-5">
              <div className="flex items-center gap-3 text-[#059669]">
                <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                <span className="font-mono text-sm font-bold">
                  QUOTE REGISTERED · {submittedQuote.quoteId}
                </span>
              </div>
              <h2 className="font-display text-2xl font-extrabold text-[#111111]">
                Thank you, {submittedQuote.orgName}
              </h2>
              <p className="text-sm text-[#3F3F46]">
                Your custom {submittedQuote.orgType} request for{' '}
                <strong className="text-[#111111] tabular-nums">
                  {submittedQuote.units} units
                </strong>{' '}
                (engraved <span className="font-mono font-bold">{submittedQuote.monogram}</span>) totaling{' '}
                <strong className="text-[#111111] font-mono tabular-nums">
                  ${submittedQuote.totalValue.toLocaleString()}
                </strong>{' '}
                has been queued for our B2B &amp; corporate events team.
              </p>
              <button
                type="button"
                onClick={() => setSubmittedQuote(null)}
                className="px-5 py-2.5 text-xs font-bold text-[#111111] bg-[#C8F135] hover:bg-[#FF6B2C] border-2 border-[#111111] rounded-xl shadow-[3px_3px_0px_0px_#111111] cursor-pointer"
              >
                Configure Another Bulk Order
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitQuote} className="space-y-6">
              <div>
                <span className="block text-xs font-bold text-[#111111] mb-2.5">
                  01. Select Partner Organization Type
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {(['School / University', 'Corporate Event', 'Gym / Club'] as const).map(
                    (type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setOrgType(type)}
                        className={`px-3.5 py-2.5 text-xs font-bold rounded-xl border-2 border-[#111111] text-left transition-all cursor-pointer flex items-center gap-2 ${
                          orgType === type
                            ? 'bg-[#C8F135] text-[#111111] shadow-[2px_2px_0px_0px_#111111]'
                            : 'bg-[#FAF9F5] text-[#52525B]'
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
                <span className="block text-xs font-bold text-[#111111] mb-2.5">
                  02. Select Co-Branded Kit
                </span>
                <div className="space-y-2.5">
                  {ORG_PACKAGES.map((pkg) => {
                    const active = pkg.id === selectedPkgId;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPkgId(pkg.id)}
                        className={`w-full p-3.5 rounded-xl border-2 border-[#111111] text-left flex items-center justify-between gap-4 cursor-pointer transition-all ${
                          active
                            ? 'bg-[#FFE3D3] shadow-[3px_3px_0px_0px_#111111]'
                            : 'bg-[#FAF9F5] hover:bg-white'
                        }`}
                      >
                        <span className="text-sm font-bold text-[#111111]">{pkg.label}</span>
                        <span className="font-mono text-xs font-bold text-[#111111] tabular-nums">
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
                    <label htmlFor="b2b-units" className="text-xs font-bold text-[#111111]">
                      03. Order Quantity
                    </label>
                    <span className="font-mono text-xs font-bold text-[#2563EB] tabular-nums">
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
                    className="w-full accent-[#FF6B2C] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-[#52525B] mt-1">
                    <span>25</span>
                    <span>100 (18% off)</span>
                    <span>250+ (25% off)</span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="b2b-monogram"
                    className="block text-xs font-bold text-[#111111] mb-1.5"
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
                    className="w-full px-3.5 py-2 text-sm font-mono font-bold uppercase bg-[#FAF9F5] border-2 border-[#111111] rounded-xl text-[#111111] focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="b2b-org-name"
                    className="block text-xs font-bold text-[#111111] mb-1.5"
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
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F5] border-2 border-[#111111] rounded-xl text-[#111111] focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="b2b-email"
                    className="block text-xs font-bold text-[#111111] mb-1.5"
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
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F5] border-2 border-[#111111] rounded-xl text-[#111111] focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div className="p-4 bg-[#FAF9F5] border-2 border-[#111111] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-[#52525B]">Estimated Wholesale Subtotal</p>
                  <p className="font-mono text-2xl font-bold text-[#111111] tabular-nums">
                    ${pricing.total.toLocaleString()}{' '}
                    <span className="text-xs font-normal text-[#52525B]">
                      (${pricing.unitPrice.toFixed(2)} / unit)
                    </span>
                  </p>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-bold text-[#111111] bg-[#FF6B2C] hover:bg-[#FF8552] border-2 border-[#111111] rounded-xl shadow-[3px_3px_0px_0px_#111111] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all whitespace-nowrap shrink-0 cursor-pointer"
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
