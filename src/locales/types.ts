export const LOCALE_KEY = 'locale';

export type SupportedLocale = 'ar' | 'fr' | 'en' | 'id';

export type MessageKeyValue = {
  [key in SupportedLocale]: Record<string, string>;
};
