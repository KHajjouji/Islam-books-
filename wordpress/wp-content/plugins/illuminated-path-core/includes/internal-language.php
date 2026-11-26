<?php
/**
 * Internal multilingual routing for Little Muslim Books.
 *
 * Editorial/page translations live inside the content pack. The active
 * language is selected by a clean /{lang}/ URL prefix, query fallback or
 * cookie. External multilingual plugins are optional, not required.
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

function ip_core_languages(): array {
    return array(
        'en' => array( 'label' => 'English',  'native' => 'English',  'locale' => 'en_US', 'dir' => 'ltr' ),
        'fr' => array( 'label' => 'French',   'native' => 'Français', 'locale' => 'fr_FR', 'dir' => 'ltr' ),
        'es' => array( 'label' => 'Spanish',  'native' => 'Español',  'locale' => 'es_ES', 'dir' => 'ltr' ),
        'ar' => array( 'label' => 'Arabic',   'native' => 'العربية', 'locale' => 'ar',    'dir' => 'rtl' ),
    );
}

function ip_core_default_language(): string {
    $default = sanitize_key( (string) get_option( 'ip_core_default_language', 'en' ) );
    return isset( ip_core_languages()[ $default ] ) ? $default : 'en';
}

function ip_core_register_language_query_var( array $vars ): array {
    $vars[] = 'lmb_lang';
    return $vars;
}
add_filter( 'query_vars', 'ip_core_register_language_query_var' );

function ip_core_language_from_path(): string {
    $path = trim( (string) wp_parse_url( $_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH ), '/' );
    if ( '' === $path ) { return ''; }
    $first = sanitize_key( explode( '/', $path )[0] ?? '' );
    return isset( ip_core_languages()[ $first ] ) ? $first : '';
}

function ip_core_internal_language(): string {
    static $resolved = null;
    if ( null !== $resolved ) { return $resolved; }

    $requested = sanitize_key( (string) get_query_var( 'lmb_lang', '' ) );
    if ( isset( ip_core_languages()[ $requested ] ) ) {
        return $resolved = $requested;
    }

    $path = ip_core_language_from_path();
    if ( $path ) {
        return $resolved = $path;
    }

    if ( isset( $_GET['lmb_lang'] ) ) {
        $query = sanitize_key( wp_unslash( (string) $_GET['lmb_lang'] ) );
        if ( isset( ip_core_languages()[ $query ] ) ) {
            return $resolved = $query;
        }
    }

    if ( isset( $_COOKIE['lmb_lang'] ) ) {
        $cookie = sanitize_key( wp_unslash( (string) $_COOKIE['lmb_lang'] ) );
        if ( isset( ip_core_languages()[ $cookie ] ) ) {
            return $resolved = $cookie;
        }
    }

    return $resolved = ip_core_default_language();
}

function ip_core_language_locale( string $lang = '' ): string {
    $lang = $lang ?: ip_core_internal_language();
    $languages = ip_core_languages();
    return (string) ( $languages[ $lang ]['locale'] ?? 'en_US' );
}

function ip_core_language_dir( string $lang = '' ): string {
    $lang = $lang ?: ip_core_internal_language();
    $languages = ip_core_languages();
    return (string) ( $languages[ $lang ]['dir'] ?? 'ltr' );
}

function ip_core_content_pack_base_slug( string $key ): string {
    $spec = function_exists( 'ip_core_content_pack_spec' ) ? ip_core_content_pack_spec( $key, 'en' ) : array();
    return sanitize_title( (string) ( $spec['slug'] ?? $key ) );
}

function ip_core_content_pack_language_slug( string $key, string $lang ): string {
    $spec = function_exists( 'ip_core_content_pack_spec' ) ? ip_core_content_pack_spec( $key, $lang ) : array();
    return sanitize_title( (string) ( $spec['slug'] ?? ip_core_content_pack_base_slug( $key ) ) );
}

function ip_core_content_pack_key_from_page( int $page_id = 0 ): string {
    $page_id = $page_id ?: (int) get_queried_object_id();
    return $page_id ? sanitize_key( (string) get_post_meta( $page_id, '_ip_content_pack_key', true ) ) : '';
}

function ip_core_internal_page_url( string $key, string $lang ): string {
    $lang = isset( ip_core_languages()[ $lang ] ) ? $lang : ip_core_default_language();
    $slug = ip_core_content_pack_language_slug( $key, $lang );

    if ( 'home' === $key ) {
        return home_url( '/' . $lang . '/' );
    }
    return home_url( '/' . $lang . '/' . $slug . '/' );
}

function ip_core_internal_current_url( string $lang ): string {
    $key = ip_core_content_pack_key_from_page();
    if ( $key ) {
        return ip_core_internal_page_url( $key, $lang );
    }

    if ( is_home() || is_post_type_archive( 'post' ) ) {
        return home_url( '/' . $lang . '/journal/' );
    }

    if ( is_singular( 'post' ) ) {
        $post_key = sanitize_key( (string) get_post_meta( get_queried_object_id(), '_ip_content_pack_post_key', true ) );
        if ( $post_key && function_exists( 'ip_core_content_pack_posts' ) ) {
            $posts = ip_core_content_pack_posts();
            $slug = sanitize_title( (string) ( $posts[ $post_key ][ $lang ]['slug'] ?? $posts[ $post_key ]['en']['slug'] ?? get_post_field( 'post_name', get_queried_object_id() ) ) );
            return home_url( '/' . $lang . '/journal/' . $slug . '/' );
        }
    }

    if ( function_exists( 'wc_get_page_permalink' ) ) {
        if ( is_shop() ) {
            return add_query_arg( 'lmb_lang', $lang, wc_get_page_permalink( 'shop' ) );
        }
        if ( is_cart() ) {
            return add_query_arg( 'lmb_lang', $lang, wc_get_cart_url() );
        }
        if ( is_checkout() ) {
            return add_query_arg( 'lmb_lang', $lang, wc_get_checkout_url() );
        }
        if ( is_account_page() ) {
            return add_query_arg( 'lmb_lang', $lang, wc_get_page_permalink( 'myaccount' ) );
        }
    }

    $url = home_url( add_query_arg( array(), $GLOBALS['wp']->request ?? '' ) );
    return add_query_arg( 'lmb_lang', $lang, $url );
}

function ip_core_internal_language_links(): array {
    $current = ip_core_internal_language();
    $links = array();
    foreach ( ip_core_languages() as $code => $config ) {
        $links[] = array(
            'code'    => strtoupper( $code ),
            'native'  => (string) $config['native'],
            'url'     => ip_core_internal_current_url( $code ),
            'current' => $code === $current,
        );
    }
    return $links;
}

function ip_core_register_internal_rewrites(): void {
    if ( ! function_exists( 'ip_core_content_pack_pages' ) ) { return; }

    foreach ( ip_core_content_pack_pages() as $key => $translations ) {
        $base_slug = ip_core_content_pack_base_slug( $key );
        foreach ( array_keys( ip_core_languages() ) as $lang ) {
            if ( 'home' === $key ) {
                add_rewrite_rule( '^' . preg_quote( $lang, '#' ) . '/?$', 'index.php?pagename=' . $base_slug . '&lmb_lang=' . $lang, 'top' );
                continue;
            }
            $translated_slug = ip_core_content_pack_language_slug( $key, $lang );
            add_rewrite_rule(
                '^' . preg_quote( $lang, '#' ) . '/' . preg_quote( $translated_slug, '#' ) . '/?$',
                'index.php?pagename=' . $base_slug . '&lmb_lang=' . $lang,
                'top'
            );
        }
    }

    if ( function_exists( 'ip_core_content_pack_posts' ) ) {
        foreach ( ip_core_content_pack_posts() as $key => $translations ) {
            $base_slug = sanitize_title( (string) ( $translations['en']['slug'] ?? $key ) );
            foreach ( array_keys( ip_core_languages() ) as $lang ) {
                $translated_slug = sanitize_title( (string) ( $translations[ $lang ]['slug'] ?? $base_slug ) );
                add_rewrite_rule(
                    '^' . preg_quote( $lang, '#' ) . '/journal/' . preg_quote( $translated_slug, '#' ) . '/?$',
                    'index.php?name=' . $base_slug . '&lmb_lang=' . $lang,
                    'top'
                );
            }
        }
    }
}
add_action( 'init', 'ip_core_register_internal_rewrites', 30 );

function ip_core_remember_internal_language(): void {
    $lang = ip_core_internal_language();
    if ( ! headers_sent() && isset( ip_core_languages()[ $lang ] ) ) {
        setcookie(
            'lmb_lang',
            $lang,
            array(
                'expires'  => time() + YEAR_IN_SECONDS,
                'path'     => COOKIEPATH ?: '/',
                'domain'   => COOKIE_DOMAIN,
                'secure'   => is_ssl(),
                'httponly' => false,
                'samesite' => 'Lax',
            )
        );
    }
}
add_action( 'template_redirect', 'ip_core_remember_internal_language', 0 );

function ip_core_internal_language_attributes( string $output ): string {
    $lang = ip_core_internal_language();
    return 'lang="' . esc_attr( $lang ) . '" dir="' . esc_attr( ip_core_language_dir( $lang ) ) . '"';
}
add_filter( 'language_attributes', 'ip_core_internal_language_attributes', 20 );

function ip_core_internal_body_classes( array $classes ): array {
    $lang = ip_core_internal_language();
    $classes[] = 'lmb-lang-' . $lang;
    if ( 'rtl' === ip_core_language_dir( $lang ) ) {
        $classes[] = 'rtl';
    }
    return $classes;
}
add_filter( 'body_class', 'ip_core_internal_body_classes' );

function ip_core_internal_document_title( array $parts ): array {
    $key = ip_core_content_pack_key_from_page();
    if ( $key && function_exists( 'ip_core_content_pack_spec' ) ) {
        $spec = ip_core_content_pack_spec( $key, ip_core_internal_language() );
        if ( ! empty( $spec['title'] ) ) {
            $parts['title'] = wp_strip_all_tags( (string) $spec['title'] );
        }
    }

    if ( is_singular( 'post' ) ) {
        $post_key = sanitize_key( (string) get_post_meta( get_queried_object_id(), '_ip_content_pack_post_key', true ) );
        if ( $post_key && function_exists( 'ip_core_content_pack_posts' ) ) {
            $posts = ip_core_content_pack_posts();
            $lang = ip_core_internal_language();
            if ( ! empty( $posts[ $post_key ][ $lang ]['title'] ) ) {
                $parts['title'] = wp_strip_all_tags( (string) $posts[ $post_key ][ $lang ]['title'] );
            }
        }
    }
    return $parts;
}
add_filter( 'document_title_parts', 'ip_core_internal_document_title', 50 );

function ip_core_internal_hreflang(): void {
    $key = ip_core_content_pack_key_from_page();
    $is_pack_post = is_singular( 'post' ) && get_post_meta( get_queried_object_id(), '_ip_content_pack_post_key', true );
    if ( ! $key && ! $is_pack_post ) { return; }

    foreach ( ip_core_languages() as $code => $config ) {
        echo '<link rel="alternate" hreflang="' . esc_attr( $code ) . '" href="' . esc_url( ip_core_internal_current_url( $code ) ) . '">' . "\n";
    }
    echo '<link rel="alternate" hreflang="x-default" href="' . esc_url( ip_core_internal_current_url( ip_core_default_language() ) ) . '">' . "\n";
}
add_action( 'wp_head', 'ip_core_internal_hreflang', 2 );

function ip_core_internal_canonical(): void {
    $key = ip_core_content_pack_key_from_page();
    $is_pack_post = is_singular( 'post' ) && get_post_meta( get_queried_object_id(), '_ip_content_pack_post_key', true );
    if ( ! $key && ! $is_pack_post ) { return; }
    echo '<link rel="canonical" href="' . esc_url( ip_core_internal_current_url( ip_core_internal_language() ) ) . '">' . "\n";
}
add_action( 'wp_head', 'ip_core_internal_canonical', 3 );
