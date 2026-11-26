<?php
/** Elementor compatibility for the custom bookstore theme. */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register every core Elementor Pro Theme Builder location.
 * Header/footer/single/archive templates can then replace the theme fallback.
 */
function ip_elementor_register_locations( $elementor_theme_manager ): void {
    if ( is_object( $elementor_theme_manager ) && method_exists( $elementor_theme_manager, 'register_all_core_location' ) ) {
        $elementor_theme_manager->register_all_core_location();
    }
}
add_action( 'elementor/theme/register_locations', 'ip_elementor_register_locations' );

/** Determine whether a page is actually built with Elementor. */
function ip_is_elementor_built( int $post_id = 0 ): bool {
    $post_id = $post_id ?: (int) get_queried_object_id();
    if ( ! $post_id || ! did_action( 'elementor/loaded' ) || ! class_exists( '\\Elementor\\Plugin' ) ) {
        return false;
    }

    try {
        $document = \Elementor\Plugin::$instance->documents->get( $post_id );
        return $document && method_exists( $document, 'is_built_with_elementor' ) && $document->is_built_with_elementor();
    } catch ( Throwable $e ) {
        return false;
    }
}

/** Render an Elementor Theme Builder location when available. */
function ip_elementor_do_location( string $location ): bool {
    return function_exists( 'elementor_theme_do_location' ) && elementor_theme_do_location( $location );
}

function ip_elementor_body_class( array $classes ): array {
    if ( ip_is_elementor_built() ) {
        $classes[] = 'ip-elementor-page';
    }
    return $classes;
}
add_filter( 'body_class', 'ip_elementor_body_class' );
