<?php
/**
 * Template Name: Store Landing Page
 * Template Post Type: page
 *
 * Full-width campaign/SEO page where the block content owns the visible H1 and layout.
 */
get_header();
?>
<main id="primary" class="site-main content-shell"><div class="container page-content-container">
<?php while ( have_posts() ) : the_post(); ?><article <?php post_class( 'store-landing-page' ); ?>><div class="entry-content"><?php the_content(); ?></div></article><?php endwhile; ?>
</div></main>
<?php get_footer(); ?>
