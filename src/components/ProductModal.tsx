import React, { useState } from 'react';
import { Check, ShieldCheck, X } from 'lucide-react';
import { CartItem, Product, ProductCategory } from '../types';
import { ProductArtwork } from './ProductArtwork';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, 'cartId'>) => void;
  onCustomize: (category: ProductCategory) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onCustomize,
}) => {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const variant = product.colors[selectedColorIdx] ?? product.colors[0];

  const handleAdd = () => {
    onAddToCart({
      productId: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      quantity,
      shellHex: variant.shellHex,
      accentHex: variant.accentHex,
      colorLabel: variant.name,
      pattern: product.defaultPattern,
      addon: product.defaultAddon,
      isCustom: false,
      designerCollab: product.designerCollab,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
    >
      <div className="bg-white border-2 border-[#111111] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-[8px_8px_0px_0px_#111111]">
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-[#111111] bg-[#FAF9F5]">
          <span className="font-mono text-xs font-bold text-[#111111]">
            {product.sku} · {product.categoryLabel}
            {product.isDesignerSeries ? ' · Designer Series' : ''}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className="p-1.5 text-[#111111] hover:bg-[#C8F135] border-2 border-[#111111] rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 lg:p-8 items-stretch">
          {/* Studio Gallery */}
          <div className="md:col-span-6 bg-[#EDE9FE] border-2 border-[#111111] rounded-2xl p-6 flex flex-col justify-between">
            <div className="aspect-[4/3] w-full flex items-center justify-center">
              <ProductArtwork
                category={product.category}
                shellHex={variant.shellHex}
                accentHex={variant.accentHex}
                pattern={product.defaultPattern}
                addon={product.defaultAddon}
              />
            </div>
            <div className="pt-4 border-t-2 border-[#111111]/15 flex items-center justify-between text-xs font-semibold text-[#111111]">
              <span>{product.dropRating}</span>
              <span className="truncate ml-2">{product.material}</span>
            </div>
          </div>

          {/* Contiguous Purchase Module */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {product.designerCollab && (
                <p className="text-xs font-bold text-[#2563EB] mb-1">
                  {product.designerCollab}
                </p>
              )}
              <div className="flex items-baseline justify-between gap-4">
                <h2 id="pdp-title" className="font-display text-2xl font-extrabold text-[#111111]">
                  {product.name}
                </h2>
                <span className="font-mono text-2xl font-bold text-[#111111] tabular-nums">
                  ${product.price}
                </span>
              </div>
              <p className="mt-3 text-sm text-[#52525B] leading-relaxed">{product.summary}</p>

              <div className="mt-5">
                <p className="text-xs font-bold text-[#111111] mb-2">
                  Colorway: <span className="font-medium text-[#52525B]">{variant.name}</span>
                </p>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c, idx) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColorIdx(idx)}
                      aria-label={`Select ${c.name}`}
                      className={`w-8 h-8 rounded-full border-2 border-[#111111] cursor-pointer transition-transform ${
                        selectedColorIdx === idx
                          ? 'ring-2 ring-[#2563EB] ring-offset-2 scale-110'
                          : ''
                      }`}
                      style={{ backgroundColor: c.shellHex }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t-2 border-[#111111]/10">
                <p className="text-xs font-bold text-[#111111] mb-2">
                  Crew Fit: {product.segments.join(' · ')}
                </p>
                <ul className="space-y-1.5">
                  {product.specs.map((spec) => (
                    <li key={spec} className="flex items-start gap-2 text-xs text-[#52525B]">
                      <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-[#111111]/15 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#111111]">
                <ShieldCheck className="w-4 h-4 text-[#059669] shrink-0" />
                <span>Includes 1-Year Manufacturing Defect Warranty</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="inline-flex items-center border-2 border-[#111111] rounded-xl bg-[#FAF9F5]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="px-3 py-2.5 text-sm font-bold text-[#111111] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-2.5 text-sm font-mono font-bold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="px-3 py-2.5 text-sm font-bold text-[#111111] cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex-1 px-5 py-3 text-sm font-bold text-[#111111] bg-[#C8F135] hover:bg-[#FF6B2C] border-2 border-[#111111] rounded-xl shadow-[3px_3px_0px_0px_#111111] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer whitespace-nowrap"
                >
                  Add to Bag · ${product.price * quantity}
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onCustomize(product.category);
                }}
                className="w-full px-4 py-2.5 text-xs font-bold text-[#111111] bg-[#FAF9F5] hover:bg-[#FFE3D3] border-2 border-[#111111] rounded-xl transition-colors cursor-pointer"
              >
                Remix in Custom Studio instead
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
