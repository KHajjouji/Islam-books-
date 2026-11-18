<?php
get_header();
?>
<main id="primary" class="site-main content-shell"><div class="container">
    <header class="page-header narrow">
        <span class="section-kicker"><?php esc_html_e( 'The people behind the books', 'illuminated-path' ); ?></span>
        <h1><?php post_type_archive_title(); ?></h1>
        <p><?php esc_html_e( 'Meet the illustrators, designers, writers and creative professionals who help shape Little Muslim Books.', 'illuminated-path' ); ?></p>
    </header>
    <?php if ( shortcode_exists( 'ip_creator_grid' ) ) { echo do_shortcode( '[ip_creator_grid limit="48"]' ); } ?>
</div></main>
<?php get_footer(); ?>
