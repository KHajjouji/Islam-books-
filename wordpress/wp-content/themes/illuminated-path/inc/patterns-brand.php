<?php
/** Additional branded block patterns for marketing and SEO pages. */
if ( ! defined( 'ABSPATH' ) ) { exit; }

function ip_register_brand_patterns(): void {
    if ( ! function_exists( 'register_block_pattern' ) ) { return; }

    $patterns = array(
        'homepage-builder' => array(
            'title' => __( 'Homepage — Full Visual Builder', 'illuminated-path' ),
            'description' => __( 'Editable home structure with hero copy, product spotlight, new releases, collections, best sellers, reviews and newsletter.', 'illuminated-path' ),
            'content' => '<!-- wp:group {"className":"ip-editor-hero","layout":{"type":"constrained"}} --><div class="wp-block-group ip-editor-hero"><!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Beautiful Islamic books for growing Muslim hearts.', 'illuminated-path' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Replace this hero copy, add your own image/background and keep the rest of the page fully editable.', 'illuminated-path' ) . '</p><!-- /wp:paragraph --><!-- wp:buttons --><div class="wp-block-buttons"><!-- wp:button --><div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="/shop/">' . esc_html__( 'Shop the books', 'illuminated-path' ) . '</a></div><!-- /wp:button --></div><!-- /wp:buttons --></div><!-- /wp:group --><!-- wp:shortcode -->[ip_book_slider title="New releases" source="newest" limit="8"]<!-- /wp:shortcode --><!-- wp:shortcode -->[ip_collection_grid taxonomy="product_cat" limit="8"]<!-- /wp:shortcode --><!-- wp:shortcode -->[ip_book_slider title="Best sellers" source="best_selling" limit="8"]<!-- /wp:shortcode --><!-- wp:shortcode -->[ip_review_grid title="What families are saying" limit="3"]<!-- /wp:shortcode -->',
        ),
        'product-spotlight' => array(
            'title' => __( 'Product Spotlight', 'illuminated-path' ),
            'description' => __( 'Feature one WooCommerce book with automatic cover, price and product link. Replace PRODUCT-ID.', 'illuminated-path' ),
            'content' => '<!-- wp:shortcode -->[ip_product_spotlight id="PRODUCT-ID" eyebrow="Book spotlight" body="Write a strong editorial paragraph explaining why this book deserves attention."]<!-- /wp:shortcode -->',
        ),
        'publisher-about' => array(
            'title' => __( 'About the Publisher', 'illuminated-path' ),
            'content' => '<!-- wp:group {"layout":{"type":"constrained"}} --><div class="wp-block-group"><!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Books created with purpose', 'illuminated-path' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Tell families who you are, what you publish, how you approach Islamic content and why your books matter for Muslim children growing up in multilingual environments.', 'illuminated-path' ) . '</p><!-- /wp:paragraph --><!-- wp:columns --><div class="wp-block-columns"><!-- wp:column --><div class="wp-block-column"><!-- wp:heading {"level":3} --><h3>' . esc_html__( 'Faithful', 'illuminated-path' ) . '</h3><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Explain your editorial and Islamic-content standards.', 'illuminated-path' ) . '</p><!-- /wp:paragraph --></div><!-- /wp:column --><!-- wp:column --><div class="wp-block-column"><!-- wp:heading {"level":3} --><h3>' . esc_html__( 'Beautiful', 'illuminated-path' ) . '</h3><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Explain your illustration and publishing-quality philosophy.', 'illuminated-path' ) . '</p><!-- /wp:paragraph --></div><!-- /wp:column --><!-- wp:column --><div class="wp-block-column"><!-- wp:heading {"level":3} --><h3>' . esc_html__( 'Accessible', 'illuminated-path' ) . '</h3><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Explain the multilingual and international-family mission.', 'illuminated-path' ) . '</p><!-- /wp:paragraph --></div><!-- /wp:column --></div><!-- /wp:columns --></div><!-- /wp:group -->',
        ),
        'gift-guide' => array(
            'title' => __( 'Seasonal Gift Guide', 'illuminated-path' ),
            'content' => '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Islamic book gifts children will keep returning to', 'illuminated-path' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Introduce the occasion, age ranges and what makes a meaningful book gift.', 'illuminated-path' ) . '</p><!-- /wp:paragraph --><!-- wp:shortcode -->[ip_book_slider title="Popular gifts" source="best_selling" limit="8"]<!-- /wp:shortcode --><!-- wp:heading --><h2>' . esc_html__( 'Shop by age', 'illuminated-path' ) . '</h2><!-- /wp:heading --><!-- wp:shortcode -->[ip_collection_grid taxonomy="ip_book_age" limit="8"]<!-- /wp:shortcode -->',
        ),
        'schools-wholesale' => array(
            'title' => __( 'Schools & Wholesale', 'illuminated-path' ),
            'content' => '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'For schools, libraries and bookshops', 'illuminated-path' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Present bulk ordering, school use, retailer enquiries and any volume-pricing process here.', 'illuminated-path' ) . '</p><!-- /wp:paragraph --><!-- wp:columns --><div class="wp-block-columns"><!-- wp:column --><div class="wp-block-column"><!-- wp:heading {"level":3} --><h3>' . esc_html__( 'Schools & libraries', 'illuminated-path' ) . '</h3><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Describe classroom, library and community purchases.', 'illuminated-path' ) . '</p><!-- /wp:paragraph --></div><!-- /wp:column --><!-- wp:column --><div class="wp-block-column"><!-- wp:heading {"level":3} --><h3>' . esc_html__( 'Retail & wholesale', 'illuminated-path' ) . '</h3><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Describe reseller and wholesale contact requirements.', 'illuminated-path' ) . '</p><!-- /wp:paragraph --></div><!-- /wp:column --></div><!-- /wp:columns -->',
        ),
        'help-faq' => array(
            'title' => __( 'Customer Help / FAQ', 'illuminated-path' ),
            'content' => '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'How can we help?', 'illuminated-path' ) . '</h1><!-- /wp:heading --><!-- wp:details --><details class="wp-block-details"><summary>' . esc_html__( 'How do I track my order?', 'illuminated-path' ) . '</summary><p>' . esc_html__( 'Customers can open My Account → Orders to see order status and any available tracking details.', 'illuminated-path' ) . '</p></details><!-- /wp:details --><!-- wp:details --><details class="wp-block-details"><summary>' . esc_html__( 'Which languages are available?', 'illuminated-path' ) . '</summary><p>' . esc_html__( 'Edit this answer as the catalogue grows.', 'illuminated-path' ) . '</p></details><!-- /wp:details -->',
        ),
    );

    foreach ( $patterns as $slug => $pattern ) {
        register_block_pattern(
            'illuminated-path/' . $slug,
            array(
                'title'       => $pattern['title'],
                'description' => $pattern['description'] ?? '',
                'categories'  => array( 'illuminated-path' ),
                'content'     => $pattern['content'],
            )
        );
    }
}
add_action( 'init', 'ip_register_brand_patterns', 22 );
