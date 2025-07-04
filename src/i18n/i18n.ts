import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Import translation files
import enTranslation from './locales/en.json';
import frTranslation from './locales/fr.json';
import esTranslation from './locales/es.json';

// Import question translations
import enQuestions from './locales/questions-en.json';
import frQuestions from './locales/questions-fr.json';
import esQuestions from './locales/questions-es.json';

// Import blog translations
import enBlog from './locales/blog-en.json';
import frBlog from './locales/blog-fr.json';
import esBlog from './locales/blog-es.json';

// Import spinner blog post translations
import enSpinner from './locales/spinner-en.json';
import frSpinner from './locales/spinner-fr.json';
import esSpinner from './locales/spinner-es.json';

const resources = {
  en: {
    translation: enTranslation,
    questions: enQuestions,
    blog: enBlog,
    spinner: enSpinner
  },
  fr: {
    translation: frTranslation,
    questions: frQuestions,
    blog: frBlog,
    spinner: frSpinner
  },
  es: {
    translation: esTranslation,
    questions: esQuestions,
    blog: esBlog,
    spinner: esSpinner
  }
};

i18n
  // Load translations using http (i.e. public/locales)
  // Learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // Detect user language
  // Learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: 'en',
    debug: import.meta.env?.MODE === 'development',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;
