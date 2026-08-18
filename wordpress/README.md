# Little Muslim Books — Production Bookstore Architecture

## Scope

This package is the production **multilingual commercial bookstore** for Little Muslim Books. It intentionally does **not** implement the future Academy, child profiles, activities or learning-progress application.

It combines:

- a lightweight custom PHP WordPress theme (`illuminated-path`)
- WooCommerce as the only product/cart/checkout/order source of truth
- a companion publishing/store plugin (`illuminated-path-core`)
- EN / FR / AR-ready storefront copy with Arabic RTL support
- WPML / Polylang compatibility for real translated pages, products and menus
- optional Elementor visual editing without making Elementor the commerce engine
- native WordPress blocks/patterns as a complete fallback when Elementor is not used
- rich book metadata and book-specific taxonomies
- branded product pages that remain consistent when products are edited in WooCommerce
- advanced book search, catalog filtering and automatic merchandising
- WooCommerce sales, coupons, payment gateways, shipping and order management
- customer order history/tracking
- WordPress blog/resources, SEO landing pages and marketing page tools
- provider-aware physical-book fulfilment, including the optional KDP author-copy workflow

## Installation

1. Install WordPress on PlanetHoster, GoDaddy or another normal PHP/MySQL host.
2. Install and activate WooCommerce.
3. Upload and activate `illuminated-path-core`.
4. Upload and activate the `illuminated-path` theme.
5. Open **WooCommerce → Bookstore Setup** and create the missing starter commercial/SEO pages. They are created as **drafts**, not auto-published.
6. Edit/translate those pages, publish the pages you actually want, then return to **WooCommerce → Bookstore Setup** and build/refresh the branded menus.
7. Complete WooCommerce store address, currency, taxes, shipping and transactional-email configuration.
8. Install your preferred WooCommerce payment gateway.
9. Install **one** multilingual stack, for example WPML + WooCommerce Multilingual or Polylang + its WooCommerce integration.
10. Install an SEO plugin such as Rank Math or Yoast. Canonical URLs, hreflang and XML sitemaps should stay with the SEO/multilingual stack rather than being duplicated by the theme.
11. Install MailPoet or another marketing plugin and place its form in **Newsletter / Marketing** or **Footer Newsletter**.
12. Elementor is optional. Elementor Free can be used for normal visual pages and the Little Muslim Books widgets. Elementor Pro is needed if you want Elementor Theme Builder to replace global header/footer/single/archive locations.

## Brand architecture

The system deliberately separates data from presentation:

- **WooCommerce** owns product title, price, sale price, stock, variations, cart, checkout, coupons, customers and orders.
- **Illuminated Path Core** adds publishing metadata, catalog taxonomies, merchandising widgets, product-story relationships and fulfilment helpers.
- **Illuminated Path Theme** owns typography, colours, spacing, product presentation, menus, footer, mobile presentation and the branded fallback templates.
- **WordPress / Elementor** owns editable editorial and campaign content.

This means editing a WooCommerce product never destroys the visual brand. A new or updated book automatically inherits the same cover/gallery, title, metadata, price, Add to Cart, trust, tabs, series and related-product presentation.

## Brand controls

Open **Appearance → Customize** to manage:

- custom logo
- homepage hero image and copy
- homepage editing mode
- optional automatic homepage Product Spotlight
- primary green, accent gold, heading/navy and warm ivory colours
- promotion bar and public coupon message
- Instagram, Facebook, Pinterest, TikTok and YouTube links

The same brand variables are used by the theme, WooCommerce presentation and the custom Elementor widgets.

## Homepage modes

The Home page has three modes under **Appearance → Customize → Store Identity & Homepage**:

1. **Automatic branded storefront** — the theme automatically presents Book Themes, New Releases, Best Sellers, optional Product Spotlight, real WooCommerce sale products, Shop by Age, Shop by Language, reviews, blog/resources and newsletter.
2. **Editable content after branded hero** — the theme keeps its branded hero while the assigned WordPress Home page controls everything below it.
3. **Full WordPress / Elementor builder** — the assigned Home page controls the complete homepage content. If the Home page is actually built with Elementor, the theme automatically uses this mode.

