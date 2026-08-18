<?php
/**
 * Native Elementor starter layouts for the pre-made bookstore pages.
 *
 * Gutenberg content remains in post_content as a safe fallback. When Elementor
 * is active, generated/core pages can additionally receive editable Elementor
 * containers/widgets without requiring the merchant to rebuild them manually.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function ip_core_elementor_native_ready(): bool {
    return did_action( 'elementor/loaded' ) && class_exists( '\\Elementor\\Plugin' );
}

function ip_core_elementor_id( string $seed ): string {
    return substr( md5( 'lmb-' . $seed ), 0, 8 );
}

function ip_core_elementor_widget( string $widget_type, array $settings, string $seed ): array {
    return array(
        'id'         => ip_core_elementor_id( $seed ),
        'elType'     => 'widget',
        'isInner'    => false,
        'widgetType' => $widget_type,
        'settings'   => (object) $settings,
        'elements'   => array(),
    );
}

function ip_core_elementor_container( array $elements, string $seed, array $settings = array() ): array {
    $defaults = array(
        'content_width' => 'boxed',
        'boxed_width'   => array( 'size' => 1220, 'unit' => 'px' ),
        'flex_direction'=> 'column',
        'flex_gap'      => array( 'size' => 20, 'unit' => 'px' ),
        'padding'       => array( 'unit' => 'px', 'top' => 48, 'right' => 24, 'bottom' => 48, 'left' => 24, 'isLinked' => false ),
    );
    return array(
        'id'      => ip_core_elementor_id( $seed ),
        'elType'  => 'container',
        'isInner' => false,
        'settings'=> (object) array_merge( $defaults, $settings ),
        'elements'=> $elements,
    );
}

function ip_core_elementor_heading( string $title, string $seed, string $tag = 'h2' ): array {
    return ip_core_elementor_widget( 'heading', array( 'title' => $title, 'header_size' => $tag ), $seed );
}

function ip_core_elementor_text( string $html, string $seed ): array {
    return ip_core_elementor_widget( 'text-editor', array( 'editor' => wp_kses_post( $html ) ), $seed );
}

function ip_core_elementor_shortcode_widget( string $shortcode, string $seed ): array {
    return ip_core_elementor_widget( 'shortcode', array( 'shortcode' => $shortcode ), $seed );
}

function ip_core_elementor_hero( string $eyebrow, string $title, string $body, string $seed ): array {
    return ip_core_elementor_container(
        array(
            ip_core_elementor_text( '<p class="section-kicker">' . esc_html( $eyebrow ) . '</p>', $seed . '-eyebrow' ),
            ip_core_elementor_heading( $title, $seed . '-title', 'h1' ),
            ip_core_elementor_text( '<p class="has-large-font-size">' . esc_html( $body ) . '</p>', $seed . '-body' ),
        ),
        $seed . '-hero',
        array(
            'padding' => array( 'unit' => 'px', 'top' => 82, 'right' => 24, 'bottom' => 60, 'left' => 24, 'isLinked' => false ),
        )
    );
}

function ip_core_elementor_slider( string $title, string $source, string $seed, array $extra = array() ): array {
    return ip_core_elementor_container(
        array(
            ip_core_elementor_widget(
                'ip-book-slider',
                array_merge(
                    array(
                        'title'    => $title,
                        'subtitle' => '',
                        'source'   => $source,
                        'limit'    => 8,
                    ),
                    $extra
                ),
                $seed . '-slider-widget'
            ),
        ),
        $seed . '-slider'
    );
}

function ip_core_elementor_collection_grid( string $title, string $taxonomy, string $seed ): array {
    return ip_core_elementor_container(
        array(
            ip_core_elementor_heading( $title, $seed . '-heading' ),
            ip_core_elementor_widget( 'ip-collection-grid', array( 'taxonomy' => $taxonomy, 'limit' => 12 ), $seed . '-grid-widget' ),
        ),
        $seed . '-grid'
    );
}

function ip_core_elementor_starter_specs(): array {
    return array(
        'islamic-childrens-books' => array(
            ip_core_elementor_hero( __( 'Little Muslim Books', 'illuminated-path-core' ), __( 'Islamic Children’s Books', 'illuminated-path-core' ), __( 'Beautifully made books that help Muslim children meet faith, values and heritage through stories they want to return to.', 'illuminated-path-core' ), 'islamic-books' ),
            ip_core_elementor_slider( __( 'Featured books', 'illuminated-path-core' ), 'featured', 'islamic-featured' ),
            ip_core_elementor_collection_grid( __( 'Explore by theme', 'illuminated-path-core' ), 'ip_book_theme', 'islamic-theme' ),
        ),
        'stories-of-the-prophets-for-kids' => array(
            ip_core_elementor_hero( __( 'Stories of the Prophets', 'illuminated-path-core' ), __( 'Stories of the Prophets for Kids', 'illuminated-path-core' ), __( 'Introduce children to the Prophets through respectful storytelling, beautiful illustration and family reading.', 'illuminated-path-core' ), 'prophets' ),
            ip_core_elementor_slider( __( 'Prophet stories', 'illuminated-path-core' ), 'best_selling', 'prophets-books', array( 'category' => 'stories-of-the-prophets' ) ),
        ),
        'quran-stories-for-kids' => array(
            ip_core_elementor_hero( __( 'Quran stories', 'illuminated-path-core' ), __( 'Quran Stories for Kids', 'illuminated-path-core' ), __( 'Books designed to make Quranic stories approachable, memorable and meaningful in family reading.', 'illuminated-path-core' ), 'quran' ),
            ip_core_elementor_slider( __( 'Quran stories', 'illuminated-path-core' ), 'newest', 'quran-books', array( 'category' => 'quran-stories' ) ),
        ),
        'ramadan-eid-books' => array(
            ip_core_elementor_hero( __( 'Seasonal reading', 'illuminated-path-core' ), __( 'Ramadan & Eid Books for Children', 'illuminated-path-core' ), __( 'Stories and family books that help children experience Ramadan and Eid with meaning, memory and joy.', 'illuminated-path-core' ), 'ramadan' ),
            ip_core_elementor_slider( __( 'Ramadan & Eid', 'illuminated-path-core' ), 'newest', 'ramadan-books', array( 'category' => 'ramadan' ) ),
        ),
        'bilingual-islamic-books' => array(
            ip_core_elementor_hero( __( 'For multilingual families', 'illuminated-path-core' ), __( 'Bilingual Islamic Books', 'illuminated-path-core' ), __( 'Editions that help Muslim children approach faith and heritage through the languages that are already part of family life.', 'illuminated-path-core' ), 'bilingual' ),
            ip_core_elementor_slider( __( 'Bilingual books', 'illuminated-path-core' ), 'newest', 'bilingual-books', array( 'category' => 'bilingual' ) ),
            ip_core_elementor_collection_grid( __( 'Shop by language', 'illuminated-path-core' ), 'ip_book_language', 'bilingual-languages' ),
        ),
        'new-releases' => array(
            ip_core_elementor_hero( __( 'Fresh from the studio', 'illuminated-path-core' ), __( 'New Releases', 'illuminated-path-core' ), __( 'The latest books, new editions and additions to the Little Muslim Books collection.', 'illuminated-path-core' ), 'new-releases' ),
            ip_core_elementor_shortcode_widget( '[ip_book_grid source="newest" limit="24"]', 'new-releases-grid' ),
        ),
        'best-sellers' => array(
            ip_core_elementor_hero( __( 'Family favourites', 'illuminated-path-core' ), __( 'Best-Selling Books', 'illuminated-path-core' ), __( 'Popular books families are choosing for their children and home libraries.', 'illuminated-path-core' ), 'best-sellers' ),
            ip_core_elementor_shortcode_widget( '[ip_book_grid source="best_selling" limit="24"]', 'best-sellers-grid' ),
        ),
        'special-offers' => array(
            ip_core_elementor_hero( __( 'Current promotions', 'illuminated-path-core' ), __( 'Book Offers & Promotions', 'illuminated-path-core' ), __( 'Real WooCommerce sale prices, seasonal offers and advertised coupon campaigns.', 'illuminated-path-core' ), 'offers' ),
            ip_core_elementor_shortcode_widget( '[ip_book_grid source="sale" limit="24"]', 'offers-grid' ),
        ),
        'books-by-age' => array(
            ip_core_elementor_hero( __( 'Find the right reading stage', 'illuminated-path-core' ), __( 'Islamic Books by Age', 'illuminated-path-core' ), __( 'Browse the catalogue by age range to find books suited to each stage of childhood.', 'illuminated-path-core' ), 'by-age' ),
            ip_core_elementor_collection_grid( __( 'Shop by age', 'illuminated-path-core' ), 'ip_book_age', 'age-grid' ),
        ),
        'books-by-language' => array(
            ip_core_elementor_hero( __( 'Multilingual publishing', 'illuminated-path-core' ), __( 'Islamic Books by Language', 'illuminated-path-core' ), __( 'Choose the language that best opens the story for your child and family.', 'illuminated-path-core' ), 'by-language' ),
            ip_core_elementor_collection_grid( __( 'Shop by language', 'illuminated-path-core' ), 'ip_book_language', 'language-grid' ),
        ),
        'about' => array(
            ip_core_elementor_hero( __( 'Why we publish', 'illuminated-path-core' ), __( 'About Little Muslim Books', 'illuminated-path-core' ), __( 'A creative publishing project for Muslim families who want faith, culture and beautiful storytelling to have a confident place in their children’s world.', 'illuminated-path-core' ), 'about' ),
            ip_core_elementor_container( array(
                ip_core_elementor_heading( __( 'It began with a question many Muslim parents know', 'illuminated-path-core' ), 'about-question' ),
                ip_core_elementor_text( '<p>' . esc_html__( 'How do we help our children love what we are trying to teach them—not only know it? Muslim children deserve stories about their faith, Prophets, values and cultures created with the same visual care and narrative ambition as the media surrounding them.', 'illuminated-path-core' ) . '</p>', 'about-question-text' ),
                ip_core_elementor_heading( __( 'Creative quality and religious value belong together', 'illuminated-path-core' ), 'about-quality' ),
                ip_core_elementor_text( '<p>' . esc_html__( 'Our background in illustration, game design, digital media and educational storytelling informs how we create. We want parents to find material they can trust and children to find books they genuinely want to open, explore and revisit.', 'illuminated-path-core' ) . '</p>', 'about-quality-text' ),
            ), 'about-story' ),
            ip_core_elementor_shortcode_widget( '[ip_creator_grid limit="12"]', 'about-creators' ),
        ),
        'our-story' => array(
            ip_core_elementor_hero( __( 'Our story', 'illuminated-path-core' ), __( 'Our children are surrounded by stories. Their own story should be among the most beautiful.', 'illuminated-path-core' ), __( 'Little Muslim Books exists to help Muslim families bring faith, values, history and cultural memory into a child’s imagination through contemporary visual storytelling.', 'illuminated-path-core' ), 'our-story' ),
            ip_core_elementor_container( array(
                ip_core_elementor_heading( __( 'Built for Muslim families raising children across cultures', 'illuminated-path-core' ), 'story-west' ),
                ip_core_elementor_text( '<p>' . esc_html__( 'Many Muslim parents in Europe and the wider West are raising children between languages, schools, media worlds and cultural references. We see books as one practical way to keep Islamic identity familiar, loved and present in everyday family life.', 'illuminated-path-core' ) . '</p>', 'story-west-text' ),
                ip_core_elementor_heading( __( 'We chose to build what we wanted our children to have', 'illuminated-path-core' ), 'story-build' ),
                ip_core_elementor_text( '<p>' . esc_html__( 'Rather than accept a gap between meaningful religious content and compelling creative production, we use professional illustration, design and storytelling to make Islamic children’s publishing feel contemporary, warm and worth choosing.', 'illuminated-path-core' ) . '</p>', 'story-build-text' ),
            ), 'story-body' ),
        ),
        'our-philosophy' => array(
            ip_core_elementor_hero( __( 'Our publishing philosophy', 'illuminated-path-core' ), __( 'Education begins before the lesson: it begins with what a child learns to love.', 'illuminated-path-core' ), __( 'We want children to build familiarity, affection and confidence toward faith, Islamic values and cultural inheritance.', 'illuminated-path-core' ), 'philosophy' ),
            ip_core_elementor_container( array(
                ip_core_elementor_heading( __( 'Meaning before memorisation', 'illuminated-path-core' ), 'philosophy-meaning' ),
                ip_core_elementor_text( '<p>' . esc_html__( 'Stories help knowledge connect to emotion, place, character and family conversation.', 'illuminated-path-core' ) . '</p>', 'philosophy-meaning-text' ),
                ip_core_elementor_heading( __( 'Beauty is part of the invitation', 'illuminated-path-core' ), 'philosophy-beauty' ),
                ip_core_elementor_text( '<p>' . esc_html__( 'Illustration and design help children pause, imagine and want to return. Creative quality is part of how a book earns attention.', 'illuminated-path-core' ) . '</p>', 'philosophy-beauty-text' ),
                ip_core_elementor_heading( __( 'Parents remain central', 'illuminated-path-core' ), 'philosophy-parents' ),
                ip_core_elementor_text( '<p>' . esc_html__( 'The books are tools for reading, conversation and memory inside family life—not replacements for parents or educators.', 'illuminated-path-core' ) . '</p>', 'philosophy-parents-text' ),
            ), 'philosophy-body' ),
        ),
        'creators' => array(
            ip_core_elementor_hero( __( 'The people behind the books', 'illuminated-path-core' ), __( 'Meet Our Creators', 'illuminated-path-core' ), __( 'Illustrators, designers, writers and creative professionals bringing contemporary craft and lived Muslim perspective to the collection.', 'illuminated-path-core' ), 'creators' ),
            ip_core_elementor_shortcode_widget( '[ip_creator_grid limit="24"]', 'creators-grid' ),
        ),
        'gift-guide' => array(
            ip_core_elementor_hero( __( 'Thoughtful gifts', 'illuminated-path-core' ), __( 'Islamic Book Gift Guide', 'illuminated-path-core' ), __( 'Find books by age, occasion and reading interest for meaningful gifts children can keep.', 'illuminated-path-core' ), 'gift-guide' ),
            ip_core_elementor_slider( __( 'Popular gifts', 'illuminated-path-core' ), 'best_selling', 'gift-books' ),
        ),
        'schools-wholesale' => array(
            ip_core_elementor_hero( __( 'For educators and booksellers', 'illuminated-path-core' ), __( 'Schools, Libraries, Bookshops & Wholesale', 'illuminated-path-core' ), __( 'Talk to us about classroom libraries, bulk orders, institutional purchasing and bookshop supply.', 'illuminated-path-core' ), 'wholesale' ),
            ip_core_elementor_shortcode_widget( '[ip_contact_hub]', 'wholesale-contact' ),
        ),
        'shipping-delivery' => array(
            ip_core_elementor_hero( __( 'Order help', 'illuminated-path-core' ), __( 'Shipping & Delivery', 'illuminated-path-core' ), __( 'Edit this page with your accurate dispatch, destination, delivery-time and tracking information.', 'illuminated-path-core' ), 'shipping' ),
        ),
        'returns-refunds' => array(
            ip_core_elementor_hero( __( 'Order help', 'illuminated-path-core' ), __( 'Returns & Refunds', 'illuminated-path-core' ), __( 'Edit this page with the final return, cancellation and refund policy applicable to your business and markets.', 'illuminated-path-core' ), 'returns' ),
        ),
        'faq' => array(
            ip_core_elementor_hero( __( 'Helpful answers', 'illuminated-path-core' ), __( 'Frequently Asked Questions', 'illuminated-path-core' ), __( 'Use Elementor widgets such as Accordion to expand this starter page with your shipping, language, format and ordering questions.', 'illuminated-path-core' ), 'faq' ),
        ),
        'contact' => array(
            ip_core_elementor_hero( __( 'Talk to us', 'illuminated-path-core' ), __( 'Contact Little Muslim Books', 'illuminated-path-core' ), __( 'Customer care, schools, bookshops, partnerships and creative collaborations can all reach the right part of the project here.', 'illuminated-path-core' ), 'contact' ),
            ip_core_elementor_shortcode_widget( '[ip_contact_hub]', 'contact-hub' ),
        ),
    );
}

function ip_core_elementor_is_generated_page( WP_Post $page ): bool {
    if ( 'page' !== $page->post_type ) { return false; }
    $specs = ip_core_elementor_starter_specs();
    if ( ! isset( $specs[ $page->post_name ] ) ) { return false; }
    $content = (string) $page->post_content;
    return str_contains( $content, '<!-- ip-brand-starter -->' )
        || str_contains( $content, '<!-- ip-parent-message-v2 -->' )
        || str_contains( $content, 'Introduce your publishing mission' )
        || str_contains( $content, 'Replace this starter' )
        || str_contains( $content, '[ip_book_' )
        || str_contains( $content, '[ip_collection_grid' )
        || str_contains( $content, '[ip_contact_hub' );
}

function ip_core_elementor_seed_page( int $post_id, bool $force = false ): bool {
    if ( ! ip_core_elementor_native_ready() ) { return false; }
    $page = get_post( $post_id );
    if ( ! $page instanceof WP_Post || ! ip_core_elementor_is_generated_page( $page ) ) { return false; }
    $specs = ip_core_elementor_starter_specs();
    $elements = $specs[ $page->post_name ] ?? array();
    if ( ! $elements ) { return false; }

    $existing = (string) get_post_meta( $post_id, '_elementor_data', true );
    if ( $existing && ! $force ) { return false; }

    if ( ! get_post_meta( $post_id, '_ip_pre_elementor_content', true ) ) {
        update_post_meta( $post_id, '_ip_pre_elementor_content', (string) $page->post_content );
    }

    update_post_meta( $post_id, '_elementor_edit_mode', 'builder' );
    update_post_meta( $post_id, '_elementor_template_type', 'wp-page' );
    update_post_meta( $post_id, '_elementor_data', wp_slash( wp_json_encode( $elements ) ) );
    update_post_meta( $post_id, '_wp_page_template', 'templates/elementor-full-width.php' );
    if ( defined( 'ELEMENTOR_VERSION' ) ) {
        update_post_meta( $post_id, '_elementor_version', ELEMENTOR_VERSION );
    }
    clean_post_cache( $post_id );
    return true;
}

function ip_core_elementor_seed_on_generated_page_save( int $post_id, WP_Post $post, bool $update ): void {
    if ( wp_is_post_revision( $post_id ) || wp_is_post_autosave( $post_id ) || ! ip_core_elementor_native_ready() ) { return; }
    if ( (string) get_post_meta( $post_id, '_elementor_data', true ) ) { return; }
    ip_core_elementor_seed_page( $post_id, false );
}
add_action( 'save_post_page', 'ip_core_elementor_seed_on_generated_page_save', 80, 3 );

function ip_core_elementor_prepare_all_generated_pages( bool $force = false ): array {
    if ( ! ip_core_elementor_native_ready() ) { return array(); }
    $changed = array();
    foreach ( array_keys( ip_core_elementor_starter_specs() ) as $slug ) {
        $page = get_page_by_path( $slug, OBJECT, 'page' );
        if ( $page && ip_core_elementor_seed_page( $page->ID, $force ) ) {
            $changed[] = (int) $page->ID;
        }
    }
    return $changed;
}

function ip_core_register_elementor_pages_admin(): void {
    add_submenu_page(
        'woocommerce',
        __( 'Elementor Starter Pages', 'illuminated-path-core' ),
        __( 'Elementor Starter Pages', 'illuminated-path-core' ),
        'manage_woocommerce',
        'ip-elementor-pages',
        'ip_core_render_elementor_pages_admin'
    );
}
add_action( 'admin_menu', 'ip_core_register_elementor_pages_admin', 63 );

function ip_core_render_elementor_pages_admin(): void {
    if ( ! current_user_can( 'manage_woocommerce' ) ) { return; }
    $message = '';
    if ( isset( $_POST['ip_elementor_pages_action'] ) ) {
        check_admin_referer( 'ip_elementor_pages' );
        if ( ! ip_core_elementor_native_ready() ) {
            $message = __( 'Elementor is not active. The starter pages remain editable with WordPress blocks.', 'illuminated-path-core' );
        } else {
            $force = 'rebuild' === sanitize_key( wp_unslash( $_POST['ip_elementor_pages_action'] ) );
            $changed = ip_core_elementor_prepare_all_generated_pages( $force );
            $message = sprintf( __( 'Prepared %d starter page(s) as native Elementor layouts.', 'illuminated-path-core' ), count( $changed ) );
        }
    }
    ?>
    <div class="wrap">
        <h1><?php esc_html_e( 'Little Muslim Books — Elementor Starter Pages', 'illuminated-path-core' ); ?></h1>
        <?php if ( $message ) : ?><div class="notice notice-success inline"><p><?php echo esc_html( $message ); ?></p></div><?php endif; ?>
        <p><?php esc_html_e( 'When Elementor is active, pre-made bookstore pages can be stored as native Elementor containers and widgets. Their original WordPress-block content is retained as a fallback backup.', 'illuminated-path-core' ); ?></p>
        <?php if ( ! ip_core_elementor_native_ready() ) : ?>
            <div class="notice notice-info inline"><p><?php esc_html_e( 'Install and activate Elementor to enable native visual editing. No Elementor dependency is required for the storefront to work.', 'illuminated-path-core' ); ?></p></div>
        <?php else : ?>
            <form method="post" style="margin:22px 0">
                <?php wp_nonce_field( 'ip_elementor_pages' ); ?>
                <input type="hidden" name="ip_elementor_pages_action" value="prepare">
                <?php submit_button( __( 'Prepare Missing Elementor Layouts', 'illuminated-path-core' ), 'primary', 'submit', false ); ?>
            </form>
            <details style="max-width:800px;background:#fff;border:1px solid #dcdcde;border-radius:10px;padding:16px">
                <summary><strong><?php esc_html_e( 'Rebuild generated Elementor layouts', 'illuminated-path-core' ); ?></strong></summary>
                <p><?php esc_html_e( 'Use this only for starter/generated pages you want to reset. It replaces existing Elementor layout data for recognised generated pages, while the pre-Elementor block content remains backed up in post meta.', 'illuminated-path-core' ); ?></p>
                <form method="post">
                    <?php wp_nonce_field( 'ip_elementor_pages' ); ?>
                    <input type="hidden" name="ip_elementor_pages_action" value="rebuild">
                    <?php submit_button( __( 'Rebuild Generated Elementor Pages', 'illuminated-path-core' ), 'secondary', 'submit', false ); ?>
                </form>
            </details>
        <?php endif; ?>
    </div>
    <?php
}
