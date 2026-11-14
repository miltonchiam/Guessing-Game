import {
  BrandEvent,
  CommunityPost,
  CustomerSegment,
  Product,
  ProductColorVariant,
  WarrantyRecord,
} from '../types';

export const CUSTOMER_SEGMENTS: {
  id: CustomerSegment;
  headline: string;
  focus: string;
  recommendedCategory: string;
}[] = [
  {
    id: 'Runners',
    headline: 'Runners',
    focus: 'Ultralight sweatproof phone grip, tether-ready earbud armor, and bounce-free hydration sleeves.',
    recommendedCategory: 'Phones & Earbuds',
  },
  {
    id: 'Gym Members',
    headline: 'Gym Members',
    focus: 'Impact-cushioned insulated bottles and shock-absorbing cases built for locker rooms and weight floors.',
    recommendedCategory: 'Bottles & Earbuds',
  },
  {
    id: 'Students',
    headline: 'Students',
    focus: 'All-day campus protection across laptops, phones, and hydration with custom monogramming and school packs.',
    recommendedCategory: 'Laptops & Bottles',
  },
  {
    id: 'Office Workers',
    headline: 'Office Workers',
    focus: 'Refined matte protective sleeves and desk-to-transit accessories engineered for daily commutes.',
    recommendedCategory: 'Laptops & Phones',
  },
  {
    id: 'Children',
    headline: 'Children',
    focus: 'High-cushion corner bumpers and BPA-free insulated bottles in high-visibility colors for active play.',
    recommendedCategory: 'Bottles & Phones',
  },
];

export const STUDIO_SHELL_COLORS: ProductColorVariant[] = [
  { name: 'Obsidian Matte', shellHex: '#18181B', accentHex: '#2563EB' },
  { name: 'Chalk Stone', shellHex: '#E5E5E0', accentHex: '#18181B' },
  { name: 'Cobalt Signal', shellHex: '#1D4ED8', accentHex: '#F4F4F0' },
  { name: 'Forest Trail', shellHex: '#2C4A3E', accentHex: '#D97706' },
  { name: 'Slate Steel', shellHex: '#475569', accentHex: '#38BDF8' },
  { name: 'Solar Amber', shellHex: '#D97706', accentHex: '#18181B' },
];

export const STUDIO_ACCENT_SWATCHES: { name: string; hex: string }[] = [
  { name: 'Cobalt Blue', hex: '#2563EB' },
  { name: 'Obsidian Black', hex: '#18181B' },
  { name: 'Chalk White', hex: '#F4F4F0' },
  { name: 'Signal Amber', hex: '#D97706' },
  { name: 'Crimson Track', hex: '#DC2626' },
  { name: 'Sage Mint', hex: '#10B981' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'fs-phone-stride',
    sku: 'FS-PH-01',
    name: 'Stride Armor Phone Case',
    category: 'phone',
    categoryLabel: 'Phones',
    isDesignerSeries: false,
    price: 42,
    segments: ['Runners', 'Gym Members', 'Students'],
    dropRating: '3.0m Drop Tested',
    material: 'Dual-density TPU + recycled polycarbonate core',
    summary:
      'Sweat-resistant ribbed perimeter with MagSafe-compatible core and recessed camera lip for high-motion training.',
    specs: [
      '3.0m multi-angle impact certification',
      'Micro-textured side grip for wet or sweaty hands',
      'Integrated bottom lanyard anchor',
      '1-year manufacturing defect warranty included',
    ],
    colors: [
      { name: 'Obsidian / Cobalt', shellHex: '#18181B', accentHex: '#2563EB' },
      { name: 'Slate / Sky', shellHex: '#475569', accentHex: '#38BDF8' },
      { name: 'Chalk / Obsidian', shellHex: '#E5E5E0', accentHex: '#18181B' },
    ],
    defaultPattern: 'ridge',
    defaultAddon: 'tether',
    inStock: true,
  },
  {
    id: 'fs-earbuds-vault',
    sku: 'FS-EB-02',
    name: 'Pulse Lock Earbud Shell',
    category: 'earbuds',
    categoryLabel: 'Earbuds',
    isDesignerSeries: false,
    price: 34,
    segments: ['Runners', 'Gym Members', 'Office Workers'],
    dropRating: 'IP54 Seal + 2.4m Drop',
    material: 'Compression-molded elastomer + anodized aluminum clip',
    summary:
      'Latch-locked wireless earbud armor that prevents lid pop-open on drops and clips securely to running belts or gym bags.',
    specs: [
      'Dust and sweat-splash gasket seal',
      'Includes aircraft-grade carabiner clip',
      'Wireless charging pass-through',
      '1-year manufacturing defect warranty included',
    ],
    colors: [
      { name: 'Cobalt / Chalk', shellHex: '#1D4ED8', accentHex: '#F4F4F0' },
      { name: 'Obsidian / Amber', shellHex: '#18181B', accentHex: '#D97706' },
      { name: 'Forest / Chalk', shellHex: '#2C4A3E', accentHex: '#F4F4F0' },
    ],
    defaultPattern: 'solid',
    defaultAddon: 'carabiner',
    inStock: true,
  },
  {
    id: 'fs-laptop-transit',
    sku: 'FS-LP-03',
    name: 'Transit Shield Laptop Sleeve 14"',
    category: 'laptop',
    categoryLabel: 'Laptops',
    isDesignerSeries: false,
    price: 68,
    segments: ['Office Workers', 'Students'],
    dropRating: '360° Corner Foam',
    material: '1680D water-repellent ballistic weave + EVA impact ribs',
    summary:
      'Structured commuter sleeve with water-sealed zipper and high-density corner suspension for campus and daily office transit.',
    specs: [
      'Fits 13" to 14.2" laptops with dedicated cable pocket',
      'Corner-suspension memory foam bumper frame',
      'Water-repellent outer shell and microfiber lining',
      '1-year manufacturing defect warranty included',
    ],
    colors: [
      { name: 'Obsidian / Cobalt', shellHex: '#27272A', accentHex: '#2563EB' },
      { name: 'Slate / Chalk', shellHex: '#475569', accentHex: '#F4F4F0' },
      { name: 'Chalk / Charcoal', shellHex: '#E5E5E0', accentHex: '#18181B' },
    ],
    defaultPattern: 'carbon',
    defaultAddon: 'none',
    inStock: true,
  },
  {
    id: 'fs-bottle-hydra',
    sku: 'FS-BT-04',
    name: 'HydraGuard Insulated Bottle 750ml',
    category: 'bottle',
    categoryLabel: 'Bottles',
    isDesignerSeries: false,
    price: 48,
    segments: ['Gym Members', 'Runners', 'Students', 'Children'],
    dropRating: 'Silicone Base Shield',
    material: '18/8 food-grade steel + shockproof silicone boot',
    summary:
      'Co-engineered with our dedicated bottle manufacturer: 24-hour cold retention paired with a replaceable dent-proof protective boot.',
    specs: [
      'Double-wall vacuum insulation (24h cold / 12h hot)',
      'Custom-molded shockproof silicone bumper sleeve',
      'Leakproof rapid-sip sport cap with carry loop',
      '1-year manufacturing defect warranty included',
    ],
    colors: [
      { name: 'Obsidian / Cobalt', shellHex: '#18181B', accentHex: '#2563EB' },
      { name: 'Chalk / Amber', shellHex: '#E5E5E0', accentHex: '#D97706' },
      { name: 'Forest / Chalk', shellHex: '#2C4A3E', accentHex: '#F4F4F0' },
    ],
    defaultPattern: 'solid',
    defaultAddon: 'hydration-loop',
    inStock: true,
  },
  {
    id: 'fs-designer-kol-phone',
    sku: 'FS-DS-05',
    name: 'Topo Meridian Phone Case',
    category: 'phone',
    categoryLabel: 'Phones',
    isDesignerSeries: true,
    designerCollab: 'Maya Lin · Trail KOL Series',
    price: 54,
    segments: ['Runners', 'Students', 'Office Workers'],
    dropRating: '3.2m Drop Tested',
    material: 'Bio-based polycarbonate + laser-etched contour grip',
    summary:
      'Designer Series edition crafted with endurance trail KOL Maya Lin, featuring tactile elevation contours and cobalt bumper accents.',
    specs: [
      'Laser-etched topographic grip surface',
      'Raised 1.6mm screen and lens bezel',
      'Numbered Designer Series packaging',
      '1-year manufacturing defect warranty included',
    ],
    colors: [
      { name: 'Forest / Amber', shellHex: '#2C4A3E', accentHex: '#D97706' },
      { name: 'Obsidian / Crimson', shellHex: '#18181B', accentHex: '#DC2626' },
    ],
    defaultPattern: 'topo',
    defaultAddon: 'tether',
    inStock: true,
  },
  {
    id: 'fs-designer-youth-bottle',
    sku: 'FS-DS-06',
    name: 'Junior PlayGuard Bottle 500ml',
    category: 'bottle',
    categoryLabel: 'Bottles',
    isDesignerSeries: true,
    designerCollab: 'Studio Kinetic · Youth Edition',
    price: 38,
    segments: ['Children', 'Students'],
    dropRating: 'Full-Wrap Bumper',
    material: '18/8 lightweight steel + extra-thick cushion collar',
    summary:
      'Designed specifically for younger active hands with a full-grip ribbed sleeve, high-visibility stripe, and spill-resistant flip spout.',
    specs: [
      '500ml kid-balanced weight and easy-carry loop',
      'High-visibility accent bumper protects floors and bottle',
      'BPA-free, phthalate-free food-grade materials',
      '1-year manufacturing defect warranty included',
    ],
    colors: [
      { name: 'Cobalt / Amber', shellHex: '#1D4ED8', accentHex: '#D97706' },
      { name: 'Amber / Obsidian', shellHex: '#D97706', accentHex: '#18181B' },
    ],
    defaultPattern: 'stripe',
    defaultAddon: 'hydration-loop',
    inStock: true,
  },
  {
    id: 'fs-designer-earbuds-pro',
    sku: 'FS-DS-07',
    name: 'Pace Carbon Earbud Armor',
    category: 'earbuds',
    categoryLabel: 'Earbuds',
    isDesignerSeries: true,
    designerCollab: 'Coach Devon · Track Club Series',
    price: 44,
    segments: ['Runners', 'Gym Members'],
    dropRating: '2.8m Drop Tested',
    material: 'Aramid-weave inlay + reinforced shock corners',
    summary:
      'Designer Series edition built for marathoners and track intervals, combining ultra-thin carbon texture with high-tension carabiner.',
    specs: [
      'Aramid-inspired micro-weave rear shell',
      'Anti-slip silicone interior lining',
      'Quick-release matte clip included',
      '1-year manufacturing defect warranty included',
    ],
    colors: [
      { name: 'Obsidian / Crimson', shellHex: '#18181B', accentHex: '#DC2626' },
      { name: 'Slate / Cobalt', shellHex: '#475569', accentHex: '#2563EB' },
    ],
    defaultPattern: 'carbon',
    defaultAddon: 'carabiner',
    inStock: true,
  },
  {
    id: 'fs-designer-laptop-studio',
    sku: 'FS-DS-08',
    name: 'Monolith Designer Laptop Sleeve',
    category: 'laptop',
    categoryLabel: 'Laptops',
    isDesignerSeries: true,
    designerCollab: 'Nordic Form · Commuter Series',
    price: 78,
    segments: ['Office Workers', 'Students'],
    dropRating: '360° Impact Rail',
    material: 'Recycled matte canvas + waterproof PU trim',
    summary:
      'Architectural Designer Series sleeve pairing clean tonal stripes with hidden magnetic accessory storage for chargers and earbuds.',
    specs: [
      'Hidden front pocket for phone and earbud case',
      'Crush-resistant internal corner rails',
      'Fits up to 16" laptops comfortably',
      '1-year manufacturing defect warranty included',
    ],
    colors: [
      { name: 'Chalk / Cobalt', shellHex: '#E5E5E0', accentHex: '#2563EB' },
      { name: 'Obsidian / Sage', shellHex: '#18181B', accentHex: '#10B981' },
    ],
    defaultPattern: 'stripe',
    defaultAddon: 'none',
    inStock: true,
  },
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    author: 'Maya Lin',
    handle: '@mayalin.runs',
    role: 'KOL Partner · Ultramarathoner',
    segment: 'Runners',
    isKOL: true,
    dayLabel: 'Today · Daily Drop',
    caption:
      '22km ridge tempo in wet conditions. The Topo Meridian phone case and Pulse Lock earbud shell clipped to my vest stayed bone-dry and zero-bounce.',
    gearName: 'Topo Meridian Phone Case',
    gearCategory: 'phone',
    shellHex: '#2C4A3E',
    accentHex: '#D97706',
    pattern: 'topo',
    likes: 342,
  },
  {
    id: 'post-2',
    author: 'Devon Brooks',
    handle: '@coachdevon',
    role: 'KOL Partner · Strength & Conditioning',
    segment: 'Gym Members',
    isKOL: true,
    dayLabel: 'Yesterday · Daily Challenge',
    caption:
      'Dropped my 750ml HydraGuard off the squat rack platform twice this week—silicone base boot absorbed every hit without a single dent.',
    gearName: 'HydraGuard Insulated Bottle 750ml',
    gearCategory: 'bottle',
    shellHex: '#18181B',
    accentHex: '#2563EB',
    pattern: 'solid',
    likes: 289,
  },
  {
    id: 'post-3',
    author: 'Hannah Cho',
    handle: '@hannah.designs',
    role: 'Product Designer · Custom Studio Build',
    segment: 'Office Workers',
    isKOL: false,
    dayLabel: '2 days ago · Community Look',
    caption:
      'Designed my commuter kit in Chalk Stone + Cobalt Blue with custom HC monogram on the laptop sleeve. Cleanest desk-to-subway setup.',
    gearName: 'Custom Transit Sleeve',
    gearCategory: 'laptop',
    shellHex: '#E5E5E0',
    accentHex: '#2563EB',
    pattern: 'stripe',
    likes: 194,
  },
  {
    id: 'post-4',
    author: 'Westview Athletics',
    handle: '@westviewtrack',
    role: 'B2B School Partner · Varsity Squad',
    segment: 'Students',
    isKOL: false,
    dayLabel: '3 days ago · School Collab',
    caption:
      '60 custom-engraved team bottles and earbud vaults arrived for our student-athletes before regionals. Zero mix-ups in the locker room.',
    gearName: 'Custom Squad Hydration Pack',
    gearCategory: 'bottle',
    shellHex: '#1D4ED8',
    accentHex: '#F4F4F0',
    pattern: 'stripe',
    likes: 418,
  },
];

