<?php
/**
 * Final multilingual content pack.
 *
 * Editorial copy lives in a JSON schema and is rendered as a single scoped
 * branded HTML canvas per page. Dynamic WooCommerce and WordPress components
 * remain shortcodes inside the canvas, so products/prices/posts stay live.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function ip_core_content_pack_path(): string {
    return IP_CORE_DIR . 'data/final-content-pack.json';
}

function ip_core_content_pack_data(): array {
    static $data = null;
    if ( null !== $data ) {
        return $data;
    }
    $path = ip_core_content_pack_path();
    if ( ! is_readable( $path ) ) {
        $data = array();
        return $data;
    }
    $decoded = json_decode( (string) file_get_contents( $path ), true );
    $data = is_array( $decoded ) ? $decoded : array();
    return $data;
}

function ip_core_content_pack_languages(): array {
    $data = ip_core_content_pack_data();
    return isset( $data['languages'] ) && is_array( $data['languages'] ) ? $data['languages'] : array();
}

function ip_core_content_pack_pages(): array {
    $data = ip_core_content_pack_data();
    return isset( $data['pages'] ) && is_array( $data['pages'] ) ? $data['pages'] : array();
}

function ip_core_content_pack_spec( string $key, string $lang ): array {
    $pages = ip_core_content_pack_pages();
    return isset( $pages[ $key ][ $lang ] ) && is_array( $pages[ $key ][ $lang ] ) ? $pages[ $key ][ $lang ] : array();
}

function ip_core_content_pack_page_id( string $key, string $lang ): int {
    $query = new WP_Query(
        array(
            'post_type'      => 'page',
            'post_status'    => array( 'publish', 'draft', 'private', 'pending' ),
            'posts_per_page' => 1,
            'fields'         => 'ids',
            'meta_query'     => array(
                'relation' => 'AND',
                array( 'key' => '_ip_content_pack_key', 'value' => sanitize_key( $key ) ),
                array( 'key' => '_ip_content_pack_language', 'value' => sanitize_key( $lang ) ),
            ),
        )
    );
    return $query->posts ? absint( $query->posts[0] ) : 0;
}

function ip_core_content_pack_page_url( string $key, string $lang ): string {
    $id = ip_core_content_pack_page_id( $key, $lang );
    if ( $id ) {
        return (string) get_permalink( $id );
    }
    $spec = ip_core_content_pack_spec( $key, $lang );
    return ! empty( $spec['slug'] ) ? home_url( '/' . trim( (string) $spec['slug'], '/' ) . '/' ) : home_url( '/' );
}

function ip_core_content_pack_resolve_url( string $target, string $lang ): string {
    if ( '@shop' === $target && function_exists( 'wc_get_page_permalink' ) ) {
        return wc_get_page_permalink( 'shop' );
    }
    if ( '@account' === $target && function_exists( 'wc_get_page_permalink' ) ) {
        return wc_get_page_permalink( 'myaccount' );
    }
    if ( str_starts_with( $target, '@page:' ) ) {
        return ip_core_content_pack_page_url( substr( $target, 6 ), $lang );
    }
    return esc_url_raw( $target );
}

function ip_core_content_pack_shortcodes( array $section ): string {
    $component = sanitize_key( (string) ( $section['component'] ?? '' ) );
    $attrs = isset( $section['attrs'] ) && is_array( $section['attrs'] ) ? $section['attrs'] : array();
    $allowed = array( 'book_slider' => 'ip_book_slider', 'book_grid' => 'ip_book_grid', 'collection_grid' => 'ip_collection_grid', 'reviews' => 'ip_review_grid', 'book_search' => 'ip_book_search', 'creators' => 'ip_creator_grid', 'contact' => 'ip_contact_hub', 'latest_posts' => 'ip_latest_posts', 'newsletter' => 'ip_newsletter_slot' );
    if ( ! isset( $allowed[ $component ] ) ) {
        return '';
    }
    $pairs = array();
    foreach ( $attrs as $name => $value ) {
        if ( is_scalar( $value ) && '' !== (string) $value ) {
            $pairs[] = sanitize_key( (string) $name ) . '="' . esc_attr( (string) $value ) . '"';
        }
    }
    return '[' . $allowed[ $component ] . ( $pairs ? ' ' . implode( ' ', $pairs ) : '' ) . ']';
}

function ip_core_content_pack_render_cards( array $section ): string {
    $items = isset( $section['items'] ) && is_array( $section['items'] ) ? $section['items'] : array();
    if ( ! $items ) {
        return '';
    }
    $html = '<section class="lmb-canvas-section lmb-canvas-cards">';
    if ( ! empty( $section['eyebrow'] ) ) { $html .= '<p class="lmb-canvas-kicker">' . esc_html( $section['eyebrow'] ) . '</p>'; }
    if ( ! empty( $section['heading'] ) ) { $html .= '<h2>' . esc_html( $section['heading'] ) . '</h2>'; }
    if ( ! empty( $section['body'] ) ) { $html .= '<p class="lmb-canvas-intro">' . esc_html( $section['body'] ) . '</p>'; }
    $html .= '<div class="lmb-canvas-card-grid">';
    foreach ( $items as $item ) {
        $html .= '<article class="lmb-canvas-card">';
        if ( ! empty( $item['icon'] ) ) { $html .= '<span class="lmb-canvas-icon" aria-hidden="true">' . esc_html( $item['icon'] ) . '</span>'; }
        if ( ! empty( $item['title'] ) ) { $html .= '<h3>' . esc_html( $item['title'] ) . '</h3>'; }
        if ( ! empty( $item['body'] ) ) { $html .= '<p>' . esc_html( $item['body'] ) . '</p>'; }
        $html .= '</article>';
    }
    return $html . '</div></section>';
}

function ip_core_content_pack_render_section( array $section, string $lang ): string {
    $type = sanitize_key( (string) ( $section['type'] ?? 'text' ) );

    if ( 'dynamic' === $type ) {
        $shortcode = ip_core_content_pack_shortcodes( $section );
        if ( ! $shortcode ) { return ''; }
        return '<section class="lmb-canvas-section lmb-canvas-dynamic">' . $shortcode . '</section>';
    }

    if ( 'cards' === $type ) {
        return ip_core_content_pack_render_cards( $section );
    }

    if ( 'quote' === $type ) {
        return '<section class="lmb-canvas-section lmb-canvas-quote"><blockquote><p>' . esc_html( (string) ( $section['text'] ?? '' ) ) . '</p></blockquote></section>';
    }

    if ( 'faq' === $type ) {
        $items = isset( $section['items'] ) && is_array( $section['items'] ) ? $section['items'] : array();
        $html = '<section class="lmb-canvas-section lmb-canvas-faq">';
        if ( ! empty( $section['eyebrow'] ) ) { $html .= '<p class="lmb-canvas-kicker">' . esc_html( $section['eyebrow'] ) . '</p>'; }
        if ( ! empty( $section['heading'] ) ) { $html .= '<h2>' . esc_html( $section['heading'] ) . '</h2>'; }
        foreach ( $items as $item ) {
            $html .= '<details><summary>' . esc_html( (string) ( $item['q'] ?? '' ) ) . '</summary><div><p>' . esc_html( (string) ( $item['a'] ?? '' ) ) . '</p></div></details>';
        }
        return $html . '</section>';
    }

    if ( 'cta' === $type ) {
        $url = ip_core_content_pack_resolve_url( (string) ( $section['target'] ?? '@shop' ), $lang );
        $html = '<section class="lmb-canvas-section lmb-canvas-cta">';
        if ( ! empty( $section['heading'] ) ) { $html .= '<h2>' . esc_html( $section['heading'] ) . '</h2>'; }
        if ( ! empty( $section['body'] ) ) { $html .= '<p>' . esc_html( $section['body'] ) . '</p>'; }
        if ( ! empty( $section['button'] ) ) { $html .= '<a class="lmb-canvas-button" href="' . esc_url( $url ) . '">' . esc_html( $section['button'] ) . ' →</a>'; }
        return $html . '</section>';
    }

    if ( 'split' === $type ) {
        $html = '<section class="lmb-canvas-section lmb-canvas-split">';
        foreach ( array( 'left', 'right' ) as $side ) {
            $column = isset( $section[ $side ] ) && is_array( $section[ $side ] ) ? $section[ $side ] : array();
            $html .= '<div>';
            if ( ! empty( $column['eyebrow'] ) ) { $html .= '<p class="lmb-canvas-kicker">' . esc_html( $column['eyebrow'] ) . '</p>'; }
            if ( ! empty( $column['heading'] ) ) { $html .= '<h2>' . esc_html( $column['heading'] ) . '</h2>'; }
            if ( ! empty( $column['body'] ) ) { $html .= '<p>' . esc_html( $column['body'] ) . '</p>'; }
            $html .= '</div>';
        }
        return $html . '</section>';
    }

    $html = '<section class="lmb-canvas-section lmb-canvas-text">';
    if ( ! empty( $section['eyebrow'] ) ) { $html .= '<p class="lmb-canvas-kicker">' . esc_html( $section['eyebrow'] ) . '</p>'; }
    if ( ! empty( $section['heading'] ) ) { $html .= '<h2>' . esc_html( $section['heading'] ) . '</h2>'; }
    if ( ! empty( $section['body'] ) ) { $html .= '<p class="lmb-canvas-intro">' . esc_html( $section['body'] ) . '</p>'; }
    if ( ! empty( $section['body2'] ) ) { $html .= '<p>' . esc_html( $section['body2'] ) . '</p>'; }
    return $html . '</section>';
}

function ip_core_content_pack_canvas_css( string $id ): string {
    $s = '#' . sanitize_html_class( $id );
    return '<style>'
        . $s . '{--lmb-green:var(--ip-brand-green,#005b3a);--lmb-gold:var(--ip-brand-gold,#eab308);--lmb-ink:var(--ip-brand-navy,#10283b);--lmb-ivory:var(--ip-brand-ivory,#faf7f0);color:var(--lmb-ink);font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;overflow:hidden}'
        . $s . ' *{box-sizing:border-box}' . $s . ' .lmb-canvas-inner{max-width:1240px;margin:auto;padding:0 24px}'
        . $s . ' .lmb-canvas-hero{position:relative;padding:84px 0 68px;background:radial-gradient(circle at 88% 12%,rgba(234,179,8,.20),transparent 30%),linear-gradient(135deg,var(--lmb-ivory),#fff)}'
        . $s . ' .lmb-canvas-hero h1,' . $s . ' h2,' . $s . ' h3{font-family:"Playfair Display",Georgia,serif;color:var(--lmb-ink);line-height:1.08}'
        . $s . ' .lmb-canvas-hero h1{max-width:900px;font-size:clamp(2.6rem,6vw,5.4rem);margin:.18em 0}.lmb-canvas-lead{max-width:840px;font-size:clamp(1.08rem,2vw,1.35rem);line-height:1.75;color:#4e5d66}'
        . $s . ' .lmb-canvas-kicker{margin:0 0 10px;color:var(--lmb-green);font-weight:900;text-transform:uppercase;letter-spacing:.12em;font-size:.76rem}'
        . $s . ' .lmb-canvas-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}.lmb-canvas-button{display:inline-flex;align-items:center;justify-content:center;padding:13px 21px;border-radius:999px;background:var(--lmb-green);color:#fff!important;text-decoration:none;font-weight:850}.lmb-canvas-button.is-outline{background:transparent;color:var(--lmb-green)!important;border:1px solid rgba(0,91,58,.35)}'
        . $s . ' .lmb-canvas-section{max-width:1240px;margin:0 auto;padding:54px 24px}.lmb-canvas-section>h2{font-size:clamp(2rem,4vw,3.2rem);margin:.1em 0 .45em}.lmb-canvas-intro{max-width:850px;font-size:1.08rem;line-height:1.8;color:#53636c}'
        . $s . ' .lmb-canvas-split{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:26px}.lmb-canvas-split>div,.lmb-canvas-card{padding:28px;border-radius:24px;background:#fff;border:1px solid rgba(16,40,59,.10);box-shadow:0 14px 50px rgba(16,40,59,.05)}'
        . $s . ' .lmb-canvas-card-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:24px}.lmb-canvas-card h3{font-size:1.35rem;margin:.6em 0}.lmb-canvas-card p,' . $s . ' .lmb-canvas-text p,' . $s . ' .lmb-canvas-split p{line-height:1.75;color:#53636c}'
        . $s . ' .lmb-canvas-icon{display:grid;place-items:center;width:44px;height:44px;border-radius:14px;background:rgba(234,179,8,.15);color:var(--lmb-green);font-weight:900}'
        . $s . ' .lmb-canvas-quote{padding-top:30px;padding-bottom:30px}.lmb-canvas-quote blockquote{margin:0;padding:34px;border-radius:28px;background:var(--lmb-green);color:#fff}.lmb-canvas-quote p{margin:0;font-family:"Playfair Display",Georgia,serif;font-size:clamp(1.5rem,3vw,2.25rem);line-height:1.4;color:#fff}'
        . $s . ' .lmb-canvas-faq details{border-bottom:1px solid rgba(16,40,59,.14);padding:17px 0}.lmb-canvas-faq summary{cursor:pointer;font-weight:850;font-size:1.02rem}.lmb-canvas-faq details p{line-height:1.75;color:#53636c}'
        . $s . ' .lmb-canvas-cta{margin-top:30px;margin-bottom:60px;border-radius:32px;background:linear-gradient(135deg,var(--lmb-green),#003c29);color:#fff;padding:46px}.lmb-canvas-cta h2,' . $s . ' .lmb-canvas-cta p{color:#fff}.lmb-canvas-cta p{max-width:760px;font-size:1.05rem;line-height:1.7}.lmb-canvas-cta .lmb-canvas-button{background:var(--lmb-gold);color:#142e24!important}'
        . $s . '[dir="rtl"]{text-align:right}'
        . '@media(max-width:820px){' . $s . ' .lmb-canvas-hero{padding:60px 0 46px}' . $s . ' .lmb-canvas-card-grid,' . $s . ' .lmb-canvas-split{grid-template-columns:1fr}' . $s . ' .lmb-canvas-section{padding:38px 18px}' . $s . ' .lmb-canvas-inner{padding:0 18px}' . $s . ' .lmb-canvas-cta{margin-left:18px;margin-right:18px;padding:32px 22px}}'
        . '</style>';
}

function ip_core_content_pack_render( string $key, string $lang ): string {
    $spec = ip_core_content_pack_spec( $key, $lang );
    if ( ! $spec ) {
        return '';
    }
    $languages = ip_core_content_pack_languages();
    $dir = isset( $languages[ $lang ]['direction'] ) ? (string) $languages[ $lang ]['direction'] : 'ltr';
    $id = 'lmb-final-' . sanitize_html_class( $key ) . '-' . sanitize_html_class( $lang );

    $html = '<!-- ip-final-content-pack-v1 key="' . esc_attr( $key ) . '" lang="' . esc_attr( $lang ) . '" -->';
    $html .= ip_core_content_pack_canvas_css( $id );
    $html .= '<div id="' . esc_attr( $id ) . '" class="lmb-final-page" lang="' . esc_attr( $lang ) . '" dir="' . esc_attr( $dir ) . '">';
    $html .= '<section class="lmb-canvas-hero"><div class="lmb-canvas-inner">';
    if ( ! empty( $spec['eyebrow'] ) ) { $html .= '<p class="lmb-canvas-kicker">' . esc_html( $spec['eyebrow'] ) . '</p>'; }
    $html .= '<h1>' . esc_html( (string) ( $spec['h1'] ?? $spec['title'] ?? '' ) ) . '</h1>';
    if ( ! empty( $spec['lead'] ) ) { $html .= '<p class="lmb-canvas-lead">' . esc_html( $spec['lead'] ) . '</p>'; }
    if ( ! empty( $spec['actions'] ) && is_array( $spec['actions'] ) ) {
        $html .= '<div class="lmb-canvas-actions">';
        foreach ( $spec['actions'] as $index => $action ) {
            $url = ip_core_content_pack_resolve_url( (string) ( $action['target'] ?? '@shop' ), $lang );
            $html .= '<a class="lmb-canvas-button' . ( $index ? ' is-outline' : '' ) . '" href="' . esc_url( $url ) . '">' . esc_html( (string) ( $action['label'] ?? '' ) ) . ' →</a>';
        }
        $html .= '</div>';
    }
    $html .= '</div></section>';

    foreach ( (array) ( $spec['sections'] ?? array() ) as $section ) {
        if ( is_array( $section ) ) {
            $html .= ip_core_content_pack_render_section( $section, $lang );
        }
    }
    return $html . '</div>';
}

function ip_core_shortcode_final_page( array $atts ): string {
    $atts = shortcode_atts( array( 'key' => '', 'lang' => '' ), $atts, 'ip_final_page' );
    $key = sanitize_key( (string) $atts['key'] );
    $lang = sanitize_key( (string) $atts['lang'] );
    if ( ! $lang ) {
        $lang = function_exists( 'ip_language_code' ) ? ip_language_code() : substr( determine_locale(), 0, 2 );
    }
    return do_shortcode( ip_core_content_pack_render( $key, $lang ) );
}
add_shortcode( 'ip_final_page', 'ip_core_shortcode_final_page' );

function ip_core_shortcode_latest_posts( array $atts ): string {
    $atts = shortcode_atts( array( 'title' => __( 'Latest from the journal', 'illuminated-path-core' ), 'limit' => 3 ), $atts, 'ip_latest_posts' );
    $posts = get_posts( array( 'post_status' => 'publish', 'numberposts' => max( 1, min( 12, absint( $atts['limit'] ) ) ) ) );
    if ( ! $posts ) {
        return '';
    }
    $html = '<section class="ip-latest-posts"><div class="ip-shortcode-heading"><div><h2>' . esc_html( $atts['title'] ) . '</h2></div></div><div class="home-post-grid">';
    foreach ( $posts as $post ) {
        $html .= '<article>';
        if ( has_post_thumbnail( $post ) ) {
            $html .= '<a class="home-post-image" href="' . esc_url( get_permalink( $post ) ) . '">' . get_the_post_thumbnail( $post, 'large', array( 'loading' => 'lazy' ) ) . '</a>';
        }
        $html .= '<div><span>' . esc_html( get_the_date( '', $post ) ) . '</span><h3><a href="' . esc_url( get_permalink( $post ) ) . '">' . esc_html( get_the_title( $post ) ) . '</a></h3><p>' . esc_html( wp_trim_words( get_the_excerpt( $post ), 24 ) ) . '</p><a class="text-link" href="' . esc_url( get_permalink( $post ) ) . '">' . esc_html__( 'Read article', 'illuminated-path-core' ) . ' →</a></div></article>';
    }
    return $html . '</div></section>';
}
add_shortcode( 'ip_latest_posts', 'ip_core_shortcode_latest_posts' );

function ip_core_shortcode_newsletter_slot(): string {
    ob_start();
    echo '<section class="ip-newsletter-slot">';
    if ( is_active_sidebar( 'newsletter' ) ) {
        dynamic_sidebar( 'newsletter' );
    } elseif ( is_active_sidebar( 'footer-newsletter' ) ) {
        dynamic_sidebar( 'footer-newsletter' );
    } elseif ( current_user_can( 'edit_theme_options' ) ) {
        echo '<p class="ip-editor-empty">' . esc_html__( 'Add a MailPoet form or newsletter widget to the Newsletter / Marketing widget area.', 'illuminated-path-core' ) . '</p>';
    }
    echo '</section>';
    return (string) ob_get_clean();
}
add_shortcode( 'ip_newsletter_slot', 'ip_core_shortcode_newsletter_slot' );

function ip_core_content_pack_can_update( WP_Post $page ): bool {
    $stored_hash = (string) get_post_meta( $page->ID, '_ip_content_pack_hash', true );
    if ( ! $stored_hash ) {
        return false;
    }
    return hash_equals( $stored_hash, hash( 'sha256', (string) $page->post_content ) );
}

function ip_core_content_pack_elementor_data( string $html, string $seed ): array {
    $widget_id = substr( md5( 'lmb-widget-' . $seed ), 0, 8 );
    $container_id = substr( md5( 'lmb-container-' . $seed ), 0, 8 );
    return array(
        array(
            'id' => $container_id,
            'elType' => 'container',
            'isInner' => false,
            'settings' => (object) array( 'content_width' => 'full', 'flex_direction' => 'column', 'padding' => array( 'unit' => 'px', 'top' => 0, 'right' => 0, 'bottom' => 0, 'left' => 0, 'isLinked' => true ) ),
            'elements' => array(
                array(
                    'id' => $widget_id,
                    'elType' => 'widget',
                    'isInner' => false,
                    'widgetType' => 'html',
                    'settings' => (object) array( 'html' => $html ),
                    'elements' => array(),
                ),
            ),
        ),
    );
}

function ip_core_content_pack_seed_elementor( int $post_id, string $html, string $seed ): void {
    if ( ! did_action( 'elementor/loaded' ) || ! class_exists( '\Elementor\Plugin' ) ) {
        return;
    }
    update_post_meta( $post_id, '_elementor_edit_mode', 'builder' );
    update_post_meta( $post_id, '_elementor_template_type', 'wp-page' );
    update_post_meta( $post_id, '_elementor_data', wp_slash( wp_json_encode( ip_core_content_pack_elementor_data( $html, $seed ) ) ) );
    update_post_meta( $post_id, '_wp_page_template', 'templates/elementor-full-width.php' );
    if ( defined( 'ELEMENTOR_VERSION' ) ) {
        update_post_meta( $post_id, '_elementor_version', ELEMENTOR_VERSION );
    }
}

function ip_core_content_pack_process_elementor_html( string $content, $widget ): string {
    if ( is_object( $widget ) && method_exists( $widget, 'get_name' ) && 'html' === $widget->get_name() && str_contains( $content, 'lmb-final-page' ) ) {
        return do_shortcode( $content );
    }
    return $content;
}
add_filter( 'elementor/widget/render_content', 'ip_core_content_pack_process_elementor_html', 10, 2 );

function ip_core_content_pack_available_languages(): array {
    $wanted = array_keys( ip_core_content_pack_languages() );
    if ( function_exists( 'pll_languages_list' ) ) {
        return array_values( array_intersect( $wanted, array_map( 'sanitize_key', (array) pll_languages_list( array( 'fields' => 'slug' ) ) ) ) );
    }
    $wpml = apply_filters( 'wpml_active_languages', null, array( 'skip_missing' => 0 ) );
    if ( is_array( $wpml ) ) {
        return array_values( array_intersect( $wanted, array_map( 'sanitize_key', array_keys( $wpml ) ) ) );
    }
    return array( 'en' );
}

function ip_core_content_pack_assign_language( int $post_id, string $lang ): void {
    if ( function_exists( 'pll_set_post_language' ) ) {
        pll_set_post_language( $post_id, $lang );
    }
}

function ip_core_content_pack_link_translations( array $ids ): void {
    $ids = array_filter( array_map( 'absint', $ids ) );
    if ( count( $ids ) < 2 ) {
        return;
    }
    if ( function_exists( 'pll_save_post_translations' ) ) {
        pll_save_post_translations( $ids );
        return;
    }

    $source_lang = isset( $ids['en'] ) ? 'en' : array_key_first( $ids );
    $source_id = absint( $ids[ $source_lang ] ?? 0 );
    if ( ! $source_id ) {
        return;
    }
    do_action(
        'wpml_set_element_language_details',
        array(
            'element_id'           => $source_id,
            'element_type'         => 'post_page',
            'trid'                 => false,
            'language_code'        => $source_lang,
            'source_language_code' => null,
        )
    );
    $trid = apply_filters( 'wpml_element_trid', null, $source_id, 'post_page' );
    if ( ! $trid ) {
        return;
    }
    foreach ( $ids as $lang => $id ) {
        if ( $lang === $source_lang ) { continue; }
        do_action(
            'wpml_set_element_language_details',
            array(
                'element_id'           => absint( $id ),
                'element_type'         => 'post_page',
                'trid'                 => $trid,
                'language_code'        => sanitize_key( $lang ),
                'source_language_code' => $source_lang,
            )
        );
    }
}

function ip_core_install_final_content_pack(): array {
    $result = array( 'created' => 0, 'updated' => 0, 'skipped' => 0, 'languages' => array(), 'pages' => array() );
    $languages = ip_core_content_pack_available_languages();
    $result['languages'] = $languages;
    $pages = ip_core_content_pack_pages();

    foreach ( $pages as $key => $translations ) {
        $translation_ids = array();

        foreach ( $languages as $lang ) {
            if ( empty( $translations[ $lang ] ) ) {
                continue;
            }
            $spec = $translations[ $lang ];
            $html = ip_core_content_pack_render( $key, $lang );
            $page_id = ip_core_content_pack_page_id( $key, $lang );

            if ( $page_id ) {
                $page = get_post( $page_id );
                if ( ! $page instanceof WP_Post || ! ip_core_content_pack_can_update( $page ) ) {
                    ++$result['skipped'];
                    $translation_ids[ $lang ] = $page_id;
                    continue;
                }
                $updated = wp_update_post(
                    array(
                        'ID'           => $page_id,
                        'post_title'   => sanitize_text_field( (string) $spec['title'] ),
                        'post_name'    => sanitize_title( (string) $spec['slug'] ),
                        'post_content' => $html,
                    ),
                    true
                );
                if ( ! is_wp_error( $updated ) ) {
                    ++$result['updated'];
                    update_post_meta( $page_id, '_ip_content_pack_hash', hash( 'sha256', $html ) );
                    ip_core_content_pack_seed_elementor( $page_id, $html, $key . '-' . $lang );
                }
            } else {
                $page_id = wp_insert_post(
                    array(
                        'post_type'    => 'page',
                        'post_status'  => 'publish',
                        'post_title'   => sanitize_text_field( (string) $spec['title'] ),
                        'post_name'    => sanitize_title( (string) $spec['slug'] ),
                        'post_content' => $html,
                        'meta_input'   => array(
                            '_wp_page_template'          => 'templates/store-landing.php',
                            '_ip_content_pack_key'       => sanitize_key( $key ),
                            '_ip_content_pack_language'  => sanitize_key( $lang ),
                            '_ip_content_pack_version'   => (string) ( ip_core_content_pack_data()['version'] ?? '1' ),
                            '_ip_content_pack_hash'      => hash( 'sha256', $html ),
                        ),
                    ),
                    true
                );
                if ( ! is_wp_error( $page_id ) ) {
                    ++$result['created'];
                    ip_core_content_pack_assign_language( $page_id, $lang );
                    ip_core_content_pack_seed_elementor( $page_id, $html, $key . '-' . $lang );
                }
            }

            if ( $page_id && ! is_wp_error( $page_id ) ) {
                $translation_ids[ $lang ] = absint( $page_id );
            }
        }

        if ( $translation_ids ) {
            ip_core_content_pack_link_translations( $translation_ids );
            $result['pages'][ $key ] = $translation_ids;
        }
    }

    $home_ids = $result['pages']['home'] ?? array();
    if ( $home_ids ) {
        $front_id = isset( $home_ids['en'] ) ? absint( $home_ids['en'] ) : absint( reset( $home_ids ) );
        if ( $front_id ) {
            update_option( 'show_on_front', 'page' );
            update_option( 'page_on_front', $front_id );
            set_theme_mod( 'ip_home_layout_mode', 'full_builder' );
        }
    }

    flush_rewrite_rules( false );
    return $result;
}

function ip_core_register_final_content_pack_page(): void {
    add_submenu_page(
        'woocommerce',
        __( 'Final Multilingual Content', 'illuminated-path-core' ),
        __( 'Final Multilingual Content', 'illuminated-path-core' ),
        'manage_woocommerce',
        'ip-final-content-pack',
        'ip_core_render_final_content_pack_page'
    );
}
add_action( 'admin_menu', 'ip_core_register_final_content_pack_page', 52 );

function ip_core_render_final_content_pack_page(): void {
    if ( ! current_user_can( 'manage_woocommerce' ) ) { return; }
    $summary = null;
    if ( isset( $_POST['ip_install_final_content'] ) ) {
        check_admin_referer( 'ip_install_final_content' );
        $summary = ip_core_install_final_content_pack();
        add_settings_error( 'ip_final_content', 'installed', __( 'Final multilingual content pack installed or refreshed without overwriting pages you have already edited.', 'illuminated-path-core' ), 'success' );
    }
    settings_errors( 'ip_final_content' );
    $languages = ip_core_content_pack_languages();
    ?>
    <div class="wrap">
        <h1><?php esc_html_e( 'Little Muslim Books — Final Multilingual Content', 'illuminated-path-core' ); ?></h1>
        <p><?php esc_html_e( 'This is not fake demo commerce data. It installs the real editorial/marketing website copy as branded HTML canvases in English, French, Spanish and Arabic when those languages are configured.', 'illuminated-path-core' ); ?></p>
        <div style="max-width:1100px;display:grid;grid-template-columns:minmax(0,1.4fr) minmax(300px,.7fr);gap:22px;align-items:start">
            <section style="background:#fff;border:1px solid #dcdcde;border-radius:12px;padding:24px">
                <h2><?php esc_html_e( 'Content model', 'illuminated-path-core' ); ?></h2>
                <p><?php esc_html_e( 'Each page is generated from JSON into one scoped HTML design canvas. Live WooCommerce sliders, collection grids, reviews, search and WordPress latest-post sections remain dynamic inside the page.', 'illuminated-path-core' ); ?></p>
                <p><strong><?php esc_html_e( 'Configured content languages:', 'illuminated-path-core' ); ?></strong>
                    <?php echo esc_html( implode( ', ', array_map( static fn( $lang ) => (string) ( $languages[ $lang ]['label'] ?? strtoupper( $lang ) ), array_keys( $languages ) ) ) ); ?>
                </p>
                <form method="post">
                    <?php wp_nonce_field( 'ip_install_final_content' ); ?>
                    <input type="hidden" name="ip_install_final_content" value="1">
                    <?php submit_button( __( 'Install / Refresh Final Multilingual Content', 'illuminated-path-core' ), 'primary', 'submit', false ); ?>
                </form>
                <?php if ( $summary ) : ?>
                    <hr>
                    <p><?php echo esc_html( sprintf( __( 'Created: %1$d · Updated: %2$d · Protected/skipped: %3$d', 'illuminated-path-core' ), $summary['created'], $summary['updated'], $summary['skipped'] ) ); ?></p>
                    <p><?php echo esc_html( sprintf( __( 'Installed languages detected on this site: %s', 'illuminated-path-core' ), implode( ', ', $summary['languages'] ) ) ); ?></p>
                <?php endif; ?>
            </section>
            <aside style="display:grid;gap:16px">
                <section style="background:#fff;border:1px solid #dcdcde;border-radius:12px;padding:22px">
                    <h2><?php esc_html_e( 'Elementor', 'illuminated-path-core' ); ?></h2>
                    <p><?php esc_html_e( 'When Elementor is active, every generated page is seeded as one native Elementor HTML widget containing the complete scoped layout. Shortcodes inside it continue rendering live WooCommerce/WordPress data.', 'illuminated-path-core' ); ?></p>
                </section>
                <section style="background:#fff;border:1px solid #dcdcde;border-radius:12px;padding:22px">
                    <h2><?php esc_html_e( 'Safe updates', 'illuminated-path-core' ); ?></h2>
                    <p><?php esc_html_e( 'The installer stores a content hash. Once you manually modify a generated page, future refreshes skip it instead of overwriting your work.', 'illuminated-path-core' ); ?></p>
                </section>
            </aside>
        </div>
    </div>
    <?php
}
