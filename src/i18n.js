import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from '@/locales/en/translation.json';
import esTranslation from '@/locales/es/translation.json';
import deTranslation from '@/locales/de/translation.json';
import frTranslation from '@/locales/fr/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'en',
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: enTranslation,
      },
      es: {
        translation: esTranslation,
      },
      de: {
        translation: deTranslation,
      },
      fr: {
        translation: frTranslation,
      },
    },
    supportedLngs: ['en', 'es', 'de', 'fr'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;