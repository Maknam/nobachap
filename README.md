# NOBACHAP

A responsive business and pre-order website for NOBACHAP, a Ghanaian home-appliance and accessories sourcing business. Customers request an appliance, review a quote and timeline, confirm payment, and receive updates through sourcing and nationwide delivery. This is a request-based business, not a ready-stock marketplace.

The redesign builds on the existing Next.js migration. It preserves the original logo, appliance hero artwork, DM Sans/Manrope typography, copper/chocolate/cream palette and the supplied Instagram, Facebook and TikTok links. The original static files and obsolete `dist` hosting configuration were retired during the earlier migration; they remain in Git history.

## Stack and structure

Next.js App Router, React, TypeScript, Tailwind CSS v4, Next Image and `next/font`. Lucide React provides interface icons; `react-icons/si` supplies the real social logos. Native React state and shared validators handle forms without another form dependency. Playwright is a development-only test dependency.

- `src/app/page.tsx`: complete homepage.
- `src/app/pre-order/page.tsx`: dedicated request page with validated category/product query prefills.
- `src/components`: AnnouncementBar, Header, MobileNavigation, HeroSection, TrustStrip, AboutSection, CategoryCard, ProductCategories, ProductCard, FeaturedProducts, HowItWorks, PreOrderSection, PreOrderForm, WaitingListForm/Section, WhatsAppButton, TrackingPreview, WhyChooseUs, Testimonials, FAQSection, FinalCTA, SocialLinks and Footer.
- `src/components/forms`: shared labelled controls and submission-state hook.
- `src/data`: typed categories, demo products, FAQs, status definitions and empty testimonial data.
- `src/lib`: validators, isolated submission adapters, WhatsApp URLs, request formatting, Ghana-cedi formatting and optional site-origin metadata.
- `public/images`: unchanged original logo/hero; `products/` contains three original SVG appliance illustrations. These are illustrative, not manufacturer product photographs.
- `docs/platform-roadmap.md`: future routes, data relationships, payment verification and status-history plan.

## Local setup

Use Node.js 20.9+ (tested with Node.js 24).

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. In PowerShell use `Copy-Item .env.example .env.local`; use `npm.cmd` if script execution policy blocks `npm`.

| Environment variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_NOBACHAP_WHATSAPP_NUMBER` | Public business WhatsApp number, international digits only, no `+`, spaces or national leading zero. Blank by default. |
| `NEXT_PUBLIC_SITE_URL` | Optional confirmed public origin for canonical metadata. Blank until a domain is confirmed. Invalid URLs are ignored. |

Public values are included at build time: rebuild after changing them. Never place private tokens in `NEXT_PUBLIC_*` variables. An absent/invalid WhatsApp number shows a non-clickable availability notice. No private number, invented email address or deployment domain is included. The supplied Facebook link points to the Facebook homepage until a business profile URL is provided.

## Commands

```sh
npm run dev
npm run lint
npm run typecheck
npm run build
npm start
npm run test:e2e
```

Browser tests use installed Google Chrome. Build first and leave port 3100 free; Playwright starts and stops its own production server, separate from development on port 3000. Tests check layout at 320–1440px, assets, console errors, valid navigation, keyboard menu/FAQ behavior, product prefills, both form flows, validation, honest completion, tracking labels and WhatsApp encoding. Screenshots go to the ignored `test-results/` directory. Synthetic test data is not sent to a real contact.

## Current customer experience

- Compact announcement, responsive navigation and a hero with pre-order/WhatsApp actions.
- Seven category cards, three clearly labelled demo product cards and a five-stage sourcing process. Product/category actions carry selections into `/pre-order`.
- Detailed appliance request with category, contact details, brand/model, budget, delivery destination, optional product URL, notes and contact consent.
- Separate short waiting-list interest form with preferred contact method.
- Required indicators, inline errors, keyboard focus on invalid fields, loading states and repeated-submit protection. Optional email can be omitted. Product links must use HTTP(S).
- Product-aware WhatsApp messages; full request or waiting-list interest can be explicitly handed off after validation.
- Disabled reference-photo control prepared for future storage; customers can currently use a product URL or share a photo in WhatsApp.
- Nine-stage order preview, disabled lookup, sample destination and placeholder update timestamp.
- Defensible benefits, practical FAQs, final CTA, real social logos and clearly labelled future policy placeholders. Testimonials render only verified entries with publication consent; no reviews have been invented.

## Keeping private files out of Git

`.gitignore` excludes local environment files, Cloudflare secret bindings, private keys, credential files, deployment state, browser authentication sessions, logs, reports and local database backups. Application source, dependency lockfiles and public brand assets remain versioned. Only a sanitized `.env.example` is allowed as an environment template; never put real credentials in it.

Ignoring a file does not remove an already tracked file or erase Git history. If a real credential is ever committed, revoke/rotate it and address the repository history separately. Files in `public/` are served to visitors, and `NEXT_PUBLIC_*` values are included in browser code: neither location may contain private credentials, even if a file is ignored by Git. Add production secrets through the deployment provider's secret storage.

## Current limitations

**Neither form sends or saves data.** Completion means the request is prepared in browser memory, not that NOBACHAP received it or registered a waiting-list entry. Inputs are retained after preparation and disappear on page reload. The form disclosures and completion messages state this clearly. `submitEnquiry` and `submitWaitingList` are independent mock adapters with integration comments and failure handling.

Products are sample request ideas, not inventory. Brands, specifications, availability, price, deposit and delivery must be confirmed by NOBACHAP. Cards support an estimated price/delivery/deposit when confirmed data becomes available; currently they say “Request price” and “Confirm delivery timeline”. No filter is needed for only three examples.

Tracking is non-operational and its sample order is fictional. There is no database, image storage, payment collection, account system, admin dashboard, real notification system or implemented privacy/terms policy. No payment success is simulated. Policy approval and a real lead endpoint are prerequisites for collecting customer data in the full platform.

## Deployment

For a Next.js-compatible Node host: install with `npm ci`, set public environment variables, run `npm run build`, then `npm start`. Builds download the original Google fonts for self-hosting. No deployment was performed and no account-specific hosting configuration is committed.

The code uses standard Next.js APIs and no filesystem persistence or forced Edge runtime. For Cloudflare/OpenNext, follow the [OpenNext existing-app setup](https://opennext.js.org/cloudflare/get-started) and [Cloudflare OpenNext guide](https://developers.cloudflare.com/workers/framework-guides/opennext/). Add the adapter, Wrangler configuration, compatibility flags and image/cache bindings in a deployment-specific change. Run the adapter build and preview under the Workers runtime before deploying; a passing `next build` alone does not verify Cloudflare deployment. OpenNext dependencies have not been added merely for a potential deployment target.

## Next phase

Connect real lead storage and business notifications first, with server validation, consent records and clear receipt/error semantics. Then introduce confirmed products and quotes, server-verified Paystack deposits/full payments, customer access, protected administration and payment-to-delivery tracking based on append-only status history. See the [platform roadmap](docs/platform-roadmap.md) for the proposed entities, route boundaries and integration sequence.
