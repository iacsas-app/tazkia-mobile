export const LOCALE_KEY = 'locale';

export type SupportedLocale = 'ar' | 'fr' | 'en' | 'in';

export type MessageKeyValue = {
  [key in SupportedLocale]: Record<string, string>;
};
