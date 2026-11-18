<?php
/**
 * Bookstore ecosystem status.
 *
 * The custom theme/plugin intentionally do not replace mature commerce,
 * multilingual, SEO, email-marketing or payment extensions. This screen makes
 * the intended WordPress ecosystem visible after installation.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function ip_core_ecosystem_checks(): array {
    $checks = array();

    $checks[] = array(
        'label'  => __( 'WooCommerce', 'illuminated-path-core' ),
        'status' => class_exists( 'WooCommerce' ) ? 'good' : 'required',
        'detail' => class_exists( 'WooCommerce' )
            ? sprintf( __( 'Active — version %s. Products, cart, checkout, coupons, customers and orders stay in WooCommerce.', 'illuminated-path-core' ), defined( 'WC_VERSION' ) ? WC_VERSION : '?' )
            : __( 'Required. Install WooCommerce before using the bookstore.', 'illuminated-path-core' ),
    );

    $has_elementor = did_action( 'elementor/loaded' ) || defined( 'ELEMENTOR_VERSION' );
    $checks[] = array(
        'label'  => __( 'Elementor', 'illuminated-path-core' ),
        'status' => $has_elementor ? 'good' : 'optional',
        'detail' => $has_elementor
            ? __( 'Active. Core marketing pages can use native Elementor starter layouts and Little Muslim Books widgets.', 'illuminated-path-core' )
            : __( 'Optional. The site remains fully usable with WordPress blocks; install Elementor for drag-and-drop page editing.', 'illuminated-path-core' ),
    );

    $polylang    = defined( 'POLYLANG_VERSION' ) || function_exists( 'pll_current_language' );
    $polylang_wc = defined( 'PLLWC_VERSION' );
    $wpml        = defined( 'ICL_SITEPRESS_VERSION' ) || class_exists( 'SitePress' );
    $checks[] = array(
        'label'  => __( 'Multilingual commerce', 'illuminated-path-core' ),
        'status' => ( $polylang_wc || $wpml ) ? 'good' : 'recommended',
        'detail' => $polylang_wc
            ? __( 'Polylang for WooCommerce detected. Products, WooCommerce pages, order language and customer emails can be synchronized by the multilingual plugin.', 'illuminated-path-core' )
            : ( $wpml
                ? __( 'WPML detected. Complete its WooCommerce multilingual setup before translating products and checkout.', 'illuminated-path-core' )
                : ( $polylang
                    ? __( 'Polylang detected, but multilingual WooCommerce requires the Polylang for WooCommerce add-on for products, checkout and order-language synchronization.', 'illuminated-path-core' )
                    : __( 'Recommended for EN / FR / AR: Polylang + Polylang for WooCommerce, or WPML with its WooCommerce integration.', 'illuminated-path-core' ) ) ),
    );

    $mailpoet = class_exists( '\\MailPoet\\API\\API' ) || defined( 'MAILPOET_VERSION' );
    $checks[] = array(
        'label'  => __( 'MailPoet / email marketing', 'illuminated-path-core' ),
        'status' => $mailpoet ? 'good' : 'recommended',
        'detail' => $mailpoet
            ? __( 'MailPoet detected. Use it for newsletter forms and WooCommerce automations; keep marketing consent separate from transactional order email.', 'illuminated-path-core' )
            : __( 'Recommended. The theme provides newsletter widget areas and leaves campaigns/automations to MailPoet.', 'illuminated-path-core' ),
    );

    $seo = defined( 'RANK_MATH_VERSION' ) || defined( 'WPSEO_VERSION' );
    $checks[] = array(
        'label'  => __( 'SEO plugin', 'illuminated-path-core' ),
        'status' => $seo ? 'good' : 'recommended',
        'detail' => $seo
            ? __( 'SEO plugin detected. Let it own titles, canonicals, hreflang, XML sitemaps and social metadata; the bookstore plugin only enriches WooCommerce product data.', 'illuminated-path-core' )
            : __( 'Recommended: configure a dedicated SEO plugin such as Rank Math or Yoast before launch.', 'illuminated-path-core' ),
    );

    $enabled_gateways = 0;
    if ( function_exists( 'WC' ) && WC()->payment_gateways() ) {
        foreach ( WC()->payment_gateways()->payment_gateways() as $gateway ) {
            if ( isset( $gateway->enabled ) && 'yes' === $gateway->enabled ) {
                ++$enabled_gateways;
            }
        }
    }
    $checks[] = array(
        'label'  => __( 'Payment gateway', 'illuminated-path-core' ),
        'status' => $enabled_gateways ? 'good' : 'required',
        'detail' => $enabled_gateways
            ? sprintf( _n( '%d enabled WooCommerce payment gateway.', '%d enabled WooCommerce payment gateways.', $enabled_gateways, 'illuminated-path-core' ), $enabled_gateways )
            : __( 'Configure at least one production payment gateway before launch.', 'illuminated-path-core' ),
    );

    $checks[] = array(
        'label'  => __( 'Customer communication', 'illuminated-path-core' ),
        'status' => 'good',
        'detail' => __( 'WooCommerce transactional emails and public order notes are the default communication channel. Public notes are emailed to customers and appear in My Account; the theme also provides a consolidated Order Updates screen.', 'illuminated-path-core' ),
    );

    return $checks;
}

function ip_core_register_ecosystem_page(): void {
    add_submenu_page(
        'woocommerce',
        __( 'Bookstore System Check', 'illuminated-path-core' ),
        __( 'Bookstore System Check', 'illuminated-path-core' ),
        'manage_woocommerce',
        'ip-ecosystem-check',
        'ip_core_render_ecosystem_page'
    );
}
add_action( 'admin_menu', 'ip_core_register_ecosystem_page', 51 );

function ip_core_render_ecosystem_page(): void {
    if ( ! current_user_can( 'manage_woocommerce' ) ) {
        return;
    }
    $labels = array(
        'good'        => __( 'Ready', 'illuminated-path-core' ),
        'required'    => __( 'Required', 'illuminated-path-core' ),
        'recommended' => __( 'Recommended', 'illuminated-path-core' ),
        'optional'    => __( 'Optional', 'illuminated-path-core' ),
    );
    ?>
    <div class="wrap">
        <h1><?php esc_html_e( 'Little Muslim Books — System Check', 'illuminated-path-core' ); ?></h1>
        <p><?php esc_html_e( 'The bookstore deliberately uses the WordPress ecosystem instead of rebuilding mature commerce services inside the custom plugin.', 'illuminated-path-core' ); ?></p>
        <div style="max-width:1050px;display:grid;gap:12px">
            <?php foreach ( ip_core_ecosystem_checks() as $check ) : ?>
                <article style="background:#fff;border:1px solid #dcdcde;border-radius:12px;padding:18px 20px;display:grid;grid-template-columns:minmax(180px,.35fr) minmax(0,1fr);gap:20px">
                    <div><strong><?php echo esc_html( $check['label'] ); ?></strong><br><span style="display:inline-block;margin-top:6px;padding:3px 8px;border-radius:999px;background:#f0f0f1"><?php echo esc_html( $labels[ $check['status'] ] ?? $check['status'] ); ?></span></div>
                    <p style="margin:0"><?php echo esc_html( $check['detail'] ); ?></p>
                </article>
            <?php endforeach; ?>
        </div>
        <div style="margin-top:24px;background:#fff;border-left:4px solid #2271b1;padding:18px 20px;max-width:1000px">
            <strong><?php esc_html_e( 'Architecture rule', 'illuminated-path-core' ); ?></strong>
            <p style="margin-bottom:0"><?php esc_html_e( 'WooCommerce owns transactions; WordPress owns pages/posts/users/media; Elementor optionally owns visual page layouts; the multilingual plugin owns translations; MailPoet owns newsletter/automation; the SEO plugin owns search metadata; payment, tax, shipping, invoice and consent plugins remain replaceable.', 'illuminated-path-core' ); ?></p>
        </div>
    </div>
    <?php
}
