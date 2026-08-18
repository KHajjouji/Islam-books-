<?php
/**
 * One-time legacy React/Firebase product JSON importer.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function ip_core_register_import_page(): void {
    add_submenu_page(
        'woocommerce',
        __( 'Legacy Book Import', 'illuminated-path-core' ),
        __( 'Legacy Book Import', 'illuminated-path-core' ),
        'manage_woocommerce',
        'ip-legacy-book-import',
        'ip_core_render_import_page'
    );
}
add_action( 'admin_menu', 'ip_core_register_import_page', 80 );

function ip_core_legacy_theme_to_taxonomy( string $theme ): string {
    $map = array(
        'quran'     => 'Quran',
        'prophets'  => 'Prophets',
        'ramadan'   => 'Ramadan & Eid',
        'bedtime'   => 'Bedtime',
        'bilingual' => 'Bilingual',
        'general'   => 'General Islamic learning',
    );
    return $map[ $theme ] ?? ucwords( str_replace( array( '-', '_' ), ' ', $theme ) );
}

function ip_core_import_remote_image( string $url, int $post_id ): int {
    if ( ! $url || ! wp_http_validate_url( $url ) ) {
        return 0;
    }
    require_once ABSPATH . 'wp-admin/includes/media.php';
    require_once ABSPATH . 'wp-admin/includes/file.php';
    require_once ABSPATH . 'wp-admin/includes/image.php';
    $attachment_id = media_sideload_image( $url, $post_id, null, 'id' );
    return is_wp_error( $attachment_id ) ? 0 : absint( $attachment_id );
}

function ip_core_import_legacy_product( array $row, bool $download_images = false ): int {
    $legacy_id = isset( $row['id'] ) ? sanitize_text_field( (string) $row['id'] ) : '';
    if ( $legacy_id ) {
        $existing = get_posts(
            array(
                'post_type'      => 'product',
                'post_status'    => 'any',
                'posts_per_page' => 1,
                'meta_key'       => '_ip_legacy_id',
                'meta_value'     => $legacy_id,
                'fields'         => 'ids',
            )
        );
        if ( $existing ) {
            return (int) $existing[0];
        }
    }

    $product = new WC_Product_Simple();
    $product->set_name( sanitize_text_field( $row['title'] ?? __( 'Imported book', 'illuminated-path-core' ) ) );
    $product->set_status( 'draft' );
    $product->set_regular_price( wc_format_decimal( $row['price'] ?? 0 ) );
    $product->set_description( wp_kses_post( $row['longDescription'] ?? $row['description'] ?? '' ) );
    $product->set_short_description( wp_kses_post( $row['description'] ?? '' ) );
    $stock = isset( $row['stock'] ) ? absint( $row['stock'] ) : 0;
    if ( $stock > 0 ) {
        $product->set_manage_stock( true );
        $product->set_stock_quantity( $stock );
        $product->set_stock_status( 'instock' );
    }
    $product_id = $product->save();

    if ( $legacy_id ) {
        update_post_meta( $product_id, '_ip_legacy_id', $legacy_id );
    }
    if ( ! empty( $row['ageRange'] ) ) {
        wp_set_object_terms( $product_id, sanitize_text_field( $row['ageRange'] ), 'ip_book_age', false );
    }
    if ( ! empty( $row['author'] ) ) {
        wp_set_object_terms( $product_id, sanitize_text_field( $row['author'] ), 'ip_book_author', false );
    }
    if ( ! empty( $row['theme'] ) ) {
        wp_set_object_terms( $product_id, ip_core_legacy_theme_to_taxonomy( sanitize_key( $row['theme'] ) ), 'ip_book_theme', false );
    }
    if ( ! empty( $row['features'] ) && is_array( $row['features'] ) ) {
        update_post_meta( $product_id, '_ip_learning_objectives', sanitize_textarea_field( implode( "\n", array_map( 'strval', $row['features'] ) ) ) );
    }

    $category_name = ( isset( $row['category'] ) && 'academy' === $row['category'] ) ? __( 'Digital products', 'illuminated-path-core' ) : __( 'Books', 'illuminated-path-core' );
    wp_set_object_terms( $product_id, $category_name, 'product_cat', true );

    if ( $download_images && ! empty( $row['image'] ) ) {
        $image_id = ip_core_import_remote_image( esc_url_raw( $row['image'] ), $product_id );
        if ( $image_id ) {
            set_post_thumbnail( $product_id, $image_id );
        }
    }

    return $product_id;
}

function ip_core_handle_legacy_import(): void {
    if ( ! current_user_can( 'manage_woocommerce' ) || ! isset( $_POST['ip_legacy_import_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['ip_legacy_import_nonce'] ) ), 'ip_legacy_import' ) ) {
        return;
    }

    $raw = isset( $_POST['ip_legacy_json'] ) ? wp_unslash( $_POST['ip_legacy_json'] ) : '';
    if ( ! $raw ) {
        add_settings_error( 'ip_legacy_import', 'empty', __( 'Paste a JSON array first.', 'illuminated-path-core' ), 'error' );
        return;
    }
    $data = json_decode( $raw, true );
    if ( ! is_array( $data ) ) {
        add_settings_error( 'ip_legacy_import', 'json', __( 'The JSON is invalid.', 'illuminated-path-core' ), 'error' );
        return;
    }

    $download_images = ! empty( $_POST['ip_download_images'] );
    $imported = 0;
    foreach ( $data as $row ) {
        if ( is_array( $row ) && ! empty( $row['title'] ) ) {
            ip_core_import_legacy_product( $row, $download_images );
            ++$imported;
        }
    }
    add_settings_error( 'ip_legacy_import', 'done', sprintf( _n( '%d product processed. Imported products are saved as drafts for review.', '%d products processed. Imported products are saved as drafts for review.', $imported, 'illuminated-path-core' ), $imported ), 'success' );
}
add_action( 'admin_init', 'ip_core_handle_legacy_import' );

function ip_core_render_import_page(): void {
    if ( ! current_user_can( 'manage_woocommerce' ) ) {
        return;
    }
    ?>
    <div class="wrap">
        <h1><?php esc_html_e( 'Legacy Book Import', 'illuminated-path-core' ); ?></h1>
        <p><?php esc_html_e( 'Paste a JSON array exported from the old React/Firebase product model. Products are created as WooCommerce drafts so you can review translations, images, stock and shipping before publishing.', 'illuminated-path-core' ); ?></p>
        <?php settings_errors( 'ip_legacy_import' ); ?>
        <form method="post">
            <?php wp_nonce_field( 'ip_legacy_import', 'ip_legacy_import_nonce' ); ?>
            <textarea name="ip_legacy_json" rows="22" class="large-text code" placeholder='[{"id":"1","title":"The Story of Prophet Nuh","price":14.99,"theme":"prophets"}]'></textarea>
            <p><label><input type="checkbox" name="ip_download_images" value="1"> <?php esc_html_e( 'Download remote cover images into the WordPress Media Library', 'illuminated-path-core' ); ?></label></p>
            <?php submit_button( __( 'Import as drafts', 'illuminated-path-core' ) ); ?>
        </form>
    </div>
    <?php
}
