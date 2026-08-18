<?php
/** Compact parent-facing mission block for the commercial homepage. */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function ip_core_home_mission_shortcode(): string {
    $about = get_page_by_path( 'about', OBJECT, 'page' );
    $url   = $about && 'publish' === $about->post_status ? get_permalink( $about ) : home_url( '/about/' );

    ob_start();
    ?>
    <section class="ip-home-mission" aria-labelledby="ip-home-mission-title">
        <div class="ip-home-mission-copy">
            <span class="section-kicker"><?php esc_html_e( 'Why we publish', 'illuminated-path-core' ); ?></span>
            <h2 id="ip-home-mission-title"><?php esc_html_e( 'Books that help Muslim children feel at home in their faith and heritage.', 'illuminated-path-core' ); ?></h2>
            <p><?php esc_html_e( 'Created especially with Muslim families raising children in the West and in multilingual homes in mind, Little Muslim Books brings Islamic stories, values and cultural memory into beautifully made books children can enjoy, understand and return to.', 'illuminated-path-core' ); ?></p>
            <a class="text-link" href="<?php echo esc_url( $url ); ?>"><?php esc_html_e( 'Discover why we created Little Muslim Books', 'illuminated-path-core' ); ?> →</a>
        </div>
        <div class="ip-home-mission-values" aria-label="<?php esc_attr_e( 'Our focus', 'illuminated-path-core' ); ?>">
            <span><?php esc_html_e( 'Islamic values', 'illuminated-path-core' ); ?></span>
            <span><?php esc_html_e( 'Muslim culture', 'illuminated-path-core' ); ?></span>
            <span><?php esc_html_e( 'Beautiful storytelling', 'illuminated-path-core' ); ?></span>
            <span><?php esc_html_e( 'Multilingual families', 'illuminated-path-core' ); ?></span>
        </div>
    </section>
    <?php
    return (string) ob_get_clean();
}
add_shortcode( 'ip_home_mission', 'ip_core_home_mission_shortcode' );
