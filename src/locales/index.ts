import { arabic } from './messages/arabic';
import { english } from './messages/english';
import { french } from './messages/french';
import { indonesian } from './messages/indonesian';
import { MessageKeyValue, SupportedLocale } from './types';

export const defaultLanguage: SupportedLocale = 'ar';

export const locales: MessageKeyValue = { ar: arabic, en: english, fr: french, id: indonesian };

interface LanguageKey {
  key: string;
  name: string;
}

export const localesTranslation: Record<SupportedLocale, LanguageKey> = {
  ar: { key: 'arabic', name: 'العربية' },
  fr: { key: 'french', name: 'Français' },
  en: { key: 'english', name: 'English' },
  id: { key: 'indonesian', name: 'Bahasa Indonesia' },
};