export const BRAND_EVENTS: BrandEvent[] = [
  {
    id: 'evt-popup-1',
    title: 'Weekend Customizer Pop-Up Bar',
    type: 'Offline Pop-Up',
    partner: 'FormShield Live Studio',
    date: 'Nov 22 – Nov 24, 2026',
    location: 'Downtown Athletic Arcade, Booth 14',
    description:
      'Test drop-resistance rigs live, customize your phone case or insulated bottle on-site, and get instant monogram laser etching.',
    spotsLeft: 28,
  },
  {
    id: 'evt-corp-1',
    title: 'Stride Club × Wellness Tech Summit',
    type: 'Corporate Collab',
    partner: 'Corporate Event · Brand Collab',
    date: 'Dec 04, 2026',
    location: 'Harbor Innovation Hall',
    description:
      'Co-branded active protection kits for 250 corporate wellness attendees featuring custom sleeve monograms and insulated bottles.',
    spotsLeft: 45,
  },
  {
    id: 'evt-popup-2',
    title: 'Campus Hydration & Tech Protection Day',
    type: 'Offline Pop-Up',
    partner: 'University Student Union',
    date: 'Dec 11, 2026',
    location: 'North Quad Commons',
    description:
      'Student bundle showcase with 1-year warranty checkups, bottle bumper swaps, and live KOL runner Q&A.',
    spotsLeft: 64,
  },
];

