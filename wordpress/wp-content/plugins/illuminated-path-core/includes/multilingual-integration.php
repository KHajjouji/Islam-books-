<?php
/**
 * Multilingual compatibility for bookstore-specific content.
 *
 * Dedicated multilingual plugins remain the source of truth. This file only
 * exposes our custom post type/taxonomies and assigns a default language to
 * installer-generated content when Polylang is active.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function ip_core_polylang_post_types( array $post_types, bool $is_settings = false ): array {
    $post_types['ip_creator'] = 'ip_creator';
    return $post_types;
}
add_filter( 'pll_get_post_types', 'ip_core_polylang_post_types', 10, 2 );

function ip_core_polylang_taxonomies( array $taxonomies, bool $is_settings = false ): array {
    foreach ( array_keys( ip_core_book_taxonomies() ) as $taxonomy ) {
        $taxonomies[ $taxonomy ] = $taxonomy;
    }
    return $taxonomies;
}
add_filter( 'pll_get_taxonomies', 'ip_core_polylang_taxonomies', 10, 2 );

function ip_core_polylang_default_language(): string {
    if ( ! function_exists( 'pll_default_language' ) ) {
        return '';
    }
    $lang = pll_default_language( 'slug' );
    return is_string( $lang ) ? sanitize_key( $lang ) : '';
}

function ip_core_assign_default_language_to_post( int $post_id ): void {
    if ( ! function_exists( 'pll_set_post_language' ) || ! function_exists( 'pll_get_post_language' ) ) {
        return;
    }
    if ( pll_get_post_language( $post_id, 'slug' ) ) {
        return;
    }
    $lang = ip_core_polylang_default_language();
    if ( $lang ) {
        pll_set_post_language( $post_id, $lang );
    }
}

function ip_core_assign_default_language_to_term( int $term_id ): void {
    if ( ! function_exists( 'pll_set_term_language' ) || ! function_exists( 'pll_get_term_language' ) ) {
        return;
    }
    if ( pll_get_term_language( $term_id, 'slug' ) ) {
        return;
    }
    $lang = ip_core_polylang_default_language();
    if ( $lang ) {
        pll_set_term_language( $term_id, $lang );
    }
}

function ip_core_assign_generated_content_default_language(): void {
    $lang = ip_core_polylang_default_language();
    if ( ! $lang ) {
        return;
    }

    $slugs = array_unique(
        array_merge(
            array_keys( function_exists( 'ip_core_recommended_store_pages' ) ? ip_core_recommended_store_pages() : array() ),
            array_keys( function_exists( 'ip_core_brand_story_pages' ) ? ip_core_brand_story_pages() : array() ),
            array_keys( function_exists( 'ip_core_parent_message_pages' ) ? ip_core_parent_message_pages() : array() ),
            array_keys( function_exists( 'ip_core_production_editorial_pages' ) ? ip_core_production_editorial_pages() : array() ),
            array_keys( function_exists( 'ip_core_production_page_defaults' ) ? ip_core_production_page_defaults() : array() )
        )
    );

    foreach ( $slugs as $slug ) {
        $page = get_page_by_path( $slug, OBJECT, 'page' );
        if ( $page instanceof WP_Post ) {
            ip_core_assign_default_language_to_post( $page->ID );
        }
    }

    foreach ( array_merge( array_keys( ip_core_book_taxonomies() ), array( 'product_cat' ) ) as $taxonomy ) {
        if ( ! taxonomy_exists( $taxonomy ) ) {
            continue;
        }
        $terms = get_terms( array( 'taxonomy' => $taxonomy, 'hide_empty' => false ) );
        if ( is_wp_error( $terms ) ) {
            continue;
        }
        foreach ( $terms as $term ) {
            ip_core_assign_default_language_to_term( $term->term_id );
        }
    }
}

function ip_core_multilingual_after_production_setup(): void {
    if ( function_exists( 'pll_default_language' ) ) {
        ip_core_assign_generated_content_default_language();
    }
}
add_action( 'ip_core_after_production_site_setup', 'ip_core_multilingual_after_production_setup' );
