export type Project = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  year: string;
  role: string;
  timeline: string;
  team: string;
  stack: string;
  url: string;
  cover: string;
  coverAlt: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  deliverables: string[];
  results: { value: string; label: string }[];
  quote: { text: string; name: string; title: string };
  mockVariant: "dashboard" | "editorial" | "commerce" | "music" | "hotel";
};

export const projects: Project[] = [
  {
    slug: "meridian",
    name: "Meridian",
    tagline: "Private wealth, minus the mahogany.",
    category: "Product & Platform",
    year: "2025",
    role: "Design, Build, Motion",
    timeline: "16 weeks",
    team: "4 people",
    stack: "React · Vite · D3",
    url: "meridianwealth.co.za",
    cover: "/images/p-meridian.jpg",
    coverAlt:
      "Floating dark glass dashboard panels with thin amber data lines and serif numerals, photographed in a dark studio.",
    summary:
      "Meridian manages serious money for people who are allergic to fuss. They needed a platform — and a presence — that felt like a Savile Row suit: quiet, precise, and obviously expensive.",
    challenge:
      "Private wealth sites usually look like a bank's brochure married a PDF. Meridian's board called their own product “inevitably boring” and asked us to make it the one thing clients compliment at dinner parties. The catch: FSCA compliance meant nothing could feel frivolous.",
    approach:
      "We built a dark-glass design system where the interface behaves like light moving across a desk at dusk. Serif numerals for the money, hairline charts for the movement, and a front-end that renders 40 data panels in under a second. Every animation is physics-based and under 400 milliseconds — trust through restraint.",
    outcome:
      "Qualified enquiries rose 38% in the first quarter. Onboarding dropped from an hour of forms to twelve calm minutes. The board now opens meetings by showing the site, which is the nicest thing a board has ever done to us.",
    deliverables: [
      "Product design system",
      "Marketing site",
      "Interactive dashboards",
      "Motion language",
      "Design engineering",
    ],
    results: [
      { value: "+38%", label: "Qualified enquiries" },
      { value: "0.9s", label: "Median page load" },
      { value: "12min", label: "Client onboarding" },
    ],
    quote: {
      text: "Sundowner took a product we called “inevitably boring” and made it the one thing our clients compliment. I'd have paid just to receive fewer complaint emails.",
      name: "Lerato Mokoena",
      title: "Head of Digital, Meridian",
    },
    mockVariant: "dashboard",
  },
  {
    slug: "fynbos-and-field",
    name: "Fynbos & Field",
    tagline: "Skincare that smells like the mountain.",
    category: "E-Commerce",
    year: "2024",
    role: "Design, Shopify, Direction",
    timeline: "12 weeks",
    team: "3 people",
    stack: "Shopify · Hydrogen · React",
    url: "fynbosandfield.com",
    cover: "/images/p-fynbos.jpg",
    coverAlt:
      "Amber glass skincare bottles among dried protea and fynbos stems on bone linen under dramatic directional light.",
    summary:
      "A Cape Town skincare brand distilling actual fynbos into actual bottles. Their products were gorgeous; their website looked like a pharmacy coupon. We fixed the second thing.",
    challenge:
      "Jana, the founder, writes product descriptions that read like poetry — but her old site buried them under stock photography and a checkout that felt like customs at an airport. She needed a store that could carry both the science and the romance, and load fast on farm-town bandwidth.",
    approach:
      "We art-directed a photographic world first — dried fynbos, bone linen, one dramatic light — then built the store inside it. Hydrogen headless for speed, a type system based on apothecary labels, and a checkout trimmed to three screens. The ingredient glossary became the most-read section on the site.",
    outcome:
      "Online revenue is up 212% year on year, conversion more than tripled, and the site won the brand stockists in four countries. Jana says the site “finally sounds like me,” which is the whole job, really.",
    deliverables: [
      "Art direction",
      "E-commerce design & build",
      "Product photography direction",
      "Ingredient glossary UX",
      "Email design system",
    ],
    results: [
      { value: "+212%", label: "Online revenue" },
      { value: "3.4%", label: "Conversion rate" },
      { value: "1.2s", label: "Checkout load" },
    ],
    quote: {
      text: "They argued with me — politely, and with evidence — and they were right every time. Revenue is up 212%, but mostly the site finally sounds like me.",
      name: "Jana Smit",
      title: "Founder, Fynbos & Field",
    },
    mockVariant: "commerce",
  },
  {
    slug: "obsidian-works",
    name: "Obsidian Works",
    tagline: "Buildings photographed like portraits.",
    category: "Editorial & Portfolio",
    year: "2024",
    role: "Design & Build",
    timeline: "8 weeks",
    team: "2 people",
    stack: "Astro · GSAP · Sanity",
    url: "obsidianworks.co",
    cover: "/images/p-obsidian.jpg",
    coverAlt:
      "A brutalist concrete building model under raking amber light with one long dramatic shadow and a tiny scale figure.",
    summary:
      "An architecture practice that designs monolithic concrete houses for very patient clients. They wanted a portfolio that behaved like walking through one of their buildings: quiet, heavy, deliberate.",
    challenge:
      "Architecture sites are either sterile grids or slow-motion drone videos that take eleven minutes to say nothing. Obsidian's work deserved a gallery's confidence — huge images, unhurried pacing, and typography that could hold its own against cast concrete.",
    approach:
      "We designed a slow editorial scroll: full-bleed plates separated by single sentences, a case-study index that reads like an index of monographs, and a custom lightbox that treats plans, sections and photographs as equals. Underneath, it's feather-light — Astro islands, no client-side bloat, images tuned to the kilobyte.",
    outcome:
      "Average session time more than doubled to over six minutes — unheard of for a portfolio. The site was featured by four design galleries, and project enquiries doubled without a single rand of advertising.",
    deliverables: [
      "Portfolio design & build",
      "Editorial CMS",
      "Custom project lightbox",
      "Image pipeline",
      "Motion design",
    ],
    results: [
      { value: "6:12", label: "Avg. session time" },
      { value: "2×", label: "Project enquiries" },
      { value: "4", label: "Gallery features" },
    ],
    quote: {
      text: "Our buildings take three years to finish. Sundowner is the only studio we've worked with that matched that patience — and then delivered in eight weeks.",
      name: "Willem Kruger",
      title: "Founding Partner, Obsidian Works",
    },
    mockVariant: "editorial",
  },
  {
    slug: "helderberg-records",
    name: "Helderberg Records",
    tagline: "Warm vinyl for cold algorithms.",
    category: "Music & Culture",
    year: "2025",
    role: "Identity, Design, Build",
    timeline: "10 weeks",
    team: "3 people",
    stack: "Next.js · Web Audio · GSAP",
    url: "helderbergrecords.com",
    cover: "/images/p-helderberg.jpg",
    coverAlt:
      "A spinning turntable and stacked vinyl sleeves with bold typographic covers under warm lamplight in a dark studio.",
    summary:
      "A tiny independent label pressing Cape jazz and deep-house to vinyl. Streaming pays them in exposure; their website needed to sell the physical thing — sleeves, pressings, ritual.",
    challenge:
      "Label sites die two deaths: a Shopify template that could be selling socks, or an artsy fever dream where you can't find the buy button. Helderberg needed a site with the sleeve's attitude and a record store's practicality — and it had to handle drop-day traffic spikes of 40×.",
    approach:
      "We built the site like a wall of vinyl: you browse sleeves, pull one out, and the whole page becomes that record — audio player, liner notes, pressing details. Big letterpress-inspired type, a drop calendar with countdowns, and buying kept to two taps. The audio engine uses Web Audio for instant, gapless previews.",
    outcome:
      "The first pressing sold out in nine days. 97% of sales now happen direct — noplatform skimming 30% — and the mailing list grew to 22,000 people who actually open the emails.",
    deliverables: [
      "Visual identity",
      "Drop-commerce platform",
      "Web Audio player",
      "Sleeve design system",
      "Drop-day infrastructure",
    ],
    results: [
      { value: "9 days", label: "First pressing sellout" },
      { value: "97%", label: "Direct-to-fan sales" },
      { value: "22k", label: "Mailing list" },
    ],
    quote: {
      text: "Our last site was a Shopify template. This one feels like the label. Fans now screenshot the website, which I didn't know was a thing websites could achieve.",
      name: "Nandi Dlamini",
      title: "Label Head, Helderberg Records",
    },
    mockVariant: "music",
  },
  {
    slug: "karoo-salt",
    name: "Karoo Salt",
    tagline: "Desert in a jar, story on a shelf.",
    category: "Brand & E-Commerce",
    year: "2023",
    role: "Brand, Packaging, Web",
    timeline: "14 weeks",
    team: "4 people",
    stack: "Identity · Shopify · Print",
    url: "karoosalt.co.za",
    cover: "/images/p-karoo.jpg",
    coverAlt:
      "Coarse salt flakes in a dark ceramic bowl beside minimal textured packaging, lit by a hard desert-dusk light.",
    summary:
      "Two brothers harvesting salt from a pan in the middle of the Karoo, competing against salt that's been on supermarket shelves since before they were born. We gave them a brand with the desert's own confidence.",
    challenge:
      "Salt is a commodity — until it has a story people repeat at dinner. Karoo Salt had the story (one pan, two brothers, three hundred days of sun) but a brand that whispered it. They needed shelf presence for 40 g jars and a website that could land wholesale accounts while they slept.",
    approach:
      "We designed the identity, the packaging and the site as one thing: raw paper texture, embossed type, hard desert light. The site opens on a single jar in a spotlight and lets the story unscroll — geology, brothers, recipes — ending in a wholesale portal that deli buyers actually use.",
    outcome:
      "Wholesale accounts grew 164% in a year; the jars are stocked in more than forty delis and one very fancy hotel minibar. The brothers' mother now introduces them as “the salt moguls,” which we claim partial credit for.",
    deliverables: [
      "Brand identity",
      "Packaging design",
      "E-commerce site",
      "Wholesale portal",
      "Photography direction",
    ],
    results: [
      { value: "+164%", label: "Wholesale accounts" },
      { value: "40+", label: "Stockists" },
      { value: "1", label: "Very fancy minibar" },
    ],
    quote: {
      text: "Buyers used to ask what made our salt different. Now the website answers before we get on the phone. It's the best salesperson we've never had to feed.",
      name: "Hannes van Wyk",
      title: "Co-founder, Karoo Salt",
    },
    mockVariant: "commerce",
  },
  {
    slug: "kloof-corner",
    name: "Kloof Corner",
    tagline: "Twelve rooms, one pool of lamplight.",
    category: "Hospitality",
    year: "2023",
    role: "Design, Build, Copy",
    timeline: "12 weeks",
    team: "3 people",
    stack: "React · Headless CMS · Maps",
    url: "staykloofcorner.com",
    cover: "/images/p-kloof.jpg",
    coverAlt:
      "A moody boutique hotel corner with a boucle armchair and coupe glass in a warm pool of lamplight against dark walls.",
    summary:
      "A twelve-room boutique hotel clinging to a Cape Town hillside. Brilliant hospitality, invisible website. The brief was one line: “Make the internet feel like check-in.”",
    challenge:
      "Small hotels bleed money to booking platforms that take 18% and return a beige listing. Kloof Corner needed direct bookings, which meant the site had to out-sell platforms with million-rand budgets — using twelve rooms, one chef, and a dog named Biscuit.",
    approach:
      "We wrote and designed the site like the hotel speaks: unhurried, a little dry, genuinely warm. Rooms are photographed as moods, not floor plans; the booking flow is three steps and remembers returning guests; and yes, Biscuit has a page. It's the third most visited on the site.",
    outcome:
      "Direct bookings rose 91% in six months, platform commissions dropped by two-thirds, and the Sunday Times called it “a hotel website worth reading.” Biscuit remains unimpressed by all of it.",
    deliverables: [
      "Site design & build",
      "Booking-flow UX",
      "Copywriting",
      "Photography direction",
      "Local SEO",
    ],
    results: [
      { value: "+91%", label: "Direct bookings" },
      { value: "−62%", label: "Platform commissions" },
      { value: "#3", label: "Most-visited page: the dog" },
    ],
    quote: {
      text: "Direct bookings nearly doubled, and guests arrive already loving the place. Also the dog's page outperforms our conference facilities page, as it should.",
      name: "Carl Petersen",
      title: "General Manager, Kloof Corner",
    },
    mockVariant: "hotel",
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const nextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};

export const trailImages = [
  "/images/intro-2.jpg",
  "/images/p-meridian.jpg",
  "/images/intro-3.jpg",
  "/images/p-fynbos.jpg",
  "/images/intro-4.jpg",
  "/images/p-helderberg.jpg",
  "/images/p-obsidian.jpg",
  "/images/p-karoo.jpg",
  "/images/p-kloof.jpg",
];
