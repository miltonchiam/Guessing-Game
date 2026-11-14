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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
    >
      <div className="bg-white border border-black/10 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/10">
          <span className="font-mono text-xs text-[#52525B]">
            {product.sku} · {product.categoryLabel}
            {product.isDesignerSeries ? ' · Designer Series' : ''}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className="p-2 text-[#52525B] hover:text-[#141416] rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 lg:p-8 items-stretch">
          {/* Sticky Studio Gallery */}
          <div className="md:col-span-6 bg-[#F2F2EE] rounded-xl p-6 flex flex-col justify-between">
            <div className="aspect-[4/3] w-full flex items-center justify-center">
              <ProductArtwork
                category={product.category}
                shellHex={variant.shellHex}
                accentHex={variant.accentHex}
                pattern={product.defaultPattern}
                addon={product.defaultAddon}
              />
            </div>
            <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs text-[#52525B]">
              <span>{product.dropRating}</span>
              <span>{product.material}</span>
            </div>
          </div>

          {/* Contiguous Purchase Module */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {product.designerCollab && (
                <p className="text-xs font-semibold text-[#1D4ED8] mb-1">
                  {product.designerCollab}
                </p>
              )}
              <div className="flex items-baseline justify-between gap-4">
                <h2 id="pdp-title" className="font-display text-2xl font-bold text-[#141416]">
                  {product.name}
                </h2>
                <span className="font-mono text-2xl font-bold text-[#141416] tabular-nums">
                  ${product.price}
                </span>
              </div>
              <p className="mt-3 text-sm text-[#52525B] leading-relaxed">{product.summary}</p>

              <div className="mt-5">
                <p className="text-xs font-semibold text-[#141416] mb-2">
                  Colorway: <span className="font-normal text-[#52525B]">{variant.name}</span>
                </p>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c, idx) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColorIdx(idx)}
                      aria-label={`Select ${c.name}`}
                      className={`w-8 h-8 rounded-full border cursor-pointer transition-transform ${
                        selectedColorIdx === idx
                          ? 'ring-2 ring-[#1D4ED8] ring-offset-2 border-black/30 scale-105'
                          : 'border-black/20'
                      }`}
                      style={{ backgroundColor: c.shellHex }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-black/10">
                <p className="text-xs font-semibold text-[#141416] mb-2">
                  Designed for: {product.segments.join(' · ')}
                </p>
                <ul className="space-y-1.5">
                  {product.specs.map((spec) => (
                    <li key={spec} className="flex items-start gap-2 text-xs text-[#52525B]">
                      <Check className="w-3.5 h-3.5 text-[#1D4ED8] shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-black/10 space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#141416]">
                <ShieldCheck className="w-4 h-4 text-[#059669] shrink-0" />
                <span>Includes 1-Year Manufacturing Defect Warranty</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="inline-flex items-center border border-black/15 rounded-lg bg-[#F7F7F5]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="px-3 py-2.5 text-sm font-semibold text-[#141416] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-2.5 text-sm font-mono tabular-nums">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="px-3 py-2.5 text-sm font-semibold text-[#141416] cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex-1 px-5 py-3 text-sm font-semibold text-white bg-[#141416] hover:bg-[#1D4ED8] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
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
                className="w-full px-4 py-2.5 text-xs font-semibold text-[#141416] bg-[#ECECE8] hover:bg-[#E2E2DC] rounded-lg transition-colors cursor-pointer"
              >
                Open in Custom Studio instead
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
