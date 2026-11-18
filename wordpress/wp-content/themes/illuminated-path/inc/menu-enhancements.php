<?php
/** Small UX enhancement for branded navigation menus. */
if ( ! defined( 'ABSPATH' ) ) { exit; }

function ip_menu_item_fields( int $item_id, WP_Post $menu_item, int $depth, stdClass $args, int $current_object_id ): void {
    if ( 0 !== $depth ) { return; }
    $enabled = (bool) get_post_meta( $item_id, '_ip_mega_menu', true );
    ?>
    <p class="field-ip-mega-menu description description-wide">
        <label for="edit-menu-item-ip-mega-<?php echo esc_attr( (string) $item_id ); ?>">
            <input type="checkbox" id="edit-menu-item-ip-mega-<?php echo esc_attr( (string) $item_id ); ?>" name="menu-item-ip-mega[<?php echo esc_attr( (string) $item_id ); ?>]" value="1" <?php checked( $enabled ); ?>>
            <?php esc_html_e( 'Display this top-level item as a Little Muslim Books mega menu', 'illuminated-path' ); ?>
        </label>
    </p>
    <?php
}
add_action( 'wp_nav_menu_item_custom_fields', 'ip_menu_item_fields', 10, 5 );

function ip_save_menu_item_fields( int $menu_id, int $menu_item_db_id ): void {
    $enabled = isset( $_POST['menu-item-ip-mega'][ $menu_item_db_id ] ) ? 1 : 0;
    if ( $enabled ) { update_post_meta( $menu_item_db_id, '_ip_mega_menu', 1 ); }
    else { delete_post_meta( $menu_item_db_id, '_ip_mega_menu' ); }
}
add_action( 'wp_update_nav_menu_item', 'ip_save_menu_item_fields', 10, 2 );

function ip_menu_item_classes( array $classes, $menu_item, $args, int $depth ): array {
    if ( 0 === $depth && get_post_meta( $menu_item->ID, '_ip_mega_menu', true ) ) {
        $classes[] = 'mega-menu';
    }
    return $classes;
}
add_filter( 'nav_menu_css_class', 'ip_menu_item_classes', 10, 4 );
