<?php
/** Multilingual helpers with WPML and Polylang compatibility. */

if ( ! defined( 'ABSPATH' ) ) { exit; }

function ip_language_code(): string {
    if ( defined( 'ICL_LANGUAGE_CODE' ) && ICL_LANGUAGE_CODE ) { return strtolower( (string) ICL_LANGUAGE_CODE ); }
    if ( function_exists( 'pll_current_language' ) ) {
        $polylang = pll_current_language( 'slug' );
        if ( $polylang ) { return strtolower( (string) $polylang ); }
    }
    $locale = strtolower( determine_locale() );
    return substr( $locale, 0, 2 );
}

function ip_text( string $key ): string {
    $strings = array(
        'en' => array(
            'shop'=>'Shop','collections'=>'Collections','academy'=>'Books','blog'=>'Journal','account'=>'My account','search'=>'Search books',
            'hero_eyebrow'=>'Stories that nurture faith and curiosity','hero_title'=>'Beautiful Islamic books for growing Muslim hearts.','hero_body'=>'Thoughtful children’s books, multilingual and bilingual editions, and meaningful stories for Muslim families around the world.','hero_primary'=>'Explore the books','hero_secondary'=>'Browse collections','collections_title'=>'Explore by collection','featured_title'=>'Featured books','prophets_title'=>'Stories of the Prophets','ramadan_title'=>'Ramadan & Eid','bilingual_title'=>'Bilingual favourites','promise_title'=>'A bookstore built for meaningful family reading','promise_body'=>'Discover carefully presented Islamic children’s books by age, language, series and theme, with secure checkout, real offers and simple order follow-up.','newsletter_title'=>'New stories, book releases and family reading ideas','newsletter_body'=>'Join our list for new releases, seasonal collections, special offers and useful reading ideas.','footer_tagline'=>'Islamic children’s books for Muslim families growing up across languages and cultures.','view_all'=>'View all','empty_products'=>'Products will appear here as soon as they are published in WooCommerce.'
        ),
        'fr' => array(
            'shop'=>'Boutique','collections'=>'Collections','academy'=>'Livres','blog'=>'Journal','account'=>'Mon compte','search'=>'Rechercher des livres',
            'hero_eyebrow'=>'Des histoires qui nourrissent la foi et la curiosité','hero_title'=>'De beaux livres islamiques pour faire grandir le cœur des enfants musulmans.','hero_body'=>'Des livres jeunesse réfléchis, des éditions multilingues et bilingues, et des histoires porteuses de sens pour les familles musulmanes du monde entier.','hero_primary'=>'Découvrir les livres','hero_secondary'=>'Voir les collections','collections_title'=>'Explorer par collection','featured_title'=>'Livres à la une','prophets_title'=>'Histoires des Prophètes','ramadan_title'=>'Ramadan & Aïd','bilingual_title'=>'Sélection bilingue','promise_title'=>'Une librairie pensée pour la lecture en famille','promise_body'=>'Découvrez des livres islamiques pour enfants classés par âge, langue, série et thème, avec paiement sécurisé, vraies offres et suivi simple des commandes.','newsletter_title'=>'Nouvelles histoires, sorties et idées de lecture en famille','newsletter_body'=>'Inscrivez-vous pour recevoir nos nouveautés, collections saisonnières, offres spéciales et idées de lecture.','footer_tagline'=>'Livres islamiques pour enfants destinés aux familles musulmanes qui grandissent entre plusieurs langues et cultures.','view_all'=>'Tout voir','empty_products'=>'Les produits apparaîtront ici dès leur publication dans WooCommerce.'
        ),
        'ar' => array(
            'shop'=>'المتجر','collections'=>'المجموعات','academy'=>'الكتب','blog'=>'المجلة','account'=>'حسابي','search'=>'البحث عن الكتب',
            'hero_eyebrow'=>'قصص تغذي الإيمان والفضول','hero_title'=>'كتب إسلامية جميلة تنمّي قلوب الأطفال المسلمين.','hero_body'=>'كتب أطفال هادفة، وإصدارات متعددة وثنائية اللغة، وقصص ذات معنى للعائلات المسلمة في مختلف أنحاء العالم.','hero_primary'=>'استكشف الكتب','hero_secondary'=>'تصفح المجموعات','collections_title'=>'استكشف حسب المجموعة','featured_title'=>'كتب مختارة','prophets_title'=>'قصص الأنبياء','ramadan_title'=>'رمضان والعيد','bilingual_title'=>'كتب ثنائية اللغة','promise_title'=>'متجر كتب صُمم للقراءة العائلية الهادفة','promise_body'=>'اكتشف كتب الأطفال الإسلامية حسب العمر واللغة والسلسلة والموضوع، مع دفع آمن وعروض حقيقية ومتابعة سهلة للطلبات.','newsletter_title'=>'قصص وإصدارات جديدة وأفكار للقراءة العائلية','newsletter_body'=>'انضم إلى قائمتنا لتصلك الإصدارات الجديدة والمجموعات الموسمية والعروض الخاصة وأفكار القراءة.','footer_tagline'=>'كتب إسلامية للأطفال للعائلات المسلمة التي تعيش بين لغات وثقافات متعددة.','view_all'=>'عرض الكل','empty_products'=>'ستظهر المنتجات هنا فور نشرها في WooCommerce.'
        ),
    );
    $strings = apply_filters( 'illuminated_path_theme_strings', $strings );
    $lang = ip_language_code();
    if ( isset( $strings[$lang][$key] ) ) { return (string) $strings[$lang][$key]; }
    return isset( $strings['en'][$key] ) ? (string) $strings['en'][$key] : $key;
}

function ip_language_switcher(): void {
    $links = array();
    if ( function_exists( 'icl_get_languages' ) ) {
        $languages = icl_get_languages( 'skip_missing=0&orderby=code' );
        foreach ( (array) $languages as $language ) { $links[] = array( 'code'=>strtoupper((string)$language['language_code']),'url'=>(string)$language['url'],'current'=>!empty($language['active']) ); }
    } elseif ( function_exists( 'pll_the_languages' ) ) {
        $languages = pll_the_languages( array( 'raw'=>1, 'hide_if_empty'=>0 ) );
        foreach ( (array) $languages as $language ) { $links[] = array( 'code'=>strtoupper((string)$language['slug']),'url'=>(string)$language['url'],'current'=>!empty($language['current_lang']) ); }
    }
    if ( count( $links ) < 2 ) { return; }
    echo '<div class="language-switcher" data-language-switcher><button class="language-current" type="button" aria-expanded="false" aria-label="' . esc_attr__( 'Choose language', 'illuminated-path' ) . '">' . esc_html( strtoupper( ip_language_code() ) ) . '<span aria-hidden="true">⌄</span></button><div class="language-menu">';
    foreach ( $links as $link ) { printf( '<a href="%1$s" lang="%2$s"%3$s>%4$s</a>', esc_url($link['url']), esc_attr(strtolower($link['code'])), $link['current'] ? ' aria-current="page"' : '', esc_html($link['code']) ); }
    echo '</div></div>';
}
