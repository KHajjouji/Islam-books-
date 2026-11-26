<?php
/**
 * Single-page multilingual content importer.
 *
 * One WordPress page per concept. Elementor receives one HTML widget containing
 * the four-language JSON payload. The widget is rendered server-side according
 * to the internal Little Muslim Books language router.
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

function ip_core_internal_page_id( string $key ): int {
    $query = new WP_Query(
        array(
            'post_type'      => 'page',
            'post_status'    => array( 'publish', 'draft', 'private', 'pending' ),
            'posts_per_page' => 1,
            'fields'         => 'ids',
            'meta_key'       => '_ip_content_pack_key',
            'meta_value'     => sanitize_key( $key ),
        )
    );
    return $query->posts ? absint( $query->posts[0] ) : 0;
}

function ip_core_internal_post_id( string $key ): int {
    $query = new WP_Query(
        array(
            'post_type'      => 'post',
            'post_status'    => array( 'publish', 'draft', 'private', 'pending' ),
            'posts_per_page' => 1,
            'fields'         => 'ids',
            'meta_key'       => '_ip_content_pack_post_key',
            'meta_value'     => sanitize_key( $key ),
        )
    );
    return $query->posts ? absint( $query->posts[0] ) : 0;
}

function ip_core_internal_page_payload( string $key ): array {
    $pages = ip_core_content_pack_pages();
    return isset( $pages[ $key ] ) && is_array( $pages[ $key ] ) ? $pages[ $key ] : array();
}

function ip_core_internal_html_widget( string $key ): string {
    $payload = ip_core_internal_page_payload( $key );
    $json = wp_json_encode(
        $payload,
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT
    );

    return '<!-- LMB_MULTILINGUAL_PAGE:' . esc_html( $key ) . ' -->'
        . '<div class="lmb-multilingual-source" data-lmb-page-key="' . esc_attr( $key ) . '">'
        . '<script type="application/json" class="lmb-page-translations">' . $json . '</script>'
        . '<p class="lmb-source-note" hidden>Little Muslim Books multilingual page source: EN / FR / ES / AR.</p>'
        . '</div>';
}

function ip_core_internal_elementor_data( string $key ): array {
    $widget_id = substr( md5( 'lmb-internal-widget-' . $key ), 0, 8 );
    $container_id = substr( md5( 'lmb-internal-container-' . $key ), 0, 8 );

    return array(
        array(
            'id'       => $container_id,
            'elType'   => 'container',
            'isInner'  => false,
            'settings' => (object) array(
                'content_width'  => 'full',
                'flex_direction' => 'column',
                'padding'        => array( 'unit' => 'px', 'top' => 0, 'right' => 0, 'bottom' => 0, 'left' => 0, 'isLinked' => true ),
                'css_classes'    => 'lmb-multilingual-elementor-page',
            ),
            'elements' => array(
                array(
                    'id'         => $widget_id,
                    'elType'     => 'widget',
                    'isInner'    => false,
                    'widgetType' => 'html',
                    'settings'   => (object) array(
                        'html'        => ip_core_internal_html_widget( $key ),
                        'css_classes' => 'lmb-multilingual-html-widget',
                    ),
                    'elements'   => array(),
                ),
            ),
        ),
    );
}

function ip_core_internal_seed_elementor_page( int $page_id, string $key ): void {
    if ( ! did_action( 'elementor/loaded' ) || ! class_exists( '\Elementor\Plugin' ) ) {
        return;
    }

    $data = wp_json_encode( ip_core_internal_elementor_data( $key ) );
    update_post_meta( $page_id, '_elementor_edit_mode', 'builder' );
    update_post_meta( $page_id, '_elementor_template_type', 'wp-page' );
    update_post_meta( $page_id, '_elementor_data', wp_slash( $data ) );
    update_post_meta( $page_id, '_wp_page_template', 'templates/elementor-full-width.php' );
    update_post_meta( $page_id, '_ip_internal_elementor_hash', hash( 'sha256', (string) get_post_meta( $page_id, '_elementor_data', true ) ) );
    if ( defined( 'ELEMENTOR_VERSION' ) ) {
        update_post_meta( $page_id, '_elementor_version', ELEMENTOR_VERSION );
    }
}

function ip_core_internal_extract_widget_payload( string $content ): array {
    if ( ! preg_match( '/data-lmb-page-key=["\']([^"\']+)["\']/', $content, $key_match ) ) {
        return array();
    }
    if ( ! preg_match( '#<script[^>]*class=["\'][^"\']*lmb-page-translations[^"\']*["\'][^>]*>(.*?)</script>#s', $content, $json_match ) ) {
        return array();
    }

    $decoded = json_decode( html_entity_decode( trim( $json_match[1] ), ENT_QUOTES | ENT_HTML5, 'UTF-8' ), true );
    if ( ! is_array( $decoded ) ) {
        return array();
    }

    return array(
        'key'          => sanitize_key( $key_match[1] ),
        'translations' => $decoded,
    );
}

function ip_core_internal_render_elementor_html( string $content, $widget ): string {
    if ( ! is_object( $widget ) || ! method_exists( $widget, 'get_name' ) || 'html' !== $widget->get_name() ) {
        return $content;
    }

    $payload = ip_core_internal_extract_widget_payload( $content );
    if ( empty( $payload['key'] ) || empty( $payload['translations'] ) ) {
        return $content;
    }

    $lang = function_exists( 'ip_core_internal_language' ) ? ip_core_internal_language() : 'en';
    $translations = $payload['translations'];
    $spec = isset( $translations[ $lang ] ) && is_array( $translations[ $lang ] )
        ? $translations[ $lang ]
        : ( isset( $translations['en'] ) && is_array( $translations['en'] ) ? $translations['en'] : array() );

    return do_shortcode( ip_core_content_pack_render_spec( $payload['key'], $lang, $spec ) );
}
add_filter( 'elementor/widget/render_content', 'ip_core_internal_render_elementor_html', 20, 2 );

function ip_core_internal_page_is_safe_to_refresh( int $page_id ): bool {
    $stored_content_hash = (string) get_post_meta( $page_id, '_ip_internal_content_hash', true );
    if ( $stored_content_hash && ! hash_equals( $stored_content_hash, hash( 'sha256', (string) get_post_field( 'post_content', $page_id ) ) ) ) {
        return false;
    }

    $stored_elementor_hash = (string) get_post_meta( $page_id, '_ip_internal_elementor_hash', true );
    if ( $stored_elementor_hash ) {
        $elementor = (string) get_post_meta( $page_id, '_elementor_data', true );
        if ( ! hash_equals( $stored_elementor_hash, hash( 'sha256', $elementor ) ) ) {
            return false;
        }
    }

    return true;
}

function ip_core_internal_adopt_page( string $key, array $spec ): int {
    $slug = sanitize_title( (string) ( $spec['slug'] ?? $key ) );
    if ( ! $slug ) { return 0; }

    $existing = get_page_by_path( $slug, OBJECT, 'page' );
    if ( ! $existing instanceof WP_Post ) { return 0; }

    $owned_key = sanitize_key( (string) get_post_meta( $existing->ID, '_ip_content_pack_key', true ) );
    if ( $owned_key && $owned_key !== $key ) { return -1; }

    if ( ! $owned_key ) {
        $content = (string) $existing->post_content;
        $generated = '' === trim( $content )
            || str_contains( $content, '<!-- ip-production-editorial-v1 -->' )
            || str_contains( $content, '<!-- ip-parent-message-v2 -->' )
            || str_contains( $content, '<!-- ip-brand-starter -->' )
            || str_contains( $content, '<!-- ip-final-content-pack-v1' );
        if ( ! $generated ) { return -1; }
    }

    update_post_meta( $existing->ID, '_ip_content_pack_key', $key );
    return absint( $existing->ID );
}

function ip_core_internal_archive_old_translation_pages( string $key, int $keep_id ): void {
    $query = new WP_Query(
        array(
            'post_type'      => 'page',
            'post_status'    => array( 'publish', 'draft', 'pending', 'private' ),
            'posts_per_page' => -1,
            'fields'         => 'ids',
            'post__not_in'   => array( $keep_id ),
            'meta_key'       => '_ip_content_pack_key',
            'meta_value'     => $key,
        )
    );

    foreach ( $query->posts as $page_id ) {
        $page = get_post( $page_id );
        if ( ! $page instanceof WP_Post ) { continue; }

        $stored_hash = (string) get_post_meta( $page_id, '_ip_content_pack_hash', true );
        $safe = $stored_hash && hash_equals( $stored_hash, hash( 'sha256', (string) $page->post_content ) );
        if ( ! $safe ) { continue; }

        wp_update_post( array( 'ID' => $page_id, 'post_status' => 'draft' ) );
        update_post_meta( $page_id, '_ip_replaced_by_internal_page', $keep_id );
    }
}

function ip_core_internal_install_terms(): array {
    $result = array( 'created' => 0, 'existing' => 0, 'groups' => 0 );
    foreach ( ip_core_content_pack_terms() as $taxonomy => $groups ) {
        if ( ! taxonomy_exists( $taxonomy ) || ! is_array( $groups ) ) { continue; }

        foreach ( $groups as $canonical => $translations ) {
            $en = $translations['en'] ?? array();
            $slug = sanitize_title( (string) ( $en['slug'] ?? $canonical ) );
            $term = get_term_by( 'slug', $slug, $taxonomy );

            if ( $term instanceof WP_Term ) {
                $term_id = $term->term_id;
                ++$result['existing'];
            } else {
                $created = wp_insert_term(
                    sanitize_text_field( (string) ( $en['name'] ?? $canonical ) ),
                    $taxonomy,
                    array(
                        'slug'        => $slug,
                        'description' => sanitize_textarea_field( (string) ( $en['description'] ?? '' ) ),
                    )
                );
                if ( is_wp_error( $created ) ) { continue; }
                $term_id = absint( $created['term_id'] );
                ++$result['created'];
            }

            update_term_meta( $term_id, '_ip_internal_translations', wp_json_encode( $translations, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ) );
            ++$result['groups'];
        }
    }
    return $result;
}

function ip_core_internal_localize_term( $term ) {
    if ( is_admin() || ! $term instanceof WP_Term ) { return $term; }

    $raw = (string) get_term_meta( $term->term_id, '_ip_internal_translations', true );
    if ( ! $raw ) { return $term; }

    $translations = json_decode( $raw, true );
    $lang = ip_core_internal_language();
    $spec = is_array( $translations ) ? ( $translations[ $lang ] ?? $translations['en'] ?? array() ) : array();
    if ( ! is_array( $spec ) ) { return $term; }

    $localized = clone $term;
    if ( ! empty( $spec['name'] ) ) { $localized->name = (string) $spec['name']; }
    if ( isset( $spec['description'] ) ) { $localized->description = (string) $spec['description']; }
    return $localized;
}
add_filter( 'get_term', 'ip_core_internal_localize_term', 40 );

function ip_core_internal_localize_terms( array $terms ): array {
    if ( is_admin() ) { return $terms; }
    foreach ( $terms as $index => $term ) {
        if ( $term instanceof WP_Term ) {
            $terms[ $index ] = ip_core_internal_localize_term( $term );
        }
    }
    return $terms;
}
add_filter( 'get_terms', 'ip_core_internal_localize_terms', 40 );

function ip_core_internal_render_post_spec( array $spec ): string {
    $html = '';
    foreach ( (array) ( $spec['sections'] ?? array() ) as $section ) {
        if ( ! is_array( $section ) ) { continue; }
        if ( ! empty( $section['h2'] ) ) {
            $html .= '<h2>' . esc_html( (string) $section['h2'] ) . '</h2>';
        }
        if ( ! empty( $section['p'] ) ) {
            $html .= '<p>' . esc_html( (string) $section['p'] ) . '</p>';
        }
    }
    return $html;
}

function ip_core_internal_install_posts(): array {
    $result = array( 'created' => 0, 'updated' => 0, 'skipped' => 0, 'groups' => 0 );
    foreach ( ip_core_content_pack_posts() as $key => $translations ) {
        $en = $translations['en'] ?? array();
        $post_id = ip_core_internal_post_id( $key );

        if ( ! $post_id ) {
            $existing = get_page_by_path( sanitize_title( (string) ( $en['slug'] ?? $key ) ), OBJECT, 'post' );
            if ( $existing instanceof WP_Post && ! get_post_meta( $existing->ID, '_ip_content_pack_post_key', true ) ) {
                ++$result['skipped'];
                continue;
            }

            $post_id = wp_insert_post(
                array(
                    'post_type'    => 'post',
                    'post_status'  => 'publish',
                    'post_title'   => sanitize_text_field( (string) ( $en['title'] ?? $key ) ),
                    'post_name'    => sanitize_title( (string) ( $en['slug'] ?? $key ) ),
                    'post_excerpt' => sanitize_textarea_field( (string) ( $en['excerpt'] ?? '' ) ),
                    'post_content' => ip_core_internal_render_post_spec( $en ),
                    'meta_input'   => array( '_ip_content_pack_post_key' => sanitize_key( $key ) ),
                ),
                true
            );
            if ( is_wp_error( $post_id ) ) { continue; }
            ++$result['created'];
        }

        $post_id = absint( $post_id );
        $stored_hash = (string) get_post_meta( $post_id, '_ip_internal_post_hash', true );
        $content = (string) get_post_field( 'post_content', $post_id );
        if ( $stored_hash && ! hash_equals( $stored_hash, hash( 'sha256', $content ) ) ) {
            ++$result['skipped'];
            continue;
        }

        $english_content = ip_core_internal_render_post_spec( $en );
        wp_update_post(
            array(
                'ID'           => $post_id,
                'post_title'   => sanitize_text_field( (string) ( $en['title'] ?? $key ) ),
                'post_name'    => sanitize_title( (string) ( $en['slug'] ?? $key ) ),
                'post_excerpt' => sanitize_textarea_field( (string) ( $en['excerpt'] ?? '' ) ),
                'post_content' => $english_content,
            )
        );
        update_post_meta( $post_id, '_ip_internal_post_translations', wp_json_encode( $translations, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ) );
        update_post_meta( $post_id, '_ip_internal_post_hash', hash( 'sha256', $english_content ) );
        ++$result['updated'];
        ++$result['groups'];
    }
    return $result;
}

function ip_core_internal_post_translation( int $post_id ): array {
    $raw = (string) get_post_meta( $post_id, '_ip_internal_post_translations', true );
    $translations = $raw ? json_decode( $raw, true ) : array();
    if ( ! is_array( $translations ) ) { return array(); }
    $lang = ip_core_internal_language();
    return is_array( $translations[ $lang ] ?? null ) ? $translations[ $lang ] : ( is_array( $translations['en'] ?? null ) ? $translations['en'] : array() );
}

function ip_core_internal_translate_post_title( string $title, int $post_id = 0 ): string {
    if ( is_admin() || ! $post_id || 'post' !== get_post_type( $post_id ) || ! get_post_meta( $post_id, '_ip_content_pack_post_key', true ) ) {
        return $title;
    }
    $spec = ip_core_internal_post_translation( $post_id );
    return ! empty( $spec['title'] ) ? (string) $spec['title'] : $title;
}
add_filter( 'the_title', 'ip_core_internal_translate_post_title', 50, 2 );

function ip_core_internal_translate_post_excerpt( string $excerpt, WP_Post $post ): string {
    if ( is_admin() || ! get_post_meta( $post->ID, '_ip_content_pack_post_key', true ) ) { return $excerpt; }
    $spec = ip_core_internal_post_translation( $post->ID );
    return isset( $spec['excerpt'] ) ? (string) $spec['excerpt'] : $excerpt;
}
add_filter( 'get_the_excerpt', 'ip_core_internal_translate_post_excerpt', 50, 2 );

function ip_core_internal_translate_post_content( string $content ): string {
    if ( is_admin() || ! is_singular( 'post' ) ) { return $content; }
    $post_id = get_queried_object_id();
    if ( ! get_post_meta( $post_id, '_ip_content_pack_post_key', true ) ) { return $content; }
    $spec = ip_core_internal_post_translation( $post_id );
    return $spec ? ip_core_internal_render_post_spec( $spec ) : $content;
}
add_filter( 'the_content', 'ip_core_internal_translate_post_content', 50 );

function ip_core_install_internal_content_pack(): array {
    $result = array(
        'created'   => 0,
        'updated'   => 0,
        'skipped'   => 0,
        'languages' => array_keys( ip_core_languages() ),
        'pages'     => array(),
        'terms'     => ip_core_internal_install_terms(),
        'posts'     => ip_core_internal_install_posts(),
    );

    foreach ( ip_core_content_pack_pages() as $key => $translations ) {
        $en = $translations['en'] ?? array();
        if ( ! $en ) { continue; }

        $page_id = ip_core_internal_page_id( $key );
        if ( ! $page_id ) {
            $adopted = ip_core_internal_adopt_page( $key, $en );
            if ( -1 === $adopted ) {
                ++$result['skipped'];
                continue;
            }
            $page_id = $adopted;
        }

        if ( ! $page_id ) {
            $page_id = wp_insert_post(
                array(
                    'post_type'    => 'page',
                    'post_status'  => 'publish',
                    'post_title'   => sanitize_text_field( (string) ( $en['title'] ?? $key ) ),
                    'post_name'    => sanitize_title( (string) ( $en['slug'] ?? $key ) ),
                    'post_content' => '[ip_final_page key="' . esc_attr( $key ) . '"]',
                    'meta_input'   => array(
                        '_ip_content_pack_key' => sanitize_key( $key ),
                        '_wp_page_template'    => 'templates/store-landing.php',
                    ),
                ),
                true
            );
            if ( is_wp_error( $page_id ) ) { continue; }
            ++$result['created'];
        }

        $page_id = absint( $page_id );
        if ( ! ip_core_internal_page_is_safe_to_refresh( $page_id ) ) {
            ++$result['skipped'];
            $result['pages'][ $key ] = array( 'canonical' => $page_id );
            continue;
        }

        $fallback = '[ip_final_page key="' . esc_attr( $key ) . '"]';
        wp_update_post(
            array(
                'ID'           => $page_id,
                'post_title'   => sanitize_text_field( (string) ( $en['title'] ?? $key ) ),
                'post_name'    => sanitize_title( (string) ( $en['slug'] ?? $key ) ),
                'post_content' => $fallback,
            )
        );

        update_post_meta( $page_id, '_ip_content_pack_key', sanitize_key( $key ) );
        update_post_meta( $page_id, '_ip_internal_page_translations', wp_json_encode( $translations, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ) );
        update_post_meta( $page_id, '_ip_content_pack_version', (string) ( ip_core_content_pack_data()['version'] ?? '1' ) );
        update_post_meta( $page_id, '_ip_internal_content_hash', hash( 'sha256', $fallback ) );
        update_post_meta( $page_id, '_wp_page_template', 'templates/store-landing.php' );
        ip_core_internal_seed_elementor_page( $page_id, $key );
        ip_core_internal_archive_old_translation_pages( $key, $page_id );

        ++$result['updated'];
        $result['pages'][ $key ] = array( 'canonical' => $page_id );
    }

    $home_id = isset( $result['pages']['home']['canonical'] ) ? absint( $result['pages']['home']['canonical'] ) : 0;
    if ( $home_id ) {
        update_option( 'show_on_front', 'page' );
        update_option( 'page_on_front', $home_id );
        set_theme_mod( 'ip_home_layout_mode', 'full_builder' );
    }

    update_option( 'ip_core_internal_multilingual_enabled', 'yes', false );
    flush_rewrite_rules( false );
    return $result;
}
