<?php
/**
 * Fulfilment workflow for physical books.
 *
 * The plugin does not attempt to automate Amazon/KDP checkout. Instead it
 * provides a provider-agnostic fulfilment layer, a KDP queue, automatic admin
 * notifications and customer-facing tracking details.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function ip_core_fulfillment_provider_options(): array {
    return array(
        'manual'          => __( 'Manual / own stock', 'illuminated-path-core' ),
        'kdp_author_copy' => __( 'Amazon KDP author copy', 'illuminated-path-core' ),
        'bookvault'       => __( 'Bookvault', 'illuminated-path-core' ),
        'lulu'            => __( 'Lulu Direct', 'illuminated-path-core' ),
    );
}

function ip_core_fulfillment_status_options(): array {
    return array(
        'pending'   => __( 'Waiting to order', 'illuminated-path-core' ),
        'ordered'   => __( 'Ordered with printer', 'illuminated-path-core' ),
        'shipped'   => __( 'Shipped', 'illuminated-path-core' ),
        'delivered' => __( 'Delivered', 'illuminated-path-core' ),
        'issue'     => __( 'Needs attention', 'illuminated-path-core' ),
    );
}

function ip_core_product_fulfillment_fields(): void {
    echo '<div class="options_group">';
    woocommerce_wp_select(
        array(
            'id'          => '_ip_fulfillment_provider',
            'label'       => __( 'Fulfilment provider', 'illuminated-path-core' ),
            'description' => __( 'Choose how direct website orders for this book are fulfilled.', 'illuminated-path-core' ),
            'desc_tip'    => true,
            'options'     => ip_core_fulfillment_provider_options(),
        )
    );
    woocommerce_wp_text_input(
        array(
            'id'          => '_ip_kdp_reference',
            'label'       => __( 'KDP / printer reference', 'illuminated-path-core' ),
            'description' => __( 'Optional internal identifier such as KDP title, ASIN, ISBN or printer SKU.', 'illuminated-path-core' ),
            'desc_tip'    => true,
        )
    );
    woocommerce_wp_text_input(
        array(
            'id'          => '_ip_kdp_order_url',
            'label'       => __( 'KDP / printer order URL', 'illuminated-path-core' ),
            'type'        => 'url',
            'description' => __( 'Optional private admin shortcut to the relevant KDP/printer ordering page.', 'illuminated-path-core' ),
            'desc_tip'    => true,
        )
    );
    echo '</div>';
}
add_action( 'woocommerce_product_options_shipping', 'ip_core_product_fulfillment_fields' );

function ip_core_save_product_fulfillment_fields( WC_Product $product ): void {
    $providers = ip_core_fulfillment_provider_options();
    if ( isset( $_POST['_ip_fulfillment_provider'] ) ) {
        $provider = sanitize_key( wp_unslash( $_POST['_ip_fulfillment_provider'] ) );
        if ( isset( $providers[ $provider ] ) ) {
            $product->update_meta_data( '_ip_fulfillment_provider', $provider );
        }
    }
    if ( isset( $_POST['_ip_kdp_reference'] ) ) {
        $product->update_meta_data( '_ip_kdp_reference', sanitize_text_field( wp_unslash( $_POST['_ip_kdp_reference'] ) ) );
    }
    if ( isset( $_POST['_ip_kdp_order_url'] ) ) {
        $product->update_meta_data( '_ip_kdp_order_url', esc_url_raw( wp_unslash( $_POST['_ip_kdp_order_url'] ) ) );
    }
}
add_action( 'woocommerce_admin_process_product_object', 'ip_core_save_product_fulfillment_fields', 30 );

function ip_core_product_fulfillment_provider( WC_Product $product ): string {
    $provider = sanitize_key( (string) $product->get_meta( '_ip_fulfillment_provider' ) );
    return isset( ip_core_fulfillment_provider_options()[ $provider ] ) ? $provider : 'manual';
}

function ip_core_order_provider_items( WC_Order $order, string $provider = '' ): array {
    $items = array();
    foreach ( $order->get_items( 'line_item' ) as $item_id => $item ) {
        if ( ! $item instanceof WC_Order_Item_Product ) {
            continue;
        }
        $product = $item->get_product();
        if ( ! $product ) {
            continue;
        }
        $item_provider = ip_core_product_fulfillment_provider( $product );
        if ( $provider && $provider !== $item_provider ) {
            continue;
        }
        $items[] = array(
            'item_id'   => $item_id,
            'item'      => $item,
            'product'   => $product,
            'provider'  => $item_provider,
            'reference' => (string) $product->get_meta( '_ip_kdp_reference' ),
            'order_url' => (string) $product->get_meta( '_ip_kdp_order_url' ),
        );
    }
    return $items;
}

function ip_core_order_has_provider( WC_Order $order, string $provider ): bool {
    return ! empty( ip_core_order_provider_items( $order, $provider ) );
}

function ip_core_order_shipping_lines( WC_Order $order ): array {
    return array_filter(
        array(
            trim( $order->get_shipping_first_name() . ' ' . $order->get_shipping_last_name() ),
            $order->get_shipping_company(),
            $order->get_shipping_address_1(),
            $order->get_shipping_address_2(),
            trim( $order->get_shipping_postcode() . ' ' . $order->get_shipping_city() ),
            $order->get_shipping_state(),
            $order->get_shipping_country(),
        )
    );
}

function ip_core_maybe_notify_kdp_order( int $order_id ): void {
    $order = wc_get_order( $order_id );
    if ( ! $order instanceof WC_Order || ! ip_core_order_has_provider( $order, 'kdp_author_copy' ) ) {
        return;
    }
    if ( $order->get_meta( '_ip_fulfillment_admin_notified' ) ) {
        return;
    }

    if ( ! $order->get_meta( '_ip_fulfillment_status' ) ) {
        $order->update_meta_data( '_ip_fulfillment_status', 'pending' );
    }

    $lines   = array();
    $lines[] = sprintf( __( 'New KDP fulfilment order #%s', 'illuminated-path-core' ), $order->get_order_number() );
    $lines[] = '';
    $lines[] = __( 'Customer', 'illuminated-path-core' ) . ': ' . trim( $order->get_shipping_first_name() . ' ' . $order->get_shipping_last_name() );
    $lines[] = __( 'Email', 'illuminated-path-core' ) . ': ' . $order->get_billing_email();
    $lines[] = __( 'Phone', 'illuminated-path-core' ) . ': ' . $order->get_billing_phone();
    $lines[] = '';
    $lines[] = __( 'Ship to', 'illuminated-path-core' ) . ':';
    foreach ( ip_core_order_shipping_lines( $order ) as $address_line ) {
        $lines[] = (string) $address_line;
    }
    $lines[] = '';
    $lines[] = __( 'Books to order', 'illuminated-path-core' ) . ':';
    foreach ( ip_core_order_provider_items( $order, 'kdp_author_copy' ) as $entry ) {
        /** @var WC_Order_Item_Product $item */
        $item = $entry['item'];
        $line = sprintf( '- %s × %d', $item->get_name(), $item->get_quantity() );
        if ( $entry['reference'] ) {
            $line .= ' [' . $entry['reference'] . ']';
        }
        $lines[] = $line;
        if ( $entry['order_url'] ) {
            $lines[] = '  ' . $entry['order_url'];
        }
    }
    $lines[] = '';
    $lines[] = __( 'WooCommerce order', 'illuminated-path-core' ) . ': ' . ip_core_admin_order_url( $order->get_id() );

    $recipient = apply_filters( 'illuminated_path_fulfillment_email', get_option( 'admin_email' ), $order );
    $subject   = sprintf(
        __( '[Little Muslim Books] KDP order #%1$s — %2$s', 'illuminated-path-core' ),
        $order->get_order_number(),
        trim( $order->get_shipping_first_name() . ' ' . $order->get_shipping_last_name() )
    );

    if ( $recipient && wp_mail( $recipient, $subject, implode( "\n", $lines ) ) ) {
        $order->update_meta_data( '_ip_fulfillment_admin_notified', current_time( 'mysql' ) );
    }
    $order->save();
}
add_action( 'woocommerce_payment_complete', 'ip_core_maybe_notify_kdp_order', 30 );
add_action( 'woocommerce_order_status_processing', 'ip_core_maybe_notify_kdp_order', 30 );

