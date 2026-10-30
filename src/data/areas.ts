// Service-area pages: one per suburb or region on the Google Business Profile, so people
// searching "party hire <suburb>" land on a page written for them. Each entry has its own
// intro and neighbouring suburbs so the pages are useful, not copies of each other.

export type Area = {
  slug: string;
  name: string;
  /** Short region label shown above the title. */
  region: string;
  postcode?: string;
  /** One or two sentences written for this area. */
  intro: string;
  nearby: string[];
  image: string;
};

export const areas: Area[] = [
  {
    slug: "campbelltown", name: "Campbelltown", region: "Macarthur", postcode: "2560",
    intro: "Our home base is on Blaxland Road, so Campbelltown celebrations get the shortest trip and the most flexible delivery times, from Leumeah backyards to receptions across the Macarthur.",
    nearby: ["Leumeah", "Ingleburn", "Minto", "Glenfield", "Macquarie Fields", "Ambarvale", "Rosemeadow"],
    image: "/images/work/setup-03.jpg",
  },
  {
    slug: "camden", name: "Camden", region: "Macarthur", postcode: "2570",
    intro: "From garden ceremonies on Camden's rural estates to long-table lunches in town, we bring Tiffany chairs, arches and linen out to the Camden area and set everything up on site.",
    nearby: ["Elderslie", "Spring Farm", "Mount Annan", "Cobbitty", "Harrington Park"],
    image: "/images/work/setup-13.jpg",
  },
  {
    slug: "narellan", name: "Narellan", region: "Macarthur", postcode: "2567",
    intro: "Narellan is just down the road from us, which makes it easy to book furniture and décor for home parties, christenings and engagements across the Narellan and Smeaton Grange area.",
    nearby: ["Narellan Vale", "Smeaton Grange", "Currans Hill", "Mount Annan", "Harrington Park"],
    image: "/images/work/setup-14.jpg",
  },
  {
    slug: "oran-park", name: "Oran Park", region: "Macarthur", postcode: "2570",
    intro: "New homes and big backyards make Oran Park ideal for styled birthdays and baby showers. We deliver chairs, tables, backdrops and balloon-ready setups throughout the estate.",
    nearby: ["Gregory Hills", "Catherine Field", "Harrington Park", "Cobbitty", "Gledswood Hills"],
    image: "/images/work/setup-01.jpg",
  },
  {
    slug: "leppington", name: "Leppington", region: "South-west growth area", postcode: "2179",
    intro: "Leppington and the surrounding new estates are a quick run from Campbelltown. We set up everything from intimate dinners to full marquee-style parties on the lawn.",
    nearby: ["Edmondson Park", "Austral", "Rossmore", "Denham Court", "Catherine Field"],
    image: "/images/work/setup-05.jpg",
  },
  {
    slug: "liverpool", name: "Liverpool", region: "South-west Sydney", postcode: "2170",
    intro: "For weddings, engagements and family celebrations in Liverpool, we deliver to function venues, halls and homes right across the area and set everything up on site.",
    nearby: ["Casula", "Moorebank", "Prestons", "Hoxton Park", "Green Valley", "Edmondson Park"],
    image: "/images/work/setup-06.jpg",
  },
  {
    slug: "fairfield", name: "Fairfield", region: "South-west Sydney", postcode: "2165",
    intro: "For Fairfield weddings, henna nights and big family parties, we supply seating for large guest lists along with round tables, linen and statement backdrops.",
    nearby: ["Cabramatta", "Canley Vale", "Smithfield", "Wetherill Park", "Bossley Park"],
    image: "/images/work/setup-07.jpg",
  },
  {
    slug: "bankstown", name: "Bankstown", region: "South-west Sydney", postcode: "2200",
    intro: "We style receptions, engagements and Eid and birthday celebrations across Bankstown, with Tiffany chairs, flower walls and table settings delivered and set up for you.",
    nearby: ["Yagoona", "Punchbowl", "Bass Hill", "Revesby", "Greenacre"],
    image: "/images/work/setup-12.jpg",
  },
  {
    slug: "parramatta", name: "Parramatta", region: "Western Sydney", postcode: "2150",
    intro: "From corporate functions in the Parramatta CBD to backyard parties in the suburbs around it, we deliver event furniture and décor and handle setup and pack-down.",
    nearby: ["Westmead", "Harris Park", "Granville", "North Parramatta", "Merrylands"],
    image: "/images/work/setup-15.jpg",
  },
  {
    slug: "penrith", name: "Penrith", region: "Western Sydney", postcode: "2750",
    intro: "We bring chairs, tables, arches and linen out to Penrith and the foothills for weddings, birthdays and community events, with delivery quoted to your venue.",
    nearby: ["Kingswood", "Jamisontown", "Emu Plains", "Glenmore Park", "St Marys"],
    image: "/images/work/setup-04.jpg",
  },
  {
    slug: "blacktown", name: "Blacktown", region: "Western Sydney", postcode: "2148",
    intro: "For milestone birthdays, engagements and receptions in Blacktown, choose individual pieces or a styled package and we deliver and set it up across the area.",
    nearby: ["Seven Hills", "Doonside", "Marayong", "Quakers Hill", "Kings Langley"],
    image: "/images/work/setup-09.jpg",
  },
  {
    slug: "sutherland", name: "Sutherland Shire", region: "Southern Sydney", postcode: "2232",
    intro: "From Cronulla waterfront receptions to backyard birthdays in Miranda, we deliver elegant furniture and décor throughout the Sutherland Shire.",
    nearby: ["Miranda", "Caringbah", "Cronulla", "Engadine", "Gymea"],
    image: "/images/work/setup-20.jpg",
  },
  {
    slug: "hurstville", name: "Hurstville", region: "St George", postcode: "2220",
    intro: "We style banquets, engagements and family celebrations across Hurstville and the St George area, with round tables, linen and Tiffany chairs set up ready for guests.",
    nearby: ["Kogarah", "Penshurst", "Mortdale", "Beverly Hills", "Kingsgrove"],
    image: "/images/work/setup-02.jpg",
  },
  {
    slug: "sydney-cbd", name: "Sydney CBD", region: "Central Sydney", postcode: "2000",
    intro: "For city venues, rooftops and harbourside functions, we plan delivery around loading docks, lifts and bump-in times so your setup is ready on schedule.",
    nearby: ["Surry Hills", "Pyrmont", "Ultimo", "The Rocks", "Darlinghurst"],
    image: "/images/work/setup-21.jpg",
  },
  {
    slug: "inner-west", name: "Inner West", region: "Inner Sydney",
    intro: "Terrace backyards, warehouse venues and community halls: we deliver compact, stylish setups across the Inner West and plan around tight access and street parking.",
    nearby: ["Newtown", "Leichhardt", "Marrickville", "Ashfield", "Balmain"],
    image: "/images/work/setup-22.jpg",
  },
  {
    slug: "hills-district", name: "Hills District", region: "North-west Sydney",
    intro: "We deliver to homes and venues across the Hills District for weddings, engagements and garden parties, with arches, florals and seating set up on site.",
    nearby: ["Castle Hill", "Baulkham Hills", "Kellyville", "Rouse Hill", "Bella Vista"],
    image: "/images/work/setup-11.jpg",
  },
];

