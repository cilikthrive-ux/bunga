# Précious Nuha Bloom: project notes

Read this first in a new session. Keep replies to the user brief, in casual Malay, and update
the "Pick up here" section after each finished task.

## What this repo is
- **preciousnuha.com**: shop site for Nadia's handmade fuzzy-wire flower lamps (Klang). Static
  HTML on **GitHub Pages** (`CNAME`), domain at Spaceship. Owner of the GitHub account
  (cilikthrive-ux) maintains it; Nadia owns the shop.
- **template/**: reusable shop template the user sells to other businesses (Basic RM149 / Pro RM299).
  `demo/overrides.js` + `netlify.toml` build a sales demo for Netlify (not connected yet).
- **marketing/**: price-list poster (`harga-website.html` → PNG via Playwright), music preview.

## Pages (all share `assets/site.css`, top nav, footer socials + Terms link)
| Page | Notes |
|---|---|
| `index.html` | Editorial home: hero video with colour swatches, wine "This season's blooms", how it works, photo band |
| `catalogue.html` | Shop: Sheet-driven products, pre-order, postage/pickup, add-ons, wish card, order form, DuitNow QR, T&C checkbox, WhatsApp order, order copy to Orders Sheet |
| `faq.html` | Default FAQ (uses settings tab prices/date) or Sheet `faq` tab |
| `terms.html` | Before you buy / Terms & Care (decorative mood lamp disclaimer) |
| `testimoni/` | Reviews: 4 built-in WhatsApp testimonials or Sheet `testimoni` tab |
| `orders/` | Nadia's order app (Home Screen) |
| `orders-sheet/` | Apps Script that saves each website order to the "Precious Nuha Orders" Sheet |

## Data (Google Sheet `1-wnqefDebKtjV0jvCL7RW9KRSHVJ_56WMuBDDaMshDk`, shared view-only)
- Tab 1 products: `id,name,category,price,ready_in,stock,show,badge,description,image,video`.
  Grouped by `category`, sorted by price inside a group. `products.csv` is the fallback copy.
- `settings` tab (read via gviz JSON, value is the cell below its name): `preorder_until`,
  `postage_semenanjung` (10), `postage_sabah_sarawak` (45), `box_pickup` (12),
  `addon_paper_bag` (3), `addon_wish_card` (2), `payment_qr`, `payment_name`.
- Optional tabs: `faq` (question/answer), `testimoni` (name/review/photo/product/stars).

## Shop rules (agreed with the user)
- Postage is per lamp. Self pickup at Taman Sentosa, Klang is free; each pickup lamp gets a
  window paper bag (RM3) by default, box is an optional swap (RM12).
- Wish card RM2; its message box appears only when a card is added.
- Full payment required for every order, incl. pickup. DuitNow QR (Nadia Atirah binti Isa).
- WhatsApp: shop 013-447 8918 (60134478918); the user's website business 013-466 8038.
- No emoji in prefilled WhatsApp text (wa.me redirect garbles them).
- Videos: 540px H.264 MP4 in `videos/<id>.mp4` (listed in `VIDEOS` in catalogue.html).

## Workflow
- Work on branch `claude/zealous-cerf-wscpgw`, open a PR to `main`; the user merges on phone.
- Test with a local `python3 -m http.server` + Playwright (390px mobile) before committing.
- When `assets/site.css`, `music.js` or `whatsapp.js` change, bump the `?v=` number on their links in
  every page, or phones keep the old cached file with the new HTML and the layout breaks.

## Pick up here
- Done: editorial home redesign, Terms & Care page + order-form agreement (PR #27), cache-busting ?v= on assets.
- Waiting on the user: Netlify signup + new private repo `kedai-websites` for client sites;
  @chanttekmanis (beaded hand bouquets) answers: ready-stock prices, custom pricing A/B,
  deposit rule, colours/ribbons, photos.
- Ideas not built: custom bouquet builder, ribbon options, promo prices, availability calendar,
  international orders, daily Sheet → products.csv backup.
