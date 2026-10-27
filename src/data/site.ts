// Central content for the whole site. Edit prices, products, packages and offers here.

export const business = {
  name: "Decor Events Hire",
  tagline: "Wedding & Event Décor",
  contactName: "Ammar Azam",
  phone: "+61 420 474 372",
  phoneLocal: "0420 474 372",
  phoneHref: "tel:+61420474372",
  /** WhatsApp number in international format, digits only. */
  whatsapp: "61420474372",
  email: "info@decoreventshire.com.au",
  url: "https://decoreventshire.com.au",
  area: "Sydney metropolitan & south-western suburbs",
  hours: "Mon–Sat, 8am–6pm · Sun by appointment",
  abn: "[ABN]",
  socials: {
    instagram: "https://www.instagram.com/decoreventshire",
    facebook: "https://www.facebook.com/share/1CXwCywpCw/",
  },
  suburbs: [
    "Liverpool", "Campbelltown", "Camden", "Narellan", "Oran Park", "Leppington",
    "Fairfield", "Bankstown", "Parramatta", "Penrith", "Blacktown", "Sutherland",
    "Hurstville", "Sydney CBD", "Inner West", "Hills District",
  ],
};

export type CategorySlug = "chairs" | "bar-stools" | "tables" | "linen" | "decor" | "draping-lighting";

export type Category = {
  slug: CategorySlug;
  name: string;
  blurb: string;
  image: string;
};

export const categories: Category[] = [
  { slug: "chairs", name: "Chairs", blurb: "Tiffany, Americana, gladiator and folding chairs, plus cushions.", image: "/images/work/setup-13.jpg" },
  { slug: "tables", name: "Tables", blurb: "Trestle and round tables for banquets, receptions and parties.", image: "/images/work/setup-04.jpg" },
  { slug: "linen", name: "Linen", blurb: "Tablecloths, runners and napkins in classic colours.", image: "/images/stock/tablecloth-white.jpg" },
  { slug: "decor", name: "Décor & Backdrops", blurb: "Arches, flower walls, neon signs, plinths and table styling.", image: "/images/work/setup-12.jpg" },
  { slug: "draping-lighting", name: "Draping & Lighting", blurb: "Ceiling draping, sheer backdrops and fairy-light curtains.", image: "/images/stock/ceiling-draping.jpg" },
  { slug: "bar-stools", name: "Bar Stools", blurb: "Seating for bars, cocktail areas and dessert stations.", image: "/images/stock/bar-stool.jpg" },
];

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  /** Hire price per unit in AUD. null = priced on quote. */
  price: number | null;
  unit: string;
  images: string[];
  short: string;
  description: string;
  details: string[];
  popular?: boolean;
  /** Default quantity suggested in the add-to-quote control. */
  defaultQty?: number;
};

