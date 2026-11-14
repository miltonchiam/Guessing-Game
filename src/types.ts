export type AppTab = 'store' | 'studio' | 'b2b' | 'community' | 'blueprint';

export type ProductCategory = 'phone' | 'earbuds' | 'laptop' | 'bottle';

export type CustomerSegment =
  | 'Students'
  | 'Office Workers'
  | 'Gym Members'
  | 'Runners'
  | 'Children';

export type PatternStyle = 'solid' | 'ridge' | 'topo' | 'carbon' | 'stripe';

export type ActiveAddon = 'none' | 'carabiner' | 'tether' | 'hydration-loop';

export interface ProductColorVariant {
  name: string;
  shellHex: string;
  accentHex: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  isDesignerSeries: boolean;
  designerCollab?: string;
  price: number;
  segments: CustomerSegment[];
  dropRating: string;
  material: string;
  summary: string;
  specs: string[];
  colors: ProductColorVariant[];
  defaultPattern: PatternStyle;
  defaultAddon: ActiveAddon;
  inStock: boolean;
}

export interface CustomBuildConfig {
  category: ProductCategory;
  shellColorName: string;
  shellHex: string;
  accentColorName: string;
  accentHex: string;
  pattern: PatternStyle;
  monogram: string;
  addon: ActiveAddon;
  targetSegment: CustomerSegment;
}

export interface CartItem {
  cartId: string;
  productId: string;
  name: string;
  category: ProductCategory;
  price: number;
  quantity: number;
  shellHex: string;
  accentHex: string;
  colorLabel: string;
  pattern: PatternStyle;
  addon: ActiveAddon;
  monogram?: string;
  isCustom: boolean;
  designerCollab?: string;
}

export interface OrderRecord {
  orderNumber: string;
  createdAt: string;
  customerName: string;
  email: string;
  address: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  warrantyCode: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  handle: string;
  role: string;
  segment: CustomerSegment;
  isKOL: boolean;
  dayLabel: string;
  caption: string;
  gearName: string;
  gearCategory: ProductCategory;
  shellHex: string;
  accentHex: string;
  pattern: PatternStyle;
  likes: number;
}

export interface BrandEvent {
  id: string;
  title: string;
  type: 'Offline Pop-Up' | 'Corporate Collab';
  partner: string;
  date: string;
  location: string;
  description: string;
  spotsLeft: number;
}

export interface WarrantyRecord {
  code: string;
  productName: string;
  purchaseDate: string;
  expiresDate: string;
  ownerEmail: string;
  status: 'Active Coverage' | 'Claim Submitted';
}
