<?php
/** Elementor widgets for branded bookstore marketing pages. */

if ( ! defined( 'ABSPATH' ) || ! class_exists( '\\Elementor\\Widget_Base' ) ) {
    exit;
}

function ip_core_elementor_term_options( string $taxonomy ): array {
    if ( ! taxonomy_exists( $taxonomy ) ) {
        return array();
    }
    $terms = get_terms( array( 'taxonomy' => $taxonomy, 'hide_empty' => false, 'number' => 200 ) );
    if ( is_wp_error( $terms ) ) {
        return array();
    }
    $options = array( '' => __( 'All', 'illuminated-path-core' ) );
    foreach ( $terms as $term ) {
        $options[ $term->slug ] = $term->name;
    }
    return $options;
}

function ip_core_elementor_product_options(): array {
    if ( ! function_exists( 'wc_get_products' ) ) {
        return array();
    }
    $products = wc_get_products( array( 'status' => array( 'publish', 'draft' ), 'limit' => 250, 'orderby' => 'title', 'order' => 'ASC', 'return' => 'objects' ) );
    $options  = array();
    foreach ( $products as $product ) {
        if ( $product instanceof WC_Product ) {
            $options[ (string) $product->get_id() ] = $product->get_name() . ' (#' . $product->get_id() . ')';
        }
    }
    return $options;
}

abstract class IP_Elementor_Base_Widget extends \Elementor\Widget_Base {
    public function get_categories(): array {
        return array( 'little-muslim-books' );
    }

    public function get_style_depends(): array {
        return array( 'illuminated-path-bookstore', 'illuminated-path-brand-builder' );
    }
}

class IP_Elementor_Book_Slider extends IP_Elementor_Base_Widget {
    public function get_name(): string { return 'ip-book-slider'; }
    public function get_title(): string { return __( 'Book Slider', 'illuminated-path-core' ); }
    public function get_icon(): string { return 'eicon-posts-carousel'; }
    public function get_keywords(): array { return array( 'books', 'products', 'slider', 'woocommerce', 'bestseller' ); }

