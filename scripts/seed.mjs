/**
 * Seed Firestore with initial product data.
 *
 * SETUP:
 *   1. npm install -D firebase-admin           (already done after npm install)
 *   2. Download your Firebase service-account key:
 *      Firebase Console → Project Settings → Service accounts → Generate new private key
 *      Save as  frontend/service-account.json  (it is git-ignored automatically)
 *   3. Run:  node scripts/seed.mjs
 *
 * Re-running is safe — it uses set() which overwrites existing docs.
 */

import { createRequire } from 'module';
import { fileURLToPath }  from 'url';
import { dirname, resolve } from 'path';

const require   = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Firebase Admin ─────────────────────────────────────────────────────────
const { initializeApp, cert } = await import('firebase-admin/app');
const { getFirestore }        = await import('firebase-admin/firestore');

const serviceAccount = require(resolve(__dirname, '../service-account.json'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

// ── Replace these Cloudinary URLs after uploading your images ──────────────
// Upload all images from frontend/public/images/ to Cloudinary first,
// then paste the secure_url for each image below.
const CDN = 'https://res.cloudinary.com/dinn06c4j/image/upload/ila-gold-spices';

// ── Product data ───────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    slug:            'whole-green-cardamom',
    name:            'Premium Whole Green Cardamom',
    arabic_name:     'هيل أخضر كامل فاخر',
    tagline:         'From the mist of the Western Ghats',
    category:        'Cardamom',
    botanical:       'Elettaria cardamomum',
    origin:          'Kerala, India',
    description:     'Premium whole green cardamom pods from the Western Ghats of Kerala, selected for size, colour and aroma.',
    story:           'In Kerala, every kitchen carries the warm scent of freshly cracked cardamom pods. We work directly with small farmers in the hill estates of the Western Ghats, where cool mist and rich volcanic soil shape the intense flavour these pods are known for. Each lot is hand-graded for 7.5mm+ size, natural green colour, and high essential-oil content — no bleaching, no shortcuts.',
    features: [
      'Natural green colour — no artificial colour or bleaching',
      'Export grade 7.5–8 mm+ pods, high essential-oil content',
      'Low moisture for extended shelf life',
      'Lab-tested for pesticide residues, aflatoxins and moisture',
      'Free from mould, insect damage and foreign matter',
    ],
    uses:            ['Chai & Arabic coffee', 'Biryani & rice dishes', 'Desserts & bakery', 'Spice blends'],
    retail_packs:    ['50 g', '100 g', '200 g', '500 g'],
    bulk_packs:      ['1 kg', '5 kg', '10–25 kg cartons'],
    window_image:    `${CDN}/product-cardamom-hero.jpeg`,
    product_image:   `${CDN}/product-cardamom-2.jpeg`,
    coming_soon:     false,
    active:          true,
    retail_price:    35,
    wholesale_price: 28,
    currency:        'AED',
  },
  {
    slug:            'ground-cardamom',
    name:            'Crushed & Ground Cardamom',
    arabic_name:     'هيل مطحون فاخر',
    tagline:         'Ready-to-use aromatic intensity',
    category:        'Cardamom',
    botanical:       'Elettaria cardamomum',
    origin:          'Kerala, India',
    description:     'Convenient crushed or ground cardamom made from high-grade pods, ideal for fast production and consistent flavour.',
    story:           'Made from the same export-grade pods as our whole cardamom, milled in small batches and packed quickly to retain essential oils and aroma. Available as coarsely crushed seeds for bakery and tea blends, or as a fine powder for desserts and ready-mix products.',
    features: [
      'Produced from the same export-grade pods as our whole cardamom',
      'Available coarsely crushed or finely ground',
      'Packed quickly to retain essential oils and aroma',
      'Consistent colour, strength and particle size across batches',
    ],
    uses:            ['Chai blends', 'Desserts & sweets', 'Bakery mixes', 'Ready-mix masalas'],
    retail_packs:    ['50 g', '100 g', '200 g', '500 g'],
    bulk_packs:      ['1 kg', '5 kg'],
    window_image:    `${CDN}/product-cardamom-3.jpeg`,
    product_image:   `${CDN}/product-cardamom-4.jpeg`,
    coming_soon:     false,
    active:          true,
    retail_price:    25,
    wholesale_price: 20,
    currency:        'AED',
  },
  {
    slug:            'black-pepper',
    name:            'Malabar Black Pepper',
    arabic_name:     'فلفل أسود مالابار',
    tagline:         'The king of spices, bold and clean',
    category:        'Pepper',
    botanical:       'Piper nigrum',
    origin:          'Malabar / Tellicherry, Kerala',
    description:     'Classic Malabar and Tellicherry black pepper with bold aroma, clean heat and uniform grade.',
    story:           'Malabar pepper is the original — the spice that drew traders to Kerala\'s coast for two thousand years. We source whole peppercorns and ground pepper from the same hill estates that produce our cardamom, selecting grades with uniform size, strong aroma and clean pungency.',
    features: [
      'Selected grades with uniform berry size',
      'Strong, clean aroma and spicy heat',
      'Low moisture, free from extraneous matter',
      'Whole peppercorns or ground (coarse / fine) on request',
    ],
    uses:            ['Everyday cooking & seasoning', 'Ready meals', 'Meat processing', 'Spice blends'],
    retail_packs:    ['100 g', '200 g', '500 g'],
    bulk_packs:      ['1 kg', '5 kg', '10–25 kg cartons'],
    window_image:    `${CDN}/product-pepper-hero.jpeg`,
    product_image:   `${CDN}/product-pepper-dark.jpeg`,
    coming_soon:     false,
    active:          true,
    retail_price:    22,
    wholesale_price: 17,
    currency:        'AED',
  },
  {
    slug:            'cashew-nuts',
    name:            'Premium Cashew Nuts',
    arabic_name:     'كاجو فاخر',
    tagline:         'Creamy, crisp, uniformly graded',
    category:        'Nuts',
    origin:          'India / Vietnam (confirmed per lot)',
    description:     'Carefully chosen cashew kernels with a creamy flavour, crisp bite and uniform grade.',
    story:           'Cashews bring the same care to our nuts range that we bring to our spices. Grades W320 and W240 are available as standard. Kernels are selected for uniform colour, minimal breakage, proper roasting where applicable, and freedom from rancidity.',
    features: [
      'Grades W320, W240 and others on request',
      'Uniform colour, minimal broken pieces',
      'Low moisture, no rancidity or off-odours',
      'Plain, salted or roasted options on agreement',
    ],
    uses:            ['Snacking & gifting', 'Indian sweets & desserts', 'Foodservice', 'Private-label retail'],
    retail_packs:    ['100 g', '200 g', '500 g'],
    bulk_packs:      ['1 kg', '5 kg', '10 kg vacuum bags'],
    window_image:    `${CDN}/product-cashews-hero.jpeg`,
    product_image:   `${CDN}/product-cashews-4.jpeg`,
    coming_soon:     false,
    active:          true,
    retail_price:    45,
    wholesale_price: 38,
    currency:        'AED',
  },
  {
    slug:            'mixed-nuts',
    name:            'Mixed Nuts & Trail Mixes',
    arabic_name:     'مكسرات مشكلة',
    tagline:         'Custom blends for retail & private-label',
    category:        'Nuts',
    origin:          'Blended from multiple origins',
    description:     'Custom blends of cashews, almonds, pistachios, raisins and other ingredients to suit retail and private-label needs.',
    story:           'Composition and recipe are agreed with each buyer. Options include unsalted, lightly salted, flavoured or spiced — packed in retail pouches for supermarkets, convenience stores and gifting.',
    features: [
      'Recipe & composition to buyer specification',
      'Unsalted, lightly salted, flavoured or spiced',
      'Retail and bulk formats',
      'Private-label ready',
    ],
    uses:            ['Retail & gifting', 'Convenience stores', 'Export & wholesale', 'Ramadan & festival packs'],
    retail_packs:    ['100 g', '200 g', '500 g'],
    bulk_packs:      ['1 kg', '5 kg'],
    window_image:    `${CDN}/product-cashews-900g.jpeg`,
    product_image:   `${CDN}/product-mixed-nuts.jpeg`,
    coming_soon:     true,
    active:          true,
    retail_price:    55,
    wholesale_price: 45,
    currency:        'AED',
  },
  {
    slug:            'dates',
    name:            'Premium Dates',
    arabic_name:     'تمر فاخر',
    tagline:         'Soft, naturally sweet, Middle Eastern origin',
    category:        'Dates',
    origin:          'Saudi Arabia / UAE / Tunisia',
    description:     'Soft, naturally sweet dates sourced from selected Middle Eastern origins and packed under the Ila Gold Spices brand.',
    story:           'Sourced from trusted growers in Saudi Arabia, UAE and Tunisia, our date range includes Deglet Nour, Sukkary and other varieties subject to availability. Clean, soft, and graded for texture.',
    features: [
      'Varieties: Deglet Nour, Sukkary and others on availability',
      'Clean, soft and graded texture',
      'Free from infestation',
      'Retail pouches and bulk cartons',
    ],
    uses:            ['Snacking', 'Ramadan & festival packs', 'Bakery & confectionery', 'Foodservice'],
    retail_packs:    ['250 g', '500 g', '1 kg'],
    bulk_packs:      ['5 kg', '10 kg cartons'],
    window_image:    `${CDN}/product-dates.jpeg`,
    product_image:   `${CDN}/dates.jpeg`,
    coming_soon:     true,
    active:          true,
    retail_price:    40,
    wholesale_price: 32,
    currency:        'AED',
  },
];

