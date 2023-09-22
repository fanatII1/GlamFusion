import { createI18n } from 'vue-i18n';

// Import the JSON files for translations
import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import afr from './locales/afr.json';
import zu from './locales/zu.json';
import so from './locales/so.json';

const messages = {
  'en-US': en, // English
  'fr-FR': fr, // French
  'es-ES': es, // Spanish
  'afr-AFR': afr, // Afrikaans
  'zu-ZU': zu, // Zulu
  'so-SO': so // Sesotho
};

const i18n = createI18n({
  legacy: false,
  locale: 'fr-FR', // Set the initial locale to English
  messages,
});

export default i18n;
