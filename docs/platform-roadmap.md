# Full-platform preparation

The current website contains `/` and `/pre-order`. Other routes are deliberately absent rather than linked to empty or misleading screens. Category and product components work independently of the homepage. Mock submission adapters are separated from presentation and can be replaced without reworking either form.

## Routes

| Route | Planned responsibility |
| --- | --- |
| `/products` | Confirmed catalogue using ProductCard and typed category data |
| `/products/[slug]` | Confirmed specifications, price/timeline and product-specific request |
| `/pre-order` | Existing request page; replace mock submission with durable lead creation |
| `/track-order` | Verified order lookup; never reveal data using an easily guessed number alone |
| `/order/[orderNumber]` | Customer-authorized progress, status history and delivery details |
| `/account` | Customer access, profile, requests, receipts and orders |
| `/admin` | Authenticated, role-protected administration shell |
| `/admin/products` | Categories, approved media, specifications and availability |
| `/admin/orders` | Quotes, payments, sourcing, delivery and authorized status transitions |
| `/admin/leads` | Detailed requests and waiting-list interests with follow-up records |

## Recommended entities and relationships

| Entity | Essential future fields and relationships |
| --- | --- |
| Customers | ID, name, phone, optional email, contact preferences; linked to leads and orders |
| Leads | Customer ID or initial contact fields, kind (`request`/`waiting-list`), category, product description, model, budget, destination, URL, notes, contact consent, consent version/time, follow-up stage |
| Product categories | ID, stable slug, name, display order and description |
| Products | Category ID, slug, brand/model, confirmed specifications, approved images, publication state and quote-based availability |
| Pre-orders | Customer/lead ID, unique order number, accepted quote, product snapshot, currency, total, deposit due, delivery estimate and agreed terms version |
| Payments | Pre-order ID, unique provider reference, deposit/full-payment purpose, expected and verified amount/currency, verification state, provider transaction ID and receipt reference |
| Order status history | Pre-order ID, stable status ID, timestamp, actor, customer-facing note and optional supporting evidence; append-only |
| Deliveries | Pre-order ID, destination, delivery contact, carrier/reference when known, estimated/actual milestones and proof of delivery where appropriate |
| Admin users | Auth identity, role and authorization scope; actions recorded for audit |
| Customer notifications | Customer/order ID, triggering history-event ID, channel, delivery status, attempts and sent timestamp |

A pre-order has many payment records, status-history entries and notifications. A current status may be cached for display but must not replace history. Store the accepted product/quote snapshot so later catalogue changes cannot silently change a customer’s order.

The planned customer-facing statuses are defined in `src/data/order-statuses.ts`: request received, quotation sent, payment confirmed, product being sourced, product purchased, in transit, arrived in Ghana, out for delivery and delivered. Define allowed transitions and who can make each transition. Status corrections should add an auditable event rather than erase earlier history. Cancellation, failed sourcing and refunds need explicit business-approved exception states before going live.

## Lead, storage and notification integration

1. Confirm operational contact details, privacy wording, cancellation/refund terms and retention rules with NOBACHAP.
2. Add server endpoints behind `submitEnquiry` and `submitWaitingList`; validate the complete payload server-side, enforce input size limits, rate-limit and use idempotency keys.
3. Persist leads and contact preferences in Supabase or an equivalent database before returning a received state. Apply row-level access policies and keep service credentials on the server.
4. Queue email/CRM/webhook notifications after persistence, with retry and duplicate protection. A notification failure must not duplicate a stored lead.
5. Introduce image uploads only with storage, file-type/size validation and access controls. The current disabled file input must stay disabled until this flow works. Store attachment IDs on leads, not unvalidated arbitrary storage URLs. Product reference URLs should not be fetched by a server without SSRF protections.

## Paystack readiness

No payment UI or success simulation exists in this MVP. Once real payment work is authorized:

- Create payment references on the server from the accepted quote. Support a deposit or full balance as separate payment intents.
- Keep amounts in currency minor units; never trust totals, payment status or remaining balance supplied by the browser.
- Initialize the provider transaction using server credentials. Verify callbacks and signed webhooks, then verify the transaction server-side against the expected reference, amount, currency and order.
- Handle repeated callbacks idempotently. Record failed, pending and successful payments separately; reconcile refunds and reversals.
- Calculate the remaining balance from verified payments and agreed adjustments. Generate a receipt only from verified records.
- Add the appropriate payment-confirmed status event and queue the customer notification after verification, not after a browser redirect.

Customer accounts and admin authorization should be implemented before exposing stored orders. Real tracking should read the authorized status history and show actual timestamps, not reuse the sample preview’s current state.
