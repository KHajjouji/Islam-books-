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

/**
 * Make the normal WooCommerce order history more useful for a bookstore while
 * keeping WooCommerce's own template and action links intact.
 */
function ip_core_my_orders_columns( array $columns ): array {
    $new = array();
    foreach ( $columns as $key => $label ) {
        if ( 'order-status' === $key ) {
            $new['order-books']    = __( 'Books', 'illuminated-path-core' );
            $new['order-status']   = $label;
            $new['order-delivery'] = __( 'Delivery', 'illuminated-path-core' );
            continue;
        }
        $new[ $key ] = $label;
    }
    if ( ! isset( $new['order-books'] ) ) {
        $new['order-books'] = __( 'Books', 'illuminated-path-core' );
    }
    if ( ! isset( $new['order-delivery'] ) ) {
        $new['order-delivery'] = __( 'Delivery', 'illuminated-path-core' );
    }
    return $new;
}
add_filter( 'woocommerce_my_account_my_orders_columns', 'ip_core_my_orders_columns', 30 );

function ip_core_my_orders_books_column( WC_Order $order ): void {
    $shown = 0;
    echo '<div class="ip-order-book-list">';
    foreach ( $order->get_items( 'line_item' ) as $item ) {
        if ( ! $item instanceof WC_Order_Item_Product ) {
            continue;
        }
        $product = $item->get_product();
        if ( ! $product ) {
            continue;
        }
        ++$shown;
        if ( $shown > 3 ) {
            break;
        }
        echo '<div class="ip-order-book"><a href="' . esc_url( get_permalink( $product->get_id() ) ) . '">' . wp_kses_post( $product->get_image( 'woocommerce_thumbnail', array( 'loading' => 'lazy' ) ) ) . '</a><div><a href="' . esc_url( get_permalink( $product->get_id() ) ) . '"><strong>' . esc_html( $item->get_name() ) . '</strong></a><span>× ' . esc_html( (string) $item->get_quantity() ) . '</span></div></div>';
    }
    $remaining = max( 0, $order->get_item_count() - $shown );
    if ( $remaining ) {
        echo '<small>' . sprintf( esc_html__( '+%d more item(s)', 'illuminated-path-core' ), $remaining ) . '</small>';
    }
    echo '</div>';
}
add_action( 'woocommerce_my_account_my_orders_column_order-books', 'ip_core_my_orders_books_column' );

function ip_core_my_orders_delivery_column( WC_Order $order ): void {
    $status = sanitize_key( (string) $order->get_meta( '_ip_fulfillment_status' ) );
    if ( ! $status || ! function_exists( 'ip_core_fulfillment_status_options' ) ) {
        echo '<span class="ip-order-delivery-muted">—</span>';
        return;
    }
    $statuses = ip_core_fulfillment_status_options();
    echo '<span class="ip-order-delivery-pill">' . esc_html( $statuses[ $status ] ?? $status ) . '</span>';
    $tracking = trim( (string) $order->get_meta( '_ip_fulfillment_tracking_url' ) );
    if ( $tracking ) {
        echo '<a class="ip-order-track-link" target="_blank" rel="noopener" href="' . esc_url( $tracking ) . '">' . esc_html__( 'Track package', 'illuminated-path-core' ) . '</a>';
    }
}
add_action( 'woocommerce_my_account_my_orders_column_order-delivery', 'ip_core_my_orders_delivery_column' );
