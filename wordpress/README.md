# Little Muslim Books — Production Bookstore Architecture

## Scope

This WordPress package is the production commercial bookstore. It intentionally does **not** implement the future Academy/family-learning application.

It provides:

- custom lightweight PHP theme (`illuminated-path`)
- WooCommerce as the only commerce/order source of truth
- companion publishing plugin (`illuminated-path-core`)
- English / French / Arabic-ready UI with RTL support
- compatibility adapters for WPML or Polylang language switching
- book metadata and taxonomies
- advanced catalog filters and product search
- product sliders/grids for editable campaign pages
- WordPress block patterns for landing pages
- WooCommerce sale/coupon compatibility
- configurable public promotion bar
- native WordPress blog/resources
- order-focused WooCommerce My Account experience
- provider-aware physical-book fulfilment, including a KDP author-copy queue
- legacy React/Firebase product JSON importer
- public Woo Store API book metadata for future clients

## Install

1. Install a normal WordPress site on PlanetHoster, GoDaddy, or another PHP/MySQL host.
2. Install and activate WooCommerce.
3. Copy/upload:
   - `wordpress/wp-content/themes/illuminated-path`
   - `wordpress/wp-content/plugins/illuminated-path-core`
4. Activate **Illuminated Path Core**.
5. Activate the **Illuminated Path** theme.
6. Run WooCommerce onboarding: store address, currency, shipping, tax and transactional email configuration.
7. Install a supported WooCommerce payment gateway.
8. Install **one** multilingual stack (WPML + WooCommerce Multilingual or Polylang/Polylang for WooCommerce).
9. Install an SEO plugin such as Rank Math or Yoast. The theme does not duplicate canonical/hreflang/sitemap management.
10. Install MailPoet (or another marketing plugin) and place its form in **Appearance → Widgets → Newsletter / Marketing**.

## Catalog model

WooCommerce owns price, sale price, stock, variations, coupons, checkout, orders, refunds, shipping and taxes.

The companion plugin adds public book taxonomies:

- Authors
- Series
- Book languages
- Age ranges
- Book formats
- Book themes

It also adds publishing fields to each WooCommerce product:

- subtitle
- ISBN
- illustrator
- publisher
- page count
- reading level
- binding
- dimensions
- publication date
- edition
- themes / learning points
- optional public preview URL

Baseline terms are seeded automatically for English, French and Arabic, standard age bands, common formats and core Islamic book themes. Add German, Dutch, Spanish or additional markets simply by adding terms/translations.

## Multilingual production

The theme UI includes EN/FR/AR strings and Arabic RTL CSS. Actual page/product translations should be managed by the selected multilingual plugin so every translation can have its own title, slug, content and SEO metadata.

Recommended URL model:

- `/en/...`
- `/fr/...`
- `/ar/...`

The multilingual plugin + SEO plugin should own canonical URLs, hreflang and language-specific XML sitemaps.

## Shop and search

The storefront filter bar supports:

- free-text search
- author
- language
- age
- theme
- series
- format
- minimum/maximum price
- in-stock only
- on-sale only
- normal WooCommerce sorting

Product search is extended beyond title/description to include ISBN, SKU, publisher, illustrator, author, series, language, age, format and theme names.

## Editable merchandising / landing pages

Use normal WordPress Pages and the block editor. For campaign/SEO pages where the block content should control the visible H1 and full layout, select the **Store Landing Page** page template.

The homepage can also be made block-editable: assign a normal WordPress page as the static Home page, then enable **Appearance → Customize → Store Identity & Homepage → Use the assigned Home page content**. The theme keeps the commercial hero and replaces the default lower sections with the blocks/shortcodes from that page.

Under the **Little Muslim Books** pattern category there are starting patterns for Book Collection, Sale/Campaign and Language Collection pages.

Reusable shortcodes:

```text
[ip_book_slider title="New releases" source="newest" limit="8"]
[ip_book_slider title="Best sellers" source="best_selling" limit="8"]
[ip_book_slider title="Special offers" source="sale" limit="8"]
[ip_book_slider title="French books" language="french" limit="8"]
[ip_book_slider title="Prophet series" series="stories-of-the-prophets" limit="8"]
[ip_book_grid theme="ramadan-eid" limit="12"]
[ip_collection_grid taxonomy="ip_book_language" limit="8"]
[ip_book_search]
```

Slider sources: `newest`, `featured`, `sale`, `best_selling`, `top_rated`, `manual`. For manual selection use `ids="12,48,91"`.

## Offers and coupons

Coupons remain standard WooCommerce coupons or extension/plugin coupons. The theme never calculates a fake discount.

To advertise a coupon publicly, go to **Appearance → Customize → Store Promotion Bar** and enter promotional text, an optional public coupon code, and optional landing-page URL. Sale sliders read actual WooCommerce sale products/prices.

## Customer area

The commercial customer dashboard focuses on orders, order details/status, downloads, billing/shipping addresses, gateway payment methods and account details. Fulfilment/tracking information appears on the customer's order when the store has entered it.

The old Academy/family-learning dashboard is intentionally not active in this phase.

## Physical-book fulfilment / KDP author copies

Each physical product can choose a fulfilment provider in the WooCommerce product editor:

- Manual / own stock
- Amazon KDP author copy
- Bookvault
- Lulu Direct

For KDP books you can also store an internal KDP/printer reference and a private order-page shortcut.

When a paid/processing WooCommerce order contains a KDP-author-copy product, the plugin can email the store administrator a fulfilment sheet containing the customer's name, email, phone, shipping address, books/quantities and printer references.

Open **WooCommerce → Book Fulfilment** for the KDP queue. Each WooCommerce order also has fulfilment controls for:

- waiting to order / ordered / shipped / delivered / issue
- Amazon or printer order number
- estimated delivery date
- tracking URL
- internal fulfilment note
- optional customer update email

This deliberately does **not** automate Amazon/KDP checkout. The KDP purchase remains manual while address/order preparation, tracking and customer communication are centralized in WooCommerce. If Bookvault/Lulu or another provider is connected later, the same provider layer can be extended instead of redesigning the store.

## Legacy product import

If real product data exists in the previous React/Firebase model, export it as a JSON array and open **WooCommerce → Legacy Book Import**.

The importer maps legacy title, descriptions, price, stock, author, age, theme and features into WooCommerce/book metadata. Products are saved as drafts for review. Remote covers can optionally be sideloaded into the WordPress Media Library.

Do not import demo orders/subscriptions from the prototype as real customer data.

## SEO

Use real server-rendered WordPress pages for keyword/collection landing pages. Product structured data is still generated by WooCommerce; the core plugin extends it with ISBN, publisher/brand and selected publishing properties.

Create substantial multilingual landing pages for themes and markets rather than relying only on thin product-category archives.

## Future Academy

Academy, child profiles, activities and progress are intentionally outside this bookstore package. They should be implemented as a separate application and integrated with store purchases later through an API/entitlement bridge.
