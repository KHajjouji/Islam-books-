<?php
/** Theme Customizer controls. */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function ip_customize_register( WP_Customize_Manager $wp_customize ): void {
    $wp_customize->add_section(
        'ip_store_identity',
        array(
            'title'    => __( 'Store Identity & Homepage', 'illuminated-path' ),
            'priority' => 32,
        )
    );

    $controls = array(
        'ip_brand_suffix' => array(
            'default' => __( 'Islamic children’s books', 'illuminated-path' ),
            'label'   => __( 'Short brand suffix', 'illuminated-path' ),
            'type'    => 'text',
        ),
        'ip_hero_eyebrow' => array(
            'default' => __( 'Stories that nurture faith and curiosity', 'illuminated-path' ),
            'label'   => __( 'Homepage hero eyebrow', 'illuminated-path' ),
            'type'    => 'text',
        ),
        'ip_hero_title' => array(
            'default' => __( 'Beautiful Islamic books for growing Muslim hearts.', 'illuminated-path' ),
            'label'   => __( 'Homepage hero title', 'illuminated-path' ),
            'type'    => 'text',
        ),
        'ip_hero_body' => array(
            'default' => __( 'Thoughtful children’s books, bilingual editions and meaningful stories for Muslim families around the world.', 'illuminated-path' ),
            'label'   => __( 'Homepage hero description', 'illuminated-path' ),
            'type'    => 'textarea',
        ),
        'ip_hero_image' => array(
            'default' => '',
            'label'   => __( 'Homepage hero image URL (optional)', 'illuminated-path' ),
            'type'    => 'url',
        ),
    );

    foreach ( $controls as $id => $config ) {
        $sanitize = 'url' === $config['type'] ? 'esc_url_raw' : ( 'textarea' === $config['type'] ? 'sanitize_textarea_field' : 'sanitize_text_field' );
        $wp_customize->add_setting( $id, array( 'default' => $config['default'], 'sanitize_callback' => $sanitize ) );
        $wp_customize->add_control( $id, array( 'label' => $config['label'], 'section' => 'ip_store_identity', 'type' => $config['type'] ) );
    }

    $wp_customize->add_setting( 'ip_home_use_page_content', array( 'default' => false, 'sanitize_callback' => 'wp_validate_boolean' ) );
    $wp_customize->add_control( 'ip_home_use_page_content', array( 'label' => __( 'Use the assigned Home page content instead of the default homepage sections', 'illuminated-path' ), 'description' => __( 'Keep the theme hero, then build the rest of the homepage with WordPress blocks, patterns and book shortcodes.', 'illuminated-path' ), 'section' => 'ip_store_identity', 'type' => 'checkbox' ) );

    $wp_customize->add_section(
        'ip_promotions',
        array(
            'title'    => __( 'Store Promotion Bar', 'illuminated-path' ),
            'priority' => 33,
        )
    );
    $wp_customize->add_setting( 'ip_promo_enabled', array( 'default' => false, 'sanitize_callback' => 'wp_validate_boolean' ) );
    $wp_customize->add_control( 'ip_promo_enabled', array( 'label' => __( 'Show promotion bar', 'illuminated-path' ), 'section' => 'ip_promotions', 'type' => 'checkbox' ) );
    $wp_customize->add_setting( 'ip_promo_text', array( 'default' => __( 'Free shipping on qualifying orders', 'illuminated-path' ), 'sanitize_callback' => 'sanitize_text_field' ) );
    $wp_customize->add_control( 'ip_promo_text', array( 'label' => __( 'Promotion text', 'illuminated-path' ), 'section' => 'ip_promotions', 'type' => 'text' ) );
    $wp_customize->add_setting( 'ip_promo_code', array( 'default' => '', 'sanitize_callback' => 'sanitize_text_field' ) );
    $wp_customize->add_control( 'ip_promo_code', array( 'label' => __( 'Public coupon code (optional)', 'illuminated-path' ), 'description' => __( 'Only enter a WooCommerce coupon code that you intentionally want to advertise.', 'illuminated-path' ), 'section' => 'ip_promotions', 'type' => 'text' ) );
    $wp_customize->add_setting( 'ip_promo_url', array( 'default' => '', 'sanitize_callback' => 'esc_url_raw' ) );
    $wp_customize->add_control( 'ip_promo_url', array( 'label' => __( 'Promotion link (optional)', 'illuminated-path' ), 'section' => 'ip_promotions', 'type' => 'url' ) );
}
add_action( 'customize_register', 'ip_customize_register' );
