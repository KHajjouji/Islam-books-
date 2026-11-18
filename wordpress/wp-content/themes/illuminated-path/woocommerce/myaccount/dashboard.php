<?php
/**
 * Order-focused customer dashboard for the commercial bookstore.
 */

defined( 'ABSPATH' ) || exit;

if ( function_exists( 'ip_core_account_dashboard' ) ) {
    ip_core_account_dashboard();
    return;
}

$current_user = wp_get_current_user();
?>
<p><?php echo sprintf( esc_html__( 'Hello %s.', 'illuminated-path' ), esc_html( $current_user->display_name ) ); ?></p>
<p><?php esc_html_e( 'Use the account navigation to view your orders, addresses and account details.', 'illuminated-path' ); ?></p>
