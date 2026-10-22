# Decor Event Shire — Website

Coming-soon page for **[decoreventshire.com.au](https://decoreventshire.com.au)**, live until the full site launches on **1 November 2026 (12:00 am AEDT)**.

## Stack
Plain HTML / CSS / JS + one small PHP endpoint. No build step — runs on Hostinger shared hosting (Premium plan).

```
index.html          page markup
assets/style.css    styles (responsive, dark-gold theme)
assets/main.js      countdown, progress bar, form, gold-dust animation
assets/*.svg        favicon + social share image
notify.php          "Notify me" sign-ups → private/subscribers.csv (+ email to owner)
.htaccess           HTTPS redirect, security headers, caching, blocks /private
```

## Edit
- **Launch date:** `LAUNCH` in `assets/main.js`
- **Contact email:** footer in `index.html` and `NOTIFY_TO` in `notify.php`
- **Social links:** `.socials` in `index.html`

## Deploy (Hostinger)
hPanel → Websites → decoreventshire.com.au → Advanced → **GIT** → repository
`https://github.com/MuhammadAhmad1444/decoreventshire-website.git`, branch `main`, install path empty (`public_html`). Press **Deploy** after each push (or enable auto-deployment webhook).

Sign-ups are saved to `public_html/private/subscribers.csv` (download via File Manager).
