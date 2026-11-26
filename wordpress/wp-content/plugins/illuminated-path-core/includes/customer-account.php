<?php
/**
 * Commercial customer account: orders, addresses and account details only.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function ip_core_register_order_updates_endpoint(): void {
    add_rewrite_endpoint( 'order-updates', EP_ROOT | EP_PAGES );
}
add_action( 'init', 'ip_core_register_order_updates_endpoint', 20 );

function ip_core_commercial_account_menu( array $items ): array {
    unset( $items['learning-library'] );
    if ( isset( $items['orders'] ) ) {
        $rebuilt = array();
        foreach ( $items as $key => $label ) {
            $rebuilt[ $key ] = $label;
            if ( 'orders' === $key ) {
                $rebuilt['order-updates'] = ip_core_t( 'order_updates' );
            }
        }
        $items = $rebuilt;
    } else {
        $items['order-updates'] = __( 'Order updates', 'illuminated-path-core' );
    }
    $preferred = array( 'dashboard', 'orders', 'order-updates', 'downloads', 'edit-address', 'payment-methods', 'edit-account', 'customer-logout' );
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
    echo '<div class="ip-account-welcome"><span class="ip-account-kicker">' . esc_html( ip_core_t( 'account_kicker' ) ) . '</span><h2>' . esc_html( ip_core_t( 'welcome', $user->display_name ?: $user->user_login ) ) . '</h2><p>' . esc_html( ip_core_t( 'account_intro' ) ) . '</p></div>';
    echo '<div class="ip-account-stats"><article><strong>' . esc_html( (string) $order_count ) . '</strong><span>' . esc_html( ip_core_t( 'orders' ) ) . '</span></article><article><strong>' . wp_kses_post( wc_price( (float) $spent ) ) . '</strong><span>' . esc_html( ip_core_t( 'total_purchased' ) ) . '</span></article></div>';

    if ( ! empty( $orders ) && $orders[0] instanceof WC_Order ) {
        $order = $orders[0];
        echo '<div class="ip-latest-order"><div><span class="ip-account-kicker">' . esc_html( ip_core_t( 'latest_order' ) ) . '</span><h3>#' . esc_html( $order->get_order_number() ) . '</h3><p>' . esc_html( wc_format_datetime( $order->get_date_created() ) ) . ' · ' . wp_kses_post( $order->get_formatted_order_total() ) . '</p></div><div><span class="ip-order-status">' . esc_html( wc_get_order_status_name( $order->get_status() ) ) . '</span><a class="button" href="' . esc_url( $order->get_view_order_url() ) . '">' . esc_html( ip_core_t( 'view_order' ) ) . '</a></div></div>';
    }

    $cards = array(
        'orders'        => array( ip_core_t( 'orders' ), ip_core_t( 'orders_desc' ) ),
        'order-updates' => array( __( 'Order updates', 'illuminated-path-core' ), ip_core_t( 'order_updates_desc' ) ),
        'edit-address'  => array( ip_core_t( 'addresses' ), ip_core_t( 'addresses_desc' ) ),
        'edit-account' => array( ip_core_t( 'account_details' ), ip_core_t( 'account_details_desc' ) ),
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
            $new['order-books']    = ip_core_t( 'books' );
            $new['order-status']   = $label;
            $new['order-delivery'] = ip_core_t( 'delivery' );
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
        echo '<small>' . esc_html( ip_core_t( 'more_items', $remaining ) ) . '</small>';
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
        echo '<a class="ip-order-track-link" target="_blank" rel="noopener" href="' . esc_url( $tracking ) . '">' . esc_html( ip_core_t( 'track_package' ) ) . '</a>';
    }
}
add_action( 'woocommerce_my_account_my_orders_column_order-delivery', 'ip_core_my_orders_delivery_column' );


/**
 * Central customer-facing timeline using WooCommerce public order notes.
 * The notes remain owned by WooCommerce, are also visible on each order, and
 * WooCommerce can email the customer when staff sends a public customer note.
 */
function ip_core_account_order_updates(): void {
    if ( ! is_user_logged_in() ) {
        return;
    }

    $orders = wc_get_orders(
        array(
            'customer_id' => get_current_user_id(),
            'limit'       => 30,
            'orderby'     => 'date',
            'order'       => 'DESC',
            'return'      => 'objects',
        )
    );

    $updates = array();
    foreach ( $orders as $order ) {
        if ( ! $order instanceof WC_Order ) {
            continue;
        }
        foreach ( $order->get_customer_order_notes() as $note ) {
            if ( ! $note instanceof WP_Comment ) {
                continue;
            }
            $updates[] = array(
                'timestamp' => strtotime( $note->comment_date_gmt . ' GMT' ) ?: 0,
                'date'      => $note->comment_date,
                'content'   => $note->comment_content,
                'order'     => $order,
            );
        }
    }

    usort(
        $updates,
        static function ( array $a, array $b ): int {
            return (int) $b['timestamp'] <=> (int) $a['timestamp'];
        }
    );

    echo '<section class="ip-order-updates">';
    echo '<div class="ip-account-welcome"><span class="ip-account-kicker">' . esc_html( ip_core_t( 'purchase_messages' ) ) . '</span><h2>' . esc_html__( 'Order updates', 'illuminated-path-core' ) . '</h2><p>' . esc_html( ip_core_t( 'updates_intro' ) ) . '</p></div>';

    if ( ! $updates ) {
        echo '<div class="woocommerce-info">' . esc_html( ip_core_t( 'no_updates' ) ) . '</div>';
    } else {
        echo '<div class="ip-order-update-list">';
        foreach ( array_slice( $updates, 0, 30 ) as $update ) {
            /** @var WC_Order $order */
            $order = $update['order'];
            echo '<article class="ip-order-update-card">';
            echo '<div class="ip-order-update-meta"><strong>' . esc_html( ip_core_t( 'order_number', $order->get_order_number() ) ) . '</strong><span>' . esc_html( mysql2date( get_option( 'date_format' ) . ' ' . get_option( 'time_format' ), $update['date'] ) ) . '</span></div>';
            echo '<div class="ip-order-update-copy">' . wp_kses_post( wpautop( $update['content'] ) ) . '</div>';
            echo '<a class="text-link" href="' . esc_url( $order->get_view_order_url() ) . '">' . esc_html( ip_core_t( 'view_this_order' ) ) . ' →</a>';
            echo '</article>';
        }
        echo '</div>';
    }

    $contact = get_page_by_path( 'contact', OBJECT, 'page' );
    if ( $contact instanceof WP_Post && 'publish' === $contact->post_status ) {
        echo '<p class="ip-account-help"><a class="button" href="' . esc_url( get_permalink( $contact ) ) . '">' . esc_html( ip_core_t( 'need_help' ) ) . '</a></p>';
    }
    echo '</section>';
}
add_action( 'woocommerce_account_order-updates_endpoint', 'ip_core_account_order_updates' );
