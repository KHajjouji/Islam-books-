<?php
get_header();
$term = get_queried_object();
?>
<?php if ( function_exists( 'ip_elementor_do_location' ) && ip_elementor_do_location( 'archive' ) ) : ?>
<?php else : ?>
<main id="primary" class="site-main shop-shell"><div class="container shop-container">
<header class="ip-taxonomy-hero"><span class="section-kicker"><?php esc_html_e( 'Book collection', 'illuminated-path' ); ?></span><h1><?php single_term_title(); ?></h1><?php if ( $term instanceof WP_Term && $term->description ) : ?><div><?php echo wp_kses_post( wpautop( $term->description ) ); ?></div><?php endif; ?></header>
<?php ip_catalog_filter_form(); ?>
<?php if ( have_posts() ) : woocommerce_product_loop_start(); while ( have_posts() ) : the_post(); wc_get_template_part( 'content', 'product' ); endwhile; woocommerce_product_loop_end(); the_posts_pagination(); else : do_action( 'woocommerce_no_products_found' ); endif; ?>
</div></main>
<?php endif; ?>
<?php get_footer(); ?>
