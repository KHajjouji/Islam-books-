<?php
/** Publisher-oriented WordPress dashboard for the commercial bookstore. */
if ( ! defined( 'ABSPATH' ) ) { exit; }

function ip_core_register_store_dashboard_widget(): void {
    if ( current_user_can( 'manage_woocommerce' ) ) {
        wp_add_dashboard_widget( 'ip_store_overview', __( 'Little Muslim Books — Store Overview', 'illuminated-path-core' ), 'ip_core_render_store_dashboard_widget' );
    }
}
add_action( 'wp_dashboard_setup', 'ip_core_register_store_dashboard_widget' );

function ip_core_register_bookstore_dashboard_page(): void {
    add_submenu_page(
        'woocommerce',
        __( 'Bookstore Dashboard', 'illuminated-path-core' ),
        __( 'Bookstore Dashboard', 'illuminated-path-core' ),
        'manage_woocommerce',
        'ip-bookstore-dashboard',
        'ip_core_render_bookstore_dashboard_page'
    );
}
add_action( 'admin_menu', 'ip_core_register_bookstore_dashboard_page', 55 );

function ip_core_count_orders_by_status( string $status ): int {
    if ( ! function_exists( 'wc_get_orders' ) ) { return 0; }
    $result = wc_get_orders( array( 'status' => $status, 'limit' => 1, 'paginate' => true, 'return' => 'ids' ) );
    return is_object( $result ) && isset( $result->total ) ? absint( $result->total ) : 0;
}

function ip_core_count_open_kdp_orders(): int {
    if ( ! function_exists( 'wc_get_orders' ) || ! function_exists( 'ip_core_order_has_provider' ) ) { return 0; }
    $orders = wc_get_orders( array( 'limit' => 100, 'orderby' => 'date', 'order' => 'DESC', 'status' => array_keys( wc_get_order_statuses() ), 'return' => 'objects' ) );
    $count = 0;
    foreach ( $orders as $order ) {
        if ( ! $order instanceof WC_Order || ! ip_core_order_has_provider( $order, 'kdp_author_copy' ) ) { continue; }
        $status = sanitize_key( (string) $order->get_meta( '_ip_fulfillment_status' ) ) ?: 'pending';
        if ( ! in_array( $status, array( 'delivered' ), true ) ) { ++$count; }
    }
    return $count;
}

function ip_core_store_overview_metrics(): array {
    $published = wp_count_posts( 'product' );
    $coupon_counts = wp_count_posts( 'shop_coupon' );
    return array(
        __( 'Published books', 'illuminated-path-core' ) => isset( $published->publish ) ? absint( $published->publish ) : 0,
        __( 'Draft products', 'illuminated-path-core' ) => isset( $published->draft ) ? absint( $published->draft ) : 0,
        __( 'Products on sale', 'illuminated-path-core' ) => function_exists( 'wc_get_product_ids_on_sale' ) ? count( wc_get_product_ids_on_sale() ) : 0,
        __( 'Active coupons', 'illuminated-path-core' ) => isset( $coupon_counts->publish ) ? absint( $coupon_counts->publish ) : 0,
        __( 'Processing orders', 'illuminated-path-core' ) => ip_core_count_orders_by_status( 'processing' ),
        __( 'KDP fulfilment open', 'illuminated-path-core' ) => ip_core_count_open_kdp_orders(),
    );
}

