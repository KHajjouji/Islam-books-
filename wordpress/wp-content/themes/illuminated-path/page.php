<?php get_header(); ?>
<?php if ( function_exists( 'ip_elementor_do_location' ) && ip_elementor_do_location( 'single' ) ) : ?>
<?php else : ?>
<main id="primary" class="site-main content-shell"><div class="container content-container page-content-container">
<?php while ( have_posts() ) : the_post(); ?>
<article <?php post_class(); ?>><header class="page-header"><h1><?php the_title(); ?></h1></header><div class="entry-content"><?php the_content(); ?></div></article>
<?php endwhile; ?>
</div></main>
<?php endif; ?>
<?php get_footer(); ?>