export const products: Product[] = [
  // ---- Chairs
  {
    slug: "white-tiffany-chair", name: "White Tiffany Chair", category: "chairs", price: 8.5, unit: "per chair",
    images: ["/images/work/setup-13.jpg", "/images/work/setup-02.jpg", "/images/work/setup-06.jpg", "/images/work/setup-19.jpg"],
    short: "The timeless wedding chair, with a white seat pad.",
    description: "Our most-loved chair. The slim, bamboo-style frame suits round reception tables, long banquet tables and ceremony rows, indoors or out.",
    details: ["White resin frame", "White seat pad included", "Stackable for easy delivery", "Pairs with chair cushions"],
    popular: true, defaultQty: 50,
  },
  {
    slug: "gold-tiffany-chair", name: "Gold Tiffany Chair", category: "chairs", price: 9.5, unit: "per chair",
    images: ["/images/stock/gold-tiffany.jpg", "/images/stock/reception-gold.jpg"],
    short: "A warm gold finish for luxe receptions and bridal tables.",
    description: "Add warmth and glamour to receptions, bridal tables and milestone birthdays. Gold works beautifully with white linen and blush florals.",
    details: ["Gold resin frame", "Seat pad included", "Stackable"],
    popular: true, defaultQty: 50,
  },
  {
    slug: "clear-tiffany-chair", name: "Clear Tiffany Chair", category: "chairs", price: 9.5, unit: "per chair",
    images: ["/images/work/setup-23.jpg", "/images/work/setup-20.jpg", "/images/work/setup-17.jpg", "/images/work/setup-00.jpg"],
    short: "Crystal-clear and modern, it suits any colour palette.",
    description: "Clear Tiffany chairs keep the focus on your florals and table styling. A favourite for modern weddings and waterfront venues.",
    details: ["Clear polycarbonate frame", "White seat pad included", "Indoor & outdoor use"],
    popular: true, defaultQty: 50,
  },
  {
    slug: "americana-chair", name: "Americana Chair", category: "chairs", price: 7.5, unit: "per chair",
    images: ["/images/stock/americana.jpg", "/images/stock/floral-arbor.jpg"],
    short: "A classic white garden chair for ceremonies.",
    description: "The go-to garden ceremony chair. Crisp white with a timeless look that photographs beautifully on lawns and in gardens.",
    details: ["White finish", "Ideal for ceremony rows", "Outdoor friendly"],
    defaultQty: 50,
  },
  {
    slug: "gladiator-chair", name: "Gladiator Chair", category: "chairs", price: 5.5, unit: "per chair",
    images: ["/images/work/setup-14.jpg", "/images/work/setup-04.jpg"],
    short: "Sturdy white folding chair, great for backyard parties.",
    description: "A practical, comfortable white chair that sets up fast. It's included in our Backyard Birthday Package.",
    details: ["White resin, padded seat", "Folds flat", "Ideal for parties and casual events"],
    defaultQty: 20,
  },
  {
    slug: "white-padded-folding-chair", name: "White Padded Folding Chair", category: "chairs", price: 4.5, unit: "per chair",
    images: ["/images/work/setup-05.jpg"],
    short: "Comfortable, budget-friendly seating for big groups.",
    description: "Great value for ceremonies, sports-club functions and large gatherings where you need plenty of comfortable seats.",
    details: ["Padded white seat", "Folds flat", "Fast setup for large numbers"],
    defaultQty: 50,
  },
  {
    slug: "chair-cushion", name: "Chair Cushion", category: "chairs", price: 2.5, unit: "per cushion",
    images: ["/images/work/setup-09.jpg", "/images/work/setup-08.jpg"],
    short: "Soft tie-on cushions for extra comfort and polish.",
    description: "Ivory tie-on cushions add comfort and a finished look to Tiffany chairs, which matters most at long receptions.",
    details: ["Ivory fabric", "Tie-on fastening", "Fits Tiffany chairs"],
    defaultQty: 50,
  },
  // ---- Bar stools
  {
    slug: "bar-stool", name: "Bar Stool", category: "bar-stools", price: 12, unit: "per stool",
    images: ["/images/stock/bar-stool.jpg"],
    short: "For bars, cocktail areas and dessert stations.",
    description: "Stylish bar-height stools for cocktail areas, grazing tables and bar setups.",
    details: ["Bar height", "Upholstered seat", "Indoor use recommended"],
    defaultQty: 10,
  },
  // ---- Tables
  {
    slug: "trestle-table-6ft", name: "Trestle Table 6ft", category: "tables", price: 15, unit: "per table",
    images: ["/images/work/setup-04.jpg", "/images/work/setup-14.jpg", "/images/work/setup-21.jpg"],
    short: "Seats 6–8. Join several for long banquet tables.",
    description: "Our 6ft trestle tables are the building block of long banquet setups. Dress them with white or black linen and a runner.",
    details: ["1.8m × 0.75m", "Seats 6–8 guests", "Folding legs", "Pairs with trestle tablecloths"],
    popular: true, defaultQty: 5,
  },
  {
    slug: "round-table", name: "Round Table", category: "tables", price: 18, unit: "per table",
    images: ["/images/work/setup-03.jpg", "/images/work/setup-02.jpg", "/images/work/setup-10.jpg"],
    short: "Classic reception rounds for seated dining.",
    description: "Elegant round tables for receptions and gala dinners. Each seats 8–10 guests and pairs with our floor-length round cloths.",
    details: ["Seats 8–10 guests", "Folding legs", "Pairs with round tablecloths"],
    popular: true, defaultQty: 5,
  },
  // ---- Linen
  {
    slug: "white-trestle-tablecloth", name: "White Trestle Tablecloth", category: "linen", price: 15, unit: "each",
    images: ["/images/work/setup-21.jpg", "/images/work/setup-23.jpg"],
    short: "Crisp white linen to dress 6ft trestle tables.",
    description: "Pressed white tablecloths sized for our 6ft trestle tables, for a clean, elegant banquet look.",
    details: ["Fits 6ft trestle", "White polyester", "Delivered pressed"],
    defaultQty: 5,
  },
  {
    slug: "white-round-tablecloth", name: "White Round Tablecloth", category: "linen", price: 18, unit: "each",
    images: ["/images/work/setup-06.jpg", "/images/stock/tablecloth-white.jpg"],
    short: "Floor-length white cloth for round tables.",
    description: "Floor-length white cloths that turn round tables into elegant reception settings.",
    details: ["Floor length", "Fits our round tables", "Delivered pressed"],
    defaultQty: 5,
  },
  {
    slug: "black-tablecloth", name: "Black Tablecloth", category: "linen", price: 15, unit: "each",
    images: ["/images/work/setup-17.jpg", "/images/work/setup-22.jpg", "/images/work/setup-18.jpg"],
    short: "Moody, modern black linen for evening events.",
    description: "Dramatic black linen with white napkins and candles, a striking modern look for evening events.",
    details: ["Fits 6ft trestle", "Black polyester", "Delivered pressed"],
    popular: true, defaultQty: 5,
  },
  {
    slug: "table-runner", name: "Table Runner", category: "linen", price: 7, unit: "each",
    images: ["/images/stock/table-runner.jpg", "/images/work/setup-14.jpg"],
    short: "White, blush, sage or gold runners to finish your tables.",
    description: "Add colour and texture down the centre of your tables. Let us know your colour in the quote notes.",
    details: ["Colours: white, blush, sage, gold", "Suits trestle tables"],
    defaultQty: 5,
  },
  {
    slug: "linen-napkin", name: "Linen Napkin", category: "linen", price: 1.5, unit: "each",
    images: ["/images/stock/napkins.jpg", "/images/work/setup-09.jpg"],
    short: "Soft napkins in white, ivory, blush and black.",
    description: "Fold them on the plate or through a napkin ring for a polished place setting.",
    details: ["Colours: white, ivory, blush, black", "Delivered folded"],
    defaultQty: 50,
  },
  // ---- Décor
  {
    slug: "floral-arch", name: "Floral Arch", category: "decor", price: 180, unit: "per arch",
    images: ["/images/stock/floral-arbor.jpg", "/images/stock/floral-arches.jpg"],
    short: "A lush greenery-and-bloom arch for ceremonies.",
    description: "Frame your vows or your photo moment with a lush floral arch. Colour palettes can be discussed in your quote.",
    details: ["Approx. 2.2m high", "Artificial florals and greenery", "Setup included with delivery"],
    popular: true, defaultQty: 1,
  },
  {
    slug: "round-arch-backdrop", name: "Round Arch Backdrop", category: "decor", price: 120, unit: "each",
    images: ["/images/stock/baby-shower-arch.jpg", "/images/stock/engagement.jpg"],
    short: "A circular backdrop with drape and greenery.",
    description: "The statement backdrop for engagements, baby showers and birthdays. Add a neon sign or custom lettering.",
    details: ["Approx. 2m diameter", "White drape included", "Greenery accents optional"],
    popular: true, defaultQty: 1,
  },
  {
    slug: "flower-wall-backdrop", name: "Flower Wall Backdrop", category: "decor", price: 250, unit: "each",
    images: ["/images/work/setup-12.jpg", "/images/stock/floral-backdrop.jpg"],
    short: "A full flower wall for photos and bridal tables.",
    description: "A full-bloom flower wall makes an unforgettable backdrop for bridal tables, dessert tables and photo areas. It's included in the Backyard Birthday Package.",
    details: ["Approx. 2.4m × 2.4m", "Pink, white or mixed blooms", "Freestanding frame"],
    defaultQty: 1,
  },
  {
    slug: "neon-sign", name: "Neon Sign", category: "decor", price: 80, unit: "each",
    images: ["/images/stock/neon-sign.jpg", "/images/stock/neon-love-setup.jpg"],
    short: "Warm-white neon, such as 'Better Together' or 'Oh Baby'.",
    description: "Warm-white LED neon signs that glow beautifully on a backdrop. Ask about available wording.",
    details: ["LED, low heat", "Hangs on backdrops or stands", "Wording options on request"],
    defaultQty: 1,
  },
  {
    slug: "welcome-sign-easel", name: "Welcome Sign & Easel", category: "decor", price: 35, unit: "each",
    images: ["/images/stock/welcome-sign.jpg"],
    short: "Greet guests with a personalised welcome sign.",
    description: "An easel and acrylic or board sign for your entrance. Personalised wording is quoted separately.",
    details: ["Gold easel", "Personalisation on request"],
    defaultQty: 1,
  },
  {
    slug: "plinth-set", name: "Plinth Set (3)", category: "decor", price: 90, unit: "per set",
    images: ["/images/stock/arch-candles.jpg"],
    short: "Three white plinths for florals, cakes and candles.",
    description: "Tiered white plinths add height and structure to backdrops, ceremony aisles and dessert displays.",
    details: ["Set of 3 heights", "White finish"],
    defaultQty: 1,
  },
  {
    slug: "candle-lantern", name: "Candle Lantern", category: "decor", price: 6, unit: "each",
    images: ["/images/stock/lanterns.jpg"],
    short: "White lanterns with LED candles to line aisles.",
    description: "Line your aisle, entrance or stairs with white lanterns and flameless LED candles.",
    details: ["LED candle included", "Safe for indoor venues"],
    defaultQty: 10,
  },
  {
    slug: "gold-candlestick", name: "Gold Candlestick", category: "decor", price: 6, unit: "each",
    images: ["/images/stock/gold-candlesticks.jpg"],
    short: "Tall gold candlesticks for elegant tablescapes.",
    description: "Gold candlesticks in mixed heights bring warmth and height to long tables.",
    details: ["Mixed heights", "Taper candles available"],
    defaultQty: 10,
  },
  {
    slug: "glass-vase-centrepiece", name: "Glass Vase Centrepiece", category: "decor", price: 8, unit: "each",
    images: ["/images/stock/vases.jpg", "/images/stock/centrepiece-candles.jpg"],
    short: "Clear vases with artificial blooms for every table.",
    description: "Clear glass vases styled with artificial florals in your colour palette.",
    details: ["Colour palette on request", "Mixed sizes available"],
    defaultQty: 10,
  },
  {
    slug: "gold-charger-plate", name: "Gold Charger Plate", category: "decor", price: 2.5, unit: "each",
    images: ["/images/stock/charger-plate.jpg", "/images/work/setup-16.jpg"],
    short: "Gold-rim chargers to elevate every place setting.",
    description: "Gold chargers frame each place setting for an instantly elevated table.",
    details: ["33cm diameter", "Gold beaded rim"],
    defaultQty: 50,
  },
  {
    slug: "hanging-floral-garland", name: "Hanging Floral Garland", category: "decor", price: 12, unit: "each",
    images: ["/images/work/setup-04.jpg"],
    short: "Cascading white wisteria to hang above tables.",
    description: "Cascading white wisteria garlands hung above long tables or marquee frames, for a romantic garden feel.",
    details: ["Approx. 1m drop", "Hanging setup quoted with delivery"],
    defaultQty: 10,
  },
  // ---- Draping & lighting
  {
    slug: "ceiling-draping", name: "Ceiling Draping", category: "draping-lighting", price: null, unit: "quoted per venue",
    images: ["/images/stock/ceiling-draping.jpg", "/images/stock/reception-gold.jpg"],
    short: "Soft white ceiling swags, quoted to your venue.",
    description: "Transform a hall or marquee with flowing ceiling draping. Priced after we confirm your venue size and rigging points.",
    details: ["White chiffon", "Venue inspection may be required", "Installed by our team"],
    defaultQty: 1,
  },
  {
    slug: "sheer-backdrop-draping", name: "Sheer Backdrop Draping", category: "draping-lighting", price: 150, unit: "per 3m section",
    images: ["/images/stock/sheer-draping.jpg", "/images/work/setup-17.jpg"],
    short: "Floor-length sheer drapes behind bridal tables.",
    description: "Floor-length sheer white drapes for bridal tables, ceremony backdrops or to soften a venue wall.",
    details: ["3m wide × 3m high per section", "Freestanding frame included"],
    defaultQty: 1,
  },
  {
    slug: "fairy-light-curtain", name: "Fairy Light Curtain", category: "draping-lighting", price: 60, unit: "per 3m section",
    images: ["/images/stock/fairy-lights.jpg"],
    short: "Warm-white light curtains for magical evenings.",
    description: "Warm-white fairy light curtains behind backdrops or along walls for an evening glow.",
    details: ["3m × 3m", "Warm white LED", "Pairs with sheer draping"],
    defaultQty: 1,
  },
];

