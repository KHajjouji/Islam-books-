<?php
/**
 * Institutional brand story, creator profiles and contact hub.
 *
 * Keeps the commercial bookstore credible and human without coupling brand
 * content to the theme. Pages and profiles remain normal, translatable
 * WordPress content and can be edited with Gutenberg or Elementor.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function ip_core_register_creator_post_type(): void {
    $labels = array(
        'name'               => __( 'Creators', 'illuminated-path-core' ),
        'singular_name'      => __( 'Creator', 'illuminated-path-core' ),
        'add_new'            => __( 'Add Creator', 'illuminated-path-core' ),
        'add_new_item'       => __( 'Add Creator Profile', 'illuminated-path-core' ),
        'edit_item'          => __( 'Edit Creator Profile', 'illuminated-path-core' ),
        'new_item'           => __( 'New Creator Profile', 'illuminated-path-core' ),
        'view_item'          => __( 'View Creator', 'illuminated-path-core' ),
        'search_items'       => __( 'Search Creators', 'illuminated-path-core' ),
        'not_found'          => __( 'No creators found.', 'illuminated-path-core' ),
        'menu_name'          => __( 'Creators', 'illuminated-path-core' ),
    );

    register_post_type(
        'ip_creator',
        array(
            'labels'             => $labels,
            'public'             => true,
            'show_ui'            => true,
            'show_in_rest'       => true,
            'menu_icon'          => 'dashicons-art',
            'has_archive'        => true,
            'rewrite'            => array( 'slug' => 'creators', 'with_front' => false ),
            'supports'           => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'page-attributes' ),
            'publicly_queryable' => true,
            'exclude_from_search'=> false,
        )
    );
}
add_action( 'init', 'ip_core_register_creator_post_type', 18 );

function ip_core_creator_meta_box(): void {
    add_meta_box(
        'ip_creator_profile',
        __( 'Creative Profile', 'illuminated-path-core' ),
        'ip_core_render_creator_meta_box',
        'ip_creator',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'ip_core_creator_meta_box' );

function ip_core_render_creator_meta_box( WP_Post $post ): void {
    wp_nonce_field( 'ip_creator_profile', 'ip_creator_profile_nonce' );
    $fields = array(
        '_ip_creator_role'       => array( __( 'Role / title', 'illuminated-path-core' ), __( 'Illustrator, Game Designer, Creative Director…', 'illuminated-path-core' ) ),
        '_ip_creator_disciplines'=> array( __( 'Creative disciplines', 'illuminated-path-core' ), __( 'Illustration, game design, animation, educational media…', 'illuminated-path-core' ) ),
        '_ip_creator_background' => array( __( 'Professional background', 'illuminated-path-core' ), __( 'Short career summary. Keep detailed biography in the main editor.', 'illuminated-path-core' ) ),
        '_ip_creator_perspective'=> array( __( 'Creative / cultural perspective', 'illuminated-path-core' ), __( 'Optional sentence about the perspective this creator brings to the project.', 'illuminated-path-core' ) ),
        '_ip_creator_portfolio'  => array( __( 'Portfolio URL', 'illuminated-path-core' ), 'https://…' ),
        '_ip_creator_instagram'  => array( __( 'Instagram URL', 'illuminated-path-core' ), 'https://instagram.com/…' ),
        '_ip_creator_linkedin'   => array( __( 'LinkedIn URL', 'illuminated-path-core' ), 'https://linkedin.com/…' ),
    );

    echo '<div class="ip-creator-admin-fields">';
    foreach ( $fields as $key => $field ) {
        $value = (string) get_post_meta( $post->ID, $key, true );
        $is_url = str_contains( $key, 'portfolio' ) || str_contains( $key, 'instagram' ) || str_contains( $key, 'linkedin' );
        echo '<p><label for="' . esc_attr( $key ) . '"><strong>' . esc_html( $field[0] ) . '</strong></label><br>';
        echo '<input class="widefat" type="' . ( $is_url ? 'url' : 'text' ) . '" id="' . esc_attr( $key ) . '" name="' . esc_attr( $key ) . '" value="' . esc_attr( $value ) . '" placeholder="' . esc_attr( $field[1] ) . '"></p>';
    }
    echo '<p class="description">' . esc_html__( 'Use the featured image for the portrait and the main editor for the full biography. These profiles are multilingual-plugin friendly.', 'illuminated-path-core' ) . '</p></div>';
}

function ip_core_save_creator_meta( int $post_id ): void {
    if ( ! isset( $_POST['ip_creator_profile_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['ip_creator_profile_nonce'] ) ), 'ip_creator_profile' ) ) {
        return;
    }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    $text_fields = array( '_ip_creator_role', '_ip_creator_disciplines', '_ip_creator_background', '_ip_creator_perspective' );
    $url_fields  = array( '_ip_creator_portfolio', '_ip_creator_instagram', '_ip_creator_linkedin' );
    foreach ( $text_fields as $key ) {
        if ( isset( $_POST[ $key ] ) ) {
            update_post_meta( $post_id, $key, sanitize_text_field( wp_unslash( $_POST[ $key ] ) ) );
        }
    }
    foreach ( $url_fields as $key ) {
        if ( isset( $_POST[ $key ] ) ) {
            update_post_meta( $post_id, $key, esc_url_raw( wp_unslash( $_POST[ $key ] ) ) );
        }
    }
}
add_action( 'save_post_ip_creator', 'ip_core_save_creator_meta' );

function ip_core_creator_card( WP_Post $creator ): string {
    $role        = (string) get_post_meta( $creator->ID, '_ip_creator_role', true );
    $disciplines = (string) get_post_meta( $creator->ID, '_ip_creator_disciplines', true );
    $permalink   = get_permalink( $creator );
    ob_start();
    ?>
    <article class="ip-creator-card">
        <a class="ip-creator-card-image" href="<?php echo esc_url( $permalink ); ?>">
            <?php if ( has_post_thumbnail( $creator ) ) : ?>
                <?php echo get_the_post_thumbnail( $creator, 'large', array( 'loading' => 'lazy' ) ); ?>
            <?php else : ?>
                <span class="ip-creator-placeholder" aria-hidden="true">✦</span>
            <?php endif; ?>
        </a>
        <div class="ip-creator-card-body">
            <?php if ( $role ) : ?><p class="ip-creator-role"><?php echo esc_html( $role ); ?></p><?php endif; ?>
            <h3><a href="<?php echo esc_url( $permalink ); ?>"><?php echo esc_html( get_the_title( $creator ) ); ?></a></h3>
            <?php if ( $disciplines ) : ?><p class="ip-creator-disciplines"><?php echo esc_html( $disciplines ); ?></p><?php endif; ?>
            <?php if ( has_excerpt( $creator ) ) : ?><p><?php echo esc_html( get_the_excerpt( $creator ) ); ?></p><?php endif; ?>
            <a class="text-link" href="<?php echo esc_url( $permalink ); ?>"><?php esc_html_e( 'Meet the creator', 'illuminated-path-core' ); ?> →</a>
        </div>
    </article>
    <?php
    return (string) ob_get_clean();
}

function ip_core_creator_grid_shortcode( array $atts ): string {
    $atts = shortcode_atts( array( 'limit' => 12 ), $atts, 'ip_creator_grid' );
    $query = new WP_Query(
        array(
            'post_type'      => 'ip_creator',
            'post_status'    => 'publish',
            'posts_per_page' => max( 1, min( 50, absint( $atts['limit'] ) ) ),
            'orderby'        => array( 'menu_order' => 'ASC', 'title' => 'ASC' ),
        )
    );
    if ( ! $query->have_posts() ) {
        return current_user_can( 'edit_posts' ) ? '<p class="ip-editor-empty">' . esc_html__( 'Publish Creator profiles to populate this section.', 'illuminated-path-core' ) . '</p>' : '';
    }
    $html = '<div class="ip-creator-grid">';
    foreach ( $query->posts as $creator ) {
        $html .= ip_core_creator_card( $creator );
    }
    return $html . '</div>';
}
add_shortcode( 'ip_creator_grid', 'ip_core_creator_grid_shortcode' );

function ip_core_register_brand_contact_settings(): void {
    $email_options = array( 'ip_brand_support_email', 'ip_brand_wholesale_email', 'ip_brand_collaboration_email', 'ip_brand_press_email' );
    foreach ( $email_options as $option ) {
        register_setting( 'ip_brand_contact', $option, array( 'sanitize_callback' => 'sanitize_email', 'default' => '' ) );
    }
    foreach ( array( 'ip_brand_response_time', 'ip_brand_business_location', 'ip_brand_contact_form_shortcode' ) as $option ) {
        register_setting( 'ip_brand_contact', $option, array( 'sanitize_callback' => 'sanitize_text_field', 'default' => '' ) );
    }
}
add_action( 'admin_init', 'ip_core_register_brand_contact_settings' );

function ip_core_contact_cards(): array {
    return array_filter(
        array(
            array(
                'label' => __( 'Orders & customer care', 'illuminated-path-core' ),
                'body'  => __( 'Questions about an order, delivery, returns or a book you purchased.', 'illuminated-path-core' ),
                'email' => sanitize_email( (string) get_option( 'ip_brand_support_email', '' ) ),
            ),
            array(
                'label' => __( 'Schools, libraries & bookshops', 'illuminated-path-core' ),
                'body'  => __( 'Bulk orders, classroom/library enquiries and wholesale conversations.', 'illuminated-path-core' ),
                'email' => sanitize_email( (string) get_option( 'ip_brand_wholesale_email', '' ) ),
            ),
            array(
                'label' => __( 'Creative collaborations', 'illuminated-path-core' ),
                'body'  => __( 'Illustrators, writers, educators, designers and creative partners who want to work with us.', 'illuminated-path-core' ),
                'email' => sanitize_email( (string) get_option( 'ip_brand_collaboration_email', '' ) ),
            ),
            array(
                'label' => __( 'Press & partnerships', 'illuminated-path-core' ),
                'body'  => __( 'Media, cultural institutions, events, partnerships and publishing conversations.', 'illuminated-path-core' ),
                'email' => sanitize_email( (string) get_option( 'ip_brand_press_email', '' ) ),
            ),
        ),
        static fn( array $card ): bool => ! empty( $card['email'] )
    );
}

function ip_core_contact_hub_shortcode(): string {
    $cards      = ip_core_contact_cards();
    $response   = trim( (string) get_option( 'ip_brand_response_time', '' ) );
    $location   = trim( (string) get_option( 'ip_brand_business_location', '' ) );
    $form_code  = trim( (string) get_option( 'ip_brand_contact_form_shortcode', '' ) );
    ob_start();
    ?>
    <section class="ip-contact-hub">
        <?php if ( $cards ) : ?>
            <div class="ip-contact-grid">
                <?php foreach ( $cards as $card ) : ?>
                    <article class="ip-contact-card">
                        <span class="ip-contact-icon" aria-hidden="true">✦</span>
                        <h3><?php echo esc_html( $card['label'] ); ?></h3>
                        <p><?php echo esc_html( $card['body'] ); ?></p>
                        <a href="mailto:<?php echo esc_attr( antispambot( $card['email'] ) ); ?>"><?php echo esc_html( antispambot( $card['email'] ) ); ?> →</a>
                    </article>
                <?php endforeach; ?>
            </div>
        <?php elseif ( current_user_can( 'manage_woocommerce' ) ) : ?>
            <p class="ip-editor-empty"><?php esc_html_e( 'Configure public contact addresses in WooCommerce → Brand & Contact.', 'illuminated-path-core' ); ?></p>
        <?php endif; ?>

        <?php if ( $response || $location ) : ?>
            <div class="ip-contact-meta">
                <?php if ( $response ) : ?><p><strong><?php esc_html_e( 'Response time', 'illuminated-path-core' ); ?>:</strong> <?php echo esc_html( $response ); ?></p><?php endif; ?>
                <?php if ( $location ) : ?><p><strong><?php esc_html_e( 'Based in', 'illuminated-path-core' ); ?>:</strong> <?php echo esc_html( $location ); ?></p><?php endif; ?>
            </div>
        <?php endif; ?>

        <?php if ( $form_code ) : ?>
            <div class="ip-contact-form-shell"><?php echo do_shortcode( $form_code ); ?></div>
        <?php elseif ( current_user_can( 'manage_woocommerce' ) ) : ?>
            <p class="ip-editor-empty"><?php esc_html_e( 'Add a WPForms, Fluent Forms, Contact Form 7 or other form shortcode in Brand & Contact to display the form here.', 'illuminated-path-core' ); ?></p>
        <?php endif; ?>
    </section>
    <?php
    return (string) ob_get_clean();
}
add_shortcode( 'ip_contact_hub', 'ip_core_contact_hub_shortcode' );

function ip_core_brand_story_pages(): array {
    $about = '<!-- ip-brand-starter -->'
        . '<!-- wp:group {"className":"ip-story-hero","layout":{"type":"constrained"}} --><div class="wp-block-group ip-story-hero">'
        . '<!-- wp:paragraph {"className":"section-kicker"} --><p class="section-kicker">' . esc_html__( 'Why Little Muslim Books exists', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
        . '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Stories that help Muslim children recognise themselves.', 'illuminated-path-core' ) . '</h1><!-- /wp:heading -->'
        . '<!-- wp:paragraph {"fontSize":"large"} --><p class="has-large-font-size">' . esc_html__( 'Children grow up in a world shaped by images, games, animation, books and digital media. These are not only forms of entertainment; they are languages through which children learn who the heroes are, what matters and where they belong.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
        . '</div><!-- /wp:group -->'
        . '<!-- wp:columns {"className":"ip-story-columns"} --><div class="wp-block-columns ip-story-columns"><!-- wp:column --><div class="wp-block-column">'
        . '<!-- wp:heading --><h2>' . esc_html__( 'How the idea began', 'illuminated-path-core' ) . '</h2><!-- /wp:heading -->'
        . '<!-- wp:paragraph --><p>' . esc_html__( 'Little Muslim Books grew from a simple conviction: Muslim children deserve stories about their faith, history and cultures that are created with the same visual ambition, narrative care and contemporary craft they encounter everywhere else.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
        . '<!-- wp:paragraph --><p>' . esc_html__( 'Our creative background spans illustration, game design, digital media and educational storytelling. As Muslims who grew up inside a media-shaped world, we understand how powerfully visual language can form memory, imagination and identity. We created this initiative so that language can also carry children back toward their own heritage—with warmth, beauty and confidence.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
        . '</div><!-- /wp:column --><!-- wp:column --><div class="wp-block-column">'
        . '<!-- wp:heading --><h2>' . esc_html__( 'What we are trying to build', 'illuminated-path-core' ) . '</h2><!-- /wp:heading -->'
        . '<!-- wp:paragraph --><p>' . esc_html__( 'We publish children’s books that make Islamic faith, Muslim history, values and cultural memory feel present rather than distant. The goal is not to compete with the modern world by withdrawing from its visual language, but to use excellent storytelling and design to give Muslim children meaningful stories within it.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
        . '<!-- wp:paragraph --><p>' . esc_html__( 'We begin with books because a book creates a shared space between child and family. Over time, the same publishing world can extend into audio, animation and interactive experiences—without losing the dignity of the story or the values it carries.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
        . '</div><!-- /wp:column --></div><!-- /wp:columns -->'
        . '<!-- wp:heading {"textAlign":"center"} --><h2 class="wp-block-heading has-text-align-center">' . esc_html__( 'Made for Muslim families across languages and places', 'illuminated-path-core' ) . '</h2><!-- /wp:heading -->'
        . '<!-- wp:paragraph {"align":"center"} --><p class="has-text-align-center">' . esc_html__( 'A child growing up in London, Paris, Amsterdam, Madrid or elsewhere should be able to encounter their faith and culture in books that feel natural in the language of their home. That is why multilingual publishing is part of the project from the beginning.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->';

    $philosophy = '<!-- ip-brand-starter -->'
        . '<!-- wp:paragraph {"className":"section-kicker"} --><p class="section-kicker">' . esc_html__( 'Our publishing philosophy', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
        . '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Faith, culture and imagination belong in the same story.', 'illuminated-path-core' ) . '</h1><!-- /wp:heading -->'
        . '<!-- wp:paragraph {"fontSize":"large"} --><p class="has-large-font-size">' . esc_html__( 'We want children to experience Islamic stories as living stories: visually compelling, emotionally intelligible, respectful of faith and connected to the real cultural worlds in which Muslim families live.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
        . '<!-- wp:columns {"className":"ip-philosophy-grid"} --><div class="wp-block-columns ip-philosophy-grid">'
        . '<!-- wp:column --><div class="wp-block-column"><h3>' . esc_html__( 'Rooted, not generic', 'illuminated-path-core' ) . '</h3><p>' . esc_html__( 'Faith and Muslim cultural memory are not decoration added at the end. They are part of the narrative foundation, treated with care and respect.', 'illuminated-path-core' ) . '</p></div><!-- /wp:column -->'
        . '<!-- wp:column --><div class="wp-block-column"><h3>' . esc_html__( 'Visual language matters', 'illuminated-path-core' ) . '</h3><p>' . esc_html__( 'Illustration, composition, character design and visual rhythm help children understand a story before they can explain it. We treat image-making as part of the meaning.', 'illuminated-path-core' ) . '</p></div><!-- /wp:column -->'
        . '<!-- wp:column --><div class="wp-block-column"><h3>' . esc_html__( 'Children deserve quality', 'illuminated-path-core' ) . '</h3><p>' . esc_html__( 'Islamic publishing for children should be beautiful, contemporary and professionally crafted—not something families choose only because the subject is religious.', 'illuminated-path-core' ) . '</p></div><!-- /wp:column -->'
        . '</div><!-- /wp:columns -->'
        . '<!-- wp:columns {"className":"ip-philosophy-grid"} --><div class="wp-block-columns ip-philosophy-grid">'
        . '<!-- wp:column --><div class="wp-block-column"><h3>' . esc_html__( 'Culture is lived', 'illuminated-path-core' ) . '</h3><p>' . esc_html__( 'Muslim childhood is shaped by family, food, language, celebrations, places and everyday gestures as well as formal teaching. Our books can make that wider cultural inheritance visible.', 'illuminated-path-core' ) . '</p></div><!-- /wp:column -->'
        . '<!-- wp:column --><div class="wp-block-column"><h3>' . esc_html__( 'Multilingual by design', 'illuminated-path-core' ) . '</h3><p>' . esc_html__( 'Many Muslim children grow up between languages. Translation and bilingual editions are therefore part of access, belonging and family connection—not merely a commercial afterthought.', 'illuminated-path-core' ) . '</p></div><!-- /wp:column -->'
        . '<!-- wp:column --><div class="wp-block-column"><h3>' . esc_html__( 'Technology should serve the story', 'illuminated-path-core' ) . '</h3><p>' . esc_html__( 'When we later use audio, animation or interactive media, the purpose is to deepen engagement with the story and its meaning rather than to replace reading or family conversation.', 'illuminated-path-core' ) . '</p></div><!-- /wp:column -->'
        . '</div><!-- /wp:columns -->';

    $creators = '<!-- ip-brand-starter -->'
        . '<!-- wp:paragraph {"className":"section-kicker"} --><p class="section-kicker">' . esc_html__( 'The people behind the books', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
        . '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Meet our creators', 'illuminated-path-core' ) . '</h1><!-- /wp:heading -->'
        . '<!-- wp:paragraph {"fontSize":"large"} --><p class="has-large-font-size">' . esc_html__( 'Little Muslim Books brings together Muslim creative experience from illustration, game design, digital media, writing and education. We believe professional creative craft and a lived understanding of Muslim identity can reinforce one another.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
        . '<!-- wp:shortcode -->[ip_creator_grid limit="24"]<!-- /wp:shortcode -->'
        . '<!-- wp:paragraph --><p>' . esc_html__( 'Each profile can include the creator’s career, disciplines, portfolio and the perspective they bring to the project. Add or edit profiles under Creators in WordPress.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->';

    $contact = '<!-- ip-brand-starter -->'
        . '<!-- wp:paragraph {"className":"section-kicker"} --><p class="section-kicker">' . esc_html__( 'Talk to us', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
        . '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Contact Little Muslim Books', 'illuminated-path-core' ) . '</h1><!-- /wp:heading -->'
        . '<!-- wp:paragraph {"fontSize":"large"} --><p class="has-large-font-size">' . esc_html__( 'Whether you are a parent following an order, a school building a library, a bookshop interested in our titles or a creative professional who wants to collaborate, choose the route below and your message will reach the right part of the project.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
        . '<!-- wp:shortcode -->[ip_contact_hub]<!-- /wp:shortcode -->';

    return array(
        'about'          => array( 'title' => __( 'About Us', 'illuminated-path-core' ), 'content' => $about ),
        'our-story'      => array( 'title' => __( 'Our Story', 'illuminated-path-core' ), 'content' => $about ),
        'our-philosophy' => array( 'title' => __( 'Our Philosophy', 'illuminated-path-core' ), 'content' => $philosophy ),
        'creators'       => array( 'title' => __( 'Our Creators', 'illuminated-path-core' ), 'content' => $creators ),
        'contact'        => array( 'title' => __( 'Contact', 'illuminated-path-core' ), 'content' => $contact ),
    );
}

function ip_core_create_or_upgrade_brand_pages(): array {
    $changed = array();
    foreach ( ip_core_brand_story_pages() as $slug => $page ) {
        $existing = get_page_by_path( $slug, OBJECT, 'page' );
        if ( $existing ) {
            $content = (string) $existing->post_content;
            $is_placeholder = str_contains( $content, 'Tell the publishing story' ) || str_contains( $content, 'Add your contact form' ) || str_contains( $content, '<!-- ip-brand-starter -->' );
            if ( ! $is_placeholder ) {
                continue;
            }
            $result = wp_update_post(
                array(
                    'ID'           => $existing->ID,
                    'post_content' => $page['content'],
                    'meta_input'   => array( '_wp_page_template' => 'templates/store-landing.php' ),
                ),
                true
            );
            if ( ! is_wp_error( $result ) ) { $changed[] = absint( $existing->ID ); }
            continue;
        }

        $page_id = wp_insert_post(
            array(
                'post_type'    => 'page',
                'post_status'  => 'draft',
                'post_title'   => $page['title'],
                'post_name'    => $slug,
                'post_content' => $page['content'],
                'meta_input'   => array( '_wp_page_template' => 'templates/store-landing.php' ),
            ),
            true
        );
        if ( ! is_wp_error( $page_id ) ) { $changed[] = absint( $page_id ); }
    }
    return $changed;
}

function ip_core_refresh_brand_discover_menu(): void {
    if ( ! function_exists( 'ip_core_get_or_create_menu' ) || ! function_exists( 'ip_core_add_page_to_menu' ) ) {
        return;
    }
    $locations = get_theme_mod( 'nav_menu_locations', array() );
    $discover = ip_core_get_or_create_menu( 'Little Muslim Books — Footer Discover' );
    if ( $discover ) {
        foreach ( array( 'about', 'our-story', 'our-philosophy', 'creators' ) as $slug ) {
            ip_core_add_page_to_menu( $discover, $slug );
        }
        $locations['footer_discover'] = $discover;
    }
    $help = ip_core_get_or_create_menu( 'Little Muslim Books — Footer Help' );
    if ( $help ) {
        ip_core_add_page_to_menu( $help, 'contact' );
        $locations['footer_help'] = $help;
    }
    set_theme_mod( 'nav_menu_locations', $locations );
}

function ip_core_register_brand_contact_page(): void {
    add_submenu_page(
        'woocommerce',
        __( 'Brand & Contact', 'illuminated-path-core' ),
        __( 'Brand & Contact', 'illuminated-path-core' ),
        'manage_woocommerce',
        'ip-brand-contact',
        'ip_core_render_brand_contact_page'
    );
}
add_action( 'admin_menu', 'ip_core_register_brand_contact_page', 62 );

function ip_core_render_brand_contact_page(): void {
    if ( ! current_user_can( 'manage_woocommerce' ) ) { return; }

    if ( isset( $_POST['ip_brand_setup_action'] ) ) {
        check_admin_referer( 'ip_brand_setup' );
        $action = sanitize_key( wp_unslash( $_POST['ip_brand_setup_action'] ) );
        if ( 'pages' === $action ) {
            $changed = ip_core_create_or_upgrade_brand_pages();
            add_settings_error( 'ip_brand_contact', 'pages', sprintf( __( 'Prepared %d brand page(s). New pages remain drafts; placeholder pages were upgraded without overwriting custom content.', 'illuminated-path-core' ), count( $changed ) ), 'success' );
        } elseif ( 'menus' === $action ) {
            ip_core_refresh_brand_discover_menu();
            add_settings_error( 'ip_brand_contact', 'menus', __( 'Published brand pages were added to the Discover/Help menus where appropriate.', 'illuminated-path-core' ), 'success' );
        }
    }

    settings_errors( 'ip_brand_contact' );
    ?>
    <div class="wrap">
        <h1><?php esc_html_e( 'Little Muslim Books — Brand & Contact', 'illuminated-path-core' ); ?></h1>
        <p><?php esc_html_e( 'Institutional story, creator profiles and public contact routes. The pages created here are normal WordPress pages and can be edited with Gutenberg, Elementor and your multilingual plugin.', 'illuminated-path-core' ); ?></p>

        <div style="display:grid;grid-template-columns:minmax(0,1.4fr) minmax(300px,.8fr);gap:24px;align-items:start;max-width:1200px">
            <section style="background:#fff;border:1px solid #dcdcde;border-radius:12px;padding:24px">
                <h2><?php esc_html_e( 'Public contact routes', 'illuminated-path-core' ); ?></h2>
                <form method="post" action="options.php">
                    <?php settings_fields( 'ip_brand_contact' ); ?>
                    <table class="form-table" role="presentation">
                        <tr><th><label for="ip_brand_support_email"><?php esc_html_e( 'Orders & customer care email', 'illuminated-path-core' ); ?></label></th><td><input class="regular-text" type="email" id="ip_brand_support_email" name="ip_brand_support_email" value="<?php echo esc_attr( (string) get_option( 'ip_brand_support_email', '' ) ); ?>"></td></tr>
                        <tr><th><label for="ip_brand_wholesale_email"><?php esc_html_e( 'Schools / libraries / wholesale email', 'illuminated-path-core' ); ?></label></th><td><input class="regular-text" type="email" id="ip_brand_wholesale_email" name="ip_brand_wholesale_email" value="<?php echo esc_attr( (string) get_option( 'ip_brand_wholesale_email', '' ) ); ?>"></td></tr>
                        <tr><th><label for="ip_brand_collaboration_email"><?php esc_html_e( 'Creative collaborations email', 'illuminated-path-core' ); ?></label></th><td><input class="regular-text" type="email" id="ip_brand_collaboration_email" name="ip_brand_collaboration_email" value="<?php echo esc_attr( (string) get_option( 'ip_brand_collaboration_email', '' ) ); ?>"></td></tr>
                        <tr><th><label for="ip_brand_press_email"><?php esc_html_e( 'Press / partnerships email', 'illuminated-path-core' ); ?></label></th><td><input class="regular-text" type="email" id="ip_brand_press_email" name="ip_brand_press_email" value="<?php echo esc_attr( (string) get_option( 'ip_brand_press_email', '' ) ); ?>"></td></tr>
                        <tr><th><label for="ip_brand_response_time"><?php esc_html_e( 'Public response-time note', 'illuminated-path-core' ); ?></label></th><td><input class="regular-text" type="text" id="ip_brand_response_time" name="ip_brand_response_time" value="<?php echo esc_attr( (string) get_option( 'ip_brand_response_time', '' ) ); ?>" placeholder="e.g. Usually within 1–2 business days"></td></tr>
                        <tr><th><label for="ip_brand_business_location"><?php esc_html_e( 'Public location', 'illuminated-path-core' ); ?></label></th><td><input class="regular-text" type="text" id="ip_brand_business_location" name="ip_brand_business_location" value="<?php echo esc_attr( (string) get_option( 'ip_brand_business_location', '' ) ); ?>" placeholder="e.g. Spain / Europe"></td></tr>
                        <tr><th><label for="ip_brand_contact_form_shortcode"><?php esc_html_e( 'Contact form shortcode', 'illuminated-path-core' ); ?></label></th><td><input class="large-text" type="text" id="ip_brand_contact_form_shortcode" name="ip_brand_contact_form_shortcode" value="<?php echo esc_attr( (string) get_option( 'ip_brand_contact_form_shortcode', '' ) ); ?>" placeholder='[wpforms id="123"]'><p class="description"><?php esc_html_e( 'Use a dedicated form plugin for spam protection, email delivery and form storage. The brand page simply renders its shortcode.', 'illuminated-path-core' ); ?></p></td></tr>
                    </table>
                    <?php submit_button( __( 'Save Contact Settings', 'illuminated-path-core' ) ); ?>
                </form>
            </section>

            <aside style="display:grid;gap:16px">
                <section style="background:#fff;border:1px solid #dcdcde;border-radius:12px;padding:22px">
                    <h2><?php esc_html_e( 'Brand pages', 'illuminated-path-core' ); ?></h2>
                    <p><?php esc_html_e( 'Creates or upgrades starter About, Our Story, Our Philosophy, Creators and Contact pages. Existing custom content is never overwritten.', 'illuminated-path-core' ); ?></p>
                    <form method="post">
                        <?php wp_nonce_field( 'ip_brand_setup' ); ?>
                        <input type="hidden" name="ip_brand_setup_action" value="pages">
                        <?php submit_button( __( 'Prepare Brand Pages', 'illuminated-path-core' ), 'primary', 'submit', false ); ?>
                    </form>
                </section>
                <section style="background:#fff;border:1px solid #dcdcde;border-radius:12px;padding:22px">
                    <h2><?php esc_html_e( 'Brand navigation', 'illuminated-path-core' ); ?></h2>
                    <p><?php esc_html_e( 'After publishing the pages, add them to the existing Discover and Help footer menus.', 'illuminated-path-core' ); ?></p>
                    <form method="post">
                        <?php wp_nonce_field( 'ip_brand_setup' ); ?>
                        <input type="hidden" name="ip_brand_setup_action" value="menus">
                        <?php submit_button( __( 'Refresh Brand Menus', 'illuminated-path-core' ), 'secondary', 'submit', false ); ?>
                    </form>
                </section>
                <section style="background:#fff;border:1px solid #dcdcde;border-radius:12px;padding:22px">
                    <h2><?php esc_html_e( 'Creator profiles', 'illuminated-path-core' ); ?></h2>
                    <p><?php esc_html_e( 'Add real biographies, portraits, roles and portfolios under Creators. Do not publish placeholder biographies as real people.', 'illuminated-path-core' ); ?></p>
                    <p><a class="button" href="<?php echo esc_url( admin_url( 'edit.php?post_type=ip_creator' ) ); ?>"><?php esc_html_e( 'Manage Creators', 'illuminated-path-core' ); ?> →</a></p>
                </section>
            </aside>
        </div>
    </div>
    <?php
}
