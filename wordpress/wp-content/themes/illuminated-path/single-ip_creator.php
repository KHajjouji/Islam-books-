<?php
get_header();
while ( have_posts() ) : the_post();
    $post_id      = get_the_ID();
    $role         = (string) get_post_meta( $post_id, '_ip_creator_role', true );
    $disciplines  = (string) get_post_meta( $post_id, '_ip_creator_disciplines', true );
    $background   = (string) get_post_meta( $post_id, '_ip_creator_background', true );
    $perspective  = (string) get_post_meta( $post_id, '_ip_creator_perspective', true );
    $portfolio    = (string) get_post_meta( $post_id, '_ip_creator_portfolio', true );
    $instagram    = (string) get_post_meta( $post_id, '_ip_creator_instagram', true );
    $linkedin     = (string) get_post_meta( $post_id, '_ip_creator_linkedin', true );
?>
<main id="primary" class="site-main content-shell"><div class="container">
    <article class="ip-creator-single">
        <div class="ip-creator-single-media">
            <?php if ( has_post_thumbnail() ) { the_post_thumbnail( 'full' ); } ?>
        </div>
        <div class="ip-creator-single-copy">
            <?php if ( $role ) : ?><p class="ip-creator-role"><?php echo esc_html( $role ); ?></p><?php endif; ?>
            <h1><?php the_title(); ?></h1>
            <?php if ( has_excerpt() ) : ?><p class="lead"><?php echo esc_html( get_the_excerpt() ); ?></p><?php endif; ?>
            <?php if ( $disciplines || $background || $perspective ) : ?>
            <div class="ip-creator-single-meta">
                <?php if ( $disciplines ) : ?><div><strong><?php esc_html_e( 'Creative disciplines', 'illuminated-path' ); ?></strong><br><?php echo esc_html( $disciplines ); ?></div><?php endif; ?>
                <?php if ( $background ) : ?><div><strong><?php esc_html_e( 'Professional background', 'illuminated-path' ); ?></strong><br><?php echo esc_html( $background ); ?></div><?php endif; ?>
                <?php if ( $perspective ) : ?><div><strong><?php esc_html_e( 'Perspective', 'illuminated-path' ); ?></strong><br><?php echo esc_html( $perspective ); ?></div><?php endif; ?>
            </div>
            <?php endif; ?>
            <div class="entry-content"><?php the_content(); ?></div>
            <?php if ( $portfolio || $instagram || $linkedin ) : ?>
            <div class="ip-creator-links">
                <?php if ( $portfolio ) : ?><a href="<?php echo esc_url( $portfolio ); ?>" target="_blank" rel="noopener"><?php esc_html_e( 'Portfolio', 'illuminated-path' ); ?> ↗</a><?php endif; ?>
                <?php if ( $instagram ) : ?><a href="<?php echo esc_url( $instagram ); ?>" target="_blank" rel="noopener">Instagram ↗</a><?php endif; ?>
                <?php if ( $linkedin ) : ?><a href="<?php echo esc_url( $linkedin ); ?>" target="_blank" rel="noopener">LinkedIn ↗</a><?php endif; ?>
            </div>
            <?php endif; ?>
        </div>
    </article>
</div></main>
<?php endwhile; get_footer(); ?>
