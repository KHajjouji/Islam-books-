<?php
/** Elementor visual-builder integration for Little Muslim Books. */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function ip_core_elementor_ready(): bool {
    return did_action( 'elementor/loaded' ) && class_exists( '\\Elementor\\Widget_Base' );
}

function ip_core_elementor_category( $elements_manager ): void {
    if ( is_object( $elements_manager ) && method_exists( $elements_manager, 'add_category' ) ) {
        $elements_manager->add_category(
            'little-muslim-books',
            array(
                'title' => __( 'Little Muslim Books', 'illuminated-path-core' ),
                'icon'  => 'fa fa-book',
            )
        );
    }
}
add_action( 'elementor/elements/categories_registered', 'ip_core_elementor_category' );

function ip_core_register_elementor_widgets( $widgets_manager ): void {
    if ( ! ip_core_elementor_ready() || ! is_object( $widgets_manager ) || ! method_exists( $widgets_manager, 'register' ) ) {
        return;
    }

    require_once IP_CORE_DIR . 'includes/elementor-widgets.php';

    $widgets = array(
        'IP_Elementor_Book_Slider',
        'IP_Elementor_Product_Spotlight',
        'IP_Elementor_Collection_Grid',
        'IP_Elementor_Book_Search',
        'IP_Elementor_Sale_Banner',
        'IP_Elementor_Review_Grid',
    );

    foreach ( $widgets as $widget_class ) {
        if ( class_exists( $widget_class ) ) {
            $widgets_manager->register( new $widget_class() );
        }
    }
}
add_action( 'elementor/widgets/register', 'ip_core_register_elementor_widgets' );

function ip_core_elementor_admin_notice(): void {
    if ( ! current_user_can( 'edit_theme_options' ) || ! isset( $_GET['page'] ) || 'ip-store-setup' !== sanitize_key( wp_unslash( $_GET['page'] ) ) ) {
        return;
    }
    if ( ! did_action( 'elementor/loaded' ) ) {
        echo '<div class="notice notice-info"><p>' . esc_html__( 'Elementor is optional. Install Elementor if you want drag-and-drop marketing pages and the Little Muslim Books Elementor widgets. The theme works without it using WordPress blocks and patterns.', 'illuminated-path-core' ) . '</p></div>';
    }
}
add_action( 'admin_notices', 'ip_core_elementor_admin_notice' );