export type Package = {
  slug: string;
  name: string;
  price: number;
  priceNote: string;
  guests: string;
  image: string;
  gallery: string[];
  short: string;
  description: string;
  includes: { qty: string; item: string }[];
  bestFor: string[];
  featured?: boolean;
};

export const packages: Package[] = [
  {
    slug: "backyard-birthday", name: "Backyard Birthday Package", price: 800, priceNote: "package price", guests: "Up to 20 guests",
    image: "/images/work/setup-14.jpg", gallery: ["/images/work/setup-12.jpg", "/images/work/setup-04.jpg", "/images/work/setup-00.jpg"],
    short: "Seating, tables and a statement floral backdrop for a beautiful backyard party.",
    description: "Turn your backyard into a beautiful party space. One booking covers comfortable seating for 20, dressed tables and a full floral backdrop for photos.",
    includes: [
      { qty: "20", item: "Gladiator or Tiffany chairs" },
      { qty: "3", item: "Tables with tablecloths" },
      { qty: "1", item: "Floral backdrop" },
    ],
    bestFor: ["Birthdays", "Engagements", "Baby showers", "Family celebrations"],
    featured: true,
  },
  {
    slug: "garden-ceremony", name: "Garden Ceremony Package", price: 1150, priceNote: "package price", guests: "Up to 50 guests",
    image: "/images/stock/floral-arbor.jpg", gallery: ["/images/work/setup-13.jpg", "/images/stock/americana.jpg", "/images/stock/lanterns.jpg"],
    short: "Everything for a picture-perfect outdoor ceremony.",
    description: "A romantic outdoor ceremony, ready to go: rows of white chairs, a lush floral arch, an aisle lined with lanterns and a sign to welcome your guests.",
    includes: [
      { qty: "50", item: "Americana or white Tiffany chairs" },
      { qty: "1", item: "Floral arch" },
      { qty: "10", item: "Aisle lanterns with LED candles" },
      { qty: "1", item: "Welcome sign & easel" },
    ],
    bestFor: ["Wedding ceremonies", "Vow renewals", "Garden engagements"],
    featured: true,
  },
  {
    slug: "classic-reception", name: "Classic Reception Package", price: 2450, priceNote: "package price", guests: "100 guests",
    image: "/images/work/setup-02.jpg", gallery: ["/images/work/setup-06.jpg", "/images/work/setup-08.jpg", "/images/work/setup-03.jpg"],
    short: "Round tables, Tiffany chairs, linen and centrepieces for 100.",
    description: "A complete reception setup for 100 guests, with elegant rounds dressed in floor-length white linen, Tiffany chairs with cushions, and centrepieces on every table.",
    includes: [
      { qty: "100", item: "White Tiffany chairs with cushions" },
      { qty: "10", item: "Round tables" },
      { qty: "10", item: "White round tablecloths" },
      { qty: "10", item: "Glass vase centrepieces" },
      { qty: "100", item: "Linen napkins" },
    ],
    bestFor: ["Wedding receptions", "Gala dinners", "Milestone birthdays"],
    featured: true,
  },
  {
    slug: "intimate-long-table", name: "Intimate Long Table Package", price: 690, priceNote: "package price", guests: "Up to 20 guests",
    image: "/images/work/setup-23.jpg", gallery: ["/images/work/setup-16.jpg", "/images/stock/garden-long-table.jpg", "/images/stock/gold-candlesticks.jpg"],
    short: "A styled long table for dinners and small celebrations.",
    description: "A beautifully styled long table for 20, with clear Tiffany chairs, white linen and runner, gold chargers, napkins and candlelight.",
    includes: [
      { qty: "3", item: "Trestle tables 6ft" },
      { qty: "3", item: "White trestle tablecloths + runner" },
      { qty: "20", item: "Clear Tiffany chairs" },
      { qty: "20", item: "Gold chargers & napkins" },
      { qty: "8", item: "Gold candlesticks" },
    ],
    bestFor: ["Dinner parties", "Hens & bridal showers", "Small weddings"],
  },
  {
    slug: "celebration-backdrop", name: "Celebration Backdrop Package", price: 650, priceNote: "package price", guests: "Any size",
    image: "/images/stock/baby-shower-arch.jpg", gallery: ["/images/stock/engagement.jpg", "/images/stock/neon-love-setup.jpg", "/images/stock/arch-candles.jpg"],
    short: "A photo-ready backdrop with neon, plinths and florals.",
    description: "The perfect focal point for engagements, baby showers and birthdays: a round arch with drape, a set of plinths, a warm-white neon sign and floral accents.",
    includes: [
      { qty: "1", item: "Round arch backdrop with drape" },
      { qty: "1", item: "Plinth set (3)" },
      { qty: "1", item: "Neon sign" },
      { qty: "1", item: "Floral garland accents" },
    ],
    bestFor: ["Engagements", "Baby showers", "Christenings", "Birthdays"],
  },
];