// ── Site content (editable via admin panel) ────────────────────────────────
const SITE_CONTENT = [
  // Company
  { key: "company_name",               label: "Company Name",             value: "AAV Global Traders Ltd" },
  { key: "company_email",              label: "Email Address",            value: "aavglobaltraders@gmail.com" },
  { key: "company_phone_display",      label: "Phone (displayed)",        value: "+44 7733 058 067" },
  { key: "company_phone_raw",          label: "Phone for links (no +)",   value: "447733058067" },
  { key: "company_whatsapp",           label: "WhatsApp number (no +)",   value: "447733058067" },
  { key: "company_address_registered", label: "Registered Office",        value: "15 Park Street\nCoventry CV6 5AT\nUnited Kingdom" },
  { key: "company_address_trading",    label: "Trading Address",          value: "4 Maycroft Garden\nGrays RM17 6BH\nUnited Kingdom" },
  { key: "company_no",                 label: "Company Number",           value: "16881661" },
  { key: "company_eori",               label: "EORI Number",              value: "GB045558502000" },
  { key: "company_fssai",              label: "FSSAI Licence",            value: "11320011000104" },

  // Homepage
  { key: "home_hero_eyebrow",        label: "Hero Eyebrow",             value: "UK-based · Kerala-sourced" },
  { key: "home_hero_headline",       label: "Hero Headline",            value: "Kerala's\ngreen gold,\npacked for\nyour kitchen." },
  { key: "home_hero_description",    label: "Hero Description",         value: "Premium spices, nuts and dates — sourced from the misty hills of the Western Ghats and beyond, lab-tested for safety, and packed with care by a UK-registered company." },
  { key: "home_story_eyebrow",       label: "Story Eyebrow",           value: "A Kerala Story" },
  { key: "home_story_headline",      label: "Story Headline",          value: "From the mist of the\nWestern Ghats" },
  { key: "home_story_quote",         label: "Story Quote",             value: "\"Where cool mist and rich volcanic soil shape the flavour.\"" },
  { key: "home_about_eyebrow",       label: "About Eyebrow",           value: "Our story" },
  { key: "home_about_headline",      label: "About Headline",          value: "Grown up with the fragrance of freshly cracked cardamom." },
  { key: "home_about_para1",         label: "About Para 1",            value: "Ila Gold Spices is the flagship brand of AAV Global Traders Ltd, a UK-registered company based between Coventry and Grays. We started with a simple goal — to bring the true aroma of Kerala's spice gardens to kitchens and businesses across the UK and beyond." },
  { key: "home_about_para2",         label: "About Para 2",            value: "After moving to the UK we saw a gap for spices that combine authentic Kerala origin, proper food-safety testing, and modern packaging — all handled by a UK-based company that understands both worlds." },
  { key: "home_quality_eyebrow",     label: "Quality Eyebrow",         value: "Quality promise" },
  { key: "home_quality_headline",    label: "Quality Headline",        value: "Quality is not a slogan — it's a process." },
  { key: "home_quality_description", label: "Quality Description",     value: "From farm to finished pack, every lot is evaluated, tested and documented. We combine careful sourcing, third-party laboratory testing and strict packing controls in both India and the UK — so what you receive performs the same way in every batch." },
  { key: "home_quality_pillars",     label: "Quality Pillars JSON",    value: JSON.stringify([{title:"Direct sourcing",body:"Trusted processors and selected farmers in Kerala's Western Ghats for cardamom and pepper, established exporters for nuts and dates."},{title:"Laboratory testing",body:"Multi-residue pesticide analysis to EU/UK MRLs, aflatoxins, moisture and — where requested — microbiology and heavy metals."},{title:"Controlled packing",body:"FSSAI-licensed facilities in India or UK-controlled conditions, in food-grade high-barrier packaging to protect aroma."},{title:"Full traceability",body:"Every finished pack carries batch number, best-before date, country of origin and UK importer details — linked to supplier lots."}]) },
  { key: "home_who_eyebrow",         label: "Who We Supply Eyebrow",   value: "Who we supply" },
  { key: "home_who_headline",        label: "Who We Supply Headline",  value: "Wholesalers, retailers, kitchens and brand owners." },
  { key: "home_who_supply",          label: "Who We Supply JSON",      value: JSON.stringify(["Wholesalers & cash-and-carry","Independent & chain grocery","Restaurants, caterers & sweet shops","Online brands & private-label","Export buyers for UK-packed product"]) },
  { key: "home_cta_headline",        label: "CTA Headline",            value: "Ready to bring Kerala to your shelves?" },
  { key: "home_cta_description",     label: "CTA Description",         value: "Request our wholesale price list, specifications or samples. We typically reply within 1–2 working days." },

  // About
  { key: "about_hero_eyebrow",     label: "Hero Eyebrow",       value: "About · Ila Gold Spices" },
  { key: "about_hero_headline",    label: "Hero Headline",      value: "A Kerala story, built in the UK." },
  { key: "about_hero_description", label: "Hero Description",   value: "We started with a simple goal — to bring the true aroma of Kerala's spice gardens to kitchens and businesses across the UK and beyond." },
  { key: "about_founder_name",     label: "Founder First Name", value: "Muhammed Afeef" },
  { key: "about_founder_surname",  label: "Founder Surname",    value: "Vadakkeni" },
  { key: "about_founder_title",    label: "Founder Title",      value: "Founder, AAV Global Traders Ltd" },
  { key: "about_story_para1",      label: "Story Para 1",       value: "Growing up with the fragrance of freshly cracked cardamom pods and pepper roasted in homemade masalas, we know how much quality matters. After moving to the UK we saw a gap for spices that combine authentic Kerala origin, proper food-safety testing and modern packaging — all handled by a UK-based company that understands both worlds." },
  { key: "about_story_para2",      label: "Story Para 2",       value: "Today we work with a network of reliable processors and farmers in Kerala and selected origins, importing and packing whole green cardamom, black pepper, cashew nuts, mixed nuts and dates. Our aim is to offer products that are not only flavourful, but also safe, consistent and traceable." },
  { key: "about_values_headline",  label: "Values Headline",    value: "Our values." },
  { key: "about_values",           label: "Values JSON",        value: JSON.stringify([{title:"Honesty",body:"Clear specifications, transparent documentation and straightforward communication."},{title:"Quality",body:"Export-grade products with lab testing and controlled packing."},{title:"Long-term partnerships",body:"We aim to build stable relationships with suppliers and buyers."},{title:"Respect for origin",body:"Fair value for the farmers and processors who grow and handle our spices."}]) },
  { key: "about_cta_headline",     label: "CTA Headline",       value: "Let's talk about what you need." },

  // Quality
  { key: "quality_hero_eyebrow",     label: "Hero Eyebrow",          value: "Quality & food safety" },
  { key: "quality_hero_headline",    label: "Hero Headline",         value: "Quality from farm to finished pack." },
  { key: "quality_hero_description", label: "Hero Description",      value: "Quality is not a slogan — it is a process. We combine careful sourcing, laboratory testing and strict packing controls in both India and the UK." },
  { key: "quality_pillars",          label: "Pillars JSON",          value: JSON.stringify([{title:"Sourcing",image:"/images/product-cardamom-pods.jpeg",headline:"Direct relationships, selected grades.",body:["We work directly with processors and selected farmers in Kerala's Western Ghats for cardamom and pepper, and with established exporters for nuts and dates.","Long-term relationships mean we can request specific grades and sorting levels instead of accepting mixed or random quality."],details:["Hand-graded cardamom pods (7.5–8mm+)","Tellicherry / Malabar pepper grades","Approved cashew grades W320, W240","Appearance, aroma, defects and moisture evaluated per lot"]},{title:"Testing",image:"/images/product-pepper-hero.jpeg",headline:"Lab-tested, batch by batch.",body:["For cardamom and pepper we request Certificates of Analysis (CoA) from recognised laboratories, linked to each finished batch.","Additional tests can be arranged on request or according to buyer specification — microbiology, heavy metals, or sensory."],details:["Multi-residue pesticide analysis (EU/UK MRLs)","Aflatoxins B1 & Total; Ochratoxin A on request","Moisture content per lot","Documentation linked to batch codes"]},{title:"Packing & Traceability",image:"/images/product-cashews-hero.jpeg",headline:"Every pack carries its story.",body:["Export packs are filled in FSSAI-licensed facilities in India or under controlled conditions in the UK, depending on product and buyer's requirement.","We use food-grade high-barrier packaging to protect aroma and shelf life. Internally we record which supplier batch went into which finished batch, and which customers received which batches."],details:["Batch number on every pack","Best-before date & country of origin","Manufacturer / packer details","UK importer address (AAV Global Traders Ltd)"]}]) },
  { key: "quality_certs_eyebrow",    label: "Certs Eyebrow",         value: "Certifications" },
  { key: "quality_certs_headline",   label: "Certs Headline",        value: "Documented practice." },
  { key: "quality_certs",            label: "Certifications JSON",   value: JSON.stringify([{title:"FSSAI Licensed",body:"Licence 11320011000104 — our partner packing facility in India operates under Food Safety and Standards Authority of India authorisation."},{title:"UK Food Business",body:"AAV Global Traders Ltd is registered with local authority as a food business in the United Kingdom."},{title:"Full CoA Documentation",body:"Every export shipment is accompanied by Certificate of Analysis, packing list and — where required — phytosanitary certificate."}]) },
  { key: "quality_certs_note",       label: "Certs Disclaimer",      value: "As a growing company we are continuously improving our systems. Where formal certifications (ISO, HACCP) are not yet in place, we follow the same principles and keep full documentation of our procedures." },
  { key: "quality_cta_headline",     label: "CTA Headline",          value: "Questions about our process?" },
  { key: "quality_cta_description",  label: "CTA Description",       value: "We're happy to share CoAs, test reports and detailed specifications on request." },

  // Contact
  { key: "contact_hero_eyebrow",     label: "Hero Eyebrow",    value: "Let's talk" },
  { key: "contact_hero_headline",    label: "Hero Headline",   value: "Samples, prices, conversations." },
  { key: "contact_hero_description", label: "Hero Description",value: "We aim to reply to all messages within 1–2 working days. For urgent wholesale enquiries, please message us directly on WhatsApp." },

  // How to Order
  { key: "order_hero_eyebrow",         label: "Hero Eyebrow",             value: "How to order" },
  { key: "order_hero_headline",        label: "Hero Headline",            value: "Simple, from first email to delivery." },
  { key: "order_steps_eyebrow",        label: "Steps Eyebrow",            value: "UK trade buyers" },
  { key: "order_steps_headline",       label: "Steps Headline",           value: "Wholesalers, retailers, foodservice." },
  { key: "order_steps",                label: "Steps JSON",               value: JSON.stringify([{title:"Send an enquiry",body:"Introduce your business and what you're interested in — cardamom, pepper, nuts, dates; retail or bulk. Reach us via the contact page or WhatsApp."},{title:"Price list & samples",body:"We provide our latest wholesale price list and, where appropriate, send small samples for quality checking."},{title:"Confirm product, pack size & volume",body:"We agree on items, quantities, prices, payment terms and delivery schedule."},{title:"Order & invoice",body:"For first orders we typically ask for payment before dispatch. For regular customers, other terms can be discussed."},{title:"Delivery or collection",body:"For UK buyers we can deliver by courier or pallet network, or arrange collection from our agreed warehouse."}]) },
  { key: "order_export_eyebrow",       label: "Export Eyebrow",           value: "Export & bulk" },
  { key: "order_export_headline",      label: "Export Headline",          value: "For larger international orders." },
  { key: "order_export_description",   label: "Export Description",       value: "Typically 500 kg to multiple tonnes — shipped directly from India or from the UK, with full documentation." },
  { key: "order_export_features",      label: "Export Features JSON",     value: JSON.stringify([{title:"Ex-India shipments",body:"FOB / CIF direct from Indian partner facilities, depending on product and buyer's preference."},{title:"Ex-UK shipments",body:"EXW / FCA from our UK warehouse for UK-packed product destined for export markets."},{title:"Full documentation",body:"Invoice, packing list, CoA, phytosanitary certificate, certificate of origin, B/L or AWB as applicable."},{title:"Forwarder flexibility",body:"Work with your nominated freight forwarder, or we can introduce our own trusted partners."}]) },
  { key: "order_export_note",          label: "Quotation Note",           value: "Please share your destination, required Incoterm (FOB / CIF / EXW / FCA), volumes and any special quality or packing requirements." },
  { key: "order_cta_headline",         label: "CTA Headline",             value: "Ready to send your first enquiry?" },

  // Wholesale
  { key: "wholesale_hero_eyebrow",     label: "Hero Eyebrow",             value: "Wholesale & private label" },
  { key: "wholesale_hero_headline",    label: "Hero Headline",            value: "Our brand or yours." },
  { key: "wholesale_hero_description", label: "Hero Description",         value: "Whether you are a wholesaler, a retailer, a restaurant group or a brand owner, we can tailor packs and specifications to your needs." },
  { key: "wholesale_offerings",        label: "Offerings JSON",           value: JSON.stringify([{eyebrow:"Ila Gold Spices branded",title:"Ready-to-shelf retail packs.",body:"Own-brand retail pouches for independent and chain stores, with shelf-ready cartons and barcoded packs for easy handling.",points:["50 g – 500 g retail pouches","Mixed cases & combined deliveries","High-barrier zipper pouches","Barcoded · shelf-ready"],featured:false},{eyebrow:"Bulk ingredients",title:"Consistent specs for kitchens & manufacturers.",body:"1 kg to 25 kg formats for restaurants, caterers, ready-meal producers, spice blenders and tea companies.",points:["1 kg, 5 kg, 10–25 kg bags & cartons","CoA and batch traceability","Consistent grade across deliveries","Scheduled regular supply"],featured:true},{eyebrow:"Private label",title:"Your brand, our supply chain.",body:"For larger volumes we can pack cardamom, pepper, nuts or dates under your own brand — with full sourcing and QC.",points:["Sourcing & quality control","Packing in agreed material & sizes","Label content for UK compliance","MOQ & dev fees apply"],featured:false}]) },
  { key: "wholesale_process_eyebrow",  label: "Process Eyebrow",          value: "Private label process" },
  { key: "wholesale_process_headline", label: "Process Headline",         value: "From concept to first delivery." },
  { key: "wholesale_process_steps",    label: "Process Steps JSON",       value: JSON.stringify([{step:"01",title:"Brief",body:"Share product, pack size, approximate volumes and target market."},{step:"02",title:"Sample & spec",body:"We send samples, CoAs, and draft specifications for approval."},{step:"03",title:"Artwork & packing",body:"We assist with label content for UK compliance and pack your brand."},{step:"04",title:"Deliver",body:"Retail-ready cartons delivered to your warehouse — UK or export."}]) },
  { key: "wholesale_process_note",     label: "Process Disclaimer",       value: "Minimum order quantities and development fees apply for private-label projects. Please share your approximate volumes and target market with your enquiry." },
  { key: "wholesale_form_headline",    label: "Form Headline",            value: "Share your brief." },
  { key: "wholesale_form_description", label: "Form Description",         value: "We'll reply with a proposal within 1–2 working days." },

  // Footer
  { key: "footer_tagline",     label: "Footer Tagline",   value: "From the mist of Kerala's Western Ghats to kitchens across the United Kingdom — premium spices, nuts and dates, packed with care." },
  { key: "footer_brand_label", label: "Brand Label",      value: "A brand of AAV Global Traders Ltd" },
];

// ── Run ────────────────────────────────────────────────────────────────────
async function seed() {
  console.log('\n🌿 Seeding Ila Gold Spices Firestore…\n');

  console.log('Products:');
  for (const product of PRODUCTS) {
    await db.collection('products').doc(product.slug).set({
      ...product,
      created_at: new Date(),
    });
    console.log(`  ✓ ${product.name}`);
  }

  console.log('\nSite content:');
  for (const item of SITE_CONTENT) {
    await db.collection('site_content').doc(item.key).set(item);
    console.log(`  ✓ ${item.key}`);
  }

  console.log('\n✅ Seed complete!\n');
  process.exit(0);
}

seed().catch((err) => { console.error(err); process.exit(1); });