function ip_core_admin_order_url( int $order_id ): string {
    if ( class_exists( '\\Automattic\\WooCommerce\\Utilities\\OrderUtil' ) && \Automattic\WooCommerce\Utilities\OrderUtil::custom_orders_table_usage_is_enabled() ) {
        return admin_url( 'admin.php?page=wc-orders&action=edit&id=' . absint( $order_id ) );
    }
    return admin_url( 'post.php?post=' . absint( $order_id ) . '&action=edit' );
}

function ip_core_render_fulfillment_order_panel( WC_Order $order ): void {
    $provider_items = ip_core_order_provider_items( $order );
    if ( empty( $provider_items ) ) {
        return;
    }

    $status = sanitize_key( (string) $order->get_meta( '_ip_fulfillment_status' ) );
    if ( ! isset( ip_core_fulfillment_status_options()[ $status ] ) ) {
        $status = 'pending';
    }
    wp_nonce_field( 'ip_core_save_fulfillment', 'ip_core_fulfillment_nonce' );
    ?>
    <div class="ip-admin-fulfillment" style="margin-top:18px;padding:16px;border:1px solid #dcdcde;border-radius:8px;background:#fff">
        <h3 style="margin-top:0"><?php esc_html_e( 'Book fulfilment', 'illuminated-path-core' ); ?></h3>
        <p><strong><?php esc_html_e( 'Providers:', 'illuminated-path-core' ); ?></strong>
            <?php
            $providers = array_unique( wp_list_pluck( $provider_items, 'provider' ) );
            $labels = array();
            foreach ( $providers as $provider ) {
                $labels[] = ip_core_fulfillment_provider_options()[ $provider ] ?? $provider;
            }
            echo esc_html( implode( ', ', $labels ) );
            ?>
        </p>
        <p class="form-field form-field-wide"><label for="ip_fulfillment_status"><?php esc_html_e( 'Fulfilment status', 'illuminated-path-core' ); ?></label><select name="ip_fulfillment_status" id="ip_fulfillment_status" style="width:100%">
            <?php foreach ( ip_core_fulfillment_status_options() as $key => $label ) : ?>
                <option value="<?php echo esc_attr( $key ); ?>" <?php selected( $status, $key ); ?>><?php echo esc_html( $label ); ?></option>
            <?php endforeach; ?>
        </select></p>
        <p class="form-field form-field-wide"><label for="ip_external_order_number"><?php esc_html_e( 'Amazon / printer order number', 'illuminated-path-core' ); ?></label><input type="text" style="width:100%" id="ip_external_order_number" name="ip_external_order_number" value="<?php echo esc_attr( (string) $order->get_meta( '_ip_external_order_number' ) ); ?>"></p>
        <p class="form-field form-field-wide"><label for="ip_fulfillment_eta"><?php esc_html_e( 'Estimated delivery', 'illuminated-path-core' ); ?></label><input type="date" id="ip_fulfillment_eta" name="ip_fulfillment_eta" value="<?php echo esc_attr( (string) $order->get_meta( '_ip_fulfillment_eta' ) ); ?>"></p>
        <p class="form-field form-field-wide"><label for="ip_fulfillment_tracking_url"><?php esc_html_e( 'Tracking URL', 'illuminated-path-core' ); ?></label><input type="url" style="width:100%" id="ip_fulfillment_tracking_url" name="ip_fulfillment_tracking_url" value="<?php echo esc_attr( (string) $order->get_meta( '_ip_fulfillment_tracking_url' ) ); ?>"></p>
        <p class="form-field form-field-wide"><label for="ip_fulfillment_note"><?php esc_html_e( 'Internal fulfilment note', 'illuminated-path-core' ); ?></label><textarea style="width:100%" rows="3" id="ip_fulfillment_note" name="ip_fulfillment_note"><?php echo esc_textarea( (string) $order->get_meta( '_ip_fulfillment_note' ) ); ?></textarea></p>
        <p><label><input type="checkbox" name="ip_notify_customer_fulfillment" value="1"> <?php esc_html_e( 'Email the customer a fulfilment update when this order is saved', 'illuminated-path-core' ); ?></label></p>
        <?php
        $shortcuts = array();
        foreach ( $provider_items as $entry ) {
            if ( $entry['order_url'] ) {
                $shortcuts[ $entry['order_url'] ] = $entry['item']->get_name();
            }
        }
        if ( $shortcuts ) {
            echo '<p><strong>' . esc_html__( 'Printer shortcuts:', 'illuminated-path-core' ) . '</strong><br>';
            foreach ( $shortcuts as $url => $name ) {
                echo '<a class="button" target="_blank" rel="noopener" href="' . esc_url( $url ) . '">' . esc_html( $name ) . '</a> ';
            }
            echo '</p>';
        }
        ?>
    </div>
    <?php
}
add_action( 'woocommerce_admin_order_data_after_shipping_address', 'ip_core_render_fulfillment_order_panel', 30 );

