# Farmcart — Website Build Spec

**Business:** Wholesale vegetables for Bangalore's restaurants, hotels & cloud kitchens
**Model:** Farm-fresh sourcing, 200kg total / 10kg per product minimum, order by 10PM for next-morning delivery, flat delivery fee
**Stack:** WordPress + WooCommerce + Elementor (same proven stack as the category leader — fast to build, easy to maintain, handles cart/checkout/inventory out of the box)

---

## 1. Sitemap

| Page | URL | Purpose |
|---|---|---|
| Home | `/` | Pitch, USPs, top products, FAQ, location |
| Store | `/store/` | Full product catalog (WooCommerce shop page) |
| Place Order | `/place-order/` | Quantity-based order builder with live minimum-order validation (prototype: `order.html`) |
| Payment | `/payment/` | Payment method selection — UPI, card, net banking, COD (prototype: `payment.html`) |
| About | `/about/` | Founder story, sourcing story, warehouse |
| Blog | `/blog/` | SEO content — seasonal price trends, storage tips, recipes for bulk buyers |
| Contact Us | `/contact-us/` | Form + WhatsApp + phone + map |
| My Account | `/my-account/` | WooCommerce default — login, order history |
| Privacy Policy | `/privacy-policy/` | WooCommerce default template, customize |
| Refund & Returns Policy | `/refund-returns-policy/` | Your inspection-window policy (below) |
| Terms & Conditions | `/terms-conditions/` | Standard B2B terms |

---

## 2. Homepage copy

### Hero
**Headline:** Fresh off Kalasipalyam, on your dock by sunrise.
**Subhead:** Wholesale vegetables for Bangalore's restaurants, hotels and cloud kitchens — APMC-sourced, ordered by night, delivered before service starts.
**CTA buttons:** `See Today's Prices` (→ /store/) · `How It Works` (→ /about/)
**Badge:** 🟢 Prices updated daily from the yard

### The model, in one line
Minimum order: **200 KG total** · **10 KG minimum per product** · Order by **10 PM** for delivery before you open.

### Why Farmcart (5 tiles)
1. **APMC Licensed, Zero Middlemen** — Every crate is sourced and billed direct from Kalasipalyam APMC. No resellers marking up your margin.
2. **Order by Night, Cook by Morning** — Place your order before 10 PM and it's on your dock before your kitchen opens. No mandi runs, no 5 AM alarms.
3. **One Flat Delivery Fee** — A single flat charge within 20 km of the yard, whatever the order size.
4. **Built for Bulk** — 200 kg minimum order, 10 kg minimum per line item — sized for kitchens, not households.
5. **Sorted & Weighed Before It Leaves** — Every order is hand-checked at the yard before dispatch, so what you ordered is what lands.

### Warehouse / sourcing block
Short paragraph + embedded map — pulls from About page.

### FAQ (rewritten, same real answers as your model)
- **How do I order wholesale vegetables from Farmcart?** Browse today's prices on the Store page, or message us on WhatsApp. Minimum order is 200 kg total. Order by 10 PM for delivery before your kitchen opens the next day.
- **What's the minimum order?** 200 kg total per order, 10 kg minimum per individual product.
- **What are the delivery charges?** One flat fee within 20 km of the yard, regardless of order size.
- **How do I pay?** UPI, credit/debit card, or cash on delivery. COD is available without prepayment once you've completed one verified order.
- **What if I'm not happy with the quality?** For prepaid orders, you get a 2-hour inspection window after delivery to flag any issue for return/replacement. For COD orders, inspect before you pay. Return shipping is on the customer; refunds are based on the actual weight returned.
- **What time do I need to order by?** 10 PM for next-morning delivery. Anything after that ships in the next cycle.
- **What vegetables do you carry?** 20+ staples — tomato, onion, potato, garlic, ginger, cabbage, and more — updated daily with the day's yard price. Need something not listed? WhatsApp us.

*(Fill in your real WhatsApp number and yard address before publishing — see Section 5.)*

---

## 3. About page copy (draft — personalize with your actual story)

Farmcart supplies restaurants, cloud kitchens, caterers and hotels across Bangalore directly from our farm network — no resellers, no markup layers, no guesswork on quality. [Add your own founding story / why you started this / your background here.] Every order is picked, weighed and quality-checked before it leaves, and delivered before your kitchen opens.

---

## 4. Product catalog (starter list — replace prices daily)

| Product | Suggested min. line qty | Notes |
|---|---|---|
| Tomato | 10 kg | |
| Onion | 10 kg | |
| Potato | 10 kg | |
| Garlic (peeled) | 10 kg | High-margin add-on |
| Ginger | 10 kg | |
| Cabbage | 10 kg | |
| Green Capsicum | 10 kg | |
| Green Chilli | 10 kg | |
| French Beans | 10 kg | |
| Drumstick | 10 kg | |
| Bitter Gourd | 10 kg | |
| Green Peas | 10 kg | |

*(Expand to your full 20+ SKU list once sourcing is confirmed — same category set as any APMC-sourced operation, prices reset daily.)*

---

## 5. Payment gateway — what's needed to go live

`payment.html` is a front-end template only (method selection UI, order summary, "Pay Now" button that simulates success). To actually process payments you'll need:

1. **A payment gateway merchant account** — common choices for Indian B2B: Razorpay, PayU, Instamojo, or Cashfree. All support UPI, cards, and net banking; Razorpay has a solid WooCommerce plugin.
2. **KYC/business documents** for the gateway signup — GSTIN, PAN, bank account.
3. **WooCommerce payment gateway plugin** configured with your merchant API keys — this replaces the mock `fakePay()` JS function with a real transaction call.
4. **COD logic** — WooCommerce supports this natively; you'll set the same "no prepayment after first verified order" rule as a manual customer-group setting or plugin.

## 6. Details you need to fill in before launch

- Business legal name & GSTIN
- Yard/warehouse address (for the embedded map + footer)
- Support phone number + WhatsApp number
- Support email
- Business hours
- Bank/payment gateway account for UPI & card processing
- Logo (recommend a mark that reads at favicon size — see design notes below)

---

## 7. Design tokens (for whoever builds the Elementor theme)

- **Palette:** Ink `#20241C` (near-black green-black for text/dark sections), Parchment `#F7F1E1` (warm paper background), Turmeric `#E2A63B` (primary accent — spice-market yellow, not the generic terracotta), Crate Brown `#8A5A34` (secondary/wood accent), Leaf `#3C5B3E` (tertiary, sparingly)
- **Type:** Display — a slab serif with some character (e.g. Fraunces or Roboto Slab at heavy weight) for headlines, evoking hand-painted market signage. Body — a clean grotesk (e.g. Inter or Work Sans). Data/price tags — a monospace (e.g. IBM Plex Mono) for the "chalkboard price tag" treatment on product cards.
- **Signature element:** A day/night order-clock graphic — visualizes the 10 PM cutoff → dawn delivery promise. This is your one core differentiator; make it the thing people remember.
- **Product cards:** styled like wooden crate tags — brown border, monospace price, not generic white e-commerce cards.