The automatic New Releases, Best Sellers and Special Offers sections always read real WooCommerce data. No fake discount or duplicated product database is used.

## Elementor support

The package adds a **Little Muslim Books** Elementor category containing:

- **Book Slider** — newest, featured, best-selling, top-rated, sale or manually selected products, with category/series/language/theme/age/format filters
- **Product Spotlight** — feature a selected book with automatic cover, price and link plus your custom editorial paragraph/badge
- **Collection Grid** — categories, series, authors, languages, ages, themes or formats
- **Book Search**
- **Sale / Campaign Banner**
- **Parent Reviews** — approved real WooCommerce product reviews

The theme also registers Elementor Theme Builder locations. When Elementor Pro supplies a header, footer, single or archive template, that template can replace the theme fallback cleanly.

For page-level visual editing select the **Visual Builder — Full Width** page template when appropriate.

## Native WordPress visual editing

Elementor is not required. The theme has a branded `theme.json`, editor stylesheet and a **Little Muslim Books** block-pattern category.

Patterns include:

- Homepage — Full Visual Builder
- Book Collection Landing Page
- Sale / Campaign Page
- Language Collection Page
- Product Spotlight
- About the Publisher
- Seasonal Gift Guide
- Schools & Wholesale
- Customer Help / FAQ

Reusable shortcodes are also available:

```text
[ip_book_slider title="New releases" source="newest" limit="8"]
[ip_book_slider title="Best sellers" source="best_selling" limit="8"]
[ip_book_slider title="Special offers" source="sale" limit="8"]
[ip_book_slider title="French books" language="french" limit="8"]
[ip_book_slider title="Prophet series" series="stories-of-the-prophets" limit="8"]
[ip_book_grid theme="ramadan-eid" limit="12"]
[ip_product_spotlight id="123" body="Why this book deserves attention."]
[ip_collection_grid taxonomy="ip_book_language" limit="8"]
[ip_review_grid title="What families are saying" limit="3"]
[ip_book_search]
```

Slider sources: `newest`, `featured`, `sale`, `best_selling`, `top_rated`, `manual`. For manual selection use `ids="12,48,91"`.

## Recommended commercial / SEO pages

**WooCommerce → Bookstore Setup** can create the following missing pages as drafts:

- Islamic Children’s Books
- Stories of the Prophets for Kids
- Quran Stories for Kids
- Ramadan & Eid Books
- Bilingual Islamic Books
- New Releases
- Best Sellers
- Special Offers
- Books by Age
- Books by Language
- About Us
- Gift Guide
- Schools & Wholesale
- Shipping & Delivery
- Returns & Refunds
- FAQ
- Contact

These are starter structures. Replace the starter text with final original brand/SEO content and translate each page before publishing.

## Header, footer and mega menu

The theme has editable WordPress menu locations for:

- Primary Navigation
- Footer — Shop
- Footer — Discover
- Footer — Help
- Legal Navigation

The richer footer also supports a MailPoet/newsletter widget and editable social links.

For a large catalog, edit a top-level item under **Appearance → Menus** and enable **Display this top-level item as a Little Muslim Books mega menu**. Child and grandchild menu items are then presented in the branded multi-column menu. Menus remain normal WordPress menus, so multilingual plugins can maintain separate EN/FR/AR menu structures.

## Catalog model

WooCommerce owns price, sale price, stock, variations, coupons, checkout, orders, refunds, shipping and taxes.

The companion plugin adds these book taxonomies:

- Authors
- Series
- Book languages
- Age ranges
- Book formats
- Book themes

Each custom catalog term can have an editable **Collection image** selected from the normal WordPress Media Library. That image appears on collection grids and branded taxonomy landing pages.

Each product can store:

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
- themes / what children explore
- optional public preview URL
- marketing badge
- marketing callout
- optional Extended Product Story page

