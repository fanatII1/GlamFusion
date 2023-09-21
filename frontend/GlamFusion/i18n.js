import { createI18n } from 'vue-i18n';

// Import the JSON files for translations
import en from './locales/en.json';
import fr from './locales/fr.json';

const messages = {
  'en-US': en, // English
  'fr-FR': fr, // French
//   'es-ES': es, // Spanish
};

const i18n = createI18n({
  legacy: false,
  locale: 'fr-FR', // Set the initial locale to English
  messages,
});

export default i18n;
