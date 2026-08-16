<?php
/**
 * Plugin Name: Illuminated Path Core
 * Description: Book metadata, secure purchased-learning access, and WooCommerce Store API extensions for the Illuminated Path storefront.
 * Version: 0.1.0
 * Requires at least: 6.5
 * Requires PHP: 8.0
 * WC requires at least: 8.2
 * Text Domain: illuminated-path-core
 * License: GPL-2.0-or-later
 */
if(!defined('ABSPATH')){exit;}
define('IP_CORE_VERSION','0.1.0');define('IP_CORE_FILE',__FILE__);define('IP_CORE_DIR',plugin_dir_path(__FILE__));
add_action('before_woocommerce_init',static function():void{if(class_exists('\\Automattic\\WooCommerce\\Utilities\\FeaturesUtil')){\Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility('custom_order_tables',IP_CORE_FILE,true);\Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility('cart_checkout_blocks',IP_CORE_FILE,true);}});
function ip_core_boot():void{if(!class_exists('WooCommerce')){add_action('admin_notices','ip_core_missing_woocommerce_notice');return;}require_once IP_CORE_DIR.'includes/product-meta.php';require_once IP_CORE_DIR.'includes/learning-library.php';require_once IP_CORE_DIR.'includes/store-api.php';}add_action('plugins_loaded','ip_core_boot',20);
function ip_core_missing_woocommerce_notice():void{if(current_user_can('activate_plugins')){echo '<div class="notice notice-error"><p><strong>Illuminated Path Core:</strong> WooCommerce must be installed and active.</p></div>';}}
function ip_core_activate():void{add_rewrite_endpoint('learning-library',EP_ROOT|EP_PAGES);flush_rewrite_rules();}register_activation_hook(__FILE__,'ip_core_activate');function ip_core_deactivate():void{flush_rewrite_rules();}register_deactivation_hook(__FILE__,'ip_core_deactivate');