export type EventType = {
  slug: string;
  name: string;
  headline: string;
  image: string;
  intro: string;
  points: string[];
  products: string[];
  packages: string[];
};

export const events: EventType[] = [
  {
    slug: "weddings", name: "Weddings", headline: "Wedding furniture & décor hire",
    image: "/images/work/setup-20.jpg",
    intro: "From the ceremony aisle to the reception, we supply the chairs, tables, linen and backdrops that make your day feel effortless and look beautiful in every photo.",
    points: ["Ceremony chairs, arches and aisle lanterns", "Reception rounds or long banquet tables", "Bridal table backdrops and draping", "Delivery, setup and pack-down"],
    products: ["white-tiffany-chair", "clear-tiffany-chair", "floral-arch", "round-table", "white-round-tablecloth", "sheer-backdrop-draping"],
    packages: ["garden-ceremony", "classic-reception"],
  },
  {
    slug: "engagements", name: "Engagements", headline: "Engagement party hire",
    image: "/images/stock/engagement.jpg",
    intro: "Celebrate your yes with a backdrop worth photographing, elegant seating and beautifully dressed tables, at home or at a venue.",
    points: ["Round arch backdrops with neon signs", "Clear or gold Tiffany seating", "Cocktail-style or seated layouts"],
    products: ["round-arch-backdrop", "neon-sign", "gold-tiffany-chair", "bar-stool", "plinth-set", "glass-vase-centrepiece"],
    packages: ["celebration-backdrop", "intimate-long-table"],
  },
  {
    slug: "birthdays", name: "Birthdays", headline: "Birthday party hire",
    image: "/images/work/setup-00.jpg",
    intro: "Whether it's a first birthday or a 50th, we'll help you style the party, with seating, tables and a backdrop that becomes the star of the photos.",
    points: ["Backyard and venue setups", "Flower walls and arch backdrops", "Kids' and adults' seating"],
    products: ["gladiator-chair", "clear-tiffany-chair", "trestle-table-6ft", "flower-wall-backdrop", "table-runner", "neon-sign"],
    packages: ["backyard-birthday", "celebration-backdrop"],
  },
  {
    slug: "baby-showers", name: "Baby Showers", headline: "Baby shower hire",
    image: "/images/stock/baby-shower.jpg",
    intro: "Soft, pretty and photo-ready. Create a dreamy baby shower with backdrops, plinths, florals and comfortable seating for your guests.",
    points: ["Round arch and flower wall backdrops", "Plinths for cakes and gifts", "Pastel linen and runners"],
    products: ["round-arch-backdrop", "plinth-set", "flower-wall-backdrop", "white-tiffany-chair", "table-runner", "glass-vase-centrepiece"],
    packages: ["celebration-backdrop", "backyard-birthday"],
  },
  {
    slug: "christenings", name: "Christenings", headline: "Christening & baptism hire",
    image: "/images/stock/christening.jpg",
    intro: "Elegant, family-friendly setups for christenings and baptisms, with dressed tables, comfortable seating and a gentle floral backdrop.",
    points: ["Seated lunch layouts", "Backdrops for family photos", "White and pastel styling"],
    products: ["white-tiffany-chair", "round-table", "white-round-tablecloth", "flower-wall-backdrop", "chair-cushion", "linen-napkin"],
    packages: ["celebration-backdrop", "classic-reception"],
  },
  {
    slug: "corporate", name: "Corporate Events", headline: "Corporate event furniture hire",
    image: "/images/work/setup-15.jpg",
    intro: "Professional, reliable furniture hire for awards nights, launches, conferences and staff celebrations, delivered and set up on time.",
    points: ["Large-quantity seating", "Round tables and black linen", "Bar stools for networking areas", "After-hours delivery on request"],
    products: ["white-padded-folding-chair", "white-tiffany-chair", "round-table", "black-tablecloth", "bar-stool", "fairy-light-curtain"],
    packages: ["classic-reception"],
  },
  {
    slug: "backyard-parties", name: "Backyard Parties", headline: "Backyard party hire",
    image: "/images/work/setup-04.jpg",
    intro: "Bring the venue home. We'll set up beautiful long tables, comfortable chairs and statement décor right in your backyard.",
    points: ["Long trestle tables with linen", "Hanging florals and fairy lights", "Packages from $650"],
    products: ["trestle-table-6ft", "gladiator-chair", "white-trestle-tablecloth", "hanging-floral-garland", "fairy-light-curtain", "candle-lantern"],
    packages: ["backyard-birthday", "intimate-long-table"],
  },
];

export const offers = [
  { id: "weekday", title: "Weekday & off-peak", value: "15% off", text: "For events Monday to Thursday, or anytime from May to August.", icon: "calendar" },
  { id: "early", title: "Early-bird booking", value: "10% off", text: "When you confirm your booking 6 months or more before your event.", icon: "clock" },
  { id: "welcome", title: "New customer welcome", value: "10% off", text: "Your first hire with us. Use code WELCOME10 in your quote request.", icon: "gift" },
  { id: "seasonal", title: "Spring–summer special", value: "$50 off", text: "Orders of $1,000 or more in item hire, booked this season.", icon: "spark" },
] as const;

export const promo = {
  text: "Early-bird offer: book 6+ months ahead and save 10% · Weekday events save 15%",
  cta: "View offers",
  href: "/offers/",
};

export const welcomeCode = "WELCOME10";

export const faqs = [
  { q: "How does the quote cart work?", a: "Add the items and quantities you need, then send your event details. It's a request, not a payment. We confirm availability for your date and reply with your final quote." },
  { q: "Are delivery and setup included in the prices?", a: "Item prices are for hire only. Delivery, setup and pack-down are quoted per job, based on your suburb, venue access and timing." },
  { q: "Which areas do you service?", a: "The Sydney metropolitan area and the south-western suburbs. If you're unsure whether we cover your venue, just ask." },
  { q: "How far ahead should I book?", a: "As early as you can, especially for spring and summer weekends. Booking 6 or more months ahead also qualifies you for our early-bird discount." },
  { q: "How do I secure my booking?", a: "Once you accept your quote, a 30% deposit secures your date. The balance is due 7 days before your event." },
  { q: "Can I mix packages with individual items?", a: "Absolutely. Add a package to your cart, then add any extra chairs, linen or décor you need." },
  { q: "Can I change quantities after booking?", a: "Usually, yes. Let us know as soon as possible and we'll update your quote, subject to availability." },
  { q: "Do you set up outdoors and in backyards?", a: "Yes. We set up in backyards, parks, halls and venues. Let us know about stairs, long carries or uneven ground so we can plan ahead." },
  { q: "What if an item is damaged?", a: "Normal wear is fine. Items that are lost or damaged beyond repair are charged at replacement cost, and we'll always talk it through with you first." },
  { q: "Can I pick up the items myself?", a: "Pick-up may be possible for smaller orders. Mention it in your quote request and we'll let you know." },
];

