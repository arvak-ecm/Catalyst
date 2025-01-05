import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18n
  .use(Backend)
  //.use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locale/{{lng}}/{{ns}}.json'
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  })
