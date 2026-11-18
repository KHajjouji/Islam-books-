<?php
/**
 * Lightweight front-end string layer for custom bookstore UI.
 *
 * WordPress/WooCommerce/plugin translations remain in charge of their own UI.
 * These strings cover the custom Little Muslim Books components so the final
 * content pack never mixes English controls into FR/ES/AR pages.
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

function ip_core_front_language(): string {
    if ( defined( 'ICL_LANGUAGE_CODE' ) && ICL_LANGUAGE_CODE ) {
        return sanitize_key( (string) ICL_LANGUAGE_CODE );
    }
    if ( function_exists( 'pll_current_language' ) ) {
        $lang = pll_current_language( 'slug' );
        if ( $lang ) { return sanitize_key( (string) $lang ); }
    }
    return substr( strtolower( determine_locale() ), 0, 2 );
}

function ip_core_front_strings(): array {
    return array(
        'en' => array(
            'sale'=>'Sale','view_book'=>'View book','featured_books'=>'Featured books','view_all'=>'View all','previous_books'=>'Previous books','next_books'=>'Next books',
            'search_placeholder'=>'Search books, authors or series…','search_books'=>'Search books','search'=>'Search','explore'=>'Explore','featured_book'=>'Featured book','discover_book'=>'Discover the book',
            'reviews_title'=>'What families are saying','latest_journal'=>'Latest from the journal','read_article'=>'Read article','orders_care'=>'Orders & customer care','orders_care_body'=>'Questions about an order, delivery, returns or a book you purchased.',
            'schools'=>'Schools, libraries & bookshops','schools_body'=>'Bulk orders, classroom/library enquiries and wholesale conversations.','creative'=>'Creative collaborations','creative_body'=>'Illustrators, writers, educators, designers and creative partners who want to work with us.',
            'press'=>'Press & partnerships','press_body'=>'Media, cultural institutions, events, partnerships and publishing conversations.','response_time'=>'Response time','based_in'=>'Based in',
            'account_kicker'=>'Your bookstore account','welcome'=>'Welcome, %s','account_intro'=>'Track your orders, manage delivery addresses and keep your account information up to date.','orders'=>'Orders','total_purchased'=>'Total purchased',
            'latest_order'=>'Latest order','view_order'=>'View order','order_updates'=>'Order updates','order_updates_desc'=>'Read customer-visible notes and delivery messages from your orders.','addresses'=>'Addresses','addresses_desc'=>'Manage billing and delivery addresses.',
            'orders_desc'=>'View order history and order details.','account_details'=>'Account details','account_details_desc'=>'Update your name, email and password.','books'=>'Books','delivery'=>'Delivery','more_items'=>'+%d more item(s)','track_package'=>'Track package',
            'purchase_messages'=>'Messages about your purchases','updates_intro'=>'Customer-visible notes sent by the bookstore are collected here and remain attached to the order they belong to.','no_updates'=>'There are no order messages yet. Delivery and order-status information is still available in your Orders section.',
            'order_number'=>'Order #%s','view_this_order'=>'View this order','need_help'=>'Need help? Contact us','newsletter_admin'=>'Add a MailPoet form or newsletter widget to the Newsletter / Marketing widget area.'
        ),
        'fr' => array(
            'sale'=>'Promo','view_book'=>'Voir le livre','featured_books'=>'Livres à la une','view_all'=>'Tout voir','previous_books'=>'Livres précédents','next_books'=>'Livres suivants',
            'search_placeholder'=>'Rechercher un livre, un auteur ou une série…','search_books'=>'Rechercher des livres','search'=>'Rechercher','explore'=>'Explorer','featured_book'=>'Livre à la une','discover_book'=>'Découvrir le livre',
            'reviews_title'=>'Ce que disent les familles','latest_journal'=>'Derniers articles du journal','read_article'=>'Lire l’article','orders_care'=>'Commandes & service client','orders_care_body'=>'Questions sur une commande, la livraison, un retour ou un livre acheté.',
            'schools'=>'Écoles, bibliothèques & librairies','schools_body'=>'Commandes en volume, demandes scolaires/bibliothèques et échanges professionnels.','creative'=>'Collaborations créatives','creative_body'=>'Illustrateurs, auteurs, éducateurs, designers et partenaires créatifs souhaitant travailler avec nous.',
            'press'=>'Presse & partenariats','press_body'=>'Médias, institutions culturelles, événements, partenariats et échanges éditoriaux.','response_time'=>'Délai de réponse','based_in'=>'Basé à',
            'account_kicker'=>'Votre compte librairie','welcome'=>'Bienvenue, %s','account_intro'=>'Suivez vos commandes, gérez vos adresses de livraison et tenez vos informations à jour.','orders'=>'Commandes','total_purchased'=>'Total acheté',
            'latest_order'=>'Dernière commande','view_order'=>'Voir la commande','order_updates'=>'Mises à jour des commandes','order_updates_desc'=>'Lisez les notes visibles par le client et les messages de livraison liés à vos commandes.','addresses'=>'Adresses','addresses_desc'=>'Gérez vos adresses de facturation et de livraison.',
            'orders_desc'=>'Consultez l’historique et le détail de vos commandes.','account_details'=>'Détails du compte','account_details_desc'=>'Mettez à jour votre nom, votre e-mail et votre mot de passe.','books'=>'Livres','delivery'=>'Livraison','more_items'=>'+%d article(s) supplémentaire(s)','track_package'=>'Suivre le colis',
            'purchase_messages'=>'Messages concernant vos achats','updates_intro'=>'Les notes visibles par le client envoyées par la librairie sont regroupées ici et restent liées à la commande concernée.','no_updates'=>'Il n’y a pas encore de message de commande. Les informations de livraison et de statut restent disponibles dans Commandes.',
            'order_number'=>'Commande n°%s','view_this_order'=>'Voir cette commande','need_help'=>'Besoin d’aide ? Contactez-nous','newsletter_admin'=>'Ajoutez un formulaire MailPoet ou un widget newsletter dans la zone Newsletter / Marketing.'
        ),
        'es' => array(
            'sale'=>'Oferta','view_book'=>'Ver libro','featured_books'=>'Libros destacados','view_all'=>'Ver todo','previous_books'=>'Libros anteriores','next_books'=>'Libros siguientes',
            'search_placeholder'=>'Buscar libros, autores o series…','search_books'=>'Buscar libros','search'=>'Buscar','explore'=>'Explorar','featured_book'=>'Libro destacado','discover_book'=>'Descubrir el libro',
            'reviews_title'=>'Lo que dicen las familias','latest_journal'=>'Últimos artículos del blog','read_article'=>'Leer artículo','orders_care'=>'Pedidos y atención al cliente','orders_care_body'=>'Consultas sobre un pedido, entrega, devolución o un libro comprado.',
            'schools'=>'Colegios, bibliotecas y librerías','schools_body'=>'Pedidos grandes, consultas para aulas/bibliotecas y conversaciones de venta al por mayor.','creative'=>'Colaboraciones creativas','creative_body'=>'Ilustradores, escritores, educadores, diseñadores y colaboradores creativos que quieran trabajar con nosotros.',
            'press'=>'Prensa y colaboraciones','press_body'=>'Medios, instituciones culturales, eventos, colaboraciones y conversaciones editoriales.','response_time'=>'Tiempo de respuesta','based_in'=>'Con sede en',
            'account_kicker'=>'Tu cuenta de la librería','welcome'=>'Bienvenido/a, %s','account_intro'=>'Sigue tus pedidos, gestiona las direcciones de entrega y mantén actualizada tu información.','orders'=>'Pedidos','total_purchased'=>'Total comprado',
            'latest_order'=>'Último pedido','view_order'=>'Ver pedido','order_updates'=>'Actualizaciones de pedidos','order_updates_desc'=>'Lee las notas visibles para el cliente y los mensajes de entrega de tus pedidos.','addresses'=>'Direcciones','addresses_desc'=>'Gestiona tus direcciones de facturación y entrega.',
            'orders_desc'=>'Consulta el historial y los detalles de tus pedidos.','account_details'=>'Datos de la cuenta','account_details_desc'=>'Actualiza tu nombre, correo y contraseña.','books'=>'Libros','delivery'=>'Entrega','more_items'=>'+%d artículo(s) más','track_package'=>'Seguir paquete',
            'purchase_messages'=>'Mensajes sobre tus compras','updates_intro'=>'Las notas visibles para el cliente enviadas por la tienda se reúnen aquí y siguen asociadas al pedido correspondiente.','no_updates'=>'Todavía no hay mensajes de pedido. La información de entrega y estado sigue disponible en Pedidos.',
            'order_number'=>'Pedido #%s','view_this_order'=>'Ver este pedido','need_help'=>'¿Necesitas ayuda? Contacta con nosotros','newsletter_admin'=>'Añade un formulario MailPoet o un widget de newsletter al área Newsletter / Marketing.'
        ),
        'ar' => array(
            'sale'=>'تخفيض','view_book'=>'عرض الكتاب','featured_books'=>'كتب مختارة','view_all'=>'عرض الكل','previous_books'=>'الكتب السابقة','next_books'=>'الكتب التالية',
            'search_placeholder'=>'ابحث عن كتاب أو مؤلف أو سلسلة…','search_books'=>'البحث عن الكتب','search'=>'بحث','explore'=>'استكشف','featured_book'=>'كتاب مميز','discover_book'=>'اكتشف الكتاب',
            'reviews_title'=>'ماذا تقول العائلات','latest_journal'=>'أحدث المقالات','read_article'=>'اقرأ المقال','orders_care'=>'الطلبات وخدمة العملاء','orders_care_body'=>'أسئلة حول طلب أو توصيل أو إرجاع أو كتاب تم شراؤه.',
            'schools'=>'المدارس والمكتبات ومحلات الكتب','schools_body'=>'الطلبات الكبيرة واستفسارات الفصول والمكتبات ومحادثات الجملة.','creative'=>'التعاون الإبداعي','creative_body'=>'الرسامون والكتاب والمربون والمصممون والشركاء الإبداعيون الراغبون في العمل معنا.',
            'press'=>'الإعلام والشراكات','press_body'=>'وسائل الإعلام والمؤسسات الثقافية والفعاليات والشراكات والمحادثات المتعلقة بالنشر.','response_time'=>'مدة الرد','based_in'=>'المقر',
            'account_kicker'=>'حسابك في المتجر','welcome'=>'مرحباً، %s','account_intro'=>'تابع طلباتك وأدر عناوين التوصيل وحافظ على تحديث معلومات حسابك.','orders'=>'الطلبات','total_purchased'=>'إجمالي المشتريات',
            'latest_order'=>'آخر طلب','view_order'=>'عرض الطلب','order_updates'=>'تحديثات الطلبات','order_updates_desc'=>'اقرأ الملاحظات المرئية للعميل ورسائل التوصيل المرتبطة بطلباتك.','addresses'=>'العناوين','addresses_desc'=>'أدر عناوين الفوترة والتوصيل.',
            'orders_desc'=>'اطلع على سجل الطلبات وتفاصيلها.','account_details'=>'تفاصيل الحساب','account_details_desc'=>'حدّث الاسم والبريد الإلكتروني وكلمة المرور.','books'=>'الكتب','delivery'=>'التوصيل','more_items'=>'+%d عنصر إضافي','track_package'=>'تتبع الشحنة',
            'purchase_messages'=>'رسائل حول مشترياتك','updates_intro'=>'تُجمع هنا الملاحظات التي يرسلها المتجر ويستطيع العميل رؤيتها، وتبقى مرتبطة بالطلب الخاص بها.','no_updates'=>'لا توجد رسائل للطلبات حتى الآن. تبقى معلومات التوصيل وحالة الطلب متاحة في قسم الطلبات.',
            'order_number'=>'الطلب رقم %s','view_this_order'=>'عرض هذا الطلب','need_help'=>'تحتاج مساعدة؟ تواصل معنا','newsletter_admin'=>'أضف نموذج MailPoet أو ودجت النشرة البريدية إلى منطقة Newsletter / Marketing.'
        ),
    );
}

function ip_core_t( string $key, ...$args ): string {
    $strings = ip_core_front_strings();
    $lang = ip_core_front_language();
    $value = $strings[ $lang ][ $key ] ?? $strings['en'][ $key ] ?? $key;
    return $args ? vsprintf( $value, $args ) : $value;
}