export const gallery = [
  { src: "/images/work/setup-20.jpg", alt: "Waterfront long tables with clear Tiffany chairs and white florals" },
  { src: "/images/work/setup-02.jpg", alt: "Round table with white Tiffany chairs and a tall red and white floral centrepiece" },
  { src: "/images/work/setup-17.jpg", alt: "Black linen banquet with clear Tiffany chairs, candles and white blooms" },
  { src: "/images/work/setup-12.jpg", alt: "Pink flower wall behind a table dressed with pink roses" },
  { src: "/images/work/setup-06.jpg", alt: "Reception hall filled with rounds and white Tiffany chairs under festoon lights" },
  { src: "/images/work/setup-14.jpg", alt: "Backyard long table with pink runner and gold chargers" },
  { src: "/images/work/setup-16.jpg", alt: "Long table with white hydrangeas, candles and gold-rim plates" },
  { src: "/images/work/setup-00.jpg", alt: "Pink birthday celebration with clear Tiffany chairs" },
  { src: "/images/work/setup-04.jpg", alt: "Garden long tables under hanging white wisteria" },
  { src: "/images/work/setup-22.jpg", alt: "Black and white place settings with clear Tiffany chairs" },
  { src: "/images/work/setup-13.jpg", alt: "White Tiffany chairs set in rows in a garden" },
  { src: "/images/work/setup-19.jpg", alt: "White Tiffany chairs with colourful dahlia centrepieces" },
  { src: "/images/work/setup-09.jpg", alt: "Round tables with peach napkins and cushioned white Tiffany chairs" },
  { src: "/images/work/setup-23.jpg", alt: "Long white table lined with clear Tiffany chairs" },
  { src: "/images/work/setup-11.jpg", alt: "White Tiffany chairs in a lush tropical garden" },
  { src: "/images/work/setup-21.jpg", alt: "Long tables dressed in white with clear chairs at a waterfront venue" },
  { src: "/images/work/setup-01.jpg", alt: "Pink balloon birthday setup with clear Tiffany chairs at a round table" },
  { src: "/images/work/setup-03.jpg", alt: "Round table with white Tiffany chairs and a floral centrepiece by a fairy-light curtain" },
  { src: "/images/work/setup-05.jpg", alt: "Outdoor long tables with white folding chairs and a greenery runner on the lawn" },
  { src: "/images/work/setup-07.jpg", alt: "Ballroom rounds with white Tiffany chairs and peach napkins" },
  { src: "/images/work/setup-08.jpg", alt: "Reception hall set with white Tiffany chairs and peach napkins" },
  { src: "/images/work/setup-10.jpg", alt: "Close view of a reception round with white Tiffany chairs and peach napkins" },
  { src: "/images/work/setup-15.jpg", alt: "Corporate event rounds with white Tiffany chairs facing the stage" },
  { src: "/images/work/setup-18.jpg", alt: "Black linen tables with clear Tiffany chairs and white florals" },
];