    protected function register_controls(): void {
        $this->start_controls_section( 'content', array( 'label' => __( 'Books', 'illuminated-path-core' ) ) );
        $this->add_control( 'title', array( 'label' => __( 'Title', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::TEXT, 'default' => __( 'Featured books', 'illuminated-path-core' ), 'label_block' => true ) );
        $this->add_control( 'subtitle', array( 'label' => __( 'Subtitle', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::TEXTAREA, 'rows' => 2 ) );
        $this->add_control( 'source', array( 'label' => __( 'Source', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::SELECT, 'default' => 'newest', 'options' => array( 'newest' => __( 'Newest', 'illuminated-path-core' ), 'featured' => __( 'Featured', 'illuminated-path-core' ), 'best_selling' => __( 'Best selling', 'illuminated-path-core' ), 'top_rated' => __( 'Top rated', 'illuminated-path-core' ), 'sale' => __( 'On sale', 'illuminated-path-core' ), 'manual' => __( 'Manual selection', 'illuminated-path-core' ) ) ) );
        $this->add_control( 'ids', array( 'label' => __( 'Manual products', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::SELECT2, 'multiple' => true, 'options' => ip_core_elementor_product_options(), 'condition' => array( 'source' => 'manual' ), 'label_block' => true ) );
        $this->add_control( 'category', array( 'label' => __( 'Woo category', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::SELECT, 'options' => ip_core_elementor_term_options( 'product_cat' ) ) );
        $this->add_control( 'series', array( 'label' => __( 'Series', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::SELECT, 'options' => ip_core_elementor_term_options( 'ip_book_series' ) ) );
        $this->add_control( 'language', array( 'label' => __( 'Book language', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::SELECT, 'options' => ip_core_elementor_term_options( 'ip_book_language' ) ) );
        $this->add_control( 'theme', array( 'label' => __( 'Theme', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::SELECT, 'options' => ip_core_elementor_term_options( 'ip_book_theme' ) ) );
        $this->add_control( 'age', array( 'label' => __( 'Age range', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::SELECT, 'options' => ip_core_elementor_term_options( 'ip_book_age' ) ) );
        $this->add_control( 'format', array( 'label' => __( 'Format', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::SELECT, 'options' => ip_core_elementor_term_options( 'ip_book_format' ) ) );
        $this->add_control( 'limit', array( 'label' => __( 'Number of books', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::NUMBER, 'default' => 8, 'min' => 1, 'max' => 24 ) );
        $this->add_control( 'view_all_url', array( 'label' => __( 'View all URL', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::URL, 'placeholder' => home_url( '/shop/' ) ) );
        $this->end_controls_section();
    }

    protected function render(): void {
        $s = $this->get_settings_for_display();
        $ids = is_array( $s['ids'] ?? null ) ? implode( ',', array_map( 'absint', $s['ids'] ) ) : '';
        $link = ! empty( $s['view_all_url']['url'] ) ? $s['view_all_url']['url'] : '';
        echo do_shortcode( sprintf(
            '[ip_book_slider title="%s" subtitle="%s" source="%s" category="%s" series="%s" language="%s" theme="%s" age="%s" format="%s" ids="%s" limit="%d" link="%s"]',
            esc_attr( $s['title'] ), esc_attr( $s['subtitle'] ), esc_attr( $s['source'] ), esc_attr( $s['category'] ), esc_attr( $s['series'] ), esc_attr( $s['language'] ), esc_attr( $s['theme'] ), esc_attr( $s['age'] ), esc_attr( $s['format'] ), esc_attr( $ids ), absint( $s['limit'] ), esc_url( $link )
        ) );
    }
}

class IP_Elementor_Product_Spotlight extends IP_Elementor_Base_Widget {
    public function get_name(): string { return 'ip-product-spotlight'; }
    public function get_title(): string { return __( 'Product Spotlight', 'illuminated-path-core' ); }
    public function get_icon(): string { return 'eicon-product-info'; }
    public function get_keywords(): array { return array( 'book', 'spotlight', 'featured', 'campaign', 'product' ); }

    protected function register_controls(): void {
        $this->start_controls_section( 'content', array( 'label' => __( 'Spotlight', 'illuminated-path-core' ) ) );
        $this->add_control( 'product_id', array( 'label' => __( 'Book', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::SELECT2, 'options' => ip_core_elementor_product_options(), 'label_block' => true ) );
        $this->add_control( 'eyebrow', array( 'label' => __( 'Eyebrow', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::TEXT, 'default' => __( 'Featured book', 'illuminated-path-core' ) ) );
        $this->add_control( 'heading', array( 'label' => __( 'Custom heading (optional)', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::TEXT, 'label_block' => true ) );
        $this->add_control( 'body', array( 'label' => __( 'Editorial paragraph', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::TEXTAREA, 'rows' => 5 ) );
        $this->add_control( 'badge', array( 'label' => __( 'Badge', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::TEXT, 'placeholder' => __( 'NEW RELEASE', 'illuminated-path-core' ) ) );
        $this->add_control( 'button', array( 'label' => __( 'Button label', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::TEXT, 'default' => __( 'Discover the book', 'illuminated-path-core' ) ) );
        $this->add_control( 'image_side', array( 'label' => __( 'Book image', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::SELECT, 'default' => 'left', 'options' => array( 'left' => __( 'Left', 'illuminated-path-core' ), 'right' => __( 'Right', 'illuminated-path-core' ) ) ) );
        $this->end_controls_section();
    }

    protected function render(): void {
        $s = $this->get_settings_for_display();
        if ( empty( $s['product_id'] ) ) {
            return;
        }
        echo do_shortcode( sprintf( '[ip_product_spotlight id="%d" eyebrow="%s" heading="%s" body="%s" badge="%s" button="%s" image_side="%s"]', absint( $s['product_id'] ), esc_attr( $s['eyebrow'] ), esc_attr( $s['heading'] ), esc_attr( $s['body'] ), esc_attr( $s['badge'] ), esc_attr( $s['button'] ), esc_attr( $s['image_side'] ) ) );
    }
}

class IP_Elementor_Collection_Grid extends IP_Elementor_Base_Widget {
    public function get_name(): string { return 'ip-collection-grid'; }
    public function get_title(): string { return __( 'Collection Grid', 'illuminated-path-core' ); }
    public function get_icon(): string { return 'eicon-gallery-grid'; }

    protected function register_controls(): void {
        $this->start_controls_section( 'content', array( 'label' => __( 'Collections', 'illuminated-path-core' ) ) );
        $this->add_control( 'taxonomy', array( 'label' => __( 'Collection type', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::SELECT, 'default' => 'product_cat', 'options' => array( 'product_cat' => __( 'Product categories', 'illuminated-path-core' ), 'ip_book_series' => __( 'Series', 'illuminated-path-core' ), 'ip_book_author' => __( 'Authors', 'illuminated-path-core' ), 'ip_book_language' => __( 'Languages', 'illuminated-path-core' ), 'ip_book_age' => __( 'Age ranges', 'illuminated-path-core' ), 'ip_book_theme' => __( 'Themes', 'illuminated-path-core' ), 'ip_book_format' => __( 'Formats', 'illuminated-path-core' ) ) ) );
        $this->add_control( 'limit', array( 'label' => __( 'Maximum items', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::NUMBER, 'default' => 8, 'min' => 1, 'max' => 30 ) );
        $this->end_controls_section();
    }

    protected function render(): void {
        $s = $this->get_settings_for_display();
        echo do_shortcode( '[ip_collection_grid taxonomy="' . esc_attr( $s['taxonomy'] ) . '" limit="' . absint( $s['limit'] ) . '"]' );
    }
}

class IP_Elementor_Book_Search extends IP_Elementor_Base_Widget {
    public function get_name(): string { return 'ip-book-search'; }
    public function get_title(): string { return __( 'Book Search', 'illuminated-path-core' ); }
    public function get_icon(): string { return 'eicon-search'; }

    protected function register_controls(): void {
        $this->start_controls_section( 'content', array( 'label' => __( 'Search', 'illuminated-path-core' ) ) );
        $this->add_control( 'placeholder', array( 'label' => __( 'Placeholder', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::TEXT, 'default' => __( 'Search books, authors or series…', 'illuminated-path-core' ), 'label_block' => true ) );
        $this->end_controls_section();
    }

    protected function render(): void {
        $s = $this->get_settings_for_display();
        echo do_shortcode( '[ip_book_search placeholder="' . esc_attr( $s['placeholder'] ) . '"]' );
    }
}

class IP_Elementor_Sale_Banner extends IP_Elementor_Base_Widget {
    public function get_name(): string { return 'ip-sale-banner'; }
    public function get_title(): string { return __( 'Sale / Campaign Banner', 'illuminated-path-core' ); }
    public function get_icon(): string { return 'eicon-call-to-action'; }

    protected function register_controls(): void {
        $this->start_controls_section( 'content', array( 'label' => __( 'Campaign', 'illuminated-path-core' ) ) );
        $this->add_control( 'eyebrow', array( 'label' => __( 'Eyebrow', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::TEXT, 'default' => __( 'Limited-time offer', 'illuminated-path-core' ) ) );
        $this->add_control( 'heading', array( 'label' => __( 'Heading', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::TEXT, 'default' => __( 'Build their library for less', 'illuminated-path-core' ), 'label_block' => true ) );
        $this->add_control( 'body', array( 'label' => __( 'Description', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::TEXTAREA, 'rows' => 3 ) );
        $this->add_control( 'coupon', array( 'label' => __( 'Public coupon code', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::TEXT ) );
        $this->add_control( 'button', array( 'label' => __( 'Button label', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::TEXT, 'default' => __( 'Shop the offer', 'illuminated-path-core' ) ) );
        $this->add_control( 'url', array( 'label' => __( 'Button URL', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::URL ) );
        $this->add_control( 'image', array( 'label' => __( 'Background image', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::MEDIA ) );
        $this->end_controls_section();
    }

    protected function render(): void {
        $s = $this->get_settings_for_display();
        $url = ! empty( $s['url']['url'] ) ? $s['url']['url'] : ( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/shop/' ) );
        $style = ! empty( $s['image']['url'] ) ? ' style="background-image:linear-gradient(90deg,rgba(0,66,37,.94),rgba(0,66,37,.70)),url(' . esc_url( $s['image']['url'] ) . ')"' : '';
        echo '<section class="ip-sale-banner"' . $style . '><div><span class="ip-sale-banner-eyebrow">' . esc_html( $s['eyebrow'] ) . '</span><h2>' . esc_html( $s['heading'] ) . '</h2>';
        if ( $s['body'] ) { echo '<p>' . esc_html( $s['body'] ) . '</p>'; }
        if ( $s['coupon'] ) { echo '<p class="ip-sale-banner-code"><span>' . esc_html__( 'Code', 'illuminated-path-core' ) . '</span><strong>' . esc_html( $s['coupon'] ) . '</strong></p>'; }
        echo '<a class="button" href="' . esc_url( $url ) . '">' . esc_html( $s['button'] ) . ' →</a></div></section>';
    }
}

class IP_Elementor_Review_Grid extends IP_Elementor_Base_Widget {
    public function get_name(): string { return 'ip-review-grid'; }
    public function get_title(): string { return __( 'Parent Reviews', 'illuminated-path-core' ); }
    public function get_icon(): string { return 'eicon-testimonial'; }

    protected function register_controls(): void {
        $this->start_controls_section( 'content', array( 'label' => __( 'Reviews', 'illuminated-path-core' ) ) );
        $this->add_control( 'title', array( 'label' => __( 'Title', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::TEXT, 'default' => __( 'What families are saying', 'illuminated-path-core' ), 'label_block' => true ) );
        $this->add_control( 'limit', array( 'label' => __( 'Number of reviews', 'illuminated-path-core' ), 'type' => \Elementor\Controls_Manager::NUMBER, 'default' => 3, 'min' => 1, 'max' => 12 ) );
        $this->end_controls_section();
    }

    protected function render(): void {
        $s = $this->get_settings_for_display();
        echo do_shortcode( '[ip_review_grid title="' . esc_attr( $s['title'] ) . '" limit="' . absint( $s['limit'] ) . '"]' );
    }
}
