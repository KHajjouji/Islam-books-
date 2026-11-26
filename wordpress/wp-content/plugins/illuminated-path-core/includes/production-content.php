<?php
/**
 * Publishable editorial content for the production bookstore.
 *
 * This is real brand/catalog copy, not fake commerce data. Dynamic WooCommerce
 * components populate from the merchant's real products.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function ip_core_production_editorial_pages(): array {
    $pages = array();

    $pages['islamic-childrens-books'] = array(
        'title' => __( 'Islamic Children’s Books', 'illuminated-path-core' ),
        'content' => '<!-- ip-production-editorial-v1 -->'
            . '<!-- wp:paragraph {"className":"section-kicker"} --><p class="section-kicker">' . esc_html__( 'Books for growing Muslim hearts', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
            . '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Islamic children’s books made to be loved, shared and remembered.', 'illuminated-path-core' ) . '</h1><!-- /wp:heading -->'
            . '<!-- wp:paragraph {"fontSize":"large"} --><p class="has-large-font-size">' . esc_html__( 'Little Muslim Books brings faith, Prophetic stories, Quranic narratives, Islamic values and Muslim cultural memory into beautifully presented books for today’s children. Browse by theme, age, language or series and build a home library your child is excited to return to.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
            . '<!-- wp:shortcode -->[ip_book_slider title="Featured books" source="featured" limit="10"]<!-- /wp:shortcode -->'
            . '<!-- wp:heading --><h2>' . esc_html__( 'Find the right book for your family', 'illuminated-path-core' ) . '</h2><!-- /wp:heading -->'
            . '<!-- wp:paragraph --><p>' . esc_html__( 'Some families are looking for a first introduction to the Prophets. Others want Ramadan stories, bilingual books, bedtime reading or books that make values such as patience, gratitude and kindness easier to discuss. Our catalogue is organised to make those choices simple.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
            . '<!-- wp:shortcode -->[ip_collection_grid taxonomy="ip_book_theme" limit="12"]<!-- /wp:shortcode -->'
            . '<!-- wp:columns --><div class="wp-block-columns"><!-- wp:column --><div class="wp-block-column"><h3>' . esc_html__( 'Faith with care', 'illuminated-path-core' ) . '</h3><p>' . esc_html__( 'Islamic subjects are treated as the heart of the book, not as decoration. We aim for respectful storytelling that helps parents open meaningful conversations.', 'illuminated-path-core' ) . '</p></div><!-- /wp:column --><!-- wp:column --><div class="wp-block-column"><h3>' . esc_html__( 'Creative quality', 'illuminated-path-core' ) . '</h3><p>' . esc_html__( 'Illustration, typography and visual storytelling matter because children notice quality. We want books carrying Muslim stories to deserve a place among the books children most want to choose.', 'illuminated-path-core' ) . '</p></div><!-- /wp:column --><!-- wp:column --><div class="wp-block-column"><h3>' . esc_html__( 'Made for multilingual homes', 'illuminated-path-core' ) . '</h3><p>' . esc_html__( 'Many Muslim children grow up between languages and cultures. Our multilingual and bilingual editions help families approach faith and heritage through the languages that already feel natural at home.', 'illuminated-path-core' ) . '</p></div><!-- /wp:column --></div><!-- /wp:columns -->'
            . '<!-- wp:shortcode -->[ip_collection_grid taxonomy="ip_book_age" limit="8"]<!-- /wp:shortcode -->',
    );

    $pages['stories-of-the-prophets-for-kids'] = array(
        'title' => __( 'Stories of the Prophets for Kids', 'illuminated-path-core' ),
        'content' => '<!-- ip-production-editorial-v1 -->'
            . '<!-- wp:paragraph {"className":"section-kicker"} --><p class="section-kicker">' . esc_html__( 'Stories of faith, courage and trust', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
            . '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Stories of the Prophets for children', 'illuminated-path-core' ) . '</h1><!-- /wp:heading -->'
            . '<!-- wp:paragraph {"fontSize":"large"} --><p class="has-large-font-size">' . esc_html__( 'The stories of the Prophets give children some of the most powerful examples in the Islamic tradition: patience when the path is difficult, courage when truth requires it, repentance, mercy, trust in Allah and hope. Our Prophet story collection is designed for family reading, independent discovery and conversations that continue after the book is closed.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
            . '<!-- wp:shortcode -->[ip_book_slider title="Stories of the Prophets" category="stories-of-the-prophets" source="newest" limit="12"]<!-- /wp:shortcode -->'
            . '<!-- wp:heading --><h2>' . esc_html__( 'A story first, a lesson that stays', 'illuminated-path-core' ) . '</h2><!-- /wp:heading -->'
            . '<!-- wp:paragraph --><p>' . esc_html__( 'Children do not only remember facts; they remember scenes, choices, emotions and characters. We use clear language and thoughtful visual storytelling to help the meaning of each story become memorable without turning the book into a lecture.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
            . '<!-- wp:shortcode -->[ip_collection_grid taxonomy="ip_book_age" limit="8"]<!-- /wp:shortcode -->',
    );

    $pages['quran-stories-for-kids'] = array(
        'title' => __( 'Quran Stories for Kids', 'illuminated-path-core' ),
        'content' => '<!-- ip-production-editorial-v1 -->'
            . '<!-- wp:paragraph {"className":"section-kicker"} --><p class="section-kicker">' . esc_html__( 'Quranic stories for family reading', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
            . '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Quran stories children can approach with wonder and respect.', 'illuminated-path-core' ) . '</h1><!-- /wp:heading -->'
            . '<!-- wp:paragraph {"fontSize":"large"} --><p class="has-large-font-size">' . esc_html__( 'Quranic narratives invite reflection on faith, character, consequence, mercy and our relationship with Allah. Our children’s editions aim to make those stories approachable through age-conscious language and engaging visual presentation while preserving the seriousness of their source and meaning.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
            . '<!-- wp:shortcode -->[ip_book_slider title="Quran stories" category="quran-stories" source="newest" limit="12"]<!-- /wp:shortcode -->'
            . '<!-- wp:heading --><h2>' . esc_html__( 'Read, pause and talk together', 'illuminated-path-core' ) . '</h2><!-- /wp:heading -->'
            . '<!-- wp:paragraph --><p>' . esc_html__( 'These books are created to support the moment around the story as much as the story itself: questions from children, connections to everyday values and the warm repetition through which a family story becomes part of memory.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->',
    );

    $pages['ramadan-eid-books'] = array(
        'title' => __( 'Ramadan & Eid Books for Children', 'illuminated-path-core' ),
        'content' => '<!-- ip-production-editorial-v1 -->'
            . '<!-- wp:paragraph {"className":"section-kicker"} --><p class="section-kicker">' . esc_html__( 'Make the season part of their childhood memories', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
            . '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Ramadan and Eid books for Muslim children', 'illuminated-path-core' ) . '</h1><!-- /wp:heading -->'
            . '<!-- wp:paragraph {"fontSize":"large"} --><p class="has-large-font-size">' . esc_html__( 'For children, Ramadan and Eid are experienced through family routines, moon sightings, meals, prayer, generosity, anticipation and celebration. Our seasonal books help parents turn those moments into stories children can understand, enjoy and remember.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
            . '<!-- wp:shortcode -->[ip_book_slider title="Ramadan & Eid" category="ramadan" source="newest" limit="12"]<!-- /wp:shortcode -->'
            . '<!-- wp:heading --><h2>' . esc_html__( 'For reading, gifting and family traditions', 'illuminated-path-core' ) . '</h2><!-- /wp:heading -->'
            . '<!-- wp:paragraph --><p>' . esc_html__( 'Choose a book for a Ramadan reading basket, an Eid gift, bedtime during the holy month or a family conversation about fasting, gratitude, generosity and worship.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
            . '<!-- wp:shortcode -->[ip_book_slider title="Popular gifts" source="best_selling" category="ramadan" limit="8"]<!-- /wp:shortcode -->',
    );

    $pages['bilingual-islamic-books'] = array(
        'title' => __( 'Bilingual Islamic Books', 'illuminated-path-core' ),
        'content' => '<!-- ip-production-editorial-v1 -->'
            . '<!-- wp:paragraph {"className":"section-kicker"} --><p class="section-kicker">' . esc_html__( 'For children growing up between languages', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
            . '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Bilingual Islamic books for multilingual Muslim families', 'illuminated-path-core' ) . '</h1><!-- /wp:heading -->'
            . '<!-- wp:paragraph {"fontSize":"large"} --><p class="has-large-font-size">' . esc_html__( 'A child may speak one language at school, another with grandparents and encounter Arabic through prayer or religious learning. Bilingual books can make those worlds meet on the same page, helping families read together while keeping heritage language and Islamic vocabulary visible and familiar.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
            . '<!-- wp:shortcode -->[ip_book_slider title="Bilingual books" category="bilingual" source="newest" limit="12"]<!-- /wp:shortcode -->'
            . '<!-- wp:shortcode -->[ip_collection_grid taxonomy="ip_book_language" limit="12"]<!-- /wp:shortcode -->'
            . '<!-- wp:heading --><h2>' . esc_html__( 'Language as a bridge, not a barrier', 'illuminated-path-core' ) . '</h2><!-- /wp:heading -->'
            . '<!-- wp:paragraph --><p>' . esc_html__( 'We believe children should be able to enter Islamic stories through a language they understand confidently, while gradually building familiarity with the other languages that form part of their identity.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->',
    );

    $pages['islamic-bedtime-stories'] = array(
        'title' => __( 'Islamic Bedtime Stories', 'illuminated-path-core' ),
        'content' => '<!-- ip-production-editorial-v1 -->'
            . '<!-- wp:paragraph {"className":"section-kicker"} --><p class="section-kicker">' . esc_html__( 'Quiet stories for the end of the day', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
            . '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Islamic bedtime stories for calm, meaningful family reading', 'illuminated-path-core' ) . '</h1><!-- /wp:heading -->'
            . '<!-- wp:paragraph {"fontSize":"large"} --><p class="has-large-font-size">' . esc_html__( 'Bedtime is one of the simplest moments to make reading part of a child’s relationship with faith and family. Discover gentle stories that create space for gratitude, dua, reflection, kindness and the reassuring rhythms of Muslim home life.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
            . '<!-- wp:shortcode -->[ip_book_slider title="Bedtime reading" category="bedtime" source="newest" limit="12"]<!-- /wp:shortcode -->',
    );

    $pages['islamic-values-books-for-kids'] = array(
        'title' => __( 'Islamic Values & Akhlaq Books for Kids', 'illuminated-path-core' ),
        'content' => '<!-- ip-production-editorial-v1 -->'
            . '<!-- wp:paragraph {"className":"section-kicker"} --><p class="section-kicker">' . esc_html__( 'Values children can recognise in everyday life', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
            . '<!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Islamic values and akhlaq books for children', 'illuminated-path-core' ) . '</h1><!-- /wp:heading -->'
            . '<!-- wp:paragraph {"fontSize":"large"} --><p class="has-large-font-size">' . esc_html__( 'Patience, honesty, gratitude, generosity, mercy, responsibility and good manners become easier to discuss when children can see them lived through a story. This collection helps parents connect Islamic character with choices children recognise at home, at school and with friends.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph -->'
            . '<!-- wp:shortcode -->[ip_book_slider title="Akhlaq & values" category="akhlaq-values" source="newest" limit="12"]<!-- /wp:shortcode -->',
    );

    $pages['new-releases'] = array(
        'title' => __( 'New Releases', 'illuminated-path-core' ),
        'content' => '<!-- ip-production-editorial-v1 --><!-- wp:paragraph {"className":"section-kicker"} --><p class="section-kicker">' . esc_html__( 'Fresh from Little Muslim Books', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph --><!-- wp:heading {"level":1} --><h1>' . esc_html__( 'New Islamic children’s books and editions', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Explore the newest titles and editions added to our growing family bookstore.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph --><!-- wp:shortcode -->[ip_book_grid source="newest" limit="24"]<!-- /wp:shortcode -->',
    );

    $pages['best-sellers'] = array(
        'title' => __( 'Best Sellers', 'illuminated-path-core' ),
        'content' => '<!-- ip-production-editorial-v1 --><!-- wp:paragraph {"className":"section-kicker"} --><p class="section-kicker">' . esc_html__( 'Family favourites', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph --><!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Best-selling Islamic children’s books', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'These rankings come from real WooCommerce sales, so the collection changes naturally as families discover and order different books.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph --><!-- wp:shortcode -->[ip_book_grid source="best_selling" limit="24"]<!-- /wp:shortcode -->',
    );

    $pages['special-offers'] = array(
        'title' => __( 'Special Offers', 'illuminated-path-core' ),
        'content' => '<!-- ip-production-editorial-v1 --><!-- wp:paragraph {"className":"section-kicker"} --><p class="section-kicker">' . esc_html__( 'Current bookstore promotions', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph --><!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Book offers and seasonal promotions', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Only genuine WooCommerce sale prices appear here. Public coupon campaigns can also be promoted through the site’s campaign banner and promotion bar.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph --><!-- wp:shortcode -->[ip_book_grid source="sale" limit="24"]<!-- /wp:shortcode -->',
    );

    $pages['books-by-age'] = array(
        'title' => __( 'Books by Age', 'illuminated-path-core' ),
        'content' => '<!-- ip-production-editorial-v1 --><!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Islamic children’s books by age', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Browse age guidance to find books whose language, length and presentation suit the reading stage you are shopping for. Every child develops differently, so age ranges are a practical guide rather than a limit.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph --><!-- wp:shortcode -->[ip_collection_grid taxonomy="ip_book_age" limit="12"]<!-- /wp:shortcode -->',
    );

    $pages['books-by-language'] = array(
        'title' => __( 'Books by Language', 'illuminated-path-core' ),
        'content' => '<!-- ip-production-editorial-v1 --><!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Islamic children’s books by language', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Choose the edition that opens the story most naturally for your family, including multilingual and bilingual options as the catalogue grows.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph --><!-- wp:shortcode -->[ip_collection_grid taxonomy="ip_book_language" limit="12"]<!-- /wp:shortcode -->',
    );

    $pages['gift-guide'] = array(
        'title' => __( 'Islamic Book Gift Guide', 'illuminated-path-core' ),
        'content' => '<!-- ip-production-editorial-v1 --><!-- wp:paragraph {"className":"section-kicker"} --><p class="section-kicker">' . esc_html__( 'A meaningful gift they can keep', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph --><!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Islamic book gifts for children', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph --><p>' . esc_html__( 'Choose a book for Eid, Ramadan, a birthday, a new baby, a family visit or simply as a thoughtful addition to a child’s shelf. Browse popular choices or narrow the catalogue by age, language and theme.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph --><!-- wp:shortcode -->[ip_book_slider title="Popular gifts" source="best_selling" limit="10"]<!-- /wp:shortcode --><!-- wp:shortcode -->[ip_collection_grid taxonomy="ip_book_age" limit="8"]<!-- /wp:shortcode -->',
    );

    $pages['schools-wholesale'] = array(
        'title' => __( 'Schools, Libraries, Bookshops & Wholesale', 'illuminated-path-core' ),
        'content' => '<!-- ip-production-editorial-v1 --><!-- wp:paragraph {"className":"section-kicker"} --><p class="section-kicker">' . esc_html__( 'Build better Muslim children’s shelves', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph --><!-- wp:heading {"level":1} --><h1>' . esc_html__( 'For schools, libraries, bookshops and community organisations', 'illuminated-path-core' ) . '</h1><!-- /wp:heading --><!-- wp:paragraph {"fontSize":"large"} --><p class="has-large-font-size">' . esc_html__( 'If you are selecting books for a classroom, library, Islamic centre, bookshop or community programme, contact us about larger orders, suitable age ranges, language combinations and current availability.', 'illuminated-path-core' ) . '</p><!-- /wp:paragraph --><!-- wp:shortcode -->[ip_contact_hub]<!-- /wp:shortcode -->',
    );

    $pages['faq'] = array(
        'title' => __( 'Frequently Asked Questions', 'illuminated-path-core' ),
        'content' => '<!-- ip-production-editorial-v1 --><!-- wp:heading {"level":1} --><h1>' . esc_html__( 'Frequently Asked Questions', 'illuminated-path-core' ) . '</h1><!-- /wp:heading -->'
            . '<!-- wp:details --><details class="wp-block-details"><summary>' . esc_html__( 'How do I choose the right book for my child?', 'illuminated-path-core' ) . '</summary><p>' . esc_html__( 'Use the age, language, theme, series and format filters in the bookstore. Each product page also includes book-specific details such as page count, format and reading guidance when available.', 'illuminated-path-core' ) . '</p></details><!-- /wp:details -->'
            . '<!-- wp:details --><details class="wp-block-details"><summary>' . esc_html__( 'Which languages are available?', 'illuminated-path-core' ) . '</summary><p>' . esc_html__( 'Availability depends on the individual title. Use the language filter or the Books by Language page to see editions currently published in the store.', 'illuminated-path-core' ) . '</p></details><!-- /wp:details -->'
            . '<!-- wp:details --><details class="wp-block-details"><summary>' . esc_html__( 'How do I follow my order?', 'illuminated-path-core' ) . '</summary><p>' . esc_html__( 'Signed-in customers can open My Account to view order status, public order updates and tracking information when available. Guest customers can use the Track Your Order page with the details from their confirmation email.', 'illuminated-path-core' ) . '</p></details><!-- /wp:details -->'
            . '<!-- wp:details --><details class="wp-block-details"><summary>' . esc_html__( 'Can schools, libraries and bookshops order from you?', 'illuminated-path-core' ) . '</summary><p>' . esc_html__( 'Yes. Use the Schools, Libraries, Bookshops & Wholesale page to contact us about larger orders and current availability.', 'illuminated-path-core' ) . '</p></details><!-- /wp:details -->'
            . '<!-- wp:details --><details class="wp-block-details"><summary>' . esc_html__( 'Can I leave a review?', 'illuminated-path-core' ) . '</summary><p>' . esc_html__( 'When reviews are enabled, customers can review eligible products through WooCommerce. Verified-owner reviews help other families choose with more confidence.', 'illuminated-path-core' ) . '</p></details><!-- /wp:details -->',
    );

    return $pages;
}

function ip_core_is_replaceable_generated_page( WP_Post $page ): bool {
    $content = (string) $page->post_content;
    if ( '' === trim( $content ) ) {
        return true;
    }
    foreach (
        array(
            '<!-- ip-production-editorial-v1 -->',
            'Introduce your publishing mission',
            'Add an original introduction',
            'Explain the editorial approach',
            'Create seasonal editorial content',
            'Present bilingual editions',
            'Create gift recommendations',
            'Explain bulk ordering',
            'Use this page for seasonal campaigns',
            'Edit this answer with your current language catalogue',
        ) as $marker
    ) {
        if ( str_contains( $content, $marker ) ) {
            return true;
        }
    }
    return false;
}

function ip_core_install_production_editorial_content(): array {
    $changed = array();
    foreach ( ip_core_production_editorial_pages() as $slug => $spec ) {
        $page = get_page_by_path( $slug, OBJECT, 'page' );
        if ( ! $page instanceof WP_Post ) {
            $page_id = wp_insert_post(
                array(
                    'post_type'    => 'page',
                    'post_status'  => 'draft',
                    'post_title'   => $spec['title'],
                    'post_name'    => $slug,
                    'post_content' => $spec['content'],
                    'meta_input'   => array( '_wp_page_template' => 'templates/store-landing.php' ),
                ),
                true
            );
            if ( ! is_wp_error( $page_id ) ) {
                $changed[] = absint( $page_id );
            }
            continue;
        }

        if ( ! ip_core_is_replaceable_generated_page( $page ) ) {
            continue;
        }

        $result = wp_update_post(
            array(
                'ID'           => $page->ID,
                'post_title'   => $spec['title'],
                'post_content' => $spec['content'],
                'meta_input'   => array( '_wp_page_template' => 'templates/store-landing.php' ),
            ),
            true
        );
        if ( ! is_wp_error( $result ) ) {
            $changed[] = absint( $page->ID );
        }
    }
    return $changed;
}
