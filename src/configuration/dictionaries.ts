export const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
};

type key = keyof typeof dictionaries

export const getDictionary = async (locale: key) => dictionaries[locale]();