<?php
/** WooCommerce presentation integration. No cart/checkout template overrides. */
if ( ! defined( 'ABSPATH' ) ) { exit; }

function ip_woocommerce_wrapper_start(): void { echo '<main id="primary" class="site-main shop-shell"><div class="container shop-container">'; }
function ip_woocommerce_wrapper_end(): void { echo '</div></main>'; }
function ip_woocommerce_hooks(): void {
    if ( ! class_exists( 'WooCommerce' ) ) { return; }
    remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10 );
    remove_action( 'woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10 );
    add_action( 'woocommerce_before_main_content', 'ip_woocommerce_wrapper_start', 10 );
    add_action( 'woocommerce_after_main_content', 'ip_woocommerce_wrapper_end', 10 );
}
add_action( 'wp', 'ip_woocommerce_hooks' );
function ip_cart_count(): int { return ( class_exists('WooCommerce') && WC()->cart ) ? (int) WC()->cart->get_cart_contents_count() : 0; }
function ip_cart_count_fragment( array $fragments ): array { $fragments['span.ip-cart-count']='<span class="ip-cart-count">'.esc_html((string)ip_cart_count()).'</span>'; return $fragments; }
add_filter( 'woocommerce_add_to_cart_fragments', 'ip_cart_count_fragment' );
function ip_shop_url(): string { return class_exists('WooCommerce') ? wc_get_page_permalink('shop') : home_url('/shop/'); }

function ip_render_product_rail( array $args = array() ): void {
    if ( ! class_exists( 'WooCommerce' ) ) { return; }
    $args = wp_parse_args( $args, array( 'title'=>ip_text('featured_title'),'category'=>'','featured'=>false,'limit'=>8,'view_url'=>ip_shop_url(),'rail_class'=>'' ) );
    $query = array( 'status'=>'publish','limit'=>absint($args['limit']),'orderby'=>'date','order'=>'DESC','return'=>'objects' );
    if ( $args['featured'] ) { $query['featured']=true; }
    if ( $args['category'] ) { $query['category']=array(sanitize_title($args['category'])); }
    $products = wc_get_products( $query );
    echo '<section class="product-section '.esc_attr($args['rail_class']).'"><div class="section-heading row-heading"><div><span class="section-kicker">'.esc_html(ip_text('collections')).'</span><h2>'.esc_html($args['title']).'</h2></div><a class="text-link" href="'.esc_url($args['view_url']).'">'.esc_html(ip_text('view_all')).' <span aria-hidden="true">→</span></a></div>';
    if ( empty($products) ) { echo '<div class="product-empty">'.esc_html(ip_text('empty_products')).'</div></section>'; return; }
    echo '<div class="product-rail" data-product-rail><button class="rail-arrow rail-prev" type="button" aria-label="'.esc_attr__('Previous products','illuminated-path').'">‹</button><div class="product-track" data-product-track>';
    foreach ( $products as $product ) { set_query_var( 'ip_product', $product ); get_template_part( 'template-parts/product', 'card' ); }
    echo '</div><button class="rail-arrow rail-next" type="button" aria-label="'.esc_attr__('Next products','illuminated-path').'">›</button></div></section>';
}
function ip_product_category_url( string $slug ): string {
    if ( ! class_exists('WooCommerce') ) { return ip_shop_url(); }
    $term=get_term_by('slug',$slug,'product_cat'); if($term&&!is_wp_error($term)){ $url=get_term_link($term); if(!is_wp_error($url)){ return (string)$url; } }
    return ip_shop_url();
}
function ip_admin_woocommerce_notice(): void {
    if ( ! current_user_can('activate_plugins') || class_exists('WooCommerce') ) { return; }
    echo '<div class="notice notice-warning"><p><strong>'.esc_html__('Illuminated Path Store:','illuminated-path').'</strong> '.esc_html__('Install and activate WooCommerce to enable products, cart, checkout, coupons and customer accounts.','illuminated-path').'</p></div>';
}
add_action( 'admin_notices', 'ip_admin_woocommerce_notice' );
