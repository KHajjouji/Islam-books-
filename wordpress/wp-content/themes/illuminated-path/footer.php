<?php if ( ! defined( 'ABSPATH' ) ) { exit; } ?>
<?php if ( ! function_exists( 'ip_elementor_do_location' ) || ! ip_elementor_do_location( 'footer' ) ) : ?>
<footer class="site-footer">
<div class="container footer-grid-rich">
    <div class="footer-brand footer-column">
        <a class="brand brand-light" href="<?php echo esc_url( home_url( '/' ) ); ?>">
            <?php $logo_id = absint( get_theme_mod( 'custom_logo' ) ); if ( $logo_id ) : echo wp_get_attachment_image( $logo_id, 'full', false, array( 'class' => 'brand-custom-logo' ) ); else : ?><span class="brand-mark"><span>✦</span></span><?php endif; ?>
            <span class="brand-text"><strong><?php bloginfo( 'name' ); ?></strong></span>
        </a>
        <p><?php echo esc_html( ip_text( 'footer_tagline' ) ); ?></p>
        <div class="footer-socials">
            <?php foreach ( array( 'instagram' => 'Instagram', 'facebook' => 'Facebook', 'pinterest' => 'Pinterest', 'tiktok' => 'TikTok', 'youtube' => 'YouTube' ) as $network => $label ) : $url = get_theme_mod( 'ip_social_' . $network, '' ); if ( ! $url ) { continue; } ?>
                <a href="<?php echo esc_url( $url ); ?>" target="_blank" rel="noopener noreferrer"><?php echo esc_html( $label ); ?></a>
            <?php endforeach; ?>
        </div>
        <p class="footer-payment-note"><?php esc_html_e( 'Secure checkout powered by WooCommerce and your configured payment gateways.', 'illuminated-path' ); ?></p>
    </div>
    <div class="footer-column">
        <h3><?php esc_html_e( 'Shop', 'illuminated-path' ); ?></h3>
        <?php if ( has_nav_menu( 'footer_shop' ) ) { wp_nav_menu( array( 'theme_location' => 'footer_shop', 'container' => false, 'menu_class' => 'footer-menu', 'depth' => 1 ) ); } elseif ( has_nav_menu( 'footer' ) ) { wp_nav_menu( array( 'theme_location' => 'footer', 'container' => false, 'menu_class' => 'footer-menu', 'depth' => 1 ) ); } else { echo '<ul class="footer-menu"><li><a href="' . esc_url( ip_shop_url() ) . '">' . esc_html( ip_text( 'shop' ) ) . '</a></li><li><a href="' . esc_url( ip_product_category_url( 'stories-of-the-prophets' ) ) . '">' . esc_html( ip_text( 'prophets_title' ) ) . '</a></li><li><a href="' . esc_url( ip_product_category_url( 'ramadan' ) ) . '">' . esc_html( ip_text( 'ramadan_title' ) ) . '</a></li></ul>'; } ?>
    </div>
    <div class="footer-column">
        <h3><?php esc_html_e( 'Discover', 'illuminated-path' ); ?></h3>
        <?php if ( has_nav_menu( 'footer_discover' ) ) { wp_nav_menu( array( 'theme_location' => 'footer_discover', 'container' => false, 'menu_class' => 'footer-menu', 'depth' => 1 ) ); } else { echo '<ul class="footer-menu"><li><a href="' . esc_url( home_url( '/about/' ) ) . '">' . esc_html__( 'About us', 'illuminated-path' ) . '</a></li><li><a href="' . esc_url( get_permalink( get_option( 'page_for_posts' ) ) ?: home_url( '/blog/' ) ) . '">' . esc_html( ip_text( 'blog' ) ) . '</a></li></ul>'; } ?>
    </div>
    <div class="footer-column">
        <h3><?php esc_html_e( 'Help', 'illuminated-path' ); ?></h3>
        <?php if ( has_nav_menu( 'footer_help' ) ) { wp_nav_menu( array( 'theme_location' => 'footer_help', 'container' => false, 'menu_class' => 'footer-menu', 'depth' => 1 ) ); } else { echo '<ul class="footer-menu">'; if ( class_exists( 'WooCommerce' ) ) { echo '<li><a href="' . esc_url( wc_get_page_permalink( 'myaccount' ) ) . '">' . esc_html( ip_text( 'account' ) ) . '</a></li>'; if ( is_user_logged_in() ) { echo '<li><a href="' . esc_url( wc_get_account_endpoint_url( 'orders' ) ) . '">' . esc_html__( 'Orders', 'illuminated-path' ) . '</a></li>'; } } echo '<li><a href="' . esc_url( home_url( '/contact/' ) ) . '">' . esc_html__( 'Contact', 'illuminated-path' ) . '</a></li></ul>'; } ?>
    </div>
    <div class="footer-newsletter-area">
        <div><span class="section-kicker"><?php esc_html_e( 'Stay connected', 'illuminated-path' ); ?></span><h3><?php echo esc_html( ip_text( 'newsletter_title' ) ); ?></h3><p><?php echo esc_html( ip_text( 'newsletter_body' ) ); ?></p></div>
        <div><?php if ( is_active_sidebar( 'footer-newsletter' ) ) { dynamic_sidebar( 'footer-newsletter' ); } elseif ( is_active_sidebar( 'newsletter' ) ) { dynamic_sidebar( 'newsletter' ); } else { echo '<p>' . esc_html__( 'Add a MailPoet form in Appearance → Widgets → Footer Newsletter.', 'illuminated-path' ) . '</p>'; } ?></div>
    </div>
</div>
<div class="container footer-bottom"><p>© <?php echo esc_html( wp_date( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?>.</p><?php if ( has_nav_menu( 'legal' ) ) { wp_nav_menu( array( 'theme_location' => 'legal', 'container' => false, 'menu_class' => 'legal-menu', 'depth' => 1 ) ); } ?></div>
</footer>
<?php endif; ?>
<?php wp_footer(); ?></body></html>
