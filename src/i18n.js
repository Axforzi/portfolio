import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import es from './i18n/es.json';
import en from './i18n/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
    },
    fallbackLng: 'es',
    supportedLngs: ['es', 'en'],
    load: 'languageOnly',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'lang',
    },
  });

// The document language is owned here so it stays correct on initial
// detector-driven resolution and on every later language change.
const setDocumentLanguage = (lng) => {
  const baseCode = String(lng || '').split('-')[0].toLowerCase();
  document.documentElement.lang = baseCode === 'en' ? 'en' : 'es';
};

setDocumentLanguage(i18n.language);
i18n.on('languageChanged', setDocumentLanguage);

export default i18n;
