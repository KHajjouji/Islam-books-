<?php
/**
 * One-click production site setup for Little Muslim Books.
 *
 * This installs real bookstore structure and editorial starter content without
 * inventing products, reviews, creator biographies, shipping promises or legal
 * claims that must come from the merchant.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function ip_core_production_product_categories(): array {
    return array(
        'islamic-childrens-books'    => __( 'Islamic Children’s Books', 'illuminated-path-core' ),
        'stories-of-the-prophets'    => __( 'Stories of the Prophets', 'illuminated-path-core' ),
        'quran-stories'              => __( 'Quran Stories', 'illuminated-path-core' ),
        'ramadan'                    => __( 'Ramadan & Eid', 'illuminated-path-core' ),
        'bilingual'                  => __( 'Bilingual Books', 'illuminated-path-core' ),
        'bedtime'                    => __( 'Bedtime Stories', 'illuminated-path-core' ),
        'akhlaq-values'              => __( 'Akhlaq & Values', 'illuminated-path-core' ),
    );
}

function ip_core_ensure_product_categories(): array {
    $created = array();
    foreach ( ip_core_production_product_categories() as $slug => $name ) {
        $existing = get_term_by( 'slug', $slug, 'product_cat' );
        if ( $existing instanceof WP_Term ) {
            continue;
        }
        $result = wp_insert_term( $name, 'product_cat', array( 'slug' => $slug ) );
        if ( ! is_wp_error( $result ) ) {
            $created[] = absint( $result['term_id'] );
        }
    }
    return $created;
}

function ip_core_production_page_defaults(): array {
    return array(
        'home' => array(
            'title'   => __( 'Home', 'illuminated-path-core' ),
            'status'  => 'publish',
            'content' => '<!-- wp:paragraph --><p>' . esc_html__( 'The automatic Little Muslim Books storefront is controlled by the theme and WooCommerce. Switch the homepage to Full WordPress / Elementor Builder whenever you want the page itself to replace the automatic layout.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->',
        ),
        'blog' => array(
            'title'   => __( 'Journal & Resources', 'illuminated-path-core' ),
            'status'  => 'publish',
            'content' => '',
        ),
        'track-order' => array(
            'title'   => __( 'Track Your Order', 'illuminated-path-core' ),
            'status'  => 'publish',
            'content' => '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Track Your Order', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Enter the order details from your confirmation email. Customers with an account can also follow every order from My Account.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph --><!-- wp:shortcode -->[woocommerce_order_tracking]<!-- /wp:shortcode -->',
        ),
        'privacy-policy' => array(
            'title'   => __( 'Privacy Policy', 'illuminated-path-core' ),
            'status'  => 'draft',
            'content' => '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Privacy Policy', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Complete this page using the WordPress Privacy Guide and the actual services, analytics, payment gateways, mailing tools and cookies used on this store before publishing.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->',
        ),
        'terms-conditions' => array(
            'title'   => __( 'Terms & Conditions', 'illuminated-path-core' ),
            'status'  => 'draft',
            'content' => '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Terms & Conditions', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Complete the commercial terms for the legal business operating the store before publishing this page.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->',
        ),
        'cookie-policy' => array(
            'title'   => __( 'Cookie Policy', 'illuminated-path-core' ),
            'status'  => 'draft',
            'content' => '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Cookie Policy', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Generate the final cookie disclosure from the consent/privacy tooling actually configured on this WordPress site before publishing.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->',
        ),
    );
}

function ip_core_ensure_production_pages(): array {
    $changed = array();
    foreach ( ip_core_production_page_defaults() as $slug => $page ) {
        $existing = get_page_by_path( $slug, OBJECT, 'page' );
        if ( $existing instanceof WP_Post ) {
            continue;
        }
        $page_id = wp_insert_post(
            array(
                'post_type'    => 'page',
                'post_status'  => $page['status'],
                'post_title'   => $page['title'],
                'post_name'    => $slug,
                'post_content' => $page['content'],
                'meta_input'   => array( '_wp_page_template' => 'templates/store-landing.php' ),
            ),
            true
        );
        if ( ! is_wp_error( $page_id ) ) {
            $changed[] = absint( $page_id );
        }
    }
    return $changed;
}

function ip_core_publish_safe_editorial_pages(): array {
    $safe = array(
        'islamic-childrens-books',
        'stories-of-the-prophets-for-kids',
        'quran-stories-for-kids',
        'ramadan-eid-books',
        'bilingual-islamic-books',
        'islamic-bedtime-stories',
        'islamic-values-books-for-kids',
        'new-releases',
        'best-sellers',
        'special-offers',
        'books-by-age',
        'books-by-language',
        'about',
        'our-story',
        'our-philosophy',
        'gift-guide',
        'schools-wholesale',
        'faq',
        'contact',
    );
    $published = array();
    foreach ( $safe as $slug ) {
        $page = get_page_by_path( $slug, OBJECT, 'page' );
        if ( ! $page instanceof WP_Post || 'publish' === $page->post_status ) {
            continue;
        }
        $result = wp_update_post( array( 'ID' => $page->ID, 'post_status' => 'publish' ), true );
        if ( ! is_wp_error( $result ) ) {
            $published[] = absint( $page->ID );
        }
    }
    return $published;
}

function ip_core_setup_front_and_posts_pages(): void {
    $home = get_page_by_path( 'home', OBJECT, 'page' );
    $blog = get_page_by_path( 'blog', OBJECT, 'page' );
    if ( $home instanceof WP_Post ) {
        update_option( 'show_on_front', 'page' );
        update_option( 'page_on_front', $home->ID );
    }
    if ( $blog instanceof WP_Post ) {
        update_option( 'page_for_posts', $blog->ID );
    }
}

function ip_core_menu_has_url( int $menu_id, string $url ): bool {
    $target = untrailingslashit( $url );
    foreach ( wp_get_nav_menu_items( $menu_id ) ?: array() as $item ) {
        if ( untrailingslashit( (string) $item->url ) === $target ) {
            return true;
        }
    }
    return false;
}

function ip_core_add_custom_link_to_menu( int $menu_id, string $label, string $url, int $parent = 0 ): int {
    if ( ! $menu_id || ! $url || ip_core_menu_has_url( $menu_id, $url ) ) {
        return 0;
    }
    $result = wp_update_nav_menu_item(
        $menu_id,
        0,
        array(
            'menu-item-title'     => $label,
            'menu-item-url'       => $url,
            'menu-item-type'      => 'custom',
            'menu-item-status'    => 'publish',
            'menu-item-parent-id' => $parent,
        )
    );
    return is_wp_error( $result ) ? 0 : absint( $result );
}

function ip_core_build_production_menus(): void {
    if ( ! function_exists( 'ip_core_get_or_create_menu' ) || ! function_exists( 'ip_core_add_page_to_menu' ) ) {
        return;
    }

    $locations = get_theme_mod( 'nav_menu_locations', array() );

    $primary = ip_core_get_or_create_menu( 'Little Muslim Books — Primary' );
    if ( $primary ) {
        ip_core_add_page_to_menu( $primary, 'home' );
        if ( function_exists( 'wc_get_page_permalink' ) ) {
            ip_core_add_custom_link_to_menu( $primary, __( 'Books', 'illuminated-path-core' ), wc_get_page_permalink( 'shop' ) );
        }
        foreach ( array( 'stories-of-the-prophets-for-kids', 'quran-stories-for-kids', 'ramadan-eid-books', 'bilingual-islamic-books', 'about', 'contact' ) as $slug ) {
            ip_core_add_page_to_menu( $primary, $slug );
        }
        $locations['primary'] = $primary;
    }

    $shop = ip_core_get_or_create_menu( 'Little Muslim Books — Footer Shop' );
    if ( $shop ) {
        if ( function_exists( 'wc_get_page_permalink' ) ) {
            ip_core_add_custom_link_to_menu( $shop, __( 'All Books', 'illuminated-path-core' ), wc_get_page_permalink( 'shop' ) );
        }
        foreach ( array( 'new-releases', 'best-sellers', 'special-offers', 'books-by-age', 'books-by-language' ) as $slug ) {
            ip_core_add_page_to_menu( $shop, $slug );
        }
        $locations['footer_shop'] = $shop;
    }

    $discover = ip_core_get_or_create_menu( 'Little Muslim Books — Footer Discover' );
    if ( $discover ) {
        foreach ( array( 'about', 'our-story', 'our-philosophy', 'gift-guide', 'schools-wholesale', 'blog' ) as $slug ) {
            ip_core_add_page_to_menu( $discover, $slug );
        }
        $locations['footer_discover'] = $discover;
    }

    $help = ip_core_get_or_create_menu( 'Little Muslim Books — Footer Help' );
    if ( $help ) {
        foreach ( array( 'contact', 'track-order', 'shipping-delivery', 'returns-refunds', 'faq' ) as $slug ) {
            ip_core_add_page_to_menu( $help, $slug );
        }
        if ( function_exists( 'wc_get_page_permalink' ) ) {
            ip_core_add_custom_link_to_menu( $help, __( 'My Account', 'illuminated-path-core' ), wc_get_page_permalink( 'myaccount' ) );
        }
        $locations['footer_help'] = $help;
    }

    $legal = ip_core_get_or_create_menu( 'Little Muslim Books — Legal' );
    if ( $legal ) {
        foreach ( array( 'privacy-policy', 'terms-conditions', 'cookie-policy' ) as $slug ) {
            ip_core_add_page_to_menu( $legal, $slug );
        }
        $locations['legal'] = $legal;
    }

    set_theme_mod( 'nav_menu_locations', $locations );
}

function ip_core_setup_contact_fallbacks(): void {
    $admin_email = sanitize_email( (string) get_option( 'admin_email' ) );
    if ( ! $admin_email ) {
        return;
    }
    foreach ( array( 'ip_brand_support_email', 'ip_brand_wholesale_email', 'ip_brand_collaboration_email', 'ip_brand_press_email' ) as $option ) {
        if ( ! get_option( $option ) ) {
            update_option( $option, $admin_email, false );
        }
    }
    if ( ! get_option( 'ip_brand_response_time' ) ) {
        update_option( 'ip_brand_response_time', __( 'Usually within 1–2 business days', 'illuminated-path-core' ), false );
    }
}

function ip_core_configure_store_defaults(): void {
    set_theme_mod( 'ip_home_layout_mode', get_theme_mod( 'ip_home_layout_mode', 'default' ) ?: 'default' );
    if ( false === get_option( 'woocommerce_enable_reviews', false ) ) {
        update_option( 'woocommerce_enable_reviews', 'yes', false );
    }
}

function ip_core_install_production_site(): array {
    $result = array(
        'base_pages'        => array(),
        'brand_pages'       => array(),
        'production_pages'  => array(),
        'editorial_pages'   => array(),
        'published_pages'   => array(),
        'categories'        => array(),
        'elementor_pages'   => array(),
    );

    if ( function_exists( 'ip_core_create_store_pages' ) ) {
        $result['base_pages'] = ip_core_create_store_pages();
    }
    if ( function_exists( 'ip_core_install_parent_message_pages' ) ) {
        $result['brand_pages'] = ip_core_install_parent_message_pages();
    } elseif ( function_exists( 'ip_core_create_or_upgrade_brand_pages' ) ) {
        $result['brand_pages'] = ip_core_create_or_upgrade_brand_pages();
    }

    $result['production_pages'] = ip_core_ensure_production_pages();
    if ( function_exists( 'ip_core_install_production_editorial_content' ) ) {
        $result['editorial_pages'] = ip_core_install_production_editorial_content();
    }
    $result['published_pages']  = ip_core_publish_safe_editorial_pages();
    $result['categories']       = ip_core_ensure_product_categories();

    ip_core_setup_front_and_posts_pages();
    ip_core_setup_contact_fallbacks();
    ip_core_configure_store_defaults();
    ip_core_build_production_menus();

    if ( function_exists( 'ip_core_elementor_prepare_all_generated_pages' ) ) {
        $result['elementor_pages'] = ip_core_elementor_prepare_all_generated_pages( false );
    }

    update_option( 'ip_core_production_site_installed', IP_CORE_VERSION, false );
    flush_rewrite_rules( false );

    return $result;
}

function ip_core_register_production_site_page(): void {
    add_submenu_page(
        'woocommerce',
        __( 'Production Site Setup', 'illuminated-path-core' ),
        __( 'Production Site Setup', 'illuminated-path-core' ),
        'manage_woocommerce',
        'ip-production-site',
        'ip_core_render_production_site_page'
    );
}
add_action( 'admin_menu', 'ip_core_register_production_site_page', 50 );

function ip_core_render_production_site_page(): void {
    if ( ! current_user_can( 'manage_woocommerce' ) ) {
        return;
    }

    $summary = null;
    if ( isset( $_POST['ip_install_production_site'] ) ) {
        check_admin_referer( 'ip_install_production_site' );
        $summary = ip_core_install_production_site();
        add_settings_error( 'ip_production_site', 'installed', __( 'Production bookstore structure prepared. Existing custom pages and real product data were not overwritten.', 'illuminated-path-core' ), 'success' );
    }

    settings_errors( 'ip_production_site' );
    $installed = (string) get_option( 'ip_core_production_site_installed', '' );
    ?>
    <div class="wrap">
        <h1><?php esc_html_e( 'Little Muslim Books — Production Site Setup', 'illuminated-path-core' ); ?></h1>
        <p><?php esc_html_e( 'Use this once after installing the theme, WooCommerce and Illuminated Path Core. It prepares the real bookstore structure, not fake demo commerce data.', 'illuminated-path-core' ); ?></p>

        <div style="max-width:1100px;display:grid;grid-template-columns:minmax(0,1.35fr) minmax(300px,.65fr);gap:22px;align-items:start">
            <section style="background:#fff;border:1px solid #dcdcde;border-radius:12px;padding:24px">
                <h2><?php esc_html_e( 'What the installer prepares', 'illuminated-path-core' ); ?></h2>
                <ul style="list-style:disc;padding-left:22px;line-height:1.8">
                    <li><?php esc_html_e( 'Home page and Journal / Resources page assigned in WordPress Reading settings.', 'illuminated-path-core' ); ?></li>
                    <li><?php esc_html_e( 'Commercial and SEO landing pages for Prophets, Quran, Ramadan, bilingual books, age, language, new releases, best sellers and offers.', 'illuminated-path-core' ); ?></li>
                    <li><?php esc_html_e( 'About, Our Story, Our Philosophy, Contact, Gift Guide, Wholesale and FAQ content.', 'illuminated-path-core' ); ?></li>
                    <li><?php esc_html_e( 'WooCommerce product categories and branded header/footer navigation.', 'illuminated-path-core' ); ?></li>
                    <li><?php esc_html_e( 'Guest order-tracking page plus My Account/order links.', 'illuminated-path-core' ); ?></li>
                    <li><?php esc_html_e( 'Elementor-native starter layouts when Elementor is active.', 'illuminated-path-core' ); ?></li>
                    <li><?php esc_html_e( 'Draft legal, privacy, cookie, shipping and returns pages for merchant-specific completion.', 'illuminated-path-core' ); ?></li>
                </ul>

                <form method="post">
                    <?php wp_nonce_field( 'ip_install_production_site' ); ?>
                    <input type="hidden" name="ip_install_production_site" value="1">
                    <?php submit_button( $installed ? __( 'Refresh Missing Production Structure', 'illuminated-path-core' ) : __( 'Prepare Production Bookstore', 'illuminated-path-core' ), 'primary', 'submit', false ); ?>
                </form>

                <?php if ( $summary ) : ?>
                    <h3 style="margin-top:24px"><?php esc_html_e( 'This run', 'illuminated-path-core' ); ?></h3>
                    <ul>
                        <li><?php echo esc_html( sprintf( __( '%d base page(s) created.', 'illuminated-path-core' ), count( $summary['base_pages'] ) ) ); ?></li>
                        <li><?php echo esc_html( sprintf( __( '%d brand page(s) prepared.', 'illuminated-path-core' ), count( $summary['brand_pages'] ) ) ); ?></li>
                        <li><?php echo esc_html( sprintf( __( '%d production utility page(s) created.', 'illuminated-path-core' ), count( $summary['production_pages'] ) ) ); ?></li>
                        <li><?php echo esc_html( sprintf( __( '%d production editorial page(s) created or upgraded.', 'illuminated-path-core' ), count( $summary['editorial_pages'] ) ) ); ?></li>
                        <li><?php echo esc_html( sprintf( __( '%d safe editorial page(s) published.', 'illuminated-path-core' ), count( $summary['published_pages'] ) ) ); ?></li>
                        <li><?php echo esc_html( sprintf( __( '%d book category/categories created.', 'illuminated-path-core' ), count( $summary['categories'] ) ) ); ?></li>
                        <li><?php echo esc_html( sprintf( __( '%d Elementor layout(s) prepared.', 'illuminated-path-core' ), count( $summary['elementor_pages'] ) ) ); ?></li>
                    </ul>
                <?php endif; ?>
            </section>

            <aside style="display:grid;gap:16px">
                <section style="background:#fff;border:1px solid #dcdcde;border-radius:12px;padding:22px">
                    <h2><?php esc_html_e( 'Never fabricated', 'illuminated-path-core' ); ?></h2>
                    <p><?php esc_html_e( 'The installer does not create fake books, fake customer reviews, fake creator careers, fake orders or invented shipping/legal promises. Those must be real store data.', 'illuminated-path-core' ); ?></p>
                </section>
                <section style="background:#fff;border:1px solid #dcdcde;border-radius:12px;padding:22px">
                    <h2><?php esc_html_e( 'Still merchant-specific', 'illuminated-path-core' ); ?></h2>
                    <p><?php esc_html_e( 'Add the real logo, product covers, prices, creator biographies, support/form addresses, shipping policy, return policy, legal business details, payment gateways and translation review before launch.', 'illuminated-path-core' ); ?></p>
                </section>
            </aside>
        </div>
    </div>
    <?php
}

function ip_core_production_setup_notice(): void {
    if ( ! current_user_can( 'manage_woocommerce' ) || get_option( 'ip_core_production_site_installed' ) ) {
        return;
    }
    $screen = get_current_screen();
    if ( ! $screen || ! str_contains( (string) $screen->id, 'woocommerce' ) ) {
        return;
    }
    echo '<div class="notice notice-info"><p><strong>' . esc_html__( 'Little Muslim Books:', 'illuminated-path-core' ) . '</strong> ' . esc_html__( 'The production storefront structure has not been prepared yet.', 'illuminated-path-core' ) . ' <a href="' . esc_url( admin_url( 'admin.php?page=ip-production-site' ) ) . '">' . esc_html__( 'Open Production Site Setup', 'illuminated-path-core' ) . '</a></p></div>';
}
add_action( 'admin_notices', 'ip_core_production_setup_notice' );
