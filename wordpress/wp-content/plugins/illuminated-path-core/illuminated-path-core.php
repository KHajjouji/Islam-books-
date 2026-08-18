<?php
/**
 * Plugin Name: Illuminated Path Core
 * Description: Publishing metadata, bookstore catalog tools, visual-commerce widgets, brand storytelling, creator profiles, customer order experience, fulfilment workflows, import utilities and WooCommerce extensions for Little Muslim Books / Illuminated Path.
 * Version: 0.6.0
 * Requires at least: 6.5
 * Requires PHP: 8.0
 * WC requires at least: 8.2
 * Text Domain: illuminated-path-core
 * License: GPL-2.0-or-later
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'IP_CORE_VERSION', '0.6.0' );
define( 'IP_CORE_FILE', __FILE__ );
define( 'IP_CORE_DIR', plugin_dir_path( __FILE__ ) );

add_action(
    'before_woocommerce_init',
    static function (): void {
        if ( class_exists( '\\Automattic\\WooCommerce\\Utilities\\FeaturesUtil' ) ) {
            \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility( 'custom_order_tables', IP_CORE_FILE, true );
            \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility( 'cart_checkout_blocks', IP_CORE_FILE, true );
        }
    }
);

function ip_core_boot(): void {
    if ( ! class_exists( 'WooCommerce' ) ) {
        add_action( 'admin_notices', 'ip_core_missing_woocommerce_notice' );
        return;
    }

    require_once IP_CORE_DIR . 'includes/book-catalog.php';
    require_once IP_CORE_DIR . 'includes/taxonomy-images.php';
    require_once IP_CORE_DIR . 'includes/product-meta.php';
    require_once IP_CORE_DIR . 'includes/storefront-controls.php';
    require_once IP_CORE_DIR . 'includes/product-presentation.php';
    require_once IP_CORE_DIR . 'includes/customer-account.php';
    require_once IP_CORE_DIR . 'includes/fulfillment.php';
    require_once IP_CORE_DIR . 'includes/admin-dashboard.php';
    require_once IP_CORE_DIR . 'includes/site-setup.php';
    require_once IP_CORE_DIR . 'includes/brand-story.php';
    require_once IP_CORE_DIR . 'includes/parent-message.php';
    require_once IP_CORE_DIR . 'includes/brand-home.php';
    require_once IP_CORE_DIR . 'includes/seo.php';
    require_once IP_CORE_DIR . 'includes/migration.php';
    require_once IP_CORE_DIR . 'includes/store-api.php';
    require_once IP_CORE_DIR . 'includes/elementor.php';
    require_once IP_CORE_DIR . 'includes/elementor-starter-pages.php';

    /** Academy/family learning is intentionally outside this commercial plugin. */
}
add_action( 'plugins_loaded', 'ip_core_boot', 20 );

function ip_core_missing_woocommerce_notice(): void {
    if ( current_user_can( 'activate_plugins' ) ) {
        echo '<div class="notice notice-error"><p><strong>' . esc_html__( 'Illuminated Path Core:', 'illuminated-path-core' ) . '</strong> ' . esc_html__( 'WooCommerce must be installed and active.', 'illuminated-path-core' ) . '</p></div>';
    }
}

function ip_core_maybe_upgrade(): void {
    if ( get_option( 'ip_core_version' ) === IP_CORE_VERSION ) {
        return;
    }
    if ( function_exists( 'ip_core_register_book_taxonomies' ) ) {
        ip_core_register_book_taxonomies();
        ip_core_seed_catalog_terms();
    }
    if ( function_exists( 'ip_core_register_creator_post_type' ) ) {
        ip_core_register_creator_post_type();
    }
    update_option( 'ip_core_version', IP_CORE_VERSION, false );
    flush_rewrite_rules( false );
}
add_action( 'admin_init', 'ip_core_maybe_upgrade', 40 );

function ip_core_activate(): void {
    if ( class_exists( 'WooCommerce' ) ) {
        require_once IP_CORE_DIR . 'includes/book-catalog.php';
        require_once IP_CORE_DIR . 'includes/brand-story.php';
        require_once IP_CORE_DIR . 'includes/parent-message.php';
        require_once IP_CORE_DIR . 'includes/brand-home.php';
        ip_core_register_book_taxonomies();
        ip_core_seed_catalog_terms();
        ip_core_register_creator_post_type();
    }
    update_option( 'ip_core_version', IP_CORE_VERSION, false );
    flush_rewrite_rules();
}
register_activation_hook( __FILE__, 'ip_core_activate' );

function ip_core_deactivate(): void {
    flush_rewrite_rules();
}
register_deactivation_hook( __FILE__, 'ip_core_deactivate' );
