import React, { useMemo, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { BUSINESS_MODEL_CANVAS } from '../data/storeData';
import { AppTab, OrderRecord } from '../types';

interface BusinessBlueprintViewProps {
  onNavigateTab: (tab: AppTab) => void;
  orders: OrderRecord[];
  cartSubtotal: number;
}

const STICKY_STYLES: Record<string, string> = {
  blue: 'bg-[#DBEAFE] border-[#93C5FD] text-[#1E3A8A]',
  yellow: 'bg-[#FEF3C7] border-[#FCD34D] text-[#78350F]',
  orange: 'bg-[#FFEDD5] border-[#FDBA74] text-[#7C2D12]',
  pink: 'bg-[#FCE7F3] border-[#F9A8D4] text-[#831843]',
  green: 'bg-[#DCFCE7] border-[#86EFAC] text-[#14532D]',
};

const BLOCK_ROUTES: Record<string, { tab: AppTab; label: string }> = {
  'key-partners': { tab: 'community', label: 'View KOL & Bottle Partner' },
  'key-activities': { tab: 'studio', label: 'Open R&D Custom Studio' },
  'key-resources': { tab: 'store', label: 'Explore Online Storefront' },
  'key-propositions': { tab: 'studio', label: 'Customize & Warranty' },
  'customer-relationships': { tab: 'community', label: 'Weekly Newsletter & Daily Feed' },
  channels: { tab: 'community', label: 'Pop-Ups & Corporate Events' },
  'customer-segments': { tab: 'store', label: 'Filter Store by Segment' },
  'cost-structure': { tab: 'blueprint', label: 'Model Costs Below' },
  'revenue-streams': { tab: 'b2b', label: 'Open B2B & School Portal' },
};

export const BusinessBlueprintView: React.FC<BusinessBlueprintViewProps> = ({
  onNavigateTab,
  orders,
  cartSubtotal,
}) => {
  const [showSourceCanvas, setShowSourceCanvas] = useState(false);
  const [b2cMonthlyTarget, setB2cMonthlyTarget] = useState(24000);
  const [b2bMonthlyTarget, setB2bMonthlyTarget] = useState(10000);
  const [startupBudget, setStartupBudget] = useState(30000);

  const financialModel = useMemo(() => {
    const b2cAnnual = b2cMonthlyTarget * 12;
    const b2bAnnual = b2bMonthlyTarget * 12;
    const totalAnnual = b2cAnnual + b2bAnnual;
    const netAfterInitialCost = totalAnnual - startupBudget;
    const liveOrdersSum = orders.reduce((acc, o) => acc + o.total, 0);
    return {
      b2cAnnual,
      b2bAnnual,
      totalAnnual,
      netAfterInitialCost,
      liveOrdersSum,
    };
  }, [b2cMonthlyTarget, b2bMonthlyTarget, startupBudget, orders]);

  const byId = (id: string) => BUSINESS_MODEL_CANVAS.find((b) => b.id === id)!;

  const renderBlockCard = (id: string, extraClass = '') => {
    const block = byId(id);
    const action = BLOCK_ROUTES[id];
    return (
      <div
        key={block.id}
        className={`bg-white border border-black/10 rounded-xl p-5 flex flex-col justify-between gap-4 ${extraClass}`}
      >
        <div>
          <h3 className="font-display text-base font-bold text-[#141416]">{block.title}</h3>
          <p className="mt-0.5 text-xs text-[#71717A] leading-snug">{block.promptQuestion}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {block.stickies.map((sticky, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border text-xs font-medium leading-snug ${
                  STICKY_STYLES[sticky.tone]
                }`}
              >
                {sticky.text}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-black/10 flex items-center justify-between gap-2 text-xs">
          <span className="text-[#52525B] truncate">{block.mappedFeature}</span>
          {action.tab !== 'blueprint' && (
            <button
              type="button"
              onClick={() => onNavigateTab(action.tab)}
              className="font-semibold text-[#1D4ED8] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
            >
              {action.label} →
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 lg:py-12 space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-black/10">
        <div>
          <p className="text-xs font-mono text-[#1D4ED8]">
            DATA ANALYTICS &amp; BUSINESS INTELLIGENCE · CANVAS MIRROR
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#141416]">
            Business Model Canvas &amp; Revenue Simulator
          </h1>
          <p className="mt-1.5 text-sm text-[#52525B] max-w-2xl">
            Every section of this webstore and companion app mirrors the exact sticky notes
            from your Business Model Canvas—linking strategy directly to live product tools.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowSourceCanvas((s) => !s)}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#141416] bg-white border border-black/15 hover:bg-[#ECECE8] rounded-lg transition-colors w-fit cursor-pointer"
        >
          {showSourceCanvas ? (
            <>
              <EyeOff className="w-4 h-4" aria-hidden="true" />
              <span>Hide Original Canvas Image</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" aria-hidden="true" />
              <span>Compare Original Canvas File</span>
            </>
          )}
        </button>
      </div>

      {showSourceCanvas && (
        <div className="bg-white border border-black/10 rounded-xl p-4 sm:p-6">
          <p className="text-xs font-mono text-[#52525B] mb-3">
            ATTACHED SOURCE FILE · /assets/aistudio/Guessing_Game_f4e44a8a.png
          </p>
          <img
            src="/assets/aistudio/Guessing_Game_f4e44a8a.png"
            alt="Original uploaded Business Model Canvas"
            className="w-full h-auto rounded-lg border border-black/10"
          />
        </div>
      )}

      {/* Interactive Financial Intelligence Simulator */}
      <section className="bg-white border border-black/10 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold text-[#141416]">
              Cost Structure vs. Annual Revenue Streams
            </h2>
            <p className="text-xs text-[#52525B] mt-0.5">
              Defaults match your canvas projections: $24k/mo B2C + $10k/mo B2B/School vs.
              $30k initial allocation.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setB2cMonthlyTarget(24000);
              setB2bMonthlyTarget(10000);
              setStartupBudget(30000);
            }}
            className="px-3.5 py-2 text-xs font-semibold text-[#141416] bg-[#ECECE8] hover:bg-[#E2E2DC] rounded-lg w-fit cursor-pointer"
          >
            Reset to Canvas Baseline
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-[#F7F7F5] border border-black/10 rounded-lg">
            <p className="text-xs text-[#52525B]">B2C Annual Revenue (×12)</p>
            <p className="mt-1 font-mono text-2xl font-bold text-[#141416] tabular-nums">
              ${financialModel.b2cAnnual.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-[#F7F7F5] border border-black/10 rounded-lg">
            <p className="text-xs text-[#52525B]">B2B / School Annual (×12)</p>
            <p className="mt-1 font-mono text-2xl font-bold text-[#141416] tabular-nums">
              ${financialModel.b2bAnnual.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-[#ECFDF5] border border-[#059669]/20 rounded-lg">
            <p className="text-xs text-[#065F46]">Total Annual Revenue</p>
            <p className="mt-1 font-mono text-2xl font-bold text-[#065F46] tabular-nums">
              ${financialModel.totalAnnual.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-[#EFF6FF] border border-[#1D4ED8]/20 rounded-lg">
            <p className="text-xs text-[#1E3A8A]">Live Session Store Activity</p>
            <p className="mt-1 font-mono text-2xl font-bold text-[#1E3A8A] tabular-nums">
              ${(financialModel.liveOrdersSum + cartSubtotal).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <label htmlFor="sim-b2c" className="font-semibold text-[#141416]">
                Monthly B2C Target
              </label>
              <span className="font-mono text-[#1D4ED8] tabular-nums">
                ${b2cMonthlyTarget.toLocaleString()}/mo
              </span>
            </div>
            <input
              id="sim-b2c"
              type="range"
              min={10000}
              max={60000}
              step={2000}
              value={b2cMonthlyTarget}
              onChange={(e) => setB2cMonthlyTarget(Number(e.target.value))}
              className="w-full accent-[#1D4ED8] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <label htmlFor="sim-b2b" className="font-semibold text-[#141416]">
                Monthly B2B / School Target
              </label>
              <span className="font-mono text-[#1D4ED8] tabular-nums">
                ${b2bMonthlyTarget.toLocaleString()}/mo
              </span>
            </div>
            <input
              id="sim-b2b"
              type="range"
              min={2000}
              max={30000}
              step={1000}
              value={b2bMonthlyTarget}
              onChange={(e) => setB2bMonthlyTarget(Number(e.target.value))}
              className="w-full accent-[#1D4ED8] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <label htmlFor="sim-cost" className="font-semibold text-[#141416]">
                Supplier, R&amp;D, Marketing &amp; Ops Budget
              </label>
              <span className="font-mono text-[#141416] tabular-nums">
                ${startupBudget.toLocaleString()}
              </span>
            </div>
            <input
              id="sim-cost"
              type="range"
              min={15000}
              max={80000}
              step={5000}
              value={startupBudget}
              onChange={(e) => setStartupBudget(Number(e.target.value))}
              className="w-full accent-[#141416] cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* Full 9-Block Business Model Canvas Grid */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-bold text-[#141416]">
          Interactive 9-Block Business Model Canvas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Column 1: Key Partners */}
          {renderBlockCard('key-partners')}

          {/* Column 2: Key Activities + Key Resources */}
          <div className="flex flex-col gap-4">
            {renderBlockCard('key-activities', 'flex-1')}
            {renderBlockCard('key-resources', 'flex-1')}
          </div>

          {/* Column 3: Key Propositions */}
          {renderBlockCard('key-propositions')}

          {/* Column 4: Customer Relationships + Channels */}
          <div className="flex flex-col gap-4">
            {renderBlockCard('customer-relationships', 'flex-1')}
            {renderBlockCard('channels', 'flex-1')}
          </div>

          {/* Column 5: Customer Segments */}
          {renderBlockCard('customer-segments')}
        </div>

        {/* Bottom Row: Cost Structure & Revenue Streams */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {renderBlockCard('cost-structure')}
          {renderBlockCard('revenue-streams')}
        </div>
      </section>
    </div>
  );
};
