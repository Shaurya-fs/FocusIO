// [code, name in its own language, name in English, text direction]
const LANGUAGE_GROUPS = [
  {
    title: "English and Hindi",
    items: [
      ["en-GB", "English (UK)", "British English"],
      ["en-US", "English (US)", "American English"],
      ["hi", "हिन्दी", "Hindi"],
    ],
  },
  {
    title: "European",
    items: [
      ["sq", "Shqip", "Albanian"],
      ["eu", "Euskara", "Basque"],
      ["be", "Беларуская", "Belarusian"],
      ["bs", "Bosanski", "Bosnian"],
      ["bg", "Български", "Bulgarian"],
      ["ca", "Català", "Catalan"],
      ["hr", "Hrvatski", "Croatian"],
      ["cs", "Čeština", "Czech"],
      ["da", "Dansk", "Danish"],
      ["nl", "Nederlands", "Dutch"],
      ["et", "Eesti", "Estonian"],
      ["fi", "Suomi", "Finnish"],
      ["fr", "Français", "French"],
      ["gl", "Galego", "Galician"],
      ["de", "Deutsch", "German"],
      ["el", "Ελληνικά", "Greek"],
      ["hu", "Magyar", "Hungarian"],
      ["is", "Íslenska", "Icelandic"],
      ["ga", "Gaeilge", "Irish"],
      ["it", "Italiano", "Italian"],
      ["lv", "Latviešu", "Latvian"],
      ["lt", "Lietuvių", "Lithuanian"],
      ["lb", "Lëtzebuergesch", "Luxembourgish"],
      ["mk", "Македонски", "Macedonian"],
      ["mt", "Malti", "Maltese"],
      ["cnr", "Crnogorski", "Montenegrin"],
      ["no", "Norsk", "Norwegian"],
      ["pl", "Polski", "Polish"],
      ["pt-PT", "Português", "Portuguese"],
      ["ro", "Română", "Romanian"],
      ["ru", "Русский", "Russian"],
      ["sr", "Српски", "Serbian"],
      ["sk", "Slovenčina", "Slovak"],
      ["sl", "Slovenščina", "Slovenian"],
      ["es-ES", "Español", "Spanish"],
      ["sv", "Svenska", "Swedish"],
      ["uk", "Українська", "Ukrainian"],
      ["cy", "Cymraeg", "Welsh"],
    ],
  },
  {
    title: "Middle East",
    items: [
      ["ar", "العربية", "Arabic", "rtl"],
      ["he", "עברית", "Hebrew", "rtl"],
      ["fa", "فارسی", "Persian (Farsi)", "rtl"],
      ["ku", "Kurdî", "Kurdish"],
      ["tr", "Türkçe", "Turkish"],
    ],
  },
];

export function findLanguage(code) {
  for (const group of LANGUAGE_GROUPS) {
    const found = group.items.find((item) => item[0] === code);
    if (found) {
      return { code: found[0], native: found[1], english: found[2], dir: found[3] || "ltr" };
    }
  }
  return { code: "en-GB", native: "English (UK)", english: "British English", dir: "ltr" };
}

export default LANGUAGE_GROUPS;
