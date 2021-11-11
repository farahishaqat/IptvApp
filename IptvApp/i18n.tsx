import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";
import SplashScreen from "react-native-splash-screen";
import ar from './assets/i18n/ar.json';
import en from './assets/i18n/en.json';
// import RNRestart from 'react-native-restart';

export const changeLanguage = async (lang: string) => {
    // update language
    // save updated language
    await AsyncStorage.setItem('@language', lang);
    i18n.changeLanguage(lang);
    // check on view RTL/LTR
    I18nManager.forceRTL(lang === 'ar');

    // show splash screen
    SplashScreen.show();
    // Restart App
    // RNRestart.Restart();

}

const setDefaultLang = async () => {
    // handle language on app start up.
    let selectedLanguage = await AsyncStorage.getItem('@language');
    if (!selectedLanguage) {
        selectedLanguage = 'en';
        await AsyncStorage.setItem('@language', 'en');
    }

    // initialize i18n
    i18n.use(initReactI18next).init({
        resources: {
            en: { translation: en },
            ar: { translation: ar }
        },
        lng: selectedLanguage,
        compatibilityJSON: 'v3'
    });
}

setDefaultLang();

export default i18n;