<?php
/** One-click starter pages and branded menu setup for the commercial bookstore. */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function ip_core_recommended_store_pages(): array {
    return array(
        'islamic-childrens-books' => array(
            'title'   => __( 'Islamic Children’s Books', 'illuminated-path-core' ),
            'content' => '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Islamic Children’s Books', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Introduce your publishing mission, age guidance, themes and what makes this collection useful for Muslim families.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph --><!-- wp:shortcode -->[ip_book_slider title="Featured books" source="featured" limit="8"]<!-- /wp:shortcode -->',
        ),
        'stories-of-the-prophets-for-kids' => array(
            'title'   => __( 'Stories of the Prophets for Kids', 'illuminated-path-core' ),
            'content' => '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Stories of the Prophets for Kids', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Add an original introduction explaining the collection, age suitability and how families can read these stories together.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph --><!-- wp:shortcode -->[ip_book_slider title="Prophet stories" category="stories-of-the-prophets" source="best_selling" limit="10"]<!-- /wp:shortcode -->',
        ),
        'quran-stories-for-kids' => array(
            'title'   => __( 'Quran Stories for Kids', 'illuminated-path-core' ),
            'content' => '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Quran Stories for Kids', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Explain the editorial approach, family reading value and available editions.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph --><!-- wp:shortcode -->[ip_book_slider title="Quran stories" category="quran-stories" limit="10"]<!-- /wp:shortcode -->',
        ),
        'ramadan-eid-books' => array(
            'title'   => __( 'Ramadan & Eid Books', 'illuminated-path-core' ),
            'content' => '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Ramadan & Eid Books for Children', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Create seasonal editorial content, gift ideas and reading recommendations for Ramadan and Eid.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph --><!-- wp:shortcode -->[ip_book_slider title="Ramadan & Eid" category="ramadan" limit="10"]<!-- /wp:shortcode -->',
        ),
        'bilingual-islamic-books' => array(
            'title'   => __( 'Bilingual Islamic Books', 'illuminated-path-core' ),
            'content' => '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Bilingual Islamic Books', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Present bilingual editions, language combinations and how they support Muslim families living in multilingual homes.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph --><!-- wp:shortcode -->[ip_book_slider title="Bilingual books" category="bilingual" limit="10"]<!-- /wp:shortcode -->',
        ),
        'new-releases' => array(
            'title'   => __( 'New Releases', 'illuminated-path-core' ),
            'content' => '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'New Islamic Children’s Book Releases', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:shortcode -->[ip_book_grid source="newest" limit="24"]<!-- /wp:shortcode -->',
        ),
        'best-sellers' => array(
            'title'   => __( 'Best Sellers', 'illuminated-path-core' ),
            'content' => '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Best-Selling Books', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:shortcode -->[ip_book_grid source="best_selling" limit="24"]<!-- /wp:shortcode -->',
        ),
        'special-offers' => array(
            'title'   => __( 'Special Offers', 'illuminated-path-core' ),
            'content' => '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Book Offers & Promotions', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Use this page for seasonal campaigns, advertised coupons and real WooCommerce sale products.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph --><!-- wp:shortcode -->[ip_book_grid source="sale" limit="24"]<!-- /wp:shortcode -->',
        ),
        'books-by-age' => array(
            'title'   => __( 'Books by Age', 'illuminated-path-core' ),
            'content' => '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Islamic Books by Age', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:shortcode -->[ip_collection_grid taxonomy="ip_book_age" limit="12"]<!-- /wp:shortcode -->',
        ),
        'books-by-language' => array(
            'title'   => __( 'Books by Language', 'illuminated-path-core' ),
            'content' => '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Islamic Books by Language', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:shortcode -->[ip_collection_grid taxonomy="ip_book_language" limit="12"]<!-- /wp:shortcode -->',
        ),
        'about' => array(
            'title'   => __( 'About Us', 'illuminated-path-core' ),
            'content' => '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'About Little Muslim Books', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Tell the publishing story, editorial values, mission and the families you serve. Replace this starter copy before publishing.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->',
        ),
        'gift-guide' => array(
            'title'   => __( 'Gift Guide', 'illuminated-path-core' ),
            'content' => '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Islamic Book Gift Guide', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Create gift recommendations by age, occasion and reading interest.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph --><!-- wp:shortcode -->[ip_book_slider title="Popular gifts" source="best_selling" limit="10"]<!-- /wp:shortcode -->',
        ),
        'schools-wholesale' => array(
            'title'   => __( 'Schools & Wholesale', 'illuminated-path-core' ),
            'content' => '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Schools, Bookshops & Wholesale', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Explain bulk ordering, school/library purchasing and wholesale enquiries. Add your contact form before publishing.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->',
        ),
        'shipping-delivery' => array(
            'title'   => __( 'Shipping & Delivery', 'illuminated-path-core' ),
            'content' => '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Shipping & Delivery', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Publish accurate dispatch, shipping-area, delivery-time and tracking information here.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->',
        ),
        'returns-refunds' => array(
            'title'   => __( 'Returns & Refunds', 'illuminated-path-core' ),
            'content' => '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Returns & Refunds', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Replace this starter text with the final return, cancellation and refund policy applicable to your business and market.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->',
        ),
        'faq' => array(
            'title'   => __( 'Frequently Asked Questions', 'illuminated-path-core' ),
            'content' => '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Frequently Asked Questions', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:details --><details class="wp-block-details"><summary>' . esc_html__( 'Which languages are available?', 'illuminated-path-core' ) . '</summary><p>' . esc_html__( 'Edit this answer with your current language catalogue.', 'illuminated-path-core' ) . '</p></details><!-- /wp:details --><!-- wp:details --><details class="wp-block-details"><summary>' . esc_html__( 'How can I track my order?', 'illuminated-path-core' ) . '</summary><p>' . esc_html__( 'Customers can sign in to My Account to see their order history and available tracking information.', 'illuminated-path-core' ) . '</p></details><!-- /wp:details -->',
        ),
        'contact' => array(
            'title'   => __( 'Contact', 'illuminated-path-core' ),
            'content' => '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Contact Little Muslim Books', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Add your contact form, customer-service email and response times here.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->',
        ),
    );
}

