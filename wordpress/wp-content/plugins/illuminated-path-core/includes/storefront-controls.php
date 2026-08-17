<?php
/**
 * Reusable storefront shortcodes for WordPress pages, Elementor and campaigns.
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
        $thumb_id = absint( get_term_meta( $term->term_id, 'thumbnail_id', true ) );
        $image    = $thumb_id ? wp_get_attachment_image( $thumb_id, 'medium_large', false, array( 'loading' => 'lazy' ) ) : '';
        echo '<a class="ip-collection-shortcode-card" href="' . esc_url( $url ) . '">';
        if ( $image ) { echo '<span class="ip-collection-shortcode-image">' . wp_kses_post( $image ) . '</span>'; }
        echo '<span class="ip-collection-shortcode-count">' . esc_html( (string) $term->count ) . '</span><h3>' . esc_html( $term->name ) . '</h3><p>' . esc_html( wp_trim_words( wp_strip_all_tags( $term->description ), 18 ) ) . '</p><span>' . esc_html__( 'Explore', 'illuminated-path-core' ) . ' →</span></a>';
    }
    echo '</div>';
    return (string) ob_get_clean();
}
add_shortcode( 'ip_collection_grid', 'ip_core_shortcode_collection_grid' );

/** Single-product editorial spotlight for homepages and campaign pages. */
function ip_core_shortcode_product_spotlight( array $atts ): string {
    $atts = shortcode_atts(
        array(
            'id'         => 0,
            'eyebrow'    => __( 'Featured book', 'illuminated-path-core' ),
            'heading'    => '',
            'body'       => '',
            'badge'      => '',
            'button'     => __( 'Discover the book', 'illuminated-path-core' ),
            'image_side' => 'left',
        ),
        $atts,
        'ip_product_spotlight'
    );
    $product = wc_get_product( absint( $atts['id'] ) );
    if ( ! $product || 'publish' !== get_post_status( $product->get_id() ) ) {
        return '';
    }
    $heading  = trim( (string) $atts['heading'] ) ?: $product->get_name();
    $body     = trim( (string) $atts['body'] );
    $subtitle = trim( (string) $product->get_meta( '_ip_book_subtitle' ) );
    if ( ! $body ) {
        $body = wp_trim_words( wp_strip_all_tags( $product->get_short_description() ?: $product->get_description() ), 42 );
    }
    $side = 'right' === $atts['image_side'] ? 'right' : 'left';
    ob_start();
    ?>
    <section class="ip-product-spotlight ip-image-<?php echo esc_attr( $side ); ?>">
        <a class="ip-product-spotlight-image" href="<?php echo esc_url( get_permalink( $product->get_id() ) ); ?>">
            <?php echo wp_kses_post( $product->get_image( 'woocommerce_single', array( 'loading' => 'lazy' ) ) ); ?>
        </a>
        <div class="ip-product-spotlight-copy">
            <span class="ip-spotlight-eyebrow"><?php echo esc_html( $atts['eyebrow'] ); ?></span>
            <?php if ( $atts['badge'] ) : ?><span class="ip-spotlight-badge"><?php echo esc_html( $atts['badge'] ); ?></span><?php endif; ?>
            <h2><?php echo esc_html( $heading ); ?></h2>
            <?php if ( $subtitle ) : ?><p class="ip-spotlight-subtitle"><?php echo esc_html( $subtitle ); ?></p><?php endif; ?>
            <p><?php echo esc_html( $body ); ?></p>
            <div class="ip-spotlight-price"><?php echo wp_kses_post( $product->get_price_html() ); ?></div>
            <a class="button" href="<?php echo esc_url( get_permalink( $product->get_id() ) ); ?>"><?php echo esc_html( $atts['button'] ); ?> →</a>
        </div>
    </section>
    <?php
    return (string) ob_get_clean();
}
add_shortcode( 'ip_product_spotlight', 'ip_core_shortcode_product_spotlight' );

/** Approved WooCommerce reviews as social proof for landing pages. */
function ip_core_shortcode_review_grid( array $atts ): string {
    $atts = shortcode_atts( array( 'title' => __( 'What families are saying', 'illuminated-path-core' ), 'limit' => 3 ), $atts, 'ip_review_grid' );
    $comments = get_comments(
        array(
            'status'    => 'approve',
            'post_type' => 'product',
            'number'    => max( 1, min( 12, absint( $atts['limit'] ) ) ),
            'meta_query' => array(
                array( 'key' => 'rating', 'value' => 0, 'compare' => '>' ),
            ),
        )
    );
    if ( ! $comments ) {
        return '';
    }
    ob_start();
    ?>
    <section class="ip-review-section">
        <?php if ( $atts['title'] ) : ?><div class="ip-shortcode-heading"><div><h2><?php echo esc_html( $atts['title'] ); ?></h2></div></div><?php endif; ?>
        <div class="ip-review-grid">
            <?php foreach ( $comments as $comment ) :
                $rating = max( 1, min( 5, absint( get_comment_meta( $comment->comment_ID, 'rating', true ) ) ) );
                $product_name = get_the_title( $comment->comment_post_ID );
                ?>
                <article class="ip-review-card">
                    <div class="ip-review-stars" aria-label="<?php echo esc_attr( sprintf( __( '%d out of 5 stars', 'illuminated-path-core' ), $rating ) ); ?>"><?php echo esc_html( str_repeat( '★', $rating ) . str_repeat( '☆', 5 - $rating ) ); ?></div>
                    <blockquote><?php echo esc_html( wp_trim_words( wp_strip_all_tags( $comment->comment_content ), 38 ) ); ?></blockquote>
                    <p><strong><?php echo esc_html( $comment->comment_author ); ?></strong><?php if ( $product_name ) : ?><span><?php echo esc_html( $product_name ); ?></span><?php endif; ?></p>
                </article>
            <?php endforeach; ?>
        </div>
    </section>
    <?php
    return (string) ob_get_clean();
}
add_shortcode( 'ip_review_grid', 'ip_core_shortcode_review_grid' );
