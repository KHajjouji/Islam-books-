<?php
/**
 * Template Name: Visual Builder — Full Width
 * Template Post Type: page
 */
get_header();
?>
<main id="primary" class="site-main ip-full-width-builder">
<?php while ( have_posts() ) : the_post(); ?><article <?php post_class(); ?>><div class="entry-content"><?php the_content(); ?></div></article><?php endwhile; ?>
</main>
<?php get_footer(); ?>
