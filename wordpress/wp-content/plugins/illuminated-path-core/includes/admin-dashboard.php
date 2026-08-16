<?php
/** Publisher-oriented WordPress dashboard for the commercial bookstore. */
if ( ! defined( 'ABSPATH' ) ) { exit; }

function ip_core_register_store_dashboard_widget(): void {
    if ( current_user_can( 'manage_woocommerce' ) ) {
        wp_add_dashboard_widget( 'ip_store_overview', __( 'Little Muslim Books — Store Overview', 'illuminated-path-core' ), 'ip_core_render_store_dashboard_widget' );
    }
}
add_action( 'wp_dashboard_setup', 'ip_core_register_store_dashboard_widget' );

function ip_core_count_orders_by_status( string $status ): int {
    if ( ! function_exists( 'wc_get_orders' ) ) { return 0; }
    $result = wc_get_orders( array( 'status' => $status, 'limit' => 1, 'paginate' => true, 'return' => 'ids' ) );
    return is_object( $result ) && isset( $result->total ) ? absint( $result->total ) : 0;
}

function ip_core_render_store_dashboard_widget(): void {
    $published = wp_count_posts( 'product' );
    $published_count = isset( $published->publish ) ? absint( $published->publish ) : 0;
    $draft_count = isset( $published->draft ) ? absint( $published->draft ) : 0;
    $sale_count = function_exists( 'wc_get_product_ids_on_sale' ) ? count( wc_get_product_ids_on_sale() ) : 0;
    $coupon_counts = wp_count_posts( 'shop_coupon' );
    $coupon_count = isset( $coupon_counts->publish ) ? absint( $coupon_counts->publish ) : 0;
    $processing = ip_core_count_orders_by_status( 'processing' );
    $on_hold = ip_core_count_orders_by_status( 'on-hold' );

    echo '<div class="ip-admin-overview" style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px">';
    foreach ( array(
        __( 'Published books', 'illuminated-path-core' ) => $published_count,
        __( 'Draft products', 'illuminated-path-core' ) => $draft_count,
        __( 'Products on sale', 'illuminated-path-core' ) => $sale_count,
        __( 'Active coupons', 'illuminated-path-core' ) => $coupon_count,
        __( 'Processing orders', 'illuminated-path-core' ) => $processing,
        __( 'Orders on hold', 'illuminated-path-core' ) => $on_hold,
    ) as $label => $value ) {
        echo '<div style="padding:12px;border:1px solid #dcdcde;border-radius:8px;background:#fff"><strong style="font-size:20px;display:block">' . esc_html( (string) $value ) . '</strong><span>' . esc_html( $label ) . '</span></div>';
    }
    echo '</div><p><strong>' . esc_html__( 'Quick actions', 'illuminated-path-core' ) . '</strong></p><p>';
    $links = array(
        admin_url( 'post-new.php?post_type=product' ) => __( 'Add book', 'illuminated-path-core' ),
        admin_url( 'edit.php?post_type=product' ) => __( 'Products', 'illuminated-path-core' ),
        admin_url( 'admin.php?page=wc-orders' ) => __( 'Orders', 'illuminated-path-core' ),
        admin_url( 'edit.php?post_type=shop_coupon' ) => __( 'Coupons', 'illuminated-path-core' ),
        admin_url( 'post-new.php?post_type=page' ) => __( 'New landing page', 'illuminated-path-core' ),
        admin_url( 'edit.php' ) => __( 'Blog / Resources', 'illuminated-path-core' ),
        admin_url( 'admin.php?page=ip-legacy-book-import' ) => __( 'Legacy import', 'illuminated-path-core' ),
    );
    $first = true;
    foreach ( $links as $url => $label ) {
        if ( ! $first ) { echo ' · '; }
        echo '<a href="' . esc_url( $url ) . '">' . esc_html( $label ) . '</a>';
        $first = false;
    }
    echo '</p>';
}
