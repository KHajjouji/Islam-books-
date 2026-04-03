import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Placeholder for translations. 
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
      "nav.blog": "المدونة",
    }
  }
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
