<?php get_header(); ?>
<?php if ( function_exists( 'ip_elementor_do_location' ) && ip_elementor_do_location( 'single' ) ) : ?>
<?php else : ?>
<main id="primary" class="site-main content-shell"><div class="container content-container narrow"><?php while(have_posts()):the_post();?><article <?php post_class(); ?>><header class="page-header"><p class="eyebrow"><?php echo esc_html(get_the_date()); ?></p><h1><?php the_title(); ?></h1></header><?php if(has_post_thumbnail()):?><div class="post-hero-image"><?php the_post_thumbnail('large'); ?></div><?php endif;?><div class="entry-content"><?php the_content(); ?></div></article><?php endwhile;?></div></main>
<?php endif; ?>
<?php get_footer(); ?>