function ip_core_register_store_setup_page(): void {
    add_submenu_page(
        'woocommerce',
        __( 'Bookstore Setup', 'illuminated-path-core' ),
        __( 'Bookstore Setup', 'illuminated-path-core' ),
        'manage_woocommerce',
        'ip-store-setup',
        'ip_core_render_store_setup_page'
    );
}
add_action( 'admin_menu', 'ip_core_register_store_setup_page', 61 );

function ip_core_create_store_pages(): array {
    $created = array();
    foreach ( ip_core_recommended_store_pages() as $slug => $page ) {
        $existing = get_page_by_path( $slug, OBJECT, 'page' );
        if ( $existing ) {
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
        if ( ! is_wp_error( $page_id ) ) {
            $created[] = absint( $page_id );
        }
    }
    return $created;
}

function ip_core_get_or_create_menu( string $name ): int {
    $menu = wp_get_nav_menu_object( $name );
    if ( $menu ) {
        return absint( $menu->term_id );
    }
    $result = wp_create_nav_menu( $name );
    return is_wp_error( $result ) ? 0 : absint( $result );
}

function ip_core_menu_has_object( int $menu_id, int $object_id ): bool {
    foreach ( wp_get_nav_menu_items( $menu_id ) ?: array() as $item ) {
        if ( (int) $item->object_id === $object_id ) {
            return true;
        }
    }
    return false;
}

function ip_core_add_page_to_menu( int $menu_id, string $slug ): void {
    $page = get_page_by_path( $slug, OBJECT, 'page' );
    if ( ! $page || 'publish' !== $page->post_status || ip_core_menu_has_object( $menu_id, $page->ID ) ) {
        return;
    }
    wp_update_nav_menu_item( $menu_id, 0, array( 'menu-item-object-id' => $page->ID, 'menu-item-object' => 'page', 'menu-item-type' => 'post_type', 'menu-item-status' => 'publish' ) );
}

function ip_core_build_brand_menus(): array {
    $locations = get_theme_mod( 'nav_menu_locations', array() );
    $built     = array();

    $primary = ip_core_get_or_create_menu( 'Little Muslim Books — Primary' );
    if ( $primary ) {
        foreach ( array( 'islamic-childrens-books', 'stories-of-the-prophets-for-kids', 'quran-stories-for-kids', 'ramadan-eid-books', 'bilingual-islamic-books', 'about' ) as $slug ) {
            ip_core_add_page_to_menu( $primary, $slug );
        }
        $locations['primary'] = $primary;
        $built[] = $primary;
    }

    $shop = ip_core_get_or_create_menu( 'Little Muslim Books — Footer Shop' );
    if ( $shop ) {
        foreach ( array( 'new-releases', 'best-sellers', 'special-offers', 'books-by-age', 'books-by-language' ) as $slug ) { ip_core_add_page_to_menu( $shop, $slug ); }
        $locations['footer_shop'] = $shop;
        $built[] = $shop;
    }

    $discover = ip_core_get_or_create_menu( 'Little Muslim Books — Footer Discover' );
    if ( $discover ) {
        foreach ( array( 'about', 'gift-guide', 'schools-wholesale' ) as $slug ) { ip_core_add_page_to_menu( $discover, $slug ); }
        $locations['footer_discover'] = $discover;
        $built[] = $discover;
    }

    $help = ip_core_get_or_create_menu( 'Little Muslim Books — Footer Help' );
    if ( $help ) {
        foreach ( array( 'contact', 'shipping-delivery', 'returns-refunds', 'faq' ) as $slug ) { ip_core_add_page_to_menu( $help, $slug ); }
        $locations['footer_help'] = $help;
        $built[] = $help;
    }

    set_theme_mod( 'nav_menu_locations', $locations );
    return array_unique( $built );
}

function ip_core_handle_store_setup_actions(): void {
    if ( ! current_user_can( 'manage_woocommerce' ) || empty( $_POST['ip_store_setup_action'] ) ) {
        return;
    }
    check_admin_referer( 'ip_store_setup' );
    $action = sanitize_key( wp_unslash( $_POST['ip_store_setup_action'] ) );
    if ( 'pages' === $action ) {
        $created = ip_core_create_store_pages();
        add_settings_error( 'ip_store_setup', 'pages', sprintf( __( 'Created %d starter page(s) as drafts. Edit, translate and publish them before adding them to menus.', 'illuminated-path-core' ), count( $created ) ), 'success' );
    } elseif ( 'menus' === $action ) {
        $menus = ip_core_build_brand_menus();
        add_settings_error( 'ip_store_setup', 'menus', sprintf( __( 'Prepared %d branded menu(s). Only already-published starter pages were added.', 'illuminated-path-core' ), count( $menus ) ), 'success' );
    }
}
add_action( 'admin_init', 'ip_core_handle_store_setup_actions' );

function ip_core_render_store_setup_page(): void {
    if ( ! current_user_can( 'manage_woocommerce' ) ) {
        return;
    }
    settings_errors( 'ip_store_setup' );
    ?>
    <div class="wrap">
        <h1><?php esc_html_e( 'Little Muslim Books — Store Setup', 'illuminated-path-core' ); ?></h1>
        <p><?php esc_html_e( 'Use these tools to create the commercial/SEO page structure without hardcoding content. Starter pages are drafts so you can edit and translate them before publication.', 'illuminated-path-core' ); ?></p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:18px;max-width:1050px;margin-top:24px">
            <section style="background:#fff;border:1px solid #dcdcde;border-radius:12px;padding:22px">
                <h2><?php esc_html_e( '1. Starter marketing & SEO pages', 'illuminated-path-core' ); ?></h2>
                <p><?php esc_html_e( 'Creates missing collection, campaign, brand and customer-help pages with branded block/shortcode starters.', 'illuminated-path-core' ); ?></p>
                <form method="post"><?php wp_nonce_field( 'ip_store_setup' ); ?><input type="hidden" name="ip_store_setup_action" value="pages"><?php submit_button( __( 'Create missing starter pages', 'illuminated-path-core' ), 'primary', 'submit', false ); ?></form>
            </section>
            <section style="background:#fff;border:1px solid #dcdcde;border-radius:12px;padding:22px">
                <h2><?php esc_html_e( '2. Header & footer menus', 'illuminated-path-core' ); ?></h2>
                <p><?php esc_html_e( 'Creates branded primary/shop/discover/help menus and assigns them to the theme. Publish your starter pages first, then run this step again.', 'illuminated-path-core' ); ?></p>
                <form method="post"><?php wp_nonce_field( 'ip_store_setup' ); ?><input type="hidden" name="ip_store_setup_action" value="menus"><?php submit_button( __( 'Build / refresh branded menus', 'illuminated-path-core' ), 'secondary', 'submit', false ); ?></form>
            </section>
            <section style="background:#fff;border:1px solid #dcdcde;border-radius:12px;padding:22px">
                <h2><?php esc_html_e( '3. Visual editing', 'illuminated-path-core' ); ?></h2>
                <p><?php esc_html_e( 'Every starter page works with the WordPress editor. When Elementor is active, you also get Little Muslim Books widgets for Book Slider, Product Spotlight, Collection Grid, Search, Sale Banner and Parent Reviews.', 'illuminated-path-core' ); ?></p>
                <p><strong><?php echo did_action( 'elementor/loaded' ) ? esc_html__( 'Elementor detected and supported.', 'illuminated-path-core' ) : esc_html__( 'Elementor is not active; native blocks/patterns remain fully available.', 'illuminated-path-core' ); ?></strong></p>
            </section>
        </div>
    </div>
    <?php
}
