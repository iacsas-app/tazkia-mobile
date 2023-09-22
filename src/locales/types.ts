export type SupportedLocale = 'ar' | 'fr' | 'en' | 'hi';

export type MessageKeyValue = {
  [key in SupportedLocale]: Record<string, string>;
};
