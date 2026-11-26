<?php
/** Theme Customizer controls. */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function ip_sanitize_choice( $value, $setting ): string {
    $control = $setting->manager->get_control( $setting->id );
    $choices = $control && isset( $control->choices ) ? $control->choices : array();
    return isset( $choices[ $value ] ) ? (string) $value : (string) $setting->default;
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
    );

    foreach ( $controls as $id => $config ) {
        $sanitize = 'textarea' === $config['type'] ? 'sanitize_textarea_field' : 'sanitize_text_field';
        $wp_customize->add_setting( $id, array( 'default' => $config['default'], 'sanitize_callback' => $sanitize ) );
        $wp_customize->add_control( $id, array( 'label' => $config['label'], 'section' => 'ip_store_identity', 'type' => $config['type'] ) );
    }

    $wp_customize->add_setting( 'ip_hero_image', array( 'default' => '', 'sanitize_callback' => 'esc_url_raw' ) );
    $wp_customize->add_control(
        new WP_Customize_Image_Control(
            $wp_customize,
            'ip_hero_image',
            array(
                'label'   => __( 'Homepage hero image', 'illuminated-path' ),
                'section' => 'ip_store_identity',
            )
        )
    );

    $wp_customize->add_setting( 'ip_home_layout_mode', array( 'default' => 'default', 'sanitize_callback' => 'ip_sanitize_choice' ) );
    $wp_customize->add_control(
        'ip_home_layout_mode',
        array(
            'label'       => __( 'Homepage editing mode', 'illuminated-path' ),
            'description' => __( 'Default uses the branded automatic storefront. Editor after hero keeps the theme hero and lets page content control everything below it. Full visual builder lets the assigned Home page (including Elementor) control the complete page.', 'illuminated-path' ),
            'section'     => 'ip_store_identity',
            'type'        => 'select',
            'choices'     => array(
                'default'           => __( 'Automatic branded storefront', 'illuminated-path' ),
                'editor_after_hero' => __( 'Editable content after branded hero', 'illuminated-path' ),
                'full_builder'      => __( 'Full WordPress / Elementor builder', 'illuminated-path' ),
            ),
        )
    );

    /* Backward compatibility for earlier package versions. */
    $wp_customize->add_setting( 'ip_home_use_page_content', array( 'default' => false, 'sanitize_callback' => 'wp_validate_boolean' ) );
    $wp_customize->add_control( 'ip_home_use_page_content', array( 'label' => __( 'Legacy: use page content after hero', 'illuminated-path' ), 'description' => __( 'Kept for compatibility. Prefer the Homepage editing mode above.', 'illuminated-path' ), 'section' => 'ip_store_identity', 'type' => 'checkbox' ) );

    $wp_customize->add_section(
        'ip_brand_design',
        array(
            'title'    => __( 'Brand Design System', 'illuminated-path' ),
            'priority' => 33,
        )
    );
    foreach (
        array(
            'ip_brand_green' => array( __( 'Primary green', 'illuminated-path' ), '#005B3A' ),
            'ip_brand_gold'  => array( __( 'Accent gold', 'illuminated-path' ), '#EAB308' ),
            'ip_brand_navy'  => array( __( 'Heading / ink colour', 'illuminated-path' ), '#10283B' ),
            'ip_brand_ivory' => array( __( 'Warm background', 'illuminated-path' ), '#FAF7F0' ),
        ) as $id => $color
    ) {
        $wp_customize->add_setting( $id, array( 'default' => $color[1], 'sanitize_callback' => 'sanitize_hex_color' ) );
        $wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, $id, array( 'label' => $color[0], 'section' => 'ip_brand_design' ) ) );
    }

    $wp_customize->add_section(
        'ip_promotions',
        array(
            'title'    => __( 'Store Promotion Bar', 'illuminated-path' ),
            'priority' => 34,
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

    $wp_customize->add_section( 'ip_social_links', array( 'title' => __( 'Social Links', 'illuminated-path' ), 'priority' => 35 ) );
    foreach ( array( 'instagram' => 'Instagram', 'facebook' => 'Facebook', 'pinterest' => 'Pinterest', 'tiktok' => 'TikTok', 'youtube' => 'YouTube' ) as $network => $label ) {
        $id = 'ip_social_' . $network;
        $wp_customize->add_setting( $id, array( 'default' => '', 'sanitize_callback' => 'esc_url_raw' ) );
        $wp_customize->add_control( $id, array( 'label' => $label . ' URL', 'section' => 'ip_social_links', 'type' => 'url' ) );
    }
}
add_action( 'customize_register', 'ip_customize_register' );

/** Export Customizer brand colours as shared CSS variables for theme, Woo and Elementor widgets. */
function ip_brand_css_variables(): void {
    $green = sanitize_hex_color( get_theme_mod( 'ip_brand_green', '#005B3A' ) ) ?: '#005B3A';
    $gold  = sanitize_hex_color( get_theme_mod( 'ip_brand_gold', '#EAB308' ) ) ?: '#EAB308';
    $navy  = sanitize_hex_color( get_theme_mod( 'ip_brand_navy', '#10283B' ) ) ?: '#10283B';
    $ivory = sanitize_hex_color( get_theme_mod( 'ip_brand_ivory', '#FAF7F0' ) ) ?: '#FAF7F0';
    echo '<style id="illuminated-path-brand-vars">:root{--ip-brand-green:' . esc_html( $green ) . ';--ip-brand-gold:' . esc_html( $gold ) . ';--ip-brand-navy:' . esc_html( $navy ) . ';--ip-brand-ivory:' . esc_html( $ivory ) . ';--emerald:' . esc_html( $green ) . ';--gold:' . esc_html( $gold ) . ';--navy:' . esc_html( $navy ) . ';--ivory:' . esc_html( $ivory ) . '}</style>';
}
add_action( 'wp_head', 'ip_brand_css_variables', 20 );
