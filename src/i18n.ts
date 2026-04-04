import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// In a real app, these would be loaded from JSON files.
const resources = {
  en: {
    translation: {
      "nav.home": "Home",
      "nav.books": "Islamic Books",
      "nav.quran": "Quran Stories",
      "nav.prophets": "Prophet Stories",
      "nav.ramadan": "Ramadan",
      "nav.bedtime": "Bedtime",
      "nav.academy": "Academy",
      "nav.bilingual": "Bilingual",
      "nav.shop": "Shop All",
      "nav.blog": "Blog",
    }
  },
  ar: {
    translation: {
      "nav.home": "الرئيسية",
      "nav.books": "كتب إسلامية",
      "nav.quran": "قصص القرآن",
      "nav.prophets": "قصص الأنبياء",
      "nav.ramadan": "رمضان",
      "nav.bedtime": "وقت النوم",
      "nav.academy": "الأكاديمية",
      "nav.bilingual": "ثنائي اللغة",
      "nav.shop": "تسوق الكل",
      "nav.blog": "المدونة",
    }
  },
  fr: { translation: { "nav.home": "Accueil", "nav.books": "Livres Islamiques", "nav.shop": "Boutique" } },
  de: { translation: { "nav.home": "Startseite", "nav.books": "Islamische Bücher", "nav.shop": "Geschäft" } },
  nl: { translation: { "nav.home": "Thuis", "nav.books": "Islamitische Boeken", "nav.shop": "Winkel" } },
  es: { translation: { "nav.home": "Inicio", "nav.books": "Libros Islámicos", "nav.shop": "Tienda" } }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
