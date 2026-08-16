<?php
get_header();
$is_product_search = isset( $_GET['post_type'] ) && 'product' === sanitize_key( wp_unslash( $_GET['post_type'] ) );
?>
<main id="primary" class="site-main content-shell"><div class="container">
<header class="page-header"><span class="section-kicker"><?php esc_html_e( 'Search', 'illuminated-path' ); ?></span><h1><?php echo sprintf( esc_html__( 'Results for “%s”', 'illuminated-path' ), esc_html( get_search_query() ) ); ?></h1></header>
<?php if ( $is_product_search && class_exists( 'WooCommerce' ) ) : ip_catalog_filter_form(); if ( have_posts() ) : woocommerce_product_loop_start(); while ( have_posts() ) : the_post(); wc_get_template_part( 'content', 'product' ); endwhile; woocommerce_product_loop_end(); the_posts_pagination(); else : ?><p><?php esc_html_e( 'No books matched your search. Try a different title, theme, author or series.', 'illuminated-path' ); ?></p><?php endif; else : if ( have_posts() ) : ?><div class="search-post-grid"><?php while ( have_posts() ) : the_post(); ?><article><h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2><p><?php echo esc_html( wp_trim_words( get_the_excerpt(), 32 ) ); ?></p></article><?php endwhile; ?></div><?php the_posts_pagination(); else : ?><p><?php esc_html_e( 'Nothing matched your search.', 'illuminated-path' ); ?></p><?php endif; endif; ?>
</div></main>
<?php get_footer(); ?>
