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
    <header className="sticky top-0 z-40 bg-[#F7F7F5]/95 backdrop-blur-sm border-b border-black/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <button
          type="button"
          onClick={() => onSelectTab('store')}
          className="font-display text-xl font-bold tracking-tight text-[#141416] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1D4ED8] focus-visible:outline-offset-4"
        >
          FormShield
        </button>

        {/* Zone 2: 5 concise single-line text nav links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
                  isActive
                    ? 'text-[#141416] border-[#1D4ED8]'
                    : 'text-[#52525B] border-transparent hover:text-[#141416]'
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
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#141416] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1D4ED8] focus-visible:outline-offset-2"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            <span className="tabular-nums">Bag ({cartCount})</span>
          </button>
        </div>
      </div>

      {/* Compact mobile horizontal nav bar below 768px */}
      <div className="md:hidden border-t border-black/5 px-4 py-2 flex items-center gap-4 overflow-x-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`text-xs font-medium py-1 whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
                isActive
                  ? 'text-[#141416] border-[#1D4ED8]'
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
