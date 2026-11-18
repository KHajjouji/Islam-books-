<?php
$product = get_query_var( 'ip_product' );
if ( ! $product instanceof WC_Product ) {
    return;
}
$language = function_exists( 'ip_core_product_term_names' ) ? ip_core_product_term_names( $product->get_id(), 'ip_book_language' ) : '';
$age      = function_exists( 'ip_core_product_term_names' ) ? ip_core_product_term_names( $product->get_id(), 'ip_book_age' ) : '';
$author   = function_exists( 'ip_core_product_term_names' ) ? ip_core_product_term_names( $product->get_id(), 'ip_book_author' ) : '';
?>
<article class="ip-product-card">
<a class="product-image" href="<?php echo esc_url( get_permalink( $product->get_id() ) ); ?>"><?php echo wp_kses_post( $product->get_image( 'woocommerce_thumbnail', array( 'loading' => 'lazy' ) ) ); ?><?php if ( $product->is_on_sale() ) : ?><span class="sale-badge"><?php esc_html_e( 'Sale', 'illuminated-path' ); ?></span><?php endif; ?></a>
<div class="product-card-body"><div class="product-card-meta"><?php echo esc_html( implode( ' · ', array_filter( array( $language, $age ) ) ) ); ?></div><h3><a href="<?php echo esc_url( get_permalink( $product->get_id() ) ); ?>"><?php echo esc_html( $product->get_name() ); ?></a></h3><?php if ( $author ) : ?><p class="product-author"><?php echo esc_html( $author ); ?></p><?php endif; ?><div class="product-card-bottom"><span class="product-price"><?php echo wp_kses_post( $product->get_price_html() ); ?></span><a class="card-cart" href="<?php echo esc_url( get_permalink( $product->get_id() ) ); ?>" aria-label="<?php esc_attr_e( 'View book', 'illuminated-path' ); ?>">→</a></div></div>
</article>