export const INITIAL_WARRANTIES: WarrantyRecord[] = [
  {
    code: 'FS-WR-88412',
    productName: 'HydraGuard Insulated Bottle 750ml',
    purchaseDate: '2026-08-14',
    expiresDate: '2027-08-14',
    ownerEmail: 'alex.runner@example.com',
    status: 'Active Coverage',
  },
  {
    code: 'FS-WR-90219',
    productName: 'Stride Armor Phone Case',
    purchaseDate: '2026-09-29',
    expiresDate: '2027-09-29',
    ownerEmail: 'jordan.gym@example.com',
    status: 'Active Coverage',
  },
];

export interface CanvasSticky {
  text: string;
  tone: 'blue' | 'yellow' | 'orange' | 'pink' | 'green';
}

export interface CanvasBlock {
  id: string;
  title: string;
  promptQuestion: string;
  mappedFeature: string;
  stickies: CanvasSticky[];
}

export const BUSINESS_MODEL_CANVAS: CanvasBlock[] = [
  {
    id: 'key-partners',
    title: 'Key partners',
    promptQuestion: 'What are your key partners to get competitive advantage?',
    mappedFeature: 'Bottle hardware specs & KOL Designer Series collaborations',
    stickies: [
      { text: 'Bottle Manufacturer', tone: 'blue' },
      { text: 'KOL / Influencer', tone: 'blue' },
    ],
  },
  {
    id: 'key-activities',
    title: 'Key activities',
    promptQuestion: 'What are the key steps to move ahead to your customers?',
    mappedFeature: 'Material sourcing, R&D customizer engine & brand campaigns',
    stickies: [
      { text: 'conduct market research', tone: 'blue' },
      { text: 'List Suppliers for key materials', tone: 'blue' },
      { text: 'Marketing Campaign', tone: 'blue' },
      { text: 'Product research, development, and design', tone: 'blue' },
    ],
  },
  {
    id: 'key-resources',
    title: 'Key resources',
    promptQuestion: 'What resources do you need to make your idea work?',
    mappedFeature: 'Webstore, BI analytics dashboard, social channels & skilled team',
    stickies: [
      {
        text: 'Data analytics and business intelligence - online channels: website, social media accounts - HR: skilled employees',
        tone: 'blue',
      },
    ],
  },
  {
    id: 'key-propositions',
    title: 'Key propositions',
    promptQuestion: "How will you make your customers' life happier?",
    mappedFeature: 'Custom Studio, Designer Series, 4 gadget lines & 1-Yr Warranty',
    stickies: [
      { text: 'Providing supplies to support healthy lifestyle', tone: 'yellow' },
      {
        text: 'Building customizable protectors for accessories - Uniquely designed by you',
        tone: 'yellow',
      },
      { text: 'Protects gadgets for active lifestyle', tone: 'yellow' },
      {
        text: 'Wholistic protection in style for phones, earbuds, laptops, bottles - 1-year manufacturing defect warranty',
        tone: 'yellow',
      },
      { text: 'Option to choose our designer series', tone: 'yellow' },
    ],
  },
  {
    id: 'customer-relationships',
    title: 'Customer relationships',
    promptQuestion: 'How often will you interact with your customers?',
    mappedFeature: 'Weekly newsletter module & daily social engagement feed',
    stickies: [
      { text: 'weekly (through a newsletter)', tone: 'orange' },
      { text: 'daily (through social media engagement)', tone: 'orange' },
    ],
  },
  {
    id: 'channels',
    title: 'Channels',
    promptQuestion: 'How are you going to reach your customers?',
    mappedFeature: 'Direct webstore, offline pop-up RSVP & corporate collab portal',
    stickies: [
      { text: 'online channels (social media marketing, email, ads,)', tone: 'orange' },
      { text: 'offline events (pop up stores)', tone: 'orange' },
      { text: 'Corporate events - collab with other brands.', tone: 'orange' },
    ],
  },
  {
    id: 'customer-segments',
    title: 'Customer segments',
    promptQuestion: 'Who are your customers? Describe your target audience in a couple of words.',
    mappedFeature: 'Live segment storefront filters & tailored studio presets',
    stickies: [
      { text: 'Students', tone: 'pink' },
      { text: 'Office workers', tone: 'pink' },
      { text: 'Gym Members', tone: 'pink' },
      { text: 'Runners', tone: 'pink' },
      { text: 'Children', tone: 'pink' },
    ],
  },
  {
    id: 'cost-structure',
    title: 'Cost Structure',
    promptQuestion:
      'How much are you planning to spend on the product development and marketing for a certain period?',
    mappedFeature: 'Tracked in Live Unit & Startup Budget Simulator',
    stickies: [
      {
        text: '$30,000 for Supplier deposit, R&D Marketing Logistics, Operations',
        tone: 'green',
      },
    ],
  },
  {
    id: 'revenue-streams',
    title: 'Revenue Streams',
    promptQuestion:
      'How much are you planning to earn in a certain period? Compare your costs and revenues.',
    mappedFeature: 'B2C Storefront ($288k/yr) + B2B/School Portal ($120k/yr)',
    stickies: [
      {
        text: 'For B2C: $24,000 x 12 = $288,000 For B2B/School: $10,000 x 12 = $120,000 Total annual revenue: $288,000 + $120,000 = $408,000',
        tone: 'green',
      },
    ],
  },
];