function ip_core_store_quick_links(): array {
    return array(
        admin_url( 'post-new.php?post_type=product' ) => __( 'Add book', 'illuminated-path-core' ),
        admin_url( 'edit.php?post_type=product' ) => __( 'Products', 'illuminated-path-core' ),
        admin_url( 'admin.php?page=wc-orders' ) => __( 'Orders', 'illuminated-path-core' ),
        admin_url( 'admin.php?page=ip-book-fulfillment' ) => __( 'Book fulfilment', 'illuminated-path-core' ),
        admin_url( 'edit.php?post_type=shop_coupon' ) => __( 'Coupons', 'illuminated-path-core' ),
        admin_url( 'edit-tags.php?taxonomy=product_cat&post_type=product' ) => __( 'Product categories', 'illuminated-path-core' ),
        admin_url( 'edit-tags.php?taxonomy=ip_book_series&post_type=product' ) => __( 'Book series', 'illuminated-path-core' ),
        admin_url( 'edit-tags.php?taxonomy=ip_book_language&post_type=product' ) => __( 'Book languages', 'illuminated-path-core' ),
        admin_url( 'edit.php?post_type=page' ) => __( 'Pages / landing pages', 'illuminated-path-core' ),
        admin_url( 'edit.php' ) => __( 'Blog / Resources', 'illuminated-path-core' ),
        admin_url( 'admin.php?page=ip-legacy-book-import' ) => __( 'Legacy import', 'illuminated-path-core' ),
    );
}

function ip_core_render_store_dashboard_widget(): void {
    echo '<div class="ip-admin-overview" style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px">';
    foreach ( ip_core_store_overview_metrics() as $label => $value ) {
        echo '<div style="padding:12px;border:1px solid #dcdcde;border-radius:8px;background:#fff"><strong style="font-size:20px;display:block">' . esc_html( (string) $value ) . '</strong><span>' . esc_html( $label ) . '</span></div>';
    }
    echo '</div><p><strong>' . esc_html__( 'Quick actions', 'illuminated-path-core' ) . '</strong></p><p>';
    $first = true;
    foreach ( ip_core_store_quick_links() as $url => $label ) {
        if ( ! $first ) { echo ' · '; }
        echo '<a href="' . esc_url( $url ) . '">' . esc_html( $label ) . '</a>';
        $first = false;
    }
    echo '</p>';
}

function ip_core_render_bookstore_dashboard_page(): void {
    if ( ! current_user_can( 'manage_woocommerce' ) ) { return; }
    ?>
    <div class="wrap">
        <h1><?php esc_html_e( 'Little Muslim Books — Bookstore Dashboard', 'illuminated-path-core' ); ?></h1>
        <p><?php esc_html_e( 'Commercial control center for books, orders, promotions, content and fulfilment. WooCommerce and WordPress remain the underlying source of truth.', 'illuminated-path-core' ); ?></p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin:24px 0">
            <?php foreach ( ip_core_store_overview_metrics() as $label => $value ) : ?>
                <article style="padding:20px;border:1px solid #dcdcde;border-radius:12px;background:#fff"><strong style="font-size:28px;display:block;margin-bottom:4px"><?php echo esc_html( (string) $value ); ?></strong><span><?php echo esc_html( $label ); ?></span></article>
            <?php endforeach; ?>
        </div>
        <h2><?php esc_html_e( 'Manage the bookstore', 'illuminated-path-core' ); ?></h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;max-width:1100px">
            <?php foreach ( ip_core_store_quick_links() as $url => $label ) : ?>
                <a href="<?php echo esc_url( $url ); ?>" style="display:flex;align-items:center;justify-content:space-between;padding:18px;border:1px solid #dcdcde;border-radius:10px;background:#fff;text-decoration:none;font-weight:600"><span><?php echo esc_html( $label ); ?></span><span aria-hidden="true">→</span></a>
            <?php endforeach; ?>
        </div>
        <div style="margin-top:28px;padding:18px;border-left:4px solid #2271b1;background:#fff">
            <strong><?php esc_html_e( 'Production rule', 'illuminated-path-core' ); ?></strong>
            <p style="margin-bottom:0"><?php esc_html_e( 'Payments, coupons, taxes, shipping, invoices, multilingual synchronization and email marketing should stay with their dedicated WordPress/WooCommerce plugins. The Little Muslim Books code controls presentation, publishing metadata and store-specific workflows.', 'illuminated-path-core' ); ?></p>
        </div>
    </div>
    <?php
}
