<?php
/** Publishing metadata for WooCommerce products. */
if ( ! defined( 'ABSPATH' ) ) { exit; }

function ip_core_product_fields(): void {
    echo '<div class="options_group">';
    woocommerce_wp_text_input( array( 'id' => '_ip_book_subtitle', 'label' => __( 'Book subtitle', 'illuminated-path-core' ) ) );
    woocommerce_wp_text_input( array( 'id' => '_ip_isbn', 'label' => __( 'ISBN', 'illuminated-path-core' ) ) );
    woocommerce_wp_text_input( array( 'id' => '_ip_illustrator', 'label' => __( 'Illustrator', 'illuminated-path-core' ) ) );
    woocommerce_wp_text_input( array( 'id' => '_ip_publisher', 'label' => __( 'Publisher', 'illuminated-path-core' ) ) );
    woocommerce_wp_text_input( array( 'id' => '_ip_page_count', 'label' => __( 'Page count', 'illuminated-path-core' ), 'type' => 'number', 'custom_attributes' => array( 'min' => '1', 'step' => '1' ) ) );
    woocommerce_wp_text_input( array( 'id' => '_ip_reading_level', 'label' => __( 'Reading level', 'illuminated-path-core' ) ) );
    woocommerce_wp_text_input( array( 'id' => '_ip_binding', 'label' => __( 'Binding', 'illuminated-path-core' ), 'placeholder' => __( 'Hardcover, paperback, board book…', 'illuminated-path-core' ) ) );
    woocommerce_wp_text_input( array( 'id' => '_ip_dimensions', 'label' => __( 'Book dimensions', 'illuminated-path-core' ), 'placeholder' => '21 × 21 cm' ) );
    woocommerce_wp_text_input( array( 'id' => '_ip_publication_date', 'label' => __( 'Publication date', 'illuminated-path-core' ), 'type' => 'date' ) );
    woocommerce_wp_text_input( array( 'id' => '_ip_edition', 'label' => __( 'Edition', 'illuminated-path-core' ) ) );
    woocommerce_wp_textarea_input( array( 'id' => '_ip_learning_objectives', 'label' => __( 'Themes / what children explore', 'illuminated-path-core' ), 'description' => __( 'One item per line. Used on the product presentation.', 'illuminated-path-core' ), 'desc_tip' => true ) );
    woocommerce_wp_text_input( array( 'id' => '_ip_preview_url', 'label' => __( 'Book preview URL', 'illuminated-path-core' ), 'type' => 'url', 'description' => __( 'Optional external flipbook/PDF preview. Do not use for protected paid content.', 'illuminated-path-core' ), 'desc_tip' => true ) );
    echo '</div>';
}
add_action( 'woocommerce_product_options_general_product_data', 'ip_core_product_fields' );

function ip_core_save_product_fields( WC_Product $product ): void {
    foreach ( array( '_ip_book_subtitle', '_ip_isbn', '_ip_illustrator', '_ip_publisher', '_ip_reading_level', '_ip_binding', '_ip_dimensions', '_ip_publication_date', '_ip_edition' ) as $key ) {
        if ( isset( $_POST[ $key ] ) ) { $product->update_meta_data( $key, sanitize_text_field( wp_unslash( $_POST[ $key ] ) ) ); }
    }
    if ( isset( $_POST['_ip_page_count'] ) ) { $product->update_meta_data( '_ip_page_count', absint( $_POST['_ip_page_count'] ) ); }
    if ( isset( $_POST['_ip_learning_objectives'] ) ) { $product->update_meta_data( '_ip_learning_objectives', sanitize_textarea_field( wp_unslash( $_POST['_ip_learning_objectives'] ) ) ); }
    if ( isset( $_POST['_ip_preview_url'] ) ) { $product->update_meta_data( '_ip_preview_url', esc_url_raw( wp_unslash( $_POST['_ip_preview_url'] ) ) ); }
}
add_action( 'woocommerce_admin_process_product_object', 'ip_core_save_product_fields' );

function ip_core_book_details_tab( array $tabs ): array {
    global $product;
    if ( ! $product instanceof WC_Product ) { return $tabs; }
    $has_details = $product->get_meta( '_ip_isbn' ) || $product->get_meta( '_ip_page_count' ) || ip_core_product_term_names( $product->get_id(), 'ip_book_author' );
    if ( $has_details ) { $tabs['ip_book_details'] = array( 'title' => __( 'Book details', 'illuminated-path-core' ), 'priority' => 18, 'callback' => 'ip_core_render_book_details' ); }
    return $tabs;
}
add_filter( 'woocommerce_product_tabs', 'ip_core_book_details_tab' );

