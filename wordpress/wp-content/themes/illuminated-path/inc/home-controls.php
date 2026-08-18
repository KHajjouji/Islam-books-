<?php
/** Extra homepage merchandising controls. */
if ( ! defined( 'ABSPATH' ) ) { exit; }

function ip_home_merchandising_customize( WP_Customize_Manager $wp_customize ): void {
    if ( ! $wp_customize->get_section( 'ip_store_identity' ) ) { return; }

    $choices = array( 0 => __( 'No automatic product spotlight', 'illuminated-path' ) );
    if ( post_type_exists( 'product' ) ) {
        $products = get_posts( array( 'post_type' => 'product', 'post_status' => 'publish', 'numberposts' => 150, 'orderby' => 'title', 'order' => 'ASC' ) );
        foreach ( $products as $product ) { $choices[ $product->ID ] = $product->post_title . ' (#' . $product->ID . ')'; }
    }

    $wp_customize->add_setting( 'ip_home_spotlight_product_id', array( 'default' => 0, 'sanitize_callback' => 'absint' ) );
    $wp_customize->add_control( 'ip_home_spotlight_product_id', array( 'label' => __( 'Homepage product spotlight', 'illuminated-path' ), 'description' => __( 'Shown in the automatic homepage mode. Elementor pages can use the Product Spotlight widget anywhere instead.', 'illuminated-path' ), 'section' => 'ip_store_identity', 'type' => 'select', 'choices' => $choices ) );

    $wp_customize->add_setting( 'ip_home_spotlight_body', array( 'default' => '', 'sanitize_callback' => 'sanitize_textarea_field' ) );
    $wp_customize->add_control( 'ip_home_spotlight_body', array( 'label' => __( 'Spotlight editorial paragraph (optional)', 'illuminated-path' ), 'section' => 'ip_store_identity', 'type' => 'textarea' ) );
}
add_action( 'customize_register', 'ip_home_merchandising_customize', 20 );
