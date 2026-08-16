# Illuminated Path — WordPress / WooCommerce storefront

This folder is the migration target for `KHajjouji/Islam-books-`.

## Architecture

- **WordPress + MySQL/MariaDB**: CMS, users, pages, blog, plugin ecosystem.
- **WooCommerce**: products, variations, inventory, taxes, shipping, coupons, cart, checkout, orders and customer accounts.
- **Illuminated Path Store theme**: lightweight PHP/HTML/CSS/JS presentation layer. It deliberately does not replace WooCommerce cart/checkout templates.
- **Illuminated Path Core plugin**: book metadata, purchased interactive-resource access, and public Store API extensions for future mobile/headless clients.
- **No Firebase** is required by this architecture.

## Multilingual

The theme shell includes EN/FR/AR copy and automatic RTL styling. Product/page translation should be managed by a WordPress multilingual plugin so each language has real indexable URLs, translated products, SEO metadata and hreflang.

Supported integration paths:

1. WPML + WooCommerce multilingual components, or
2. Polylang + its WooCommerce integration.

The theme automatically detects either WPML or Polylang for the header language switcher. German, Dutch, Spanish or other languages can be added later without changing the commerce architecture.

## Marketing and plugin compatibility

The theme uses normal WordPress and WooCommerce hooks instead of replacing transactional templates. This is intentional so standard extensions can inject their own UI and logic.

Typical compatible functions include WooCommerce coupons and sale pricing, Stripe / WooPayments / PayPal gateways, subscription extensions, MailPoet, AutomateWoo, SEO plugins, shipping, tax and invoice extensions.

A `Newsletter / Marketing` widget area is provided specifically for MailPoet or another opt-in form.

## Book catalog model

Use WooCommerce as the single source of truth. Recommended global product attributes: Language, Age, Format, Series and Reading level.

Recommended product categories: `stories-of-the-prophets`, `quran-stories`, `ramadan`, `bilingual`, `bedtime`, `activities`.

The companion plugin adds optional book-specific fields: subtitle, ISBN, age range, page count, audio URL, interactive activity URL, course URL and learning objectives.

## Purchased interactive activities

When a product has an interactive/course/audio resource, buyers see it in **My Account → Learning Library**. The raw purchased resource URL is not exposed by the public Store API. Access can be extended later with subscriptions/memberships using the `illuminated_path_customer_can_access_product_resource` filter.

## Future mobile app

WooCommerce remains the product/order engine. The companion plugin extends `wc/store/products` under the `extensions.illuminated-path` namespace with safe book metadata. This means an iOS/Android client can consume the same catalog later instead of creating a second database.

## Installation on PlanetHoster / GoDaddy / standard PHP hosting

1. Create a normal WordPress installation with MySQL/MariaDB and HTTPS.
2. Install WooCommerce.
3. Copy `wp-content/themes/illuminated-path` to the site's `wp-content/themes/` folder and activate it.
4. Copy `wp-content/plugins/illuminated-path-core` to `wp-content/plugins/` and activate it.
5. Configure WooCommerce pages, currency, taxes, shipping and payment gateway.
6. Install/configure a multilingual plugin and create English, French and Arabic versions.
7. Add product attributes/categories and import or create the books.
8. Add a MailPoet form to **Appearance → Widgets → Newsletter / Marketing**.
9. In **Settings → Permalinks**, use a readable structure and save once after activating the companion plugin.
10. Configure backups, SMTP/domain email authentication, caching and security at the hosting level.

## Development rule

Do not put payment logic, order storage, coupon calculations or subscription billing into the theme. Those belong to WooCommerce/extensions. Theme code owns presentation; the core plugin owns store-specific business metadata/access; WooCommerce owns commerce.
