<?php
/**
 * Reusable storefront shortcodes for WordPress pages and campaigns.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function ip_core_render_product_card( WC_Product $product ): string {
    $permalink = get_permalink( $product->get_id() );
    $image     = $product->get_image( 'woocommerce_thumbnail', array( 'loading' => 'lazy' ) );
    $language  = ip_core_product_term_names( $product->get_id(), 'ip_book_language' );
    $age       = ip_core_product_term_names( $product->get_id(), 'ip_book_age' );

    ob_start();
    ?>
    <article class="ip-shortcode-card">
        <a class="ip-shortcode-card-image" href="<?php echo esc_url( $permalink ); ?>">
            <?php echo wp_kses_post( $image ); ?>
            <?php if ( $product->is_on_sale() ) : ?>
                <span class="ip-sale-pill"><?php esc_html_e( 'Sale', 'illuminated-path-core' ); ?></span>
            <?php endif; ?>
        </a>
        <div class="ip-shortcode-card-body">
            <?php if ( $language || $age ) : ?>
                <p class="ip-shortcode-meta"><?php echo esc_html( implode( ' · ', array_filter( array( $language, $age ) ) ) ); ?></p>
            <?php endif; ?>
            <h3><a href="<?php echo esc_url( $permalink ); ?>"><?php echo esc_html( $product->get_name() ); ?></a></h3>
            <div class="ip-shortcode-price"><?php echo wp_kses_post( $product->get_price_html() ); ?></div>
            <a class="button ip-view-book" href="<?php echo esc_url( $permalink ); ?>"><?php esc_html_e( 'View book', 'illuminated-path-core' ); ?></a>
        </div>
    </article>
    <?php
    return (string) ob_get_clean();
}

function ip_core_shortcode_book_slider( array $atts ): string {
    $atts = shortcode_atts(
        array(
            'title'    => __( 'Featured books', 'illuminated-path-core' ),
            'subtitle' => '',
            'source'   => 'newest',
            'category' => '',
            'series'   => '',
            'language' => '',
            'theme'    => '',
            'age'      => '',
            'format'   => '',
            'ids'      => '',
            'limit'    => 8,
            'link'     => '',
        ),
        $atts,
        'ip_book_slider'
    );

    $query_args = ip_core_catalog_query_args(
        array(
            'limit'    => $atts['limit'],
            'source'   => sanitize_key( $atts['source'] ),
            'category' => sanitize_title( $atts['category'] ),
            'series'   => sanitize_text_field( $atts['series'] ),
            'language' => sanitize_text_field( $atts['language'] ),
            'theme'    => sanitize_text_field( $atts['theme'] ),
            'age'      => sanitize_text_field( $atts['age'] ),
            'format'   => sanitize_text_field( $atts['format'] ),
            'ids'      => array_filter( array_map( 'absint', explode( ',', (string) $atts['ids'] ) ) ),
        )
    );
    $products = wc_get_products( $query_args );
    if ( empty( $products ) ) {
        return '';
    }

    ob_start();
    ?>
    <section class="ip-shortcode-section ip-book-slider" data-product-rail>
        <div class="ip-shortcode-heading">
            <div>
                <h2><?php echo esc_html( $atts['title'] ); ?></h2>
                <?php if ( $atts['subtitle'] ) : ?><p><?php echo esc_html( $atts['subtitle'] ); ?></p><?php endif; ?>
            </div>
            <?php if ( $atts['link'] ) : ?><a class="ip-section-link" href="<?php echo esc_url( $atts['link'] ); ?>"><?php esc_html_e( 'View all', 'illuminated-path-core' ); ?> →</a><?php endif; ?>
        </div>
        <div class="ip-slider-shell">
            <button class="rail-arrow rail-prev" type="button" aria-label="<?php esc_attr_e( 'Previous books', 'illuminated-path-core' ); ?>">‹</button>
            <div class="ip-shortcode-track" data-product-track>
                <?php foreach ( $products as $product ) : echo ip_core_render_product_card( $product ); endforeach; ?>
            </div>
            <button class="rail-arrow rail-next" type="button" aria-label="<?php esc_attr_e( 'Next books', 'illuminated-path-core' ); ?>">›</button>
        </div>
    </section>
    <?php
    return (string) ob_get_clean();
}
add_shortcode( 'ip_book_slider', 'ip_core_shortcode_book_slider' );

function ip_core_shortcode_book_grid( array $atts ): string {
    $atts = shortcode_atts(
        array(
            'source'   => 'newest',
            'category' => '',
            'series'   => '',
            'language' => '',
            'theme'    => '',
            'age'      => '',
            'format'   => '',
            'ids'      => '',
            'limit'    => 12,
        ),
        $atts,
        'ip_book_grid'
    );
    $products = wc_get_products(
        ip_core_catalog_query_args(
            array(
                'limit'    => $atts['limit'],
                'source'   => sanitize_key( $atts['source'] ),
                'category' => sanitize_title( $atts['category'] ),
                'series'   => sanitize_text_field( $atts['series'] ),
                'language' => sanitize_text_field( $atts['language'] ),
                'theme'    => sanitize_text_field( $atts['theme'] ),
                'age'      => sanitize_text_field( $atts['age'] ),
                'format'   => sanitize_text_field( $atts['format'] ),
                'ids'      => array_filter( array_map( 'absint', explode( ',', (string) $atts['ids'] ) ) ),
            )
        )
    );
    if ( empty( $products ) ) {
        return '';
    }
    $html = '<div class="ip-shortcode-grid">';
    foreach ( $products as $product ) {
        $html .= ip_core_render_product_card( $product );
    }
    return $html . '</div>';
}
add_shortcode( 'ip_book_grid', 'ip_core_shortcode_book_grid' );

function ip_core_shortcode_book_search( array $atts ): string {
    $atts = shortcode_atts( array( 'placeholder' => __( 'Search books, authors or series…', 'illuminated-path-core' ) ), $atts, 'ip_book_search' );
    ob_start();
    ?>
    <form class="ip-book-search" role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
        <label class="screen-reader-text" for="ip-book-search-field"><?php esc_html_e( 'Search books', 'illuminated-path-core' ); ?></label>
        <input id="ip-book-search-field" type="search" name="s" value="<?php echo esc_attr( get_search_query() ); ?>" placeholder="<?php echo esc_attr( $atts['placeholder'] ); ?>">
        <input type="hidden" name="post_type" value="product">
        <button type="submit"><?php esc_html_e( 'Search', 'illuminated-path-core' ); ?></button>
    </form>
    <?php
    return (string) ob_get_clean();
}
add_shortcode( 'ip_book_search', 'ip_core_shortcode_book_search' );

function ip_core_shortcode_collection_grid( array $atts ): string {
    $atts = shortcode_atts( array( 'taxonomy' => 'product_cat', 'limit' => 8, 'hide_empty' => 'yes' ), $atts, 'ip_collection_grid' );
    $taxonomy = taxonomy_exists( $atts['taxonomy'] ) ? $atts['taxonomy'] : 'product_cat';
    $terms = get_terms(
        array(
            'taxonomy'   => $taxonomy,
            'hide_empty' => 'yes' === $atts['hide_empty'],
            'number'     => absint( $atts['limit'] ),
        )
    );
    if ( is_wp_error( $terms ) || empty( $terms ) ) {
        return '';
    }
    ob_start();
    echo '<div class="ip-collection-shortcode-grid">';
    foreach ( $terms as $term ) {
        $url = get_term_link( $term );
        if ( is_wp_error( $url ) ) {
            continue;
        }
        echo '<a class="ip-collection-shortcode-card" href="' . esc_url( $url ) . '"><span class="ip-collection-shortcode-count">' . esc_html( (string) $term->count ) . '</span><h3>' . esc_html( $term->name ) . '</h3><p>' . esc_html( wp_trim_words( wp_strip_all_tags( $term->description ), 18 ) ) . '</p><span>' . esc_html__( 'Explore', 'illuminated-path-core' ) . ' →</span></a>';
    }
    echo '</div>';
    return (string) ob_get_clean();
}
add_shortcode( 'ip_collection_grid', 'ip_core_shortcode_collection_grid' );
