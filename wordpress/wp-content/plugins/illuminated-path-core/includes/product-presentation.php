<?php
/** Branded WooCommerce book-page presentation that remains data-driven. */
if ( ! defined( 'ABSPATH' ) ) { exit; }

function ip_core_product_presentation_fields(): void {
    echo '<div class="options_group">';
    woocommerce_wp_text_input(
        array(
            'id'          => '_ip_marketing_badge',
            'label'       => __( 'Marketing badge', 'illuminated-path-core' ),
            'placeholder' => __( 'NEW RELEASE, BESTSELLER, RAMADAN PICK…', 'illuminated-path-core' ),
            'description' => __( 'Optional short badge shown near the product summary.', 'illuminated-path-core' ),
            'desc_tip'    => true,
        )
    );
    woocommerce_wp_textarea_input(
        array(
            'id'          => '_ip_marketing_callout',
            'label'       => __( 'Marketing callout', 'illuminated-path-core' ),
            'description' => __( 'Optional editorial sentence or short paragraph that reinforces why this particular book matters. The global product design stays unchanged.', 'illuminated-path-core' ),
            'desc_tip'    => true,
        )
    );
    echo '</div>';
}
add_action( 'woocommerce_product_options_general_product_data', 'ip_core_product_presentation_fields', 35 );

function ip_core_save_product_presentation_fields( WC_Product $product ): void {
    if ( isset( $_POST['_ip_marketing_badge'] ) ) {
        $product->update_meta_data( '_ip_marketing_badge', sanitize_text_field( wp_unslash( $_POST['_ip_marketing_badge'] ) ) );
    }
    if ( isset( $_POST['_ip_marketing_callout'] ) ) {
        $product->update_meta_data( '_ip_marketing_callout', sanitize_textarea_field( wp_unslash( $_POST['_ip_marketing_callout'] ) ) );
    }
}
add_action( 'woocommerce_admin_process_product_object', 'ip_core_save_product_presentation_fields', 35 );

function ip_core_product_marketing_callout(): void {
    global $product;
    if ( ! $product instanceof WC_Product ) { return; }
    $badge   = trim( (string) $product->get_meta( '_ip_marketing_badge' ) );
    $callout = trim( (string) $product->get_meta( '_ip_marketing_callout' ) );
    if ( ! $badge && ! $callout ) { return; }
    echo '<div class="ip-product-marketing-callout">';
    if ( $badge ) { echo '<span>' . esc_html( $badge ) . '</span>'; }
    if ( $callout ) { echo '<p>' . esc_html( $callout ) . '</p>'; }
    echo '</div>';
}
add_action( 'woocommerce_single_product_summary', 'ip_core_product_marketing_callout', 22 );

function ip_core_product_trust_row(): void {
    global $product;
    if ( ! $product instanceof WC_Product ) { return; }
    echo '<div class="ip-product-trust-row">';
    echo '<span>✓ ' . esc_html__( 'Secure WooCommerce checkout', 'illuminated-path-core' ) . '</span>';
    if ( $product->needs_shipping() ) { echo '<span>✓ ' . esc_html__( 'Order status & delivery follow-up', 'illuminated-path-core' ) . '</span>'; }
    echo '<span>✓ ' . esc_html__( 'Customer support from your bookstore account', 'illuminated-path-core' ) . '</span>';
    echo '</div>';
}
add_action( 'woocommerce_single_product_summary', 'ip_core_product_trust_row', 36 );

function ip_core_same_series_products( WC_Product $product, int $limit = 8 ): array {
    $terms = wp_get_post_terms( $product->get_id(), 'ip_book_series' );
    if ( is_wp_error( $terms ) || empty( $terms ) ) { return array(); }
    $term_ids = wp_list_pluck( $terms, 'term_id' );
    $query = new WP_Query(
        array(
            'post_type'      => 'product',
            'post_status'    => 'publish',
            'posts_per_page' => $limit,
            'post__not_in'   => array( $product->get_id() ),
            'tax_query'      => array(
                array( 'taxonomy' => 'ip_book_series', 'field' => 'term_id', 'terms' => $term_ids ),
            ),
            'orderby'        => 'menu_order date',
            'order'          => 'ASC',
            'fields'         => 'ids',
        )
    );
    $products = array();
    foreach ( $query->posts as $product_id ) {
        $candidate = wc_get_product( $product_id );
        if ( $candidate ) { $products[] = $candidate; }
    }
    return $products;
}

function ip_core_render_same_series(): void {
    global $product;
    if ( ! $product instanceof WC_Product ) { return; }
    $series = ip_core_product_term_names( $product->get_id(), 'ip_book_series' );
    $products = ip_core_same_series_products( $product );
    if ( ! $series || empty( $products ) ) { return; }
    echo '<section class="ip-single-series"><div class="ip-shortcode-heading"><div><span class="ip-account-kicker">' . esc_html__( 'Continue the collection', 'illuminated-path-core' ) . '</span><h2>' . sprintf( esc_html__( 'More from %s', 'illuminated-path-core' ), esc_html( $series ) ) . '</h2></div></div><div class="ip-shortcode-grid">';
    foreach ( $products as $series_product ) { echo ip_core_render_product_card( $series_product ); }
    echo '</div></section>';
}
add_action( 'woocommerce_after_single_product_summary', 'ip_core_render_same_series', 17 );

function ip_core_related_heading(): string {
    return __( 'You may also like', 'illuminated-path-core' );
}
add_filter( 'woocommerce_product_related_products_heading', 'ip_core_related_heading' );
