<?php
/**
 * Book-specific catalog taxonomies and shared query helpers.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function ip_core_book_taxonomies(): array {
    return array(
        'ip_book_author' => array(
            'singular' => __( 'Author', 'illuminated-path-core' ),
            'plural'   => __( 'Authors', 'illuminated-path-core' ),
            'slug'     => 'book-author',
        ),
        'ip_book_series' => array(
            'singular' => __( 'Series', 'illuminated-path-core' ),
            'plural'   => __( 'Series', 'illuminated-path-core' ),
            'slug'     => 'book-series',
        ),
        'ip_book_language' => array(
            'singular' => __( 'Book language', 'illuminated-path-core' ),
            'plural'   => __( 'Book languages', 'illuminated-path-core' ),
            'slug'     => 'book-language',
        ),
        'ip_book_age' => array(
            'singular' => __( 'Age range', 'illuminated-path-core' ),
            'plural'   => __( 'Age ranges', 'illuminated-path-core' ),
            'slug'     => 'book-age',
        ),
        'ip_book_format' => array(
            'singular' => __( 'Book format', 'illuminated-path-core' ),
            'plural'   => __( 'Book formats', 'illuminated-path-core' ),
            'slug'     => 'book-format',
        ),
        'ip_book_theme' => array(
            'singular' => __( 'Book theme', 'illuminated-path-core' ),
            'plural'   => __( 'Book themes', 'illuminated-path-core' ),
            'slug'     => 'book-theme',
        ),
    );
}

function ip_core_register_book_taxonomies(): void {
    foreach ( ip_core_book_taxonomies() as $taxonomy => $config ) {
        $labels = array(
            'name'                       => $config['plural'],
            'singular_name'              => $config['singular'],
            'search_items'               => sprintf( __( 'Search %s', 'illuminated-path-core' ), $config['plural'] ),
            'all_items'                  => sprintf( __( 'All %s', 'illuminated-path-core' ), $config['plural'] ),
            'edit_item'                  => sprintf( __( 'Edit %s', 'illuminated-path-core' ), $config['singular'] ),
            'update_item'                => sprintf( __( 'Update %s', 'illuminated-path-core' ), $config['singular'] ),
            'add_new_item'               => sprintf( __( 'Add new %s', 'illuminated-path-core' ), $config['singular'] ),
            'new_item_name'              => sprintf( __( 'New %s name', 'illuminated-path-core' ), $config['singular'] ),
            'menu_name'                  => $config['plural'],
            'separate_items_with_commas' => sprintf( __( 'Separate %s with commas', 'illuminated-path-core' ), strtolower( $config['plural'] ) ),
            'add_or_remove_items'        => sprintf( __( 'Add or remove %s', 'illuminated-path-core' ), strtolower( $config['plural'] ) ),
            'choose_from_most_used'      => sprintf( __( 'Choose from the most used %s', 'illuminated-path-core' ), strtolower( $config['plural'] ) ),
        );

        register_taxonomy(
            $taxonomy,
            array( 'product' ),
            array(
                'labels'            => $labels,
                'public'            => true,
                'show_ui'           => true,
                'show_admin_column' => true,
                'show_in_rest'      => true,
                'hierarchical'      => in_array( $taxonomy, array( 'ip_book_series', 'ip_book_language', 'ip_book_age', 'ip_book_format', 'ip_book_theme' ), true ),
                'rewrite'           => array( 'slug' => $config['slug'], 'with_front' => false ),
                'query_var'         => true,
            )
        );
    }
}
add_action( 'init', 'ip_core_register_book_taxonomies', 8 );

function ip_core_get_product_terms( int $product_id, string $taxonomy ): array {
    $terms = get_the_terms( $product_id, $taxonomy );
    if ( ! is_array( $terms ) ) {
        return array();
    }
    return $terms;
}

function ip_core_product_term_names( int $product_id, string $taxonomy ): string {
    $names = wp_list_pluck( ip_core_get_product_terms( $product_id, $taxonomy ), 'name' );
    return implode( ', ', array_map( 'strval', $names ) );
}

function ip_core_catalog_query_args( array $args = array() ): array {
    $defaults = array(
        'limit'    => 8,
        'source'   => 'newest',
        'category' => '',
        'series'   => '',
        'language' => '',
        'theme'    => '',
        'age'      => '',
        'format'   => '',
        'ids'      => array(),
    );
    $args = wp_parse_args( $args, $defaults );
    $query = array(
        'status'  => 'publish',
        'limit'   => max( 1, absint( $args['limit'] ) ),
        'return'  => 'objects',
        'orderby' => 'date',
        'order'   => 'DESC',
    );

    if ( 'featured' === $args['source'] ) {
        $query['featured'] = true;
    } elseif ( 'sale' === $args['source'] ) {
        $sale_ids = wc_get_product_ids_on_sale();
        if ( empty( $sale_ids ) ) {
            return array( 'include' => array( 0 ), 'limit' => $query['limit'], 'return' => 'objects' );
        }
        $query['include'] = array_map( 'absint', $sale_ids );
    } elseif ( 'best_selling' === $args['source'] ) {
        $query['orderby'] = 'popularity';
    } elseif ( 'top_rated' === $args['source'] ) {
        $query['orderby'] = 'rating';
    } elseif ( 'manual' === $args['source'] && ! empty( $args['ids'] ) ) {
        $query['include'] = array_map( 'absint', (array) $args['ids'] );
        $query['orderby'] = 'include';
    }

    if ( ! empty( $args['category'] ) ) {
        $query['category'] = array( sanitize_title( (string) $args['category'] ) );
    }

    foreach ( array( 'series', 'language', 'theme', 'age', 'format' ) as $arg_key ) {
        if ( ! empty( $args[ $arg_key ] ) ) {
            $query[ 'ip_' . $arg_key ] = sanitize_text_field( (string) $args[ $arg_key ] );
        }
    }
    return $query;
}

function ip_core_extend_wc_product_query( array $query, array $query_vars ): array {
    $taxonomy_map = array(
        'ip_series'   => 'ip_book_series',
        'ip_language' => 'ip_book_language',
        'ip_theme'    => 'ip_book_theme',
        'ip_age'      => 'ip_book_age',
        'ip_format'   => 'ip_book_format',
    );
    foreach ( $taxonomy_map as $query_var => $taxonomy ) {
        if ( empty( $query_vars[ $query_var ] ) ) {
            continue;
        }
        if ( ! isset( $query['tax_query'] ) || ! is_array( $query['tax_query'] ) ) {
            $query['tax_query'] = array();
        }
        $query['tax_query'][] = array(
            'taxonomy' => $taxonomy,
            'field'    => 'slug',
            'terms'    => array_map( 'sanitize_title', array_filter( array_map( 'trim', explode( ',', (string) $query_vars[ $query_var ] ) ) ) ),
        );
    }
    return $query;
}
add_filter( 'woocommerce_product_data_store_cpt_get_products_query', 'ip_core_extend_wc_product_query', 10, 2 );

function ip_core_seed_catalog_terms(): void {
    $seed = array(
        'ip_book_language' => array( 'English' => 'english', 'Français' => 'french', 'العربية' => 'arabic' ),
        'ip_book_age'      => array( '0–3 years' => '0-3-years', '4–6 years' => '4-6-years', '7–9 years' => '7-9-years', '10–12 years' => '10-12-years' ),
        'ip_book_format'   => array( 'Hardcover' => 'hardcover', 'Paperback' => 'paperback', 'Board book' => 'board-book', 'Digital' => 'digital' ),
        'ip_book_theme'    => array( 'Quran' => 'quran', 'Prophets' => 'prophets', 'Ramadan & Eid' => 'ramadan-eid', 'Bedtime' => 'bedtime', 'Akhlaq & Values' => 'akhlaq-values', 'Bilingual' => 'bilingual' ),
    );
    foreach ( $seed as $taxonomy => $terms ) {
        if ( ! taxonomy_exists( $taxonomy ) ) {
            continue;
        }
        foreach ( $terms as $name => $slug ) {
            if ( ! term_exists( $slug, $taxonomy ) ) {
                wp_insert_term( $name, $taxonomy, array( 'slug' => $slug ) );
            }
        }
    }
}
