<?php
if ( ! defined( 'ABSPATH' ) ) { exit; }
function ip_customize_register( WP_Customize_Manager $wp_customize ): void {
    $wp_customize->add_section('ip_store_identity',array('title'=>__('Store Identity','illuminated-path'),'priority'=>32));
    $wp_customize->add_setting('ip_brand_suffix',array('default'=>'','sanitize_callback'=>'sanitize_text_field'));
    $wp_customize->add_control('ip_brand_suffix',array('label'=>__('Short brand suffix','illuminated-path'),'section'=>'ip_store_identity','type'=>'text'));
    $wp_customize->add_setting('ip_academy_url',array('default'=>home_url('/academy/'),'sanitize_callback'=>'esc_url_raw'));
    $wp_customize->add_control('ip_academy_url',array('label'=>__('Learning / Academy URL','illuminated-path'),'description'=>__('Can point to a WordPress page, Moodle, or another learning platform.','illuminated-path'),'section'=>'ip_store_identity','type'=>'url'));
}
add_action( 'customize_register', 'ip_customize_register' );
