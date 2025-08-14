import en from './locals/en.json'
import ta from './locals/ta.json'

const translations = { en, ta };

const langMap = {
  english: "en",
  tamil: "ta",
};

export const setLanguage = (lang) => {
  const mappedLang = langMap[lang?.toLowerCase()] || lang || "en";
  localStorage.setItem("lang", mappedLang);
};

export const getLanguage = () => localStorage.getItem("lang") || "en";

export const t = (key, replacements = {}) => {
  const currentLang = getLanguage();
  const keys = key.split(".");

  let translation = keys.reduce((obj, k) => obj?.[k], translations[currentLang]);

  if (!translation && currentLang !== "en") {
    translation = keys.reduce((obj, k) => obj?.[k], translations["en"]);
  }

  if (!translation) return key;

  Object.entries(replacements).forEach(([k, v]) => {
    translation = translation.replace(new RegExp(`{{\\s*${k}\\s*}}`, "g"), v);
  });

  return translation;
};
