<?php
/** Media-library images for authors, series, languages, ages, formats and themes. */
if ( ! defined( 'ABSPATH' ) ) { exit; }

function ip_core_image_taxonomies(): array {
    return array( 'ip_book_author', 'ip_book_series', 'ip_book_language', 'ip_book_age', 'ip_book_format', 'ip_book_theme' );
}

function ip_core_taxonomy_image_add_field(): void {
    ?>
    <div class="form-field ip-term-image-field">
        <label><?php esc_html_e( 'Collection image', 'illuminated-path-core' ); ?></label>
        <input type="hidden" name="ip_term_thumbnail_id" value="">
        <div class="ip-term-image-preview"></div>
        <p><button type="button" class="button ip-term-image-select"><?php esc_html_e( 'Choose image', 'illuminated-path-core' ); ?></button> <button type="button" class="button ip-term-image-remove"><?php esc_html_e( 'Remove', 'illuminated-path-core' ); ?></button></p>
        <p class="description"><?php esc_html_e( 'Used by collection grids and visual landing pages. The image stays editable in the Media Library.', 'illuminated-path-core' ); ?></p>
    </div>
    <?php
}

function ip_core_taxonomy_image_edit_field( WP_Term $term ): void {
    $image_id = absint( get_term_meta( $term->term_id, 'thumbnail_id', true ) );
    $image    = $image_id ? wp_get_attachment_image( $image_id, 'thumbnail' ) : '';
    ?>
    <tr class="form-field ip-term-image-field">
        <th scope="row"><label><?php esc_html_e( 'Collection image', 'illuminated-path-core' ); ?></label></th>
        <td>
            <input type="hidden" name="ip_term_thumbnail_id" value="<?php echo esc_attr( (string) $image_id ); ?>">
            <div class="ip-term-image-preview"><?php echo wp_kses_post( $image ); ?></div>
            <p><button type="button" class="button ip-term-image-select"><?php esc_html_e( 'Choose image', 'illuminated-path-core' ); ?></button> <button type="button" class="button ip-term-image-remove"><?php esc_html_e( 'Remove', 'illuminated-path-core' ); ?></button></p>
            <p class="description"><?php esc_html_e( 'Used by collection grids and visual landing pages.', 'illuminated-path-core' ); ?></p>
        </td>
    </tr>
    <?php
}

foreach ( ip_core_image_taxonomies() as $taxonomy ) {
    add_action( $taxonomy . '_add_form_fields', 'ip_core_taxonomy_image_add_field' );
    add_action( $taxonomy . '_edit_form_fields', 'ip_core_taxonomy_image_edit_field' );
}

function ip_core_save_taxonomy_image( int $term_id ): void {
    if ( ! isset( $_POST['ip_term_thumbnail_id'] ) ) { return; }
    $image_id = absint( wp_unslash( $_POST['ip_term_thumbnail_id'] ) );
    if ( $image_id ) { update_term_meta( $term_id, 'thumbnail_id', $image_id ); }
    else { delete_term_meta( $term_id, 'thumbnail_id' ); }
}
foreach ( ip_core_image_taxonomies() as $taxonomy ) {
    add_action( 'created_' . $taxonomy, 'ip_core_save_taxonomy_image' );
    add_action( 'edited_' . $taxonomy, 'ip_core_save_taxonomy_image' );
}

function ip_core_taxonomy_image_admin_assets( string $hook ): void {
    if ( ! in_array( $hook, array( 'edit-tags.php', 'term.php' ), true ) ) { return; }
    $taxonomy = isset( $_GET['taxonomy'] ) ? sanitize_key( wp_unslash( $_GET['taxonomy'] ) ) : '';
    if ( ! in_array( $taxonomy, ip_core_image_taxonomies(), true ) ) { return; }
    wp_enqueue_media();
    wp_add_inline_script(
        'jquery-core',
        "jQuery(function($){$(document).on('click','.ip-term-image-select',function(e){e.preventDefault();var box=$(this).closest('.ip-term-image-field');var frame=wp.media({title:'Choose collection image',multiple:false,library:{type:'image'}});frame.on('select',function(){var a=frame.state().get('selection').first().toJSON();box.find('input[name=ip_term_thumbnail_id]').val(a.id);box.find('.ip-term-image-preview').html('<img src=\"'+(a.sizes&&a.sizes.thumbnail?a.sizes.thumbnail.url:a.url)+'\" style=\"max-width:150px;height:auto\">');});frame.open();});$(document).on('click','.ip-term-image-remove',function(e){e.preventDefault();var box=$(this).closest('.ip-term-image-field');box.find('input[name=ip_term_thumbnail_id]').val('');box.find('.ip-term-image-preview').empty();});});"
    );
}
add_action( 'admin_enqueue_scripts', 'ip_core_taxonomy_image_admin_assets' );
