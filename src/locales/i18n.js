import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationBR from './ptBR/translation.json'
import translationEN from './enUS/translation.json'


const resources = {
    pt: {
        translation: translationBR
    },

    en: {
        translation: translationEN
    }
}

i18n.use(initReactI18next).init({
    resources,
    lng: "pt",
    fallbackLng: "pt",

    interpolation: {
        escapeValue: false
    }
})

export default i18n