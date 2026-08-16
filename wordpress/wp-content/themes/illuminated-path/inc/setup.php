<?php
/** Theme setup and assets. */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function ip_theme_setup(): void {
    load_theme_textdomain( 'illuminated-path', IP_THEME_DIR . '/languages' );

    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'automatic-feed-links' );
    add_theme_support( 'responsive-embeds' );
    add_theme_support( 'align-wide' );
    add_theme_support( 'editor-styles' );
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script', 'navigation-widgets' ) );
    add_theme_support( 'woocommerce', array( 'thumbnail_image_width' => 520, 'single_image_width' => 900, 'product_grid' => array( 'default_rows' => 3, 'min_rows' => 1, 'max_rows' => 8, 'default_columns' => 4, 'min_columns' => 2, 'max_columns' => 5 ) ) );
    add_theme_support( 'wc-product-gallery-zoom' );
    add_theme_support( 'wc-product-gallery-lightbox' );
    add_theme_support( 'wc-product-gallery-slider' );

    register_nav_menus( array( 'primary' => __( 'Primary Navigation', 'illuminated-path' ), 'footer' => __( 'Footer Navigation', 'illuminated-path' ), 'legal' => __( 'Legal Navigation', 'illuminated-path' ) ) );
}
add_action( 'after_setup_theme', 'ip_theme_setup' );

function ip_register_widget_areas(): void {
    register_sidebar( array( 'name' => __( 'Newsletter / Marketing', 'illuminated-path' ), 'id' => 'newsletter', 'description' => __( 'Place a MailPoet form, newsletter block, or other marketing widget here.', 'illuminated-path' ), 'before_widget' => '<div class="newsletter-widget %2$s">', 'after_widget' => '</div>', 'before_title' => '<h3 class="newsletter-widget-title">', 'after_title' => '</h3>' ) );
    register_sidebar( array( 'name' => __( 'Shop Sidebar', 'illuminated-path' ), 'id' => 'shop-sidebar', 'description' => __( 'Optional WooCommerce widgets. The theme also provides a built-in bookstore filter bar.', 'illuminated-path' ), 'before_widget' => '<section class="shop-widget %2$s">', 'after_widget' => '</section>', 'before_title' => '<h3 class="shop-widget-title">', 'after_title' => '</h3>' ) );
}
add_action( 'widgets_init', 'ip_register_widget_areas' );

function ip_enqueue_assets(): void {
    wp_enqueue_style( 'illuminated-path-style', get_stylesheet_uri(), array(), IP_THEME_VERSION );
    wp_enqueue_style( 'illuminated-path-site', IP_THEME_URI . '/assets/css/site.css', array( 'illuminated-path-style' ), IP_THEME_VERSION );
    wp_enqueue_style( 'illuminated-path-bookstore', IP_THEME_URI . '/assets/css/bookstore.css', array( 'illuminated-path-site' ), IP_THEME_VERSION );
    wp_enqueue_style( 'illuminated-path-catalog-enhancements', IP_THEME_URI . '/assets/css/catalog-enhancements.css', array( 'illuminated-path-bookstore' ), IP_THEME_VERSION );
    wp_enqueue_style( 'illuminated-path-fulfillment', IP_THEME_URI . '/assets/css/fulfillment.css', array( 'illuminated-path-catalog-enhancements' ), IP_THEME_VERSION );
    if ( is_rtl() ) {
        wp_enqueue_style( 'illuminated-path-rtl', IP_THEME_URI . '/rtl.css', array( 'illuminated-path-fulfillment' ), IP_THEME_VERSION );
    }
    wp_enqueue_script( 'illuminated-path-site', IP_THEME_URI . '/assets/js/site.js', array(), IP_THEME_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'ip_enqueue_assets' );

function ip_preconnect_fonts( array $urls, string $relation_type ): array {
    if ( 'preconnect' === $relation_type ) {
        $urls[] = array( 'href' => 'https://fonts.gstatic.com', 'crossorigin' => 'anonymous' );
    }
    return $urls;
}
add_filter( 'wp_resource_hints', 'ip_preconnect_fonts', 10, 2 );

function ip_body_classes( array $classes ): array {
    $classes[] = 'ip-site';
    if ( class_exists( 'WooCommerce' ) ) {
        $classes[] = 'woocommerce-active';
    }
    return $classes;
}
add_filter( 'body_class', 'ip_body_classes' );
