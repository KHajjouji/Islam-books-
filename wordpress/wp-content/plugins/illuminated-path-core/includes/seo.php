<?php
/**
 * Structured commerce metadata. Dedicated SEO plugins remain responsible for
 * titles, canonical URLs, hreflang, sitemaps and social metadata.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function ip_core_extend_product_structured_data( array $markup, WC_Product $product ): array {
    $isbn = trim( (string) $product->get_meta( '_ip_isbn' ) );
    if ( $isbn ) {
        $markup['isbn'] = $isbn;
    }

    $publisher = trim( (string) $product->get_meta( '_ip_publisher' ) );
    if ( $publisher && empty( $markup['brand'] ) ) {
        $markup['brand'] = array(
            '@type' => 'Brand',
            'name'  => $publisher,
        );
    }

    $author = ip_core_product_term_names( $product->get_id(), 'ip_book_author' );
    $series = ip_core_product_term_names( $product->get_id(), 'ip_book_series' );
    $pages  = absint( $product->get_meta( '_ip_page_count' ) );

    $additional = isset( $markup['additionalProperty'] ) && is_array( $markup['additionalProperty'] ) ? $markup['additionalProperty'] : array();
    foreach (
        array_filter(
            array(
                __( 'Author', 'illuminated-path-core' ) => $author,
                __( 'Series', 'illuminated-path-core' ) => $series,
                __( 'Pages', 'illuminated-path-core' )  => $pages ? (string) $pages : '',
            )
        ) as $name => $value
    ) {
        $additional[] = array(
            '@type' => 'PropertyValue',
            'name'  => $name,
            'value' => $value,
        );
    }
    if ( $additional ) {
        $markup['additionalProperty'] = $additional;
    }

    return $markup;
}
add_filter( 'woocommerce_structured_data_product', 'ip_core_extend_product_structured_data', 10, 2 );

function ip_core_taxonomy_document_title( array $parts ): array {
    if ( is_tax( array_keys( ip_core_book_taxonomies() ) ) ) {
        $term = get_queried_object();
        if ( $term instanceof WP_Term ) {
            $parts['title'] = $term->name;
        }
    }
    return $parts;
}
add_filter( 'document_title_parts', 'ip_core_taxonomy_document_title' );
