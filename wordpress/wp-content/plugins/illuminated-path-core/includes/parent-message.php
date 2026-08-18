<?php
/** Parent-facing mission copy and brand-page upgrade layer. */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function ip_core_parent_message_pages(): array {
    $about = '<!-- ip-parent-message-v2 -->'
        . '<!-- wp:group {"className":"ip-story-hero ip-parent-story-hero","layout":{"type":"constrained"}} --><div class="wp-block-group ip-story-hero ip-parent-story-hero">'
        . '<!-- wp:paragraph {"className":"section-kicker"} --><p class="section-kicker">' . esc_html__( 'A library for the stories we want our children to carry', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
        . '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Our children are growing up surrounded by stories. We want their own story to be among the most beautiful.', 'illuminated-path-core' ) . '</h1><!-- /wp:heading -->'
        . '<!-- wp:paragraph {"fontSize":"large"} --><p class="has-large-font-size">' . esc_html__( 'Every day, children learn through images, characters, games, films and books. Those stories quietly teach them who deserves admiration, what a family looks like, where they belong and what is worth remembering. Little Muslim Books was created because Muslim children deserve to meet their faith, values, history and cultures through that same powerful language of imagination.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
        . '</div><!-- /wp:group -->'

        . '<!-- wp:columns {"className":"ip-story-columns"} --><div class="wp-block-columns ip-story-columns"><!-- wp:column --><div class="wp-block-column">'
        . '<!-- wp:heading --><h2>' . esc_html__( 'It began with a question many Muslim parents know', 'illuminated-path-core' ) . '</h2><!-- /wp:heading -->'
        . '<!-- wp:paragraph --><p>' . esc_html__( 'How do we help our children love what we are trying to teach them—not only know it? How do the stories of the Prophets, the values of Islam, Ramadan, family traditions, Muslim history and everyday faith become part of a child’s imagination rather than information they meet only in a lesson?', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
        . '<!-- wp:paragraph --><p>' . esc_html__( 'We believe the answer begins by taking children’s imagination seriously. A story can create affection before explanation. An illustration can make a place, a value or a moment stay in memory. A beautifully made book can become part of bedtime, family conversation, a Ramadan tradition or the first independent reading experience a child wants to repeat.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
        . '</div><!-- /wp:column --><!-- wp:column --><div class="wp-block-column">'
        . '<!-- wp:heading --><h2>' . esc_html__( 'So we chose to build, not simply to complain about what is missing', 'illuminated-path-core' ) . '</h2><!-- /wp:heading -->'
        . '<!-- wp:paragraph --><p>' . esc_html__( 'Our background is in visual creation—illustration, game design, digital media and educational storytelling. We grew up as Muslims in a world where image and media became one of the strongest languages children understand. Little Muslim Books uses that creative experience for a clear purpose: to make Islamic culture and values visible, memorable and emotionally meaningful for a new generation.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
        . '<!-- wp:paragraph --><p>' . esc_html__( 'We do not want Muslim parents to have to choose between religious value and creative quality. Our ambition is to offer both: material parents can trust, and books children genuinely want to open, look at, read and return to.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
        . '</div><!-- /wp:column --></div><!-- /wp:columns -->'

        . '<!-- wp:group {"className":"ip-parent-promise-panel","layout":{"type":"constrained"}} --><div class="wp-block-group ip-parent-promise-panel">'
        . '<!-- wp:heading {"textAlign":"center"} --><h2 class="wp-block-heading has-text-align-center">' . esc_html__( 'What we promise families', 'illuminated-path-core' ) . '</h2><!-- /wp:heading -->'
        . '<!-- wp:columns --><div class="wp-block-columns">'
        . '<!-- wp:column --><div class="wp-block-column"><h3>' . esc_html__( 'Faith treated with respect', 'illuminated-path-core' ) . '</h3><p>' . esc_html__( 'Islamic subjects are not decoration. They are handled as the heart of the story, with care for meaning, dignity and the way children encounter sacred history and values.', 'illuminated-path-core' ) . '</p></div><!-- /wp:column -->'
        . '<!-- wp:column --><div class="wp-block-column"><h3>' . esc_html__( 'Creative quality children can love', 'illuminated-path-core' ) . '</h3><p>' . esc_html__( 'We bring illustration, visual storytelling and contemporary design into Islamic children’s publishing because beauty helps invite attention, curiosity and repeated reading.', 'illuminated-path-core' ) . '</p></div><!-- /wp:column -->'
        . '<!-- wp:column --><div class="wp-block-column"><h3>' . esc_html__( 'A bridge between home and heritage', 'illuminated-path-core' ) . '</h3><p>' . esc_html__( 'Our books are made to help parents transmit faith, values, cultural memory and belonging in ways that feel natural inside everyday family life.', 'illuminated-path-core' ) . '</p></div><!-- /wp:column -->'
        . '</div><!-- /wp:columns -->'
        . '</div><!-- /wp:group -->'

        . '<!-- wp:heading --><h2>' . esc_html__( 'For children growing up between languages and cultures', 'illuminated-path-core' ) . '</h2><!-- /wp:heading -->'
        . '<!-- wp:paragraph --><p>' . esc_html__( 'Many Muslim children in Europe and elsewhere grow up speaking one language at school, another with part of the family and hearing Arabic in worship or religious learning. That reality is not a problem to hide; it is part of who they are. This is why multilingual and bilingual publishing is central to our project. We want a child in an English-, French-, Arabic-, German-, Dutch- or Spanish-speaking home to be able to approach Islamic stories in a language that opens the door rather than closes it.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'

        . '<!-- wp:quote {"className":"ip-brand-quote"} --><blockquote class="wp-block-quote ip-brand-quote"><p>' . esc_html__( 'Our goal is simple: when a Muslim child looks at the shelf, we want the books that carry their faith and heritage to be among the books they are most excited to choose.', 'illuminated-path-core' ) . '</p></blockquote><!-- /wp:quote -->';

    $philosophy = '<!-- ip-parent-message-v2 -->'
        . '<!-- wp:paragraph {"className":"section-kicker"} --><p class="section-kicker">' . esc_html__( 'Our publishing philosophy', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
        . '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Education begins before the lesson: it begins with what a child learns to love.', 'illuminated-path-core' ) . '</h1><!-- /wp:heading -->'
        . '<!-- wp:paragraph {"fontSize":"large"} --><p class="has-large-font-size">' . esc_html__( 'We create books to help Muslim parents cultivate more than information. We want children to develop familiarity, affection and confidence toward their faith, Islamic values and cultural inheritance.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
        . '<!-- wp:columns {"className":"ip-philosophy-grid"} --><div class="wp-block-columns ip-philosophy-grid">'
        . '<!-- wp:column --><div class="wp-block-column"><h3>' . esc_html__( 'Meaning before memorisation', 'illuminated-path-core' ) . '</h3><p>' . esc_html__( 'Children remember what they can connect to. Stories, characters and family conversation help religious knowledge become meaningful rather than remaining isolated facts.', 'illuminated-path-core' ) . '</p></div><!-- /wp:column -->'
        . '<!-- wp:column --><div class="wp-block-column"><h3>' . esc_html__( 'Beauty is part of the invitation', 'illuminated-path-core' ) . '</h3><p>' . esc_html__( 'Good illustration and design are not luxuries. They help children pause, observe, imagine and want to return. We want Islamic books to earn that attention through quality.', 'illuminated-path-core' ) . '</p></div><!-- /wp:column -->'
        . '<!-- wp:column --><div class="wp-block-column"><h3>' . esc_html__( 'Parents remain central', 'illuminated-path-core' ) . '</h3><p>' . esc_html__( 'A book is most powerful when it opens a conversation. We design material that can support parents, grandparents and educators as they pass values and stories to children.', 'illuminated-path-core' ) . '</p></div><!-- /wp:column -->'
        . '</div><!-- /wp:columns -->'
        . '<!-- wp:columns {"className":"ip-philosophy-grid"} --><div class="wp-block-columns ip-philosophy-grid">'
        . '<!-- wp:column --><div class="wp-block-column"><h3>' . esc_html__( 'Islamic culture is lived', 'illuminated-path-core' ) . '</h3><p>' . esc_html__( 'Faith is experienced through worship, but also through family, language, hospitality, celebrations, food, places, manners and memory. Our publishing world has room for that wider lived culture.', 'illuminated-path-core' ) . '</p></div><!-- /wp:column -->'
        . '<!-- wp:column --><div class="wp-block-column"><h3>' . esc_html__( 'Multilingual children deserve natural access', 'illuminated-path-core' ) . '</h3><p>' . esc_html__( 'A child should not have to wait until they master a heritage language before discovering the beauty of their heritage. Translation can be a bridge that eventually strengthens connection across languages.', 'illuminated-path-core' ) . '</p></div><!-- /wp:column -->'
        . '<!-- wp:column --><div class="wp-block-column"><h3>' . esc_html__( 'Modern media can serve timeless values', 'illuminated-path-core' ) . '</h3><p>' . esc_html__( 'Our creative experience comes from contemporary visual media. We use that knowledge selectively: the medium should help a child enter the story, while the message, dignity and educational purpose remain in command.', 'illuminated-path-core' ) . '</p></div><!-- /wp:column -->'
        . '</div><!-- /wp:columns -->';

    return array(
        'about'          => array( 'title' => __( 'About Little Muslim Books', 'illuminated-path-core' ), 'content' => $about ),
        'our-story'      => array( 'title' => __( 'Our Story', 'illuminated-path-core' ), 'content' => $about ),
        'our-philosophy' => array( 'title' => __( 'Our Philosophy', 'illuminated-path-core' ), 'content' => $philosophy ),
    );
}

function ip_core_install_parent_message_pages(): array {
    $changed = array();
    foreach ( ip_core_parent_message_pages() as $slug => $page ) {
        $existing = get_page_by_path( $slug, OBJECT, 'page' );
        if ( ! $existing ) {
            $page_id = wp_insert_post(
                array(
                    'post_type'    => 'page',
                    'post_status'  => 'draft',
                    'post_title'   => $page['title'],
                    'post_name'    => $slug,
                    'post_content' => $page['content'],
                    'meta_input'   => array( '_wp_page_template' => 'templates/store-landing.php' ),
                ),
                true
            );
            if ( ! is_wp_error( $page_id ) ) { $changed[] = absint( $page_id ); }
            continue;
        }

        $content = (string) $existing->post_content;
        $is_generated = str_contains( $content, '<!-- ip-brand-starter -->' ) || str_contains( $content, '<!-- ip-parent-message-v2 -->' ) || str_contains( $content, 'Tell the publishing story' );
        if ( ! $is_generated ) {
            continue;
        }
        $result = wp_update_post(
            array(
                'ID'           => $existing->ID,
                'post_title'   => $page['title'],
                'post_content' => $page['content'],
                'meta_input'   => array( '_wp_page_template' => 'templates/store-landing.php' ),
            ),
            true
        );
        if ( ! is_wp_error( $result ) ) { $changed[] = absint( $existing->ID ); }
    }
    return $changed;
}

/**
 * Intercept the existing Brand & Contact "Prepare Brand Pages" action first.
 * Once replaced with the v2 marker, the older generator recognises the content
 * as custom and will not overwrite it later in the same request.
 */
function ip_core_parent_message_setup_intercept(): void {
    if ( ! is_admin() || ! current_user_can( 'manage_woocommerce' ) ) { return; }
    if ( empty( $_POST['ip_brand_setup_action'] ) || 'pages' !== sanitize_key( wp_unslash( $_POST['ip_brand_setup_action'] ) ) ) { return; }
    if ( empty( $_POST['_wpnonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['_wpnonce'] ) ), 'ip_brand_setup' ) ) { return; }
    ip_core_install_parent_message_pages();
}
add_action( 'admin_init', 'ip_core_parent_message_setup_intercept', 95 );

function ip_core_parent_promise_shortcode(): string {
    $about = get_page_by_path( 'about', OBJECT, 'page' );
    $url   = $about && 'publish' === $about->post_status ? get_permalink( $about ) : home_url( '/about/' );
    ob_start();
    ?>
    <section class="ip-parent-promise-home">
        <div class="ip-parent-promise-copy">
            <span class="section-kicker"><?php esc_html_e( 'More than a bookstore', 'illuminated-path-core' ); ?></span>
            <h2><?php esc_html_e( 'We want Muslim children to grow up with books that make faith and heritage feel close, beautiful and theirs.', 'illuminated-path-core' ); ?></h2>
            <p><?php esc_html_e( 'Our children already learn through powerful visual stories every day. Little Muslim Books brings the same care for illustration, design and storytelling to the stories, values and cultural memory Muslim parents want to pass on.', 'illuminated-path-core' ); ?></p>
            <p class="ip-parent-promise-note"><?php esc_html_e( 'Books to read together. Stories children want to revisit. A growing library designed to help families nourish Islamic identity with confidence and affection.', 'illuminated-path-core' ); ?></p>
            <a class="btn btn-primary" href="<?php echo esc_url( $url ); ?>"><?php esc_html_e( 'Why we created Little Muslim Books', 'illuminated-path-core' ); ?> →</a>
        </div>
        <div class="ip-parent-promise-values" aria-label="<?php esc_attr_e( 'Our publishing commitments', 'illuminated-path-core' ); ?>">
            <article><strong><?php esc_html_e( 'Faith', 'illuminated-path-core' ); ?></strong><span><?php esc_html_e( 'Stories rooted in Islamic meaning and values.', 'illuminated-path-core' ); ?></span></article>
            <article><strong><?php esc_html_e( 'Culture', 'illuminated-path-core' ); ?></strong><span><?php esc_html_e( 'A living connection to Muslim heritage and family memory.', 'illuminated-path-core' ); ?></span></article>
            <article><strong><?php esc_html_e( 'Craft', 'illuminated-path-core' ); ?></strong><span><?php esc_html_e( 'Illustration and design made to deserve a child’s attention.', 'illuminated-path-core' ); ?></span></article>
            <article><strong><?php esc_html_e( 'Belonging', 'illuminated-path-core' ); ?></strong><span><?php esc_html_e( 'Multilingual books for children growing up across cultures.', 'illuminated-path-core' ); ?></span></article>
        </div>
    </section>
    <?php
    return (string) ob_get_clean();
}
add_shortcode( 'ip_parent_promise', 'ip_core_parent_promise_shortcode' );