Baseline catalog terms are seeded for English, French and Arabic, normal age bands, common formats and core Islamic book themes. German, Dutch, Spanish and additional markets can be added later without changing the architecture.

## Product pages as real landing pages

Every WooCommerce book automatically keeps the branded global product structure.

For a book that needs a richer campaign/landing experience, create a normal WordPress Page and build it with WordPress blocks or Elementor. Then edit the WooCommerce product and select that page under **Extended product story**.

The product continues to show the normal WooCommerce gallery, metadata, current price, variation/stock state, Add to Cart and checkout behavior. The attached editorial page is rendered below the standard product content and can contain:

- interior page previews
- image + text storytelling
- editorial paragraphs
- author/illustrator sections
- testimonials
- video
- campaign banners
- FAQs
- comparison/series information

Products assigned to the same **Series** taxonomy automatically gain a branded “More from this series” section. WooCommerce related products continue below as “You may also like”.

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

The custom author/series/language/age/theme/format taxonomy URLs use a branded archive automatically, including optional collection image, editorial term description, filters and the live WooCommerce catalog. Elementor Pro archive templates may replace these fallbacks when desired.

## Offers and coupons

Coupons remain standard WooCommerce coupons or coupon-extension coupons. The theme never calculates a fake discount.

Use WooCommerce sale prices and coupons as the source of truth. The promotion bar and Sale Banner widget merely advertise those real offers. Sale product sliders query actual WooCommerce products on sale.

## Multilingual production

The theme's default storefront language is prepared for English, French and Arabic, with Arabic RTL CSS. Actual page/product translations are intentionally handled by the selected multilingual plugin so every translation can have its own title, slug, editorial content, product description, menus and SEO metadata.

Recommended URL model:

- `/en/...`
- `/fr/...`
- `/ar/...`

German, Dutch, Spanish or other markets can be introduced later as additional translations without rebuilding the store.

## Customer area

The commercial customer dashboard focuses only on what the bookstore needs now:

- orders and order details/status
- fulfilment/tracking information when available
- downloads, when a product supports them
- billing/shipping addresses
- payment methods supplied by compatible gateways
- account details

The old Academy/family-learning dashboard is deliberately not active.

## Blog / resources and SEO

Use native WordPress Posts for articles and resources. Use real server-rendered WordPress Pages for high-intent keyword, language, series, age and seasonal landing pages rather than relying only on thin product archives.

WooCommerce still generates product structured data; the core plugin enriches selected publishing properties. Your SEO plugin + multilingual plugin should remain responsible for canonical URLs, hreflang and XML sitemaps.

## Physical-book fulfilment / KDP author copies

Each physical product can choose a fulfilment provider:

- Manual / own stock
- Amazon KDP author copy
- Bookvault
- Lulu Direct

For KDP products, paid/processing WooCommerce orders can email the store administrator a fulfilment sheet containing customer contact/shipping data, books, quantities and printer references. **WooCommerce → Book Fulfilment** provides the queue and order-level fields for external order reference, status, ETA, tracking and optional customer notification.

The package deliberately does **not** automate Amazon/KDP checkout. KDP ordering remains manual while WooCommerce centralizes the customer/order information and follow-up.

## Legacy product import

If real product data exists in the previous React/Firebase model, export it as a JSON array and use **WooCommerce → Legacy Book Import**. Imported products are saved as drafts for review. Remote covers can optionally be sideloaded to the WordPress Media Library.

Do not import prototype/demo orders or subscriptions as real customer data.

## Future Academy

Academy, child profiles, learning activities and progress are outside this package. They should remain a separate application and can later receive access/entitlements from bookstore purchases through a dedicated bridge/API.

## Production validation

The repository packaging workflow PHP-lints the entire WordPress package and integrity-checks the generated ZIP files. Before production launch, still test the package on a staging WordPress installation with the actual versions/configuration of WooCommerce, Elementor (if used), multilingual plugin, SEO plugin, MailPoet, payment gateways, shipping/tax and invoice plugins.
