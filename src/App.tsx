import { useMemo, useState } from 'react';
import { B2BPortalView } from './components/B2BPortalView';
import { BusinessBlueprintView } from './components/BusinessBlueprintView';
import { CartDrawer } from './components/CartDrawer';
import { CommunityEventsView } from './components/CommunityEventsView';
import { CustomStudioView } from './components/CustomStudioView';
import { Navbar } from './components/Navbar';
import { ProductModal } from './components/ProductModal';
import { StorefrontView } from './components/StorefrontView';
import { INITIAL_WARRANTIES } from './data/storeData';
import {
  AppTab,
  CartItem,
  OrderRecord,
  Product,
  ProductCategory,
  WarrantyRecord,
} from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('store');
  const [studioCategory, setStudioCategory] = useState<ProductCategory>('phone');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [warranties, setWarranties] = useState<WarrantyRecord[]>(INITIAL_WARRANTIES);

  const [footerEmail, setFooterEmail] = useState('');
  const [footerSubscribed, setFooterSubscribed] = useState(false);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );
  const cartSubtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  const handleAddToCart = (newItem: Omit<CartItem, 'cartId'>) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          !item.isCustom &&
          item.productId === newItem.productId &&
          item.colorLabel === newItem.colorLabel,
      );
      if (existing) {
        return prev.map((item) =>
          item.cartId === existing.cartId
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        );
      }
      return [
        ...prev,
        {
          ...newItem,
          cartId: `${newItem.productId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        },
      ];
    });
  };

  const handleUpdateQty = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleCompleteOrder = (order: OrderRecord) => {
    setOrders((prev) => [order, ...prev]);
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);
    const firstItemName = order.items[0]?.name ?? 'FormShield Active Gear';
    setWarranties((prev) => [
      {
        code: order.warrantyCode,
        productName: firstItemName,
        purchaseDate: today.toISOString().slice(0, 10),
        expiresDate: nextYear.toISOString().slice(0, 10),
        ownerEmail: order.email,
        status: 'Active Coverage',
      },
      ...prev,
    ]);
    setCart([]);
  };

  const handleOpenStudioWithCategory = (category: ProductCategory) => {
    setStudioCategory(category);
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateTab = (tab: AppTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0A0A0A]">
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleNavigateTab}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        {activeTab === 'store' && (
          <StorefrontView
            onAddToCart={handleAddToCart}
            onSelectProduct={setSelectedProduct}
            onNavigateTab={handleNavigateTab}
            onOpenStudioWithCategory={handleOpenStudioWithCategory}
          />
        )}

        {activeTab === 'studio' && (
          <CustomStudioView
            key={studioCategory}
            initialCategory={studioCategory}
            onAddToCart={handleAddToCart}
          />
        )}

        {activeTab === 'b2b' && <B2BPortalView />}

        {activeTab === 'community' && (
          <CommunityEventsView
            warranties={warranties}
            onRegisterWarranty={(rec) => setWarranties((prev) => [rec, ...prev])}
            onOpenStudioWithCategory={handleOpenStudioWithCategory}
          />
        )}

        {activeTab === 'blueprint' && (
          <BusinessBlueprintView
            onNavigateTab={handleNavigateTab}
            orders={orders}
            cartSubtotal={cartSubtotal}
          />
        )}
      </main>

      {/* LSKD-Inspired Stark Monochrome Footer */}
      <footer className="bg-[#0A0A0A] text-white mt-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-14 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 space-y-3">
            <span className="font-display text-2xl font-extrabold tracking-tight text-white">
              FormShield
            </span>
            <p className="text-sm text-[#94A3B8] max-w-sm leading-relaxed">
              Wholistic protection in style for phones, earbuds, laptops, and insulated bottles.
              Backed by a 1-year manufacturing defect warranty.
            </p>
          </div>

          <div className="md:col-span-4 grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2.5">
              <p className="text-xs font-mono font-semibold text-[#F3E16B]">STORE &amp; APP</p>
              <button
                type="button"
                onClick={() => handleNavigateTab('store')}
                className="block text-left text-[#CBD5E1] hover:text-white cursor-pointer"
              >
                Catalog &amp; Designer Series
              </button>
              <button
                type="button"
                onClick={() => handleNavigateTab('studio')}
                className="block text-left text-[#CBD5E1] hover:text-white cursor-pointer"
              >
                Custom Studio
              </button>
              <button
                type="button"
                onClick={() => handleNavigateTab('b2b')}
                className="block text-left text-[#CBD5E1] hover:text-white cursor-pointer"
              >
                B2B &amp; Schools
              </button>
            </div>
            <div className="space-y-2.5">
              <p className="text-xs font-mono font-semibold text-[#8BB8E8]">COMMUNITY &amp; PLAN</p>
              <button
                type="button"
                onClick={() => handleNavigateTab('community')}
                className="block text-left text-[#CBD5E1] hover:text-white cursor-pointer"
              >
                Pop-Ups &amp; KOL Feed
              </button>
              <button
                type="button"
                onClick={() => handleNavigateTab('community')}
                className="block text-left text-[#CBD5E1] hover:text-white cursor-pointer"
              >
                1-Yr Warranty Hub
              </button>
              <button
                type="button"
                onClick={() => handleNavigateTab('blueprint')}
                className="block text-left text-[#CBD5E1] hover:text-white cursor-pointer"
              >
                Business Model Canvas
              </button>
            </div>
          </div>

          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-mono font-semibold text-white">
              WEEKLY NEWSLETTER · NEW DROPS &amp; POP-UPS
            </p>
            {footerSubscribed ? (
              <p className="text-xs text-[#F3E16B] font-medium">
                Subscribed {footerEmail} to our weekly newsletter.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (footerEmail.trim()) setFooterSubscribed(true);
                }}
                className="flex gap-2"
              >
                <input
                  type="email"
                  required
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                  placeholder="Email address"
                  aria-label="Footer newsletter email"
                  className="flex-1 px-3.5 py-2.5 text-sm bg-white text-[#0A0A0A] rounded-sm focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 text-xs font-semibold text-[#0A0A0A] bg-[#F3E16B] hover:bg-white rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </footer>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onCustomize={handleOpenStudioWithCategory}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCompleteOrder={handleCompleteOrder}
      />
    </div>
  );
}
