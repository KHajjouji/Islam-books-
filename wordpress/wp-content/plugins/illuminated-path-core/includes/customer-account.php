<?php
/**
 * Commercial customer account: orders, addresses and account details only.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function ip_core_commercial_account_menu( array $items ): array {
    unset( $items['learning-library'] );
    $preferred = array( 'dashboard', 'orders', 'downloads', 'edit-address', 'payment-methods', 'edit-account', 'customer-logout' );
    $ordered   = array();
    foreach ( $preferred as $key ) {
        if ( isset( $items[ $key ] ) ) {
            $ordered[ $key ] = $items[ $key ];
        }
    }
    foreach ( $items as $key => $label ) {
        if ( ! isset( $ordered[ $key ] ) ) {
            $ordered[ $key ] = $label;
        }
    }
    return $ordered;
}
add_filter( 'woocommerce_account_menu_items', 'ip_core_commercial_account_menu', 90 );

function ip_core_account_dashboard(): void {
    if ( ! is_user_logged_in() ) {
        return;
    }

    $user_id = get_current_user_id();
    $user    = wp_get_current_user();
    $orders  = wc_get_orders(
        array(
            'customer_id' => $user_id,
            'limit'       => 1,
            'orderby'     => 'date',
            'order'       => 'DESC',
            'return'      => 'objects',
        )
    );
    $order_count = wc_get_customer_order_count( $user_id );
    $spent       = wc_get_customer_total_spent( $user_id );

    echo '<section class="ip-account-overview">';
    echo '<div class="ip-account-welcome"><span class="ip-account-kicker">' . esc_html__( 'Your bookstore account', 'illuminated-path-core' ) . '</span><h2>' . sprintf( esc_html__( 'Welcome, %s', 'illuminated-path-core' ), esc_html( $user->display_name ?: $user->user_login ) ) . '</h2><p>' . esc_html__( 'Track your orders, manage delivery addresses and keep your account information up to date.', 'illuminated-path-core' ) . '</p></div>';
    echo '<div class="ip-account-stats"><article><strong>' . esc_html( (string) $order_count ) . '</strong><span>' . esc_html__( 'Orders', 'illuminated-path-core' ) . '</span></article><article><strong>' . wp_kses_post( wc_price( (float) $spent ) ) . '</strong><span>' . esc_html__( 'Total purchased', 'illuminated-path-core' ) . '</span></article></div>';

    if ( ! empty( $orders ) && $orders[0] instanceof WC_Order ) {
        $order = $orders[0];
        echo '<div class="ip-latest-order"><div><span class="ip-account-kicker">' . esc_html__( 'Latest order', 'illuminated-path-core' ) . '</span><h3>#' . esc_html( $order->get_order_number() ) . '</h3><p>' . esc_html( wc_format_datetime( $order->get_date_created() ) ) . ' · ' . wp_kses_post( $order->get_formatted_order_total() ) . '</p></div><div><span class="ip-order-status">' . esc_html( wc_get_order_status_name( $order->get_status() ) ) . '</span><a class="button" href="' . esc_url( $order->get_view_order_url() ) . '">' . esc_html__( 'View order', 'illuminated-path-core' ) . '</a></div></div>';
    }

    $cards = array(
        'orders'       => array( __( 'Orders', 'illuminated-path-core' ), __( 'View order history and order details.', 'illuminated-path-core' ) ),
        'edit-address' => array( __( 'Addresses', 'illuminated-path-core' ), __( 'Manage billing and delivery addresses.', 'illuminated-path-core' ) ),
        'edit-account' => array( __( 'Account details', 'illuminated-path-core' ), __( 'Update your name, email and password.', 'illuminated-path-core' ) ),
    );
    echo '<div class="ip-account-links">';
    foreach ( $cards as $endpoint => $copy ) {
        echo '<a href="' . esc_url( wc_get_account_endpoint_url( $endpoint ) ) . '"><h3>' . esc_html( $copy[0] ) . '</h3><p>' . esc_html( $copy[1] ) . '</p><span>→</span></a>';
    }
    echo '</div></section>';
}

/** Fallback for themes using WooCommerce's standard dashboard template. */
add_action( 'woocommerce_account_dashboard', 'ip_core_account_dashboard', 5 );
