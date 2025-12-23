import { en, fil } from "@/locale";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";



i18next.use(initReactI18next).init({
  lng: localStorage.getItem('lang') ?? 'en',
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  resources: {
    en: {
        translation: en
    },
    fil: {
        translation: fil
    }
  },
});


