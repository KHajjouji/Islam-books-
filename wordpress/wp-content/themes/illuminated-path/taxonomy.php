<?php
get_header();
$term     = get_queried_object();
$taxonomy = $term instanceof WP_Term ? $term->taxonomy : '';
$is_book_taxonomy = 0 === strpos( (string) $taxonomy, 'ip_book_' );
?>
<?php if ( function_exists( 'ip_elementor_do_location' ) && ip_elementor_do_location( 'archive' ) ) : ?>
<?php elseif ( $is_book_taxonomy && $term instanceof WP_Term ) : ?>
<main id="primary" class="site-main shop-shell"><div class="container shop-container">
<header class="ip-taxonomy-hero ip-taxonomy-hero-rich">
<?php $image_id = absint( get_term_meta( $term->term_id, 'thumbnail_id', true ) ); if ( $image_id ) : ?><div class="ip-taxonomy-hero-image"><?php echo wp_get_attachment_image( $image_id, 'large', false, array( 'loading' => 'eager' ) ); ?></div><?php endif; ?>
<div><span class="section-kicker"><?php esc_html_e( 'Book collection', 'illuminated-path' ); ?></span><h1><?php single_term_title(); ?></h1><?php if ( $term->description ) : ?><div class="archive-description"><?php echo wp_kses_post( wpautop( $term->description ) ); ?></div><?php endif; ?></div>
</header>
<?php if ( function_exists( 'ip_catalog_filter_form' ) ) { ip_catalog_filter_form(); } ?>
<?php if ( have_posts() ) : woocommerce_product_loop_start(); while ( have_posts() ) : the_post(); wc_get_template_part( 'content', 'product' ); endwhile; woocommerce_product_loop_end(); the_posts_pagination(); else : do_action( 'woocommerce_no_products_found' ); endif; ?>
</div></main>
<?php else : ?>
<main id="primary" class="site-main content-shell"><div class="container content-container"><header class="page-header"><h1><?php the_archive_title(); ?></h1><?php the_archive_description( '<div class="archive-description">', '</div>' ); ?></header><?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?><article <?php post_class( 'content-card' ); ?>><h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2><div class="entry-summary"><?php the_excerpt(); ?></div></article><?php endwhile; the_posts_pagination(); endif; ?></div></main>
<?php endif; ?>
<?php get_footer(); ?>
