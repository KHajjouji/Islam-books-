<?php
/**
 * Safe public book metadata on the WooCommerce Store API.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use Automattic\WooCommerce\StoreApi\Schemas\V1\ProductSchema;

function ip_core_register_store_api_data(): void {
    if ( ! function_exists( 'woocommerce_store_api_register_endpoint_data' ) || ! class_exists( ProductSchema::class ) ) {
        return;
    }
    woocommerce_store_api_register_endpoint_data(
        array(
            'endpoint'        => ProductSchema::IDENTIFIER,
            'namespace'       => 'illuminated-path',
            'data_callback'   => static function ( WC_Product $product ): array {
                return array(
                    'subtitle'         => (string) $product->get_meta( '_ip_book_subtitle' ),
                    'isbn'             => (string) $product->get_meta( '_ip_isbn' ),
                    'authors'          => wp_list_pluck( ip_core_get_product_terms( $product->get_id(), 'ip_book_author' ), 'name' ),
                    'series'           => wp_list_pluck( ip_core_get_product_terms( $product->get_id(), 'ip_book_series' ), 'name' ),
                    'languages'        => wp_list_pluck( ip_core_get_product_terms( $product->get_id(), 'ip_book_language' ), 'name' ),
                    'age_ranges'       => wp_list_pluck( ip_core_get_product_terms( $product->get_id(), 'ip_book_age' ), 'name' ),
                    'formats'          => wp_list_pluck( ip_core_get_product_terms( $product->get_id(), 'ip_book_format' ), 'name' ),
                    'themes'           => wp_list_pluck( ip_core_get_product_terms( $product->get_id(), 'ip_book_theme' ), 'name' ),
                    'pages'            => absint( $product->get_meta( '_ip_page_count' ) ),
                    'publisher'        => (string) $product->get_meta( '_ip_publisher' ),
                    'publication_date' => (string) $product->get_meta( '_ip_publication_date' ),
                );
            },
            'schema_callback' => static function (): array {
                return array(
                    'properties' => array(
                        'subtitle'         => array( 'type' => 'string', 'readonly' => true ),
                        'isbn'             => array( 'type' => 'string', 'readonly' => true ),
                        'authors'          => array( 'type' => 'array', 'items' => array( 'type' => 'string' ), 'readonly' => true ),
                        'series'           => array( 'type' => 'array', 'items' => array( 'type' => 'string' ), 'readonly' => true ),
                        'languages'        => array( 'type' => 'array', 'items' => array( 'type' => 'string' ), 'readonly' => true ),
                        'age_ranges'       => array( 'type' => 'array', 'items' => array( 'type' => 'string' ), 'readonly' => true ),
                        'formats'          => array( 'type' => 'array', 'items' => array( 'type' => 'string' ), 'readonly' => true ),
                        'themes'           => array( 'type' => 'array', 'items' => array( 'type' => 'string' ), 'readonly' => true ),
                        'pages'            => array( 'type' => 'integer', 'readonly' => true ),
                        'publisher'        => array( 'type' => 'string', 'readonly' => true ),
                        'publication_date' => array( 'type' => 'string', 'readonly' => true ),
                    ),
                );
            },
            'schema_type'     => ARRAY_A,
        )
    );
}
add_action( 'woocommerce_blocks_loaded', 'ip_core_register_store_api_data' );
