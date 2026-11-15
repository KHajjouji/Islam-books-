<?php
/**
 * Redirect a small set of public URLs from the original React storefront.
 *
 * Only commercial/book routes that have a clear WordPress equivalent are
 * redirected. Academy routes are intentionally left alone because the Academy
 * is a separate future application.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function ip_core_legacy_storefront_redirects(): void {
    if ( is_admin() || wp_doing_ajax() || is_404() === false ) {
        return;
    }

    $path = trim( (string) wp_parse_url( home_url( add_query_arg( array(), $GLOBALS['wp']->request ?? '' ) ), PHP_URL_PATH ), '/' );
    if ( isset( $GLOBALS['wp']->request ) ) {
        $path = trim( (string) $GLOBALS['wp']->request, '/' );
    }

    $map = array(
        'ramadan-books-for-kids'          => 'ramadan-eid-books',
        'bilingual-islamic-books-for-kids'=> 'bilingual-islamic-books',
    );

    if ( ! isset( $map[ $path ] ) ) {
        return;
    }

    $page = get_page_by_path( $map[ $path ], OBJECT, 'page' );
    if ( ! $page instanceof WP_Post || 'publish' !== $page->post_status ) {
        return;
    }

    wp_safe_redirect( get_permalink( $page ), 301 );
    exit;
}
add_action( 'template_redirect', 'ip_core_legacy_storefront_redirects', 1 );
