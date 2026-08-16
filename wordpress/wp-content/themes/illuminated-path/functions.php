<?php
/**
 * Illuminated Path theme bootstrap.
 *
 * @package Illuminated_Path
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'IP_THEME_VERSION', '0.3.0' );
define( 'IP_THEME_DIR', get_template_directory() );
define( 'IP_THEME_URI', get_template_directory_uri() );

require_once IP_THEME_DIR . '/inc/setup.php';
require_once IP_THEME_DIR . '/inc/multilingual.php';
require_once IP_THEME_DIR . '/inc/woocommerce.php';
require_once IP_THEME_DIR . '/inc/catalog.php';
require_once IP_THEME_DIR . '/inc/patterns.php';
require_once IP_THEME_DIR . '/inc/customizer.php';
