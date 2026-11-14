import React, { useState } from 'react';
import { CheckCircle2, Minus, Plus, ShieldCheck, Trash2, X } from 'lucide-react';
import { CartItem, OrderRecord } from '../types';
import { ProductArtwork } from './ProductArtwork';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onCompleteOrder: (order: OrderRecord) => void;
}

const FREE_SHIPPING_THRESHOLD = 75;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onCompleteOrder,
}) => {
  const [step, setStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [latestOrder, setLatestOrder] = useState<OrderRecord | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 8;
  const total = subtotal + shipping;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !email.trim() || !address.trim()) return;

    const orderNumber = `FS-${Math.floor(1000 + Math.random() * 8999)}`;
    const warrantyCode = `FS-WR-${Math.floor(10000 + Math.random() * 89999)}`;
    const record: OrderRecord = {
      orderNumber,
      createdAt: new Date().toISOString().slice(0, 10),
      customerName: customerName.trim(),
      email: email.trim(),
      address: `${address.trim()} ${postalCode.trim()}`.trim(),
      items: [...items],
      subtotal,
      shipping,
      total,
      warrantyCode,
    };
    setLatestOrder(record);
    onCompleteOrder(record);
    setStep('confirmed');
  };

  const handleClose = () => {
    if (step === 'confirmed') {
      setStep('bag');
      setLatestOrder(null);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/55"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
    >
      <div className="bg-white w-full max-w-md h-full flex flex-col justify-between border-l-2 border-[#111111]">
        {/* Header */}
        <div className="px-6 py-4 border-b-2 border-[#111111] bg-[#C8F135] flex items-center justify-between">
          <h2 className="font-display text-lg font-extrabold text-[#111111]">
            {step === 'bag'
              ? 'Your Gear Bag'
              : step === 'checkout'
                ? 'Checkout & Delivery'
                : 'Order Confirmed!'}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close bag"
            className="p-1.5 text-[#111111] bg-white border-2 border-[#111111] rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 bg-[#FAF9F5]">
          {step === 'confirmed' && latestOrder ? (
            <div className="py-6 space-y-5">
              <div className="flex items-center gap-2.5 text-[#059669]">
                <CheckCircle2 className="w-6 h-6 shrink-0" aria-hidden="true" />
                <span className="font-mono text-sm font-bold">
                  Order #{latestOrder.orderNumber} Confirmed
                </span>
              </div>
              <p className="text-sm text-[#3F3F46] leading-relaxed">
                Nice pick, <strong className="text-[#111111]">{latestOrder.customerName}</strong>.
                Your gear is queued for dispatch to {latestOrder.address}.
              </p>

              <div className="p-4 bg-white border-2 border-[#111111] rounded-xl shadow-[3px_3px_0px_0px_#111111] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#52525B]">1-Year Warranty Code</span>
                  <span className="font-mono font-bold text-[#2563EB]">
                    {latestOrder.warrantyCode}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#52525B]">Total Paid</span>
                  <span className="font-mono font-bold text-[#111111] tabular-nums">
                    ${latestOrder.total}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="w-full py-3 text-sm font-bold text-[#111111] bg-[#C8F135] hover:bg-[#FF6B2C] border-2 border-[#111111] rounded-xl shadow-[3px_3px_0px_0px_#111111] cursor-pointer"
              >
                Keep Exploring
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <p className="font-display text-xl font-bold text-[#111111]">
                Your bag is empty
              </p>
              <p className="text-sm text-[#52525B]">
                Grab gear from the catalog or remix your own colorway in the Custom Studio.
              </p>
            </div>
          ) : step === 'bag' ? (
            <>
              <div className="p-3.5 bg-white border-2 border-[#111111] rounded-xl text-xs font-semibold text-[#111111]">
                {remainingForFreeShipping === 0 ? (
                  <span className="text-[#059669]">
                    Free express shipping unlocked!
                  </span>
                ) : (
                  <span>
                    Add <strong className="font-mono">${remainingForFreeShipping}</strong> more
                    for free express shipping ($75+).
                  </span>
                )}
              </div>

              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.cartId}
                    className="p-3.5 bg-white border-2 border-[#111111] rounded-xl flex gap-3.5 shadow-[3px_3px_0px_0px_#111111]"
                  >
                    <div className="w-20 h-20 bg-[#EDE9FE] border border-[#111111] rounded-lg p-1.5 shrink-0 flex items-center justify-center">
                      <ProductArtwork
                        category={item.category}
                        shellHex={item.shellHex}
                        accentHex={item.accentHex}
                        pattern={item.pattern}
                        addon={item.addon}
                        monogram={item.monogram}
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-bold text-[#111111] truncate">
                            {item.name}
                          </h3>
                          <span className="font-mono text-sm font-bold text-[#111111] tabular-nums">
                            ${item.price * item.quantity}
                          </span>
                        </div>
                        <p className="text-xs text-[#52525B] truncate">
                          {item.colorLabel}
                          {item.isCustom ? ` · ${item.pattern}` : ''}
                          {item.monogram ? ` · "${item.monogram}"` : ''}
                        </p>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center border-2 border-[#111111] rounded-lg bg-[#FAF9F5]">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.cartId, -1)}
                            aria-label="Decrease item quantity"
                            className="p-1.5 text-[#111111] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-mono font-bold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.cartId, 1)}
                            aria-label="Increase item quantity"
                            className="p-1.5 text-[#111111] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.cartId)}
                          aria-label={`Remove ${item.name}`}
                          className="p-1.5 text-[#52525B] hover:text-[#DC2626] cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="chk-name"
                  className="block text-xs font-bold text-[#111111] mb-1"
                >
                  Full Name
                </label>
                <input
                  id="chk-name"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border-2 border-[#111111] rounded-xl focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="chk-email"
                  className="block text-xs font-bold text-[#111111] mb-1"
                >
                  Email (for Warranty &amp; Receipt)
                </label>
                <input
                  id="chk-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border-2 border-[#111111] rounded-xl focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="chk-address"
                  className="block text-xs font-bold text-[#111111] mb-1"
                >
                  Shipping Address
                </label>
                <input
                  id="chk-address"
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="420 Market Street, Apt 4B"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border-2 border-[#111111] rounded-xl focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="chk-postal"
                  className="block text-xs font-bold text-[#111111] mb-1"
                >
                  Postal Code
                </label>
                <input
                  id="chk-postal"
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="94105"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border-2 border-[#111111] rounded-xl focus:outline-none"
                />
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && step !== 'confirmed' && (
          <div className="px-6 py-5 border-t-2 border-[#111111] bg-white space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#52525B] font-medium">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">${subtotal}</span>
              </div>
              <div className="flex justify-between text-[#52525B] font-medium">
                <span>Shipping</span>
                <span className="font-mono tabular-nums">
                  {shipping === 0 ? 'Free' : `$${shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#111111] pt-1.5 border-t-2 border-[#111111]/15">
                <span>Total</span>
                <span className="font-mono tabular-nums">${total}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#111111]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" aria-hidden="true" />
              <span>1-Year Manufacturing Defect Warranty auto-issued</span>
            </div>

            {step === 'bag' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full py-3 text-sm font-bold text-[#111111] bg-[#FF6B2C] hover:bg-[#FF8552] border-2 border-[#111111] rounded-xl shadow-[3px_3px_0px_0px_#111111] cursor-pointer"
              >
                Checkout Now
              </button>
            ) : (
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setStep('bag')}
                  className="px-4 py-3 text-xs font-bold text-[#111111] bg-[#FAF9F5] border-2 border-[#111111] rounded-xl cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="flex-1 py-3 text-sm font-bold text-[#111111] bg-[#C8F135] hover:bg-[#D6F65C] border-2 border-[#111111] rounded-xl shadow-[3px_3px_0px_0px_#111111] cursor-pointer"
                >
                  Place Order · ${total}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