function ip_core_save_fulfillment_order_fields( int $order_id ): void {
    static $saved = array();
    if ( isset( $saved[ $order_id ] ) ) {
        return;
    }
    if ( ! isset( $_POST['ip_core_fulfillment_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['ip_core_fulfillment_nonce'] ) ), 'ip_core_save_fulfillment' ) ) {
        return;
    }
    if ( ! current_user_can( 'edit_shop_orders' ) && ! current_user_can( 'manage_woocommerce' ) ) {
        return;
    }

    $order = wc_get_order( $order_id );
    if ( ! $order instanceof WC_Order ) {
        return;
    }
    $saved[ $order_id ] = true;

    $statuses = ip_core_fulfillment_status_options();
    $status   = isset( $_POST['ip_fulfillment_status'] ) ? sanitize_key( wp_unslash( $_POST['ip_fulfillment_status'] ) ) : '';
    if ( isset( $statuses[ $status ] ) ) {
        $order->update_meta_data( '_ip_fulfillment_status', $status );
    }
    if ( isset( $_POST['ip_external_order_number'] ) ) {
        $order->update_meta_data( '_ip_external_order_number', sanitize_text_field( wp_unslash( $_POST['ip_external_order_number'] ) ) );
    }
    if ( isset( $_POST['ip_fulfillment_eta'] ) ) {
        $order->update_meta_data( '_ip_fulfillment_eta', sanitize_text_field( wp_unslash( $_POST['ip_fulfillment_eta'] ) ) );
    }
    if ( isset( $_POST['ip_fulfillment_tracking_url'] ) ) {
        $order->update_meta_data( '_ip_fulfillment_tracking_url', esc_url_raw( wp_unslash( $_POST['ip_fulfillment_tracking_url'] ) ) );
    }
    if ( isset( $_POST['ip_fulfillment_note'] ) ) {
        $order->update_meta_data( '_ip_fulfillment_note', sanitize_textarea_field( wp_unslash( $_POST['ip_fulfillment_note'] ) ) );
    }
    $order->save();

    if ( ! empty( $_POST['ip_notify_customer_fulfillment'] ) ) {
        $status_label = $statuses[ sanitize_key( (string) $order->get_meta( '_ip_fulfillment_status' ) ) ] ?? __( 'Updated', 'illuminated-path-core' );
        $note = sprintf( __( 'Fulfilment update for order #%1$s: %2$s.', 'illuminated-path-core' ), $order->get_order_number(), $status_label );
        $external = trim( (string) $order->get_meta( '_ip_external_order_number' ) );
        $eta      = trim( (string) $order->get_meta( '_ip_fulfillment_eta' ) );
        $tracking = trim( (string) $order->get_meta( '_ip_fulfillment_tracking_url' ) );
        if ( $external ) { $note .= ' ' . sprintf( __( 'Reference: %s.', 'illuminated-path-core' ), $external ); }
        if ( $eta ) { $note .= ' ' . sprintf( __( 'Estimated delivery: %s.', 'illuminated-path-core' ), $eta ); }
        if ( $tracking ) { $note .= ' ' . sprintf( __( 'Tracking: %s', 'illuminated-path-core' ), $tracking ); }
        $order->add_order_note( $note, true );
    }
}
add_action( 'woocommerce_process_shop_order_meta', 'ip_core_save_fulfillment_order_fields', 50 );
add_action( 'woocommerce_update_order', 'ip_core_save_fulfillment_order_fields', 50 );

function ip_core_render_customer_fulfillment( WC_Order $order ): void {
    if ( ! is_user_logged_in() || (int) $order->get_user_id() !== get_current_user_id() ) {
        return;
    }
    $status = sanitize_key( (string) $order->get_meta( '_ip_fulfillment_status' ) );
    if ( ! $status ) {
        return;
    }
    $statuses = ip_core_fulfillment_status_options();
    $external = trim( (string) $order->get_meta( '_ip_external_order_number' ) );
    $eta      = trim( (string) $order->get_meta( '_ip_fulfillment_eta' ) );
    $tracking = trim( (string) $order->get_meta( '_ip_fulfillment_tracking_url' ) );
    ?>
    <section class="ip-fulfillment-card">
        <span class="ip-account-kicker"><?php esc_html_e( 'Delivery', 'illuminated-path-core' ); ?></span>
        <h2><?php esc_html_e( 'Your book shipment', 'illuminated-path-core' ); ?></h2>
        <div class="ip-fulfillment-grid">
            <div><strong><?php esc_html_e( 'Status', 'illuminated-path-core' ); ?></strong><span><?php echo esc_html( $statuses[ $status ] ?? $status ); ?></span></div>
            <?php if ( $external ) : ?><div><strong><?php esc_html_e( 'Order reference', 'illuminated-path-core' ); ?></strong><span><?php echo esc_html( $external ); ?></span></div><?php endif; ?>
            <?php if ( $eta ) : ?><div><strong><?php esc_html_e( 'Estimated delivery', 'illuminated-path-core' ); ?></strong><span><?php echo esc_html( $eta ); ?></span></div><?php endif; ?>
        </div>
        <?php if ( $tracking ) : ?><p><a class="button" target="_blank" rel="noopener" href="<?php echo esc_url( $tracking ); ?>"><?php esc_html_e( 'Track your package', 'illuminated-path-core' ); ?></a></p><?php endif; ?>
    </section>
    <?php
}
add_action( 'woocommerce_order_details_after_order_table', 'ip_core_render_customer_fulfillment', 20 );

function ip_core_register_fulfillment_page(): void {
    add_submenu_page(
        'woocommerce',
        __( 'Book Fulfilment', 'illuminated-path-core' ),
        __( 'Book Fulfilment', 'illuminated-path-core' ),
        'manage_woocommerce',
        'ip-book-fulfillment',
        'ip_core_render_fulfillment_page'
    );
}
add_action( 'admin_menu', 'ip_core_register_fulfillment_page', 65 );

function ip_core_render_fulfillment_page(): void {
    if ( ! current_user_can( 'manage_woocommerce' ) ) {
        return;
    }
    $filter = isset( $_GET['fulfillment_status'] ) ? sanitize_key( wp_unslash( $_GET['fulfillment_status'] ) ) : 'open';
    $orders = wc_get_orders(
        array(
            'limit'   => 150,
            'orderby' => 'date',
            'order'   => 'DESC',
            'status'  => array_keys( wc_get_order_statuses() ),
            'return'  => 'objects',
        )
    );
    $rows = array();
    foreach ( $orders as $order ) {
        if ( ! $order instanceof WC_Order || ! ip_core_order_has_provider( $order, 'kdp_author_copy' ) ) {
            continue;
        }
        $status = sanitize_key( (string) $order->get_meta( '_ip_fulfillment_status' ) ) ?: 'pending';
        if ( 'open' === $filter && in_array( $status, array( 'delivered' ), true ) ) {
            continue;
        }
        if ( ! in_array( $filter, array( '', 'all', 'open' ), true ) && $status !== $filter ) {
            continue;
        }
        $rows[] = array( 'order' => $order, 'status' => $status );
    }
    ?>
    <div class="wrap">
        <h1><?php esc_html_e( 'Book Fulfilment', 'illuminated-path-core' ); ?></h1>
        <p><?php esc_html_e( 'Use this queue for direct-store books that are fulfilled manually through KDP author copies. WooCommerce remains the customer/order source of truth; Amazon checkout itself is intentionally not automated.', 'illuminated-path-core' ); ?></p>
        <p>
            <?php
            $filters = array_merge( array( 'open' => __( 'Open', 'illuminated-path-core' ), 'all' => __( 'All', 'illuminated-path-core' ) ), ip_core_fulfillment_status_options() );
            foreach ( $filters as $key => $label ) {
                $url = add_query_arg( array( 'page' => 'ip-book-fulfillment', 'fulfillment_status' => $key ), admin_url( 'admin.php' ) );
                echo '<a class="button' . ( $filter === $key ? ' button-primary' : '' ) . '" style="margin-right:6px" href="' . esc_url( $url ) . '">' . esc_html( $label ) . '</a>';
            }
            ?>
        </p>
        <table class="widefat striped">
            <thead><tr><th><?php esc_html_e( 'Order', 'illuminated-path-core' ); ?></th><th><?php esc_html_e( 'Customer / ship to', 'illuminated-path-core' ); ?></th><th><?php esc_html_e( 'Books', 'illuminated-path-core' ); ?></th><th><?php esc_html_e( 'Status', 'illuminated-path-core' ); ?></th><th><?php esc_html_e( 'Printer order', 'illuminated-path-core' ); ?></th><th><?php esc_html_e( 'Action', 'illuminated-path-core' ); ?></th></tr></thead>
            <tbody>
            <?php if ( empty( $rows ) ) : ?>
                <tr><td colspan="6"><?php esc_html_e( 'No matching KDP fulfilment orders.', 'illuminated-path-core' ); ?></td></tr>
            <?php else : foreach ( $rows as $row ) : $order = $row['order']; ?>
                <tr>
                    <td><strong>#<?php echo esc_html( $order->get_order_number() ); ?></strong><br><small><?php echo esc_html( wc_format_datetime( $order->get_date_created() ) ); ?></small></td>
                    <td><strong><?php echo esc_html( trim( $order->get_shipping_first_name() . ' ' . $order->get_shipping_last_name() ) ); ?></strong><br><?php echo esc_html( implode( ', ', ip_core_order_shipping_lines( $order ) ) ); ?><br><small><?php echo esc_html( $order->get_billing_email() ); ?></small></td>
                    <td><?php foreach ( ip_core_order_provider_items( $order, 'kdp_author_copy' ) as $entry ) { echo esc_html( $entry['item']->get_name() . ' × ' . $entry['item']->get_quantity() ); if ( $entry['reference'] ) { echo '<br><small>' . esc_html( $entry['reference'] ) . '</small>'; } echo '<br>'; } ?></td>
                    <td><?php echo esc_html( ip_core_fulfillment_status_options()[ $row['status'] ] ?? $row['status'] ); ?></td>
                    <td><?php echo esc_html( (string) $order->get_meta( '_ip_external_order_number' ) ); ?></td>
                    <td><a class="button button-primary" href="<?php echo esc_url( ip_core_admin_order_url( $order->get_id() ) ); ?>"><?php esc_html_e( 'Open order', 'illuminated-path-core' ); ?></a></td>
                </tr>
            <?php endforeach; endif; ?>
            </tbody>
        </table>
    </div>
    <?php
}