function ip_core_book_detail_rows( WC_Product $product ): array {
    $rows = array(
        __( 'Author', 'illuminated-path-core' ) => ip_core_product_term_names( $product->get_id(), 'ip_book_author' ),
        __( 'Series', 'illuminated-path-core' ) => ip_core_product_term_names( $product->get_id(), 'ip_book_series' ),
        __( 'Language', 'illuminated-path-core' ) => ip_core_product_term_names( $product->get_id(), 'ip_book_language' ),
        __( 'Age range', 'illuminated-path-core' ) => ip_core_product_term_names( $product->get_id(), 'ip_book_age' ),
        __( 'Format', 'illuminated-path-core' ) => ip_core_product_term_names( $product->get_id(), 'ip_book_format' ),
        __( 'Illustrator', 'illuminated-path-core' ) => $product->get_meta( '_ip_illustrator' ),
        __( 'Publisher', 'illuminated-path-core' ) => $product->get_meta( '_ip_publisher' ),
        __( 'Pages', 'illuminated-path-core' ) => $product->get_meta( '_ip_page_count' ),
        __( 'Reading level', 'illuminated-path-core' ) => $product->get_meta( '_ip_reading_level' ),
        __( 'Binding', 'illuminated-path-core' ) => $product->get_meta( '_ip_binding' ),
        __( 'Dimensions', 'illuminated-path-core' ) => $product->get_meta( '_ip_dimensions' ),
        __( 'Publication date', 'illuminated-path-core' ) => $product->get_meta( '_ip_publication_date' ),
        __( 'Edition', 'illuminated-path-core' ) => $product->get_meta( '_ip_edition' ),
        __( 'ISBN', 'illuminated-path-core' ) => $product->get_meta( '_ip_isbn' ),
    );
    return array_filter( $rows, static fn( $value ) => '' !== trim( (string) $value ) );
}

function ip_core_render_book_details(): void {
    global $product;
    if ( ! $product instanceof WC_Product ) { return; }
    echo '<div class="ip-book-details"><dl class="ip-book-facts">';
    foreach ( ip_core_book_detail_rows( $product ) as $label => $value ) { echo '<div><dt>' . esc_html( $label ) . '</dt><dd>' . esc_html( (string) $value ) . '</dd></div>'; }
    echo '</dl>';
    $objectives = trim( (string) $product->get_meta( '_ip_learning_objectives' ) );
    if ( $objectives ) {
        echo '<h3>' . esc_html__( 'What children will explore', 'illuminated-path-core' ) . '</h3><ul class="ip-theme-list">';
        foreach ( preg_split( '/\r\n|\r|\n/', $objectives ) as $objective ) { if ( trim( $objective ) ) { echo '<li>' . esc_html( trim( $objective ) ) . '</li>'; } }
        echo '</ul>';
    }
    echo '</div>';
}

function ip_core_product_summary_meta(): void {
    global $product;
    if ( ! $product instanceof WC_Product ) { return; }
    $subtitle = trim( (string) $product->get_meta( '_ip_book_subtitle' ) );
    if ( $subtitle ) { echo '<p class="ip-product-subtitle">' . esc_html( $subtitle ) . '</p>'; }
    $chips = array_filter( array(
        ip_core_product_term_names( $product->get_id(), 'ip_book_age' ),
        ip_core_product_term_names( $product->get_id(), 'ip_book_language' ),
        ip_core_product_term_names( $product->get_id(), 'ip_book_format' ),
        $product->get_meta( '_ip_page_count' ) ? sprintf( __( '%d pages', 'illuminated-path-core' ), absint( $product->get_meta( '_ip_page_count' ) ) ) : '',
    ) );
    if ( $chips ) { echo '<div class="ip-book-chips">'; foreach ( $chips as $chip ) { echo '<span>' . esc_html( (string) $chip ) . '</span>'; } echo '</div>'; }
    $preview_url = $product->get_meta( '_ip_preview_url' );
    if ( $preview_url ) { echo '<p class="ip-preview-action"><a class="button alt" target="_blank" rel="noopener" href="' . esc_url( $preview_url ) . '">' . esc_html__( 'Preview this book', 'illuminated-path-core' ) . '</a></p>'; }
}
add_action( 'woocommerce_single_product_summary', 'ip_core_product_summary_meta', 7 );

function ip_core_product_admin_columns( array $columns ): array { $columns['ip_book_language'] = __( 'Language', 'illuminated-path-core' ); $columns['ip_book_series'] = __( 'Series', 'illuminated-path-core' ); $columns['ip_isbn'] = __( 'ISBN', 'illuminated-path-core' ); return $columns; }
add_filter( 'manage_edit-product_columns', 'ip_core_product_admin_columns', 20 );
function ip_core_product_admin_column_content( string $column, int $post_id ): void {
    if ( 'ip_book_language' === $column || 'ip_book_series' === $column ) { echo esc_html( ip_core_product_term_names( $post_id, $column ) ); }
    elseif ( 'ip_isbn' === $column ) { $product = wc_get_product( $post_id ); echo $product ? esc_html( (string) $product->get_meta( '_ip_isbn' ) ) : ''; }
}
add_action( 'manage_product_posts_custom_column', 'ip_core_product_admin_column_content', 10, 2 );
