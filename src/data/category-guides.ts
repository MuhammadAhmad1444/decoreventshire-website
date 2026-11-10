import type { CategorySlug } from "@/data/site";

// Written guides for each hire category page, so the page explains the hire (who it suits,
// how to choose, how delivery works) rather than only listing prices. Prices are kept out
// of this copy on purpose; the page shows them from the product data so they never drift.

export type CategoryGuide = {
  heading: string;
  paragraphs: string[];
  /** Where these pieces work best, linked to the matching event pages. */
  events: string[];
  faqs: { q: string; a: string }[];
};

export const categoryGuides: Record<CategorySlug, CategoryGuide> = {
  chairs: {
    heading: "Tiffany chair hire for weddings and parties across Sydney",
    paragraphs: [
      "Seating sets the tone of a room before anyone sits down. Tiffany chairs in white, gold or clear are the classic choice for wedding receptions and engagements, Americana chairs suit garden ceremonies, and gladiator and padded folding chairs keep big backyard parties comfortable without stretching the budget.",
      "Every chair has its hire price shown online, so you can work out your seating cost before you ask for a quote. Add cushions if you want extra comfort, then tell us your venue and guest numbers. We deliver from Campbelltown, place the chairs where you want them and collect them after the event.",
    ],
    events: ["weddings", "engagements", "birthdays"],
    faqs: [
      { q: "Which chairs are best for a wedding reception?", a: "Tiffany chairs are the most popular for receptions. White suits most themes, gold adds warmth for evening events, and clear chairs work with any colour palette." },
      { q: "Do your chairs come with cushions?", a: "White Tiffany chairs come with a white seat pad. Tie-on chair cushions can be added to other chairs for extra comfort." },
      { q: "Can you set the chairs out for us?", a: "Yes. Setup and pack-down are part of our delivery service, quoted per job based on your venue and timing." },
    ],
  },
  tables: {
    heading: "Table hire for banquets, receptions and backyard parties",
    paragraphs: [
      "Trestle tables are the flexible option: one seats six to eight guests, and several joined end to end make a long banquet table for a styled lunch or reception. Round tables suit seated dinners where guests face each other, and pair naturally with floor-length round tablecloths.",
      "Choose your tables, add linen to match and tell us your guest count. We can suggest a layout for your space, deliver across Sydney and the south-west, set everything up and collect it once the event is over.",
    ],
    events: ["weddings", "birthdays", "corporate"],
    faqs: [
      { q: "How many guests fit at a trestle table?", a: "A 6ft trestle table seats six to eight guests. Join several together for a long banquet table." },
      { q: "Should I choose round or trestle tables?", a: "Round tables suit seated receptions and conversation. Trestle tables are better for long banquet layouts and smaller spaces." },
      { q: "Do I need tablecloths?", a: "Most events look best dressed. We hire tablecloths sized for both our trestle and round tables, plus runners and napkins." },
    ],
  },
  linen: {
    heading: "Tablecloth hire, plus runners and napkins, for Sydney events",
    paragraphs: [
      "Linen finishes a table. Crisp white cloths are timeless for weddings and christenings, black linen gives evening events a modern look, and runners and napkins in blush, sage, ivory or gold bring your colour scheme onto the table.",
      "Our tablecloths are sized for the tables we hire, so ordering them together keeps everything fitting properly. Add linen to your quote with your tables and we'll deliver and dress them on the day.",
    ],
    events: ["weddings", "christenings", "corporate"],
    faqs: [
      { q: "Will your tablecloths fit my tables?", a: "Our trestle and round tablecloths are sized for the tables we hire. If you're using the venue's tables, send us their size and we'll advise." },
      { q: "Do you deliver the linen with the tables?", a: "Yes. Linen arrives with the rest of your order and is collected with it after your event." },
      { q: "What colours are available?", a: "Tablecloths come in white and black. Runners and napkins come in a range of colours including white, ivory, blush, sage, gold and black." },
    ],
  },
  "table-runners": {
    heading: "Table runner hire for weddings, parties and long tables",
    paragraphs: [
      "A runner is the quickest way to bring colour and texture to a table. Lay one down the centre of a long banquet table, or across round tables, then build your centrepieces, candles and greenery on top of it.",
      "Pair runners with our white or black tablecloths, tell us your table count and colour theme, and we'll deliver everything together from Campbelltown across Sydney and the south-west.",
    ],
    events: ["weddings", "engagements", "birthdays"],
    faqs: [
      { q: "How many runners do I need?", a: "One runner per table is usual. For long banquet tables made from several trestles, allow one runner per table length." },
      { q: "Do runners go on top of a tablecloth?", a: "Usually, yes. A runner over a white or black tablecloth gives the most finished look, but runners can also sit on bare timber tables." },
    ],
  },
  "table-skirting": {
    heading: "Table skirting hire for cake, buffet and gift tables",
    paragraphs: [
      "Table skirting runs to the floor around the front and sides of a table, hiding legs and anything stored underneath. It gives cake tables, dessert and buffet tables, gift tables and registration desks a neat, finished look.",
      "Let us know which tables you'd like skirted and your colour theme. We can deliver, fit the skirting and collect it after your event.",
    ],
    events: ["weddings", "baby-showers", "corporate"],
    faqs: [
      { q: "Which tables need skirting?", a: "Feature tables guests walk up to, such as cake, dessert, gift, buffet and registration tables, benefit most from skirting." },
      { q: "Can you fit the skirting for us?", a: "Yes. Setup is part of our delivery service, quoted per job based on your venue and timing." },
    ],
  },
  plinths: {
    heading: "Plinth hire for cakes, florals and display styling",
    paragraphs: [
      "Plinths lift your feature pieces to eye level. Use them for wedding cakes, floral arrangements, candles, welcome signs or a styled backdrop, grouped in different heights for a layered look.",
      "Our plinth set comes in three heights. Tell us where you'd like them, and we'll deliver, place them and collect them after the event.",
    ],
    events: ["weddings", "engagements", "corporate"],
    faqs: [
      { q: "What can I put on a plinth?", a: "Cakes, floral arrangements, candles, signage and small décor pieces all work well on plinths." },
      { q: "How many plinths come in a set?", a: "Our plinth set has three plinths in different heights, which gives a balanced, layered display." },
    ],
  },
  decor: {
    heading: "Wedding décor and backdrop hire for photos and styled tables",
    paragraphs: [
      "The décor is what guests photograph. A flower wall or round arch makes a focal point for a bridal table, cake or baby shower, a floral arch frames a garden ceremony, and neon signs, plinths, lanterns and candlesticks finish the styling around it.",
      "Hire individual pieces or combine them in one of our styled packages. We deliver and set up backdrops on site so they're secure and ready for photos, then collect everything after the event.",
    ],
    events: ["weddings", "baby-showers", "engagements"],
    faqs: [
      { q: "Do you set up the flower wall and arches?", a: "Yes. Backdrops and arches are delivered, assembled and positioned on site by our team, and collected afterwards." },
      { q: "Can backdrops be used outdoors?", a: "Yes, on firm, level ground. Let us know if your event is outdoors so we can plan for wind and weather." },
      { q: "Can I hire the décor without a package?", a: "Yes. Every piece can be hired on its own, or combined with others in a styled package." },
    ],
  },
  "draping-lighting": {
    heading: "Draping hire: ceiling swags, sheer backdrops and fairy-light curtains",
    paragraphs: [
      "Draping and lighting change how a room feels. Ceiling swags soften a hall or marquee, sheer floor-length drapes create a clean backdrop behind a bridal table, and warm fairy-light curtains add glow for evening receptions and engagements.",
      "Ceiling draping is quoted to your venue because every room is different. Sheer drapes and fairy-light curtains are priced per 3m section, so measure the wall you want to cover and add the sections you need.",
    ],
    events: ["weddings", "engagements", "corporate"],
    faqs: [
      { q: "How is ceiling draping priced?", a: "Ceiling draping is quoted per venue, based on the room size, ceiling height and fixing points available." },
      { q: "How many sections of backdrop do I need?", a: "Sheer drapes and fairy-light curtains come in 3m sections. Measure the width you want to cover and divide by three." },
      { q: "Do you install the draping?", a: "Yes. Draping and lighting are installed by our team and taken down after your event." },
    ],
  },
  "bar-stools": {
    heading: "Bar stool hire for cocktail areas and dessert stations",
    paragraphs: [
      "Bar stools give guests somewhere to perch around a bar, cocktail tables or a dessert station, and keep standing-style events relaxed. They suit engagements, milestone birthdays and corporate functions where guests move around.",
      "Add bar stools alongside your chairs and tables and we'll deliver them with the rest of your order across Sydney and the south-west, then collect them after the event.",
    ],
    events: ["birthdays", "engagements", "corporate"],
    faqs: [
      { q: "How many bar stools do I need?", a: "For a mingling event, seating for about a third of guests at the bar and cocktail areas is usually enough." },
      { q: "Can bar stools be used outdoors?", a: "Yes, on firm, level ground such as decking or paving." },
      { q: "Are bar stools delivered with the rest of my order?", a: "Yes. Everything arrives together and is collected together after your event." },
    ],
  },
};

