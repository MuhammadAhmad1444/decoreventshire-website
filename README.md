# Decor Event Shire — Website

Coming-soon page for **[decoreventshire.com.au](https://decoreventshire.com.au)** until the full site launches on **1 November 2026 (12:00 am AEDT)**.

## Stack
Plain HTML / CSS / JS + one small PHP endpoint. No build step — runs on Hostinger shared hosting.

```
index.html          page markup (video hero, flip-clock countdown, about, services, gallery, guest list)
assets/style.css    styles (responsive)
assets/main.js      countdown, videos, gallery lightbox, sign-up form
assets/favicon.svg  browser-tab icon
notify.php          "Notify me" sign-ups → private/subscribers.csv (+ email to owner)
.htaccess           HTTPS redirect, security headers, caching, blocks /private
```

## Edit
- **Launch date:** `LAUNCH` in `assets/main.js`
- **Contact email:** `index.html` (join + footer) and `NOTIFY_TO` in `notify.php`
- **Social links:** `.socials` in `index.html`
- **Photos / videos:** Pexels (free licence) URLs in `index.html`

## Deploy (Hostinger)
hPanel → Websites → decoreventshire.com.au → **GIT** → repository
`https://github.com/MuhammadAhmad1444/decoreventshire-website.git`, branch `main`, directory empty (`public_html`).
Press **Deploy** after each push (or enable the auto-deployment webhook).

Sign-ups are saved to `public_html/private/subscribers.csv` (download via File Manager).
