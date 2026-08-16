<?php
/**
 * Bookstore filtering, archive headers and catalog utilities.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function ip_book_taxonomies_available(): array {
    if ( function_exists( 'ip_core_book_taxonomies' ) ) {
        return array_keys( ip_core_book_taxonomies() );
    }
    return array( 'ip_book_author', 'ip_book_series', 'ip_book_language', 'ip_book_age', 'ip_book_format', 'ip_book_theme' );
}

function ip_is_book_catalog_context(): bool {
    return function_exists( 'is_shop' ) && ( is_shop() || is_product_category() || is_product_tag() || is_tax( ip_book_taxonomies_available() ) || ( is_search() && 'product' === get_query_var( 'post_type' ) ) );
}

function ip_catalog_selected( string $key ): string {
    return isset( $_GET[ $key ] ) ? sanitize_title( wp_unslash( $_GET[ $key ] ) ) : '';
}

function ip_catalog_term_select( string $taxonomy, string $name, string $label ): void {
    if ( ! taxonomy_exists( $taxonomy ) ) {
        return;
    }
    $terms = get_terms( array( 'taxonomy' => $taxonomy, 'hide_empty' => true ) );
    if ( is_wp_error( $terms ) || empty( $terms ) ) {
        return;
    }
    $selected = ip_catalog_selected( $name );
    echo '<label><span>' . esc_html( $label ) . '</span><select name="' . esc_attr( $name ) . '"><option value="">' . esc_html__( 'All', 'illuminated-path' ) . '</option>';
    foreach ( $terms as $term ) {
        echo '<option value="' . esc_attr( $term->slug ) . '"' . selected( $selected, $term->slug, false ) . '>' . esc_html( $term->name ) . '</option>';
    }
    echo '</select></label>';
}

function ip_catalog_filter_form(): void {
    if ( ! class_exists( 'WooCommerce' ) ) {
        return;
    }
    $search = isset( $_GET['s'] ) ? sanitize_text_field( wp_unslash( $_GET['s'] ) ) : '';
    ?>
    <section class="ip-catalog-tools" data-catalog-tools>
        <button type="button" class="ip-filter-toggle" data-filter-toggle aria-expanded="false"><?php esc_html_e( 'Filters', 'illuminated-path' ); ?></button>
        <form class="ip-catalog-filter" method="get" action="<?php echo esc_url( ip_shop_url() ); ?>" data-filter-form>
            <label class="ip-catalog-search"><span><?php esc_html_e( 'Search', 'illuminated-path' ); ?></span><input type="search" name="s" value="<?php echo esc_attr( $search ); ?>" placeholder="<?php echo esc_attr( ip_text( 'search' ) ); ?>"></label>
            <input type="hidden" name="post_type" value="product">
            <?php
            ip_catalog_term_select( 'ip_book_language', 'book_language', __( 'Language', 'illuminated-path' ) );
            ip_catalog_term_select( 'ip_book_age', 'book_age', __( 'Age', 'illuminated-path' ) );
            ip_catalog_term_select( 'ip_book_theme', 'book_theme', __( 'Theme', 'illuminated-path' ) );
            ip_catalog_term_select( 'ip_book_series', 'book_series', __( 'Series', 'illuminated-path' ) );
            ip_catalog_term_select( 'ip_book_format', 'book_format', __( 'Format', 'illuminated-path' ) );
            ?>
            <label><span><?php esc_html_e( 'Availability', 'illuminated-path' ); ?></span><select name="availability"><option value=""><?php esc_html_e( 'All', 'illuminated-path' ); ?></option><option value="instock" <?php selected( ip_catalog_selected( 'availability' ), 'instock' ); ?>><?php esc_html_e( 'In stock', 'illuminated-path' ); ?></option><option value="sale" <?php selected( ip_catalog_selected( 'availability' ), 'sale' ); ?>><?php esc_html_e( 'On sale', 'illuminated-path' ); ?></option></select></label>
            <?php if ( isset( $_GET['orderby'] ) ) : ?><input type="hidden" name="orderby" value="<?php echo esc_attr( sanitize_text_field( wp_unslash( $_GET['orderby'] ) ) ); ?>"><?php endif; ?>
            <button class="btn btn-primary" type="submit"><?php esc_html_e( 'Apply', 'illuminated-path' ); ?></button>
            <a class="ip-clear-filters" href="<?php echo esc_url( ip_shop_url() ); ?>"><?php esc_html_e( 'Clear', 'illuminated-path' ); ?></a>
        </form>
    </section>
    <?php
}
add_action( 'woocommerce_before_shop_loop', 'ip_catalog_filter_form', 5 );

function ip_catalog_apply_filters( WP_Query $query ): void {
    if ( is_admin() || ! $query->is_main_query() || ! ip_is_book_catalog_context() ) {
        return;
    }

    $map = array(
        'book_language' => 'ip_book_language',
        'book_age'      => 'ip_book_age',
        'book_theme'    => 'ip_book_theme',
        'book_series'   => 'ip_book_series',
        'book_format'   => 'ip_book_format',
    );
    $tax_query = (array) $query->get( 'tax_query' );
    foreach ( $map as $param => $taxonomy ) {
        $value = ip_catalog_selected( $param );
        if ( $value && taxonomy_exists( $taxonomy ) ) {
            $tax_query[] = array(
                'taxonomy' => $taxonomy,
                'field'    => 'slug',
                'terms'    => array( $value ),
            );
        }
    }
    if ( $tax_query ) {
        $query->set( 'tax_query', $tax_query );
    }

    $availability = ip_catalog_selected( 'availability' );
    if ( 'instock' === $availability ) {
        $meta_query   = (array) $query->get( 'meta_query' );
        $meta_query[] = array( 'key' => '_stock_status', 'value' => 'instock' );
        $query->set( 'meta_query', $meta_query );
    } elseif ( 'sale' === $availability && function_exists( 'wc_get_product_ids_on_sale' ) ) {
        $sale_ids = wc_get_product_ids_on_sale();
        $query->set( 'post__in', $sale_ids ? $sale_ids : array( 0 ) );
    }
}
add_action( 'pre_get_posts', 'ip_catalog_apply_filters', 40 );

function ip_catalog_archive_intro(): void {
    if ( ! ip_is_book_catalog_context() ) {
        return;
    }
    echo '<div class="ip-shop-intro"><span class="section-kicker">' . esc_html__( 'Bookstore', 'illuminated-path' ) . '</span>';
    if ( is_shop() ) {
        echo '<h1>' . esc_html__( 'Islamic Children’s Bookstore', 'illuminated-path' ) . '</h1><p>' . esc_html__( 'Discover faith-centered books by age, language, theme, series and format.', 'illuminated-path' ) . '</p>';
    } elseif ( is_tax() || is_product_category() || is_product_tag() ) {
        $term = get_queried_object();
        if ( $term instanceof WP_Term ) {
            echo '<h1>' . esc_html( $term->name ) . '</h1>';
            if ( $term->description ) {
                echo '<div class="ip-term-description">' . wp_kses_post( wpautop( $term->description ) ) . '</div>';
            }
        }
    } elseif ( is_search() ) {
        echo '<h1>' . sprintf( esc_html__( 'Search results for “%s”', 'illuminated-path' ), esc_html( get_search_query() ) ) . '</h1>';
    }
    echo '</div>';
}
add_action( 'woocommerce_before_main_content', 'ip_catalog_archive_intro', 15 );

/**
 * Extend customer-facing product search to book metadata and taxonomies such as
 * author, series, language and ISBN. This is intentionally scoped to product
 * searches only so normal WordPress article search is untouched.
 */
