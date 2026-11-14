import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { AppTab } from '../types';

interface NavbarProps {
  activeTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const NAV_ITEMS: { id: AppTab; label: string }[] = [
  { id: 'store', label: 'Store' },
  { id: 'studio', label: 'Custom Studio' },
  { id: 'b2b', label: 'B2B & Schools' },
  { id: 'community', label: 'Events & Feed' },
  { id: 'blueprint', label: 'Business Plan' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  cartCount,
  onOpenCart,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-sm border-b-2 border-[#111111]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <button
          type="button"
          onClick={() => onSelectTab('store')}
          className="font-display text-2xl font-extrabold tracking-tight text-[#111111] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2563EB] focus-visible:outline-offset-4"
        >
          FormShield
        </button>

        {/* Zone 2: 5 concise single-line text nav links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-[3px] ${
                  isActive
                    ? 'text-[#111111] border-[#FF6B2C]'
                    : 'text-[#52525B] border-transparent hover:text-[#111111]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#111111] bg-[#C8F135] hover:bg-[#FF6B2C] border-2 border-[#111111] rounded-xl shadow-[3px_3px_0px_0px_#111111] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2563EB] focus-visible:outline-offset-2"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            <span className="tabular-nums">Bag ({cartCount})</span>
          </button>
        </div>
      </div>

      {/* Compact mobile horizontal nav bar below 768px */}
      <div className="md:hidden border-t border-[#111111]/15 px-4 py-2 flex items-center gap-4 overflow-x-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`text-xs font-semibold py-1 whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
                isActive
                  ? 'text-[#111111] border-[#FF6B2C]'
                  : 'text-[#52525B] border-transparent'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
