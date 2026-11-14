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
  blue: 'bg-[#DBEAFE] border-2 border-[#111111] text-[#111111]',
  yellow: 'bg-[#FEF08A] border-2 border-[#111111] text-[#111111]',
  orange: 'bg-[#FED7AA] border-2 border-[#111111] text-[#111111]',
  pink: 'bg-[#FBCFE8] border-2 border-[#111111] text-[#111111]',
  green: 'bg-[#C8F135] border-2 border-[#111111] text-[#111111]',
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
        className={`bg-white border-2 border-[#111111] rounded-2xl shadow-[4px_4px_0px_0px_#111111] p-5 flex flex-col justify-between gap-4 ${extraClass}`}
      >
        <div>
          <h3 className="font-display text-base font-extrabold text-[#111111]">{block.title}</h3>
          <p className="mt-0.5 text-xs text-[#52525B] leading-snug">{block.promptQuestion}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {block.stickies.map((sticky, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl text-xs font-bold leading-snug shadow-[2px_2px_0px_0px_#111111] ${
                  STICKY_STYLES[sticky.tone]
                }`}
              >
                {sticky.text}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t-2 border-[#111111]/10 flex items-center justify-between gap-2 text-xs">
          <span className="text-[#52525B] truncate">{block.mappedFeature}</span>
          {action.tab !== 'blueprint' && (
            <button
              type="button"
              onClick={() => onNavigateTab(action.tab)}
              className="font-bold text-[#2563EB] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
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
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b-2 border-[#111111]">
        <div>
          <p className="text-xs font-mono font-bold text-[#2563EB]">
            DATA ANALYTICS &amp; BUSINESS INTELLIGENCE · CANVAS MIRROR
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
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
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#111111] bg-[#C8F135] hover:bg-[#FF6B2C] border-2 border-[#111111] rounded-xl shadow-[3px_3px_0px_0px_#111111] transition-all w-fit cursor-pointer"
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
        <div className="bg-white border-2 border-[#111111] rounded-2xl shadow-[5px_5px_0px_0px_#111111] p-4 sm:p-6">
          <p className="text-xs font-mono font-bold text-[#52525B] mb-3">
            ATTACHED SOURCE FILE · /assets/aistudio/Guessing_Game_f4e44a8a.png
          </p>
          <img
            src="/assets/aistudio/Guessing_Game_f4e44a8a.png"
            alt="Original uploaded Business Model Canvas"
            className="w-full h-auto rounded-xl border-2 border-[#111111]"
          />
        </div>
      )}

      {/* Interactive Financial Intelligence Simulator */}
      <section className="bg-white border-2 border-[#111111] rounded-2xl shadow-[6px_6px_0px_0px_#111111] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-extrabold text-[#111111]">
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
            className="px-3.5 py-2 text-xs font-bold text-[#111111] bg-[#FAF9F5] hover:bg-[#C8F135] border-2 border-[#111111] rounded-xl w-fit cursor-pointer"
          >
            Reset to Canvas Baseline
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-[#FAF9F5] border-2 border-[#111111] rounded-xl">
            <p className="text-xs font-semibold text-[#52525B]">B2C Annual Revenue (×12)</p>
            <p className="mt-1 font-mono text-2xl font-bold text-[#111111] tabular-nums">
              ${financialModel.b2cAnnual.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-[#FFE3D3] border-2 border-[#111111] rounded-xl">
            <p className="text-xs font-semibold text-[#111111]">B2B / School Annual (×12)</p>
            <p className="mt-1 font-mono text-2xl font-bold text-[#111111] tabular-nums">
              ${financialModel.b2bAnnual.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-[#C8F135] border-2 border-[#111111] rounded-xl">
            <p className="text-xs font-semibold text-[#111111]">Total Annual Revenue</p>
            <p className="mt-1 font-mono text-2xl font-bold text-[#111111] tabular-nums">
              ${financialModel.totalAnnual.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-[#DBEAFE] border-2 border-[#111111] rounded-xl">
            <p className="text-xs font-semibold text-[#111111]">Live Session Store Activity</p>
            <p className="mt-1 font-mono text-2xl font-bold text-[#111111] tabular-nums">
              ${(financialModel.liveOrdersSum + cartSubtotal).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <label htmlFor="sim-b2c" className="font-bold text-[#111111]">
                Monthly B2C Target
              </label>
              <span className="font-mono font-bold text-[#2563EB] tabular-nums">
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
              className="w-full accent-[#FF6B2C] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <label htmlFor="sim-b2b" className="font-bold text-[#111111]">
                Monthly B2B / School Target
              </label>
              <span className="font-mono font-bold text-[#2563EB] tabular-nums">
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
              className="w-full accent-[#2563EB] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <label htmlFor="sim-cost" className="font-bold text-[#111111]">
                Supplier, R&amp;D, Marketing &amp; Ops Budget
              </label>
              <span className="font-mono font-bold text-[#111111] tabular-nums">
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
              className="w-full accent-[#111111] cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* Full 9-Block Business Model Canvas Grid */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-extrabold text-[#111111]">
          Interactive 9-Block Business Model Canvas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {renderBlockCard('key-partners')}

          <div className="flex flex-col gap-4">
            {renderBlockCard('key-activities', 'flex-1')}
            {renderBlockCard('key-resources', 'flex-1')}
          </div>

          {renderBlockCard('key-propositions')}

          <div className="flex flex-col gap-4">
            {renderBlockCard('customer-relationships', 'flex-1')}
            {renderBlockCard('channels', 'flex-1')}
          </div>

          {renderBlockCard('customer-segments')}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {renderBlockCard('cost-structure')}
          {renderBlockCard('revenue-streams')}
        </div>
      </section>
    </div>
  );
};