function ip_catalog_product_search_sql( string $search, WP_Query $query ): string {
    if ( is_admin() || ! $query->is_main_query() || ! $query->is_search() || 'product' !== $query->get( 'post_type' ) ) {
        return $search;
    }
    $raw = trim( (string) $query->get( 's' ) );
    if ( '' === $raw ) {
        return $search;
    }

    global $wpdb;
    $tokens = preg_split( '/\s+/', $raw );
    $tokens = array_slice( array_values( array_filter( array_map( 'sanitize_text_field', (array) $tokens ), static fn( $token ) => mb_strlen( $token ) >= 2 ) ), 0, 8 );
    if ( empty( $tokens ) ) {
        $tokens = array( $raw );
    }

    $taxonomy_placeholders = implode( ',', array_fill( 0, count( ip_book_taxonomies_available() ), '%s' ) );
    $taxonomy_values       = ip_book_taxonomies_available();
    $clauses               = array();

    foreach ( $tokens as $token ) {
        $like = '%' . $wpdb->esc_like( $token ) . '%';
        $sql  = "(
            {$wpdb->posts}.post_title LIKE %s
            OR {$wpdb->posts}.post_excerpt LIKE %s
            OR {$wpdb->posts}.post_content LIKE %s
            OR EXISTS (
                SELECT 1 FROM {$wpdb->postmeta} ipm
                WHERE ipm.post_id = {$wpdb->posts}.ID
                AND ipm.meta_key IN ('_sku','_ip_isbn','_ip_book_subtitle','_ip_publisher','_ip_illustrator')
                AND ipm.meta_value LIKE %s
            )
            OR EXISTS (
                SELECT 1 FROM {$wpdb->term_relationships} iptr
                INNER JOIN {$wpdb->term_taxonomy} iptt ON iptt.term_taxonomy_id = iptr.term_taxonomy_id
                INNER JOIN {$wpdb->terms} ipt ON ipt.term_id = iptt.term_id
                WHERE iptr.object_id = {$wpdb->posts}.ID
                AND iptt.taxonomy IN ({$taxonomy_placeholders})
                AND (ipt.name LIKE %s OR ipt.slug LIKE %s)
            )
        )";
        $values = array_merge( array( $like, $like, $like, $like ), $taxonomy_values, array( $like, $like ) );
        $clauses[] = $wpdb->prepare( $sql, $values );
    }

    return ' AND (' . implode( ' AND ', $clauses ) . ') ';
}
add_filter( 'posts_search', 'ip_catalog_product_search_sql', 30, 2 );

function ip_book_taxonomy_template( string $template ): string {
    if ( is_tax( ip_book_taxonomies_available() ) ) {
        $book_template = locate_template( 'taxonomy-book.php' );
        if ( $book_template ) {
            return $book_template;
        }
    }
    return $template;
}
add_filter( 'template_include', 'ip_book_taxonomy_template', 40 );