/**
 * Styling ideas from other events (not our work), shown on the Gallery page's Inspiration board.
 * Free-to-use photos from Unsplash (Unsplash License: commercial use allowed, no attribution
 * required); `source` records where each came from.
 */
export const inspiration = [
  { src: "/images/inspiration/inspo-01.jpg", alt: "Reception hall with long tables, gold chairs and a fairy-light ceiling", source: "https://unsplash.com/photos/a-large-room-filled-with-lots-of-tables-and-chairs-Rkj0ms67lio" },
  { src: "/images/inspiration/inspo-02.jpg", alt: "Round reception table under chandeliers and festoon lights", source: "https://unsplash.com/photos/a-table-with-a-white-table-cloth-and-a-chandelier-TgV07XNKS54" },
  { src: "/images/inspiration/inspo-03.jpg", alt: "Pink and blush rose flower wall", source: "https://unsplash.com/photos/pink-and-white-flower-petals-yxEQnODYMTo" },
  { src: "/images/inspiration/inspo-04.jpg", alt: "White rose flower wall", source: "https://unsplash.com/photos/white-rose-field-sqLVUTFtxVs" },
  { src: "/images/inspiration/inspo-05.jpg", alt: "Draped timber ceremony arch on the beach", source: "https://unsplash.com/photos/brown-wooden-stand-on-brown-sand-near-body-of-water-during-daytime-MeNE7Ockq4w" },
  { src: "/images/inspiration/inspo-06.jpg", alt: "Ceremony arch dressed with flowers and greenery", source: "https://unsplash.com/photos/a-wedding-arch-decorated-with-flowers-and-greenery-kdlfXY9rvZA" },
  { src: "/images/inspiration/inspo-07.jpg", alt: "White floral ceremony arch by a lake", source: "https://unsplash.com/photos/wedding-arch-with-white-flowers-by-a-lake-nM8IN_93_QQ" },
  { src: "/images/inspiration/inspo-08.jpg", alt: "Beach ceremony aisle with chairs and flowers", source: "https://unsplash.com/photos/beach-wedding-aisle-with-chairs-flowers-and-ocean-background-Fw-JZJ5zUE8" },
  { src: "/images/inspiration/inspo-09.jpg", alt: "Floral arch and sweetheart table in a garden conservatory", source: "https://unsplash.com/photos/a-white-bench-sitting-in-front-of-a-window-mJj0yW6ofP8" },
  { src: "/images/inspiration/inspo-10.jpg", alt: "Reception tables with white chair covers under hanging greenery", source: "https://unsplash.com/photos/a-group-of-tables-and-chairs-covered-in-white-cloths-nIW8KdmCDRA" },
  { src: "/images/inspiration/inspo-11.jpg", alt: "String lights strung through a gazebo", source: "https://unsplash.com/photos/string-lights-in-gazebo-GcW93Uuljgo" },
  { src: "/images/inspiration/inspo-12.jpg", alt: "Barn reception tables under festoon lights", source: "https://unsplash.com/photos/dining-table-and-chairs-set-t5PlRnsXy1I" },
  { src: "/images/inspiration/inspo-13.jpg", alt: "Long outdoor banquet table under string lights", source: "https://unsplash.com/photos/a-long-table-with-a-couple-standing-behind-it-rng4Glt1YoY" },
  { src: "/images/inspiration/inspo-14.jpg", alt: "Reception table set with florals, glassware and place settings", source: "https://unsplash.com/photos/a-beautifully-set-table-for-a-wedding-reception-zjJiX9txwRU" },
  { src: "/images/inspiration/inspo-15.jpg", alt: "Table styled with white and orange florals", source: "https://unsplash.com/photos/a-table-is-set-with-white-and-orange-flowers-SIf1TtKabVE" },
  { src: "/images/inspiration/inspo-16.jpg", alt: "Place settings with florals and silverware", source: "https://unsplash.com/photos/a-table-is-set-with-plates-of-food-and-silverware-shXtS4Bxp6A" },
  { src: "/images/inspiration/inspo-17.jpg", alt: "Tall pink rose centrepiece", source: "https://unsplash.com/photos/a-large-bouquet-of-flowers-on-a-table-qoEl30StL3A" },
  { src: "/images/inspiration/inspo-18.jpg", alt: "Floral centrepiece in a white event marquee", source: "https://unsplash.com/photos/floral-centerpiece-on-a-table-in-a-white-event-tent-qGHAn-qOr5Q" },
  { src: "/images/inspiration/inspo-19.jpg", alt: "Rattan charger with a peach napkin and name card", source: "https://unsplash.com/photos/a-plate-with-a-napkin-on-it-sitting-on-a-table-K2Lcegcoj3o" },
  { src: "/images/inspiration/inspo-20.jpg", alt: "Long dining table set with place settings", source: "https://unsplash.com/photos/a-dining-room-table-set-with-place-settings-uf5ObSAGjWw" },
];

export const whatsappMessages = {
  general: "Hi Decor Events Hire! I'd like to ask about hiring for my event.",
  product: (name: string, price: string) => `Hi Decor Events Hire! I'm interested in hiring the ${name} (${price}). Is it available for my event date?`,
  package: (name: string, price: string) => `Hi Decor Events Hire! I'm interested in the ${name} (${price}). Is it available for my event date?`,
};

/** wa.me link that opens a WhatsApp chat with the message pre-filled. */
export function whatsappLink(message: string = whatsappMessages.general) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getPackage = (slug: string) => packages.find((p) => p.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export function formatPrice(v: number | null): string {
  if (v == null) return "On quote";
  return "$" + v.toLocaleString("en-AU", { minimumFractionDigits: v % 1 === 0 && v >= 100 ? 0 : 2, maximumFractionDigits: 2 });
}
