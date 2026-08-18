<?php
/**
 * Native WordPress block patterns for fast multilingual landing-page building.
 * The content remains editable/translateable in the normal WordPress editor.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function ip_register_block_patterns(): void {
    if ( ! function_exists( 'register_block_pattern_category' ) || ! function_exists( 'register_block_pattern' ) ) {
        return;
    }
    register_block_pattern_category( 'illuminated-path', array( 'label' => __( 'Little Muslim Books', 'illuminated-path' ) ) );

    register_block_pattern(
        'illuminated-path/book-collection-page',
        array(
            'title'       => __( 'Book Collection Landing Page', 'illuminated-path' ),
            'description' => __( 'SEO introduction, product slider, editorial content and call to action.', 'illuminated-path' ),
            'categories'  => array( 'illuminated-path' ),
            'content'     => '<!-- wp:group {"className":"ip-editor-hero","layout":{"type":"constrained"}} --><div class="wp-block-group ip-editor-hero"><!-- wp:heading {"level":1} --><h1 class="wp-block-heading">' . esc_html__( 'Collection title', 'illuminated-path' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Write an original, useful introduction for parents and search engines.', 'illuminated-path' ) . '</p><!-- /wp:paragraph --></div><!-- /wp:group --><!-- wp:shortcode -->[ip_book_slider title="Featured books" source="featured" limit="8"]<!-- /wp:shortcode --><!-- wp:heading --><h2 class="wp-block-heading">' . esc_html__( 'Why families choose this collection', 'illuminated-path' ) . '</h2><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Add age guidance, learning themes, family use ideas and meaningful editorial content here.', 'illuminated-path' ) . '</p><!-- /wp:paragraph -->',
        )
    );

    register_block_pattern(
        'illuminated-path/sale-campaign',
        array(
            'title'      => __( 'Sale / Campaign Page', 'illuminated-path' ),
            'categories' => array( 'illuminated-path' ),
            'content'    => '<!-- wp:group {"className":"ip-editor-promo","layout":{"type":"constrained"}} --><div class="wp-block-group ip-editor-promo"><!-- wp:heading {"level":1} --><h1 class="wp-block-heading">' . esc_html__( 'Seasonal Book Sale', 'illuminated-path' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Explain the offer clearly. WooCommerce remains the source of truth for prices and coupons.', 'illuminated-path' ) . '</p><!-- /wp:paragraph --></div><!-- /wp:group --><!-- wp:shortcode -->[ip_book_slider title="Books on sale" source="sale" limit="12"]<!-- /wp:shortcode -->',
        )
    );

    register_block_pattern(
        'illuminated-path/language-storefront',
        array(
            'title'      => __( 'Language Collection Page', 'illuminated-path' ),
            'categories' => array( 'illuminated-path' ),
            'content'    => '<!-- wp:heading {"level":1} --><h1 class="wp-block-heading">' . esc_html__( 'Books in this language', 'illuminated-path' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Create a fully translated introduction and replace LANGUAGE-SLUG below.', 'illuminated-path' ) . '</p><!-- /wp:paragraph --><!-- wp:shortcode -->[ip_book_slider title="Popular books" language="LANGUAGE-SLUG" source="best_selling" limit="8"]<!-- /wp:shortcode -->',
        )
    );
}
add_action( 'init', 'ip_register_block_patterns', 20 );
