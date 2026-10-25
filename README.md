# Decor Events Hire — Website

Full website for **decoreventshire.com.au**: hire catalogue, packages, event pages, offers, gallery and a quote-request cart.

**Stack:** Next.js 15 (App Router) + TypeScript + Tailwind CSS 4, exported as a static site, plus one PHP endpoint for forms. It runs on Hostinger shared hosting with no Node server.

## Project structure

```
decoreventshire-website/
├── src/
│   ├── app/            pages (one folder per route) + layout, sitemap, robots
│   ├── components/     header, footer, cards, cart, animations, forms
│   ├── data/site.ts    all content: prices, products, packages, offers, FAQs
│   └── lib/            form submission helper
├── public/
│   ├── images/         brand/ logos · work/ your photos · stock/ + hero/ Pexels
│   ├── api/enquiry.php form handler (quotes, contact, sign-ups)
│   └── .htaccess       HTTPS, security headers, caching, 404 page
├── raw-media/          original WhatsApp photos & videos (local only, not in git)
└── out/                built site after `npm run build` (not in git)
```

## Branches

- `main` serves the **coming-soon page** that is live now (Hostinger deploys this branch).
- `staging` holds this full website. Other developers review changes here first, then merge into `main` when it's ready to launch.

Hostinger serves plain files, so after merging, deploy the **built** `out/` folder rather than the source (see *Deploy to Hostinger*).

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # writes the static site to /out
```

Forms post to `/api/enquiry.php`, which only works on a PHP host. Locally they show the "send by email instead" fallback.

## Where to edit content

Everything lives in **`src/data/site.ts`**:

| What | Where |
|---|---|
| Phone, email, hours, ABN, social links, suburbs | `business` |
| Hire items, prices, photos, descriptions | `products` |
| Categories | `categories` |
| Packages and inclusions | `packages` |
| Event pages (weddings, birthdays…) | `events` |
| Offers, promo banner, welcome code | `offers`, `promo`, `welcomeCode` |
| FAQs, gallery photos | `faqs`, `gallery` |

`price: null` shows "On quote". Photos are in `public/images/` (`work/` = your own photos, `stock/` = Pexels, `brand/` = logos).

> Prices, packages (apart from the Backyard Birthday Package), offers and policy text are **sample content**. Check them before launch.

## Pages

`/` · `/hire/` · `/hire/[category]/` · `/product/[slug]/` · `/packages/` · `/packages/[slug]/` · `/events/` · `/events/[slug]/` · `/offers/` · `/gallery/` · `/about/` · `/delivery/` · `/faq/` · `/contact/` · `/quote/` · `/terms/` · `/privacy/` · 404, plus `sitemap.xml` and `robots.txt`.

## Forms & enquiries

`public/api/enquiry.php` handles quote requests, contact messages and welcome-offer sign-ups:

- emails each one to `NOTIFY_TO` (Decoreventshire@gmail.com)
- saves a copy to `private/quotes.csv`, `messages.csv` and `subscribers.csv` (blocked from the web by `.htaccess`)
- includes a honeypot and a per-IP rate limit

For reliable delivery, create a `no-reply@decoreventshire.com.au` mailbox in Hostinger (or change `MAIL_FROM`).

## Deploy to Hostinger

Hostinger serves plain files, so it needs the **built** site, not this source code.

1. `npm run build`
2. Upload the **contents** of `/out` (including the hidden `.htaccess`) to `public_html/`, replacing the coming-soon page.
3. Submit a test quote and check the email arrives.

> Don't point Hostinger's Git deploy at this source code (`staging`, or `main` after merging): it would copy the source, not a working site.

## Photo credits

Stock photography from [Pexels](https://www.pexels.com) (free licence). Event photos © Decor Events Hire.
