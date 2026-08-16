<?php if ( ! defined( 'ABSPATH' ) ) { exit; } ?>
<footer class="site-footer">
<div class="container footer-grid">
    <div class="footer-brand">
        <a class="brand brand-light" href="<?php echo esc_url( home_url( '/' ) ); ?>"><span class="brand-mark"><span>✦</span></span><span class="brand-text"><strong><?php bloginfo( 'name' ); ?></strong></span></a>
        <p><?php echo esc_html( ip_text( 'footer_tagline' ) ); ?></p>
    </div>
    <div>
        <h3><?php echo esc_html( ip_text( 'shop' ) ); ?></h3>
        <?php if ( has_nav_menu( 'footer' ) ) { wp_nav_menu( array( 'theme_location' => 'footer', 'container' => false, 'menu_class' => 'footer-menu', 'depth' => 1 ) ); } else { echo '<ul class="footer-menu"><li><a href="' . esc_url( ip_shop_url() ) . '">' . esc_html( ip_text( 'shop' ) ) . '</a></li><li><a href="' . esc_url( ip_product_category_url( 'stories-of-the-prophets' ) ) . '">' . esc_html( ip_text( 'prophets_title' ) ) . '</a></li><li><a href="' . esc_url( ip_product_category_url( 'ramadan' ) ) . '">' . esc_html( ip_text( 'ramadan_title' ) ) . '</a></li></ul>'; } ?>
    </div>
    <div>
        <h3><?php echo esc_html( ip_text( 'account' ) ); ?></h3>
        <ul class="footer-menu">
        <?php if ( class_exists( 'WooCommerce' ) ) : ?>
            <li><a href="<?php echo esc_url( wc_get_page_permalink( 'myaccount' ) ); ?>"><?php echo esc_html( ip_text( 'account' ) ); ?></a></li>
            <?php if ( is_user_logged_in() ) : ?><li><a href="<?php echo esc_url( wc_get_account_endpoint_url( 'orders' ) ); ?>"><?php esc_html_e( 'Orders', 'illuminated-path' ); ?></a></li><?php endif; ?>
            <li><a href="<?php echo esc_url( wc_get_cart_url() ); ?>"><?php esc_html_e( 'Cart', 'illuminated-path' ); ?></a></li>
        <?php endif; ?>
            <li><a href="<?php echo esc_url( get_permalink( get_option( 'page_for_posts' ) ) ?: home_url( '/blog/' ) ); ?>"><?php echo esc_html( ip_text( 'blog' ) ); ?></a></li>
        </ul>
    </div>
</div>
<div class="container footer-bottom"><p>© <?php echo esc_html( wp_date( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?>.</p><?php if ( has_nav_menu( 'legal' ) ) { wp_nav_menu( array( 'theme_location' => 'legal', 'container' => false, 'menu_class' => 'legal-menu', 'depth' => 1 ) ); } ?></div>
</footer><?php wp_footer(); ?></body></html>