// Search-focused page titles and main headings for each category, built around the phrases people
// type into Google (from Google's own Australian search suggestions), e.g. "tiffany chair hire sydney".
export const categorySeo: Record<CategorySlug, { title: string; h1: string; accent: string }> = {
  chairs: { title: "Tiffany Chair Hire Sydney & Campbelltown", h1: "Tiffany & Event Chair", accent: "Hire" },
  tables: { title: "Table Hire Sydney & Campbelltown", h1: "Table", accent: "Hire" },
  linen: { title: "Tablecloth Hire Sydney & Campbelltown", h1: "Tablecloth & Linen", accent: "Hire" },
  decor: { title: "Wedding Decor & Backdrop Hire Sydney", h1: "Décor & Backdrop", accent: "Hire" },
  "draping-lighting": { title: "Draping & Fairy Light Hire Sydney", h1: "Draping & Lighting", accent: "Hire" },
  "bar-stools": { title: "Bar Stool Hire Sydney & Campbelltown", h1: "Bar Stool", accent: "Hire" },
  "table-runners": { title: "Table Runner Hire Sydney & Campbelltown", h1: "Table Runner", accent: "Hire" },
  "table-skirting": { title: "Table Skirting Hire Sydney & Campbelltown", h1: "Table Skirting", accent: "Hire" },
  plinths: { title: "Plinth Hire Sydney & Campbelltown", h1: "Plinth", accent: "Hire" },
};