export const getArea = (slug: string) => areas.find((a) => a.slug === slug);

// Local planning notes for each area page: the council that manages most of the area (for park
// and reserve bookings) and practical setup tips for the kinds of venues found there.
export const areaLocal: Record<string, { council: string; tips: string[] }> = {
  campbelltown: { council: "Campbelltown City Council", tips: [
    "Booking a weekday or early-morning delivery is easiest here, as it's our shortest run.",
    "For backyard parties in Leumeah or Ambarvale, let us know about side access or steps to the yard.",
  ] },
  camden: { council: "Camden Council", tips: [
    "Rural and estate venues often have long driveways or grass paths, so share a site map if you have one.",
    "Outdoor ceremonies on lawns need firm, level ground for arches and chairs; we'll check it on arrival.",
  ] },
  narellan: { council: "Camden Council", tips: [
    "Townhouse and courtyard parties suit trestle tables joined into one long banquet table.",
    "Tell us if parking is tight in your street so we can plan the delivery time.",
  ] },
  "oran-park": { council: "Camden Council", tips: [
    "New-estate backyards are often freshly turfed, so we place chairs and tables to protect the lawn.",
    "Balloon and backdrop setups work best set up the morning of the party rather than the night before.",
  ] },
  leppington: { council: "Camden and Liverpool councils", tips: [
    "Larger blocks suit marquee-style layouts; send us your yard size and we'll suggest table numbers.",
    "Some new streets aren't on every map yet, so include a nearby cross street in your quote request.",
  ] },
  liverpool: { council: "Liverpool City Council", tips: [
    "Function centres usually set strict bump-in times, so let us know your venue's access window.",
    "For large family celebrations, round tables of ten keep guests together and make seating plans easy.",
  ] },
  fairfield: { council: "Fairfield City Council", tips: [
    "For big guest lists, request your quote early for peak wedding and festival weekends.",
    "Halls often provide their own tables; tell us their size and we'll match the tablecloths.",
  ] },
  bankstown: { council: "City of Canterbury-Bankstown", tips: [
    "Planning around Eid or another festival date? Request your quote early to secure your pieces.",
    "For home engagements, a flower wall in the living area makes a natural photo spot.",
  ] },
  parramatta: { council: "City of Parramatta", tips: [
    "Office and apartment venues often need loading-dock bookings, so share building contact details.",
    "Corporate functions suit gladiator or folding chairs in rows for presentations.",
  ] },
  penrith: { council: "Penrith City Council", tips: [
    "Summer in the west gets hot, so plan shade for outdoor ceremonies and keep florals out of direct sun.",
    "Riverside and park venues may need a short carry from the car park; let us know the distance.",
  ] },
  blacktown: { council: "Blacktown City Council", tips: [
    "Milestone birthdays in the backyard suit a mix of bar stools and lounge-style seating.",
    "Community halls usually have set pack-down times, so we schedule collection to match.",
  ] },
  sutherland: { council: "Sutherland Shire Council", tips: [
    "Waterfront and beach-side venues can be windy, so we secure backdrops and keep linen weighted.",
    "Steep driveways are common in the Shire; mention them so we bring the right trolleys.",
  ] },
  hurstville: { council: "Georges River Council", tips: [
    "Banquet-style dinners suit round tables with floor-length white cloths and gold chargers.",
    "Apartment-building venues need lift access confirmed before delivery day.",
  ] },
  "sydney-cbd": { council: "the City of Sydney", tips: [
    "City venues usually require bump-in through a loading dock at a booked time.",
    "Allow extra time for parking and access when planning setup before an evening event.",
  ] },
  "inner-west": { council: "Inner West Council", tips: [
    "Terrace homes often have narrow halls, so compact folding chairs and trestle tables work best.",
    "Street parking is limited, so tell us if a loading zone or driveway is available.",
  ] },
  "hills-district": { council: "The Hills Shire Council", tips: [
    "Larger gardens suit floral arches and long tables for outdoor ceremonies and lunches.",
    "Sloping blocks are common, so let us know where the flattest area of the garden is.",
  ] },
};
