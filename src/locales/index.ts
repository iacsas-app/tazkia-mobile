import { arabic as ar } from './messages/arabic';
import { english as en } from './messages/english';
import { french as fr } from './messages/french';
import { hinduism as hi } from './messages/hinduism';
import { MessageKeyValue, SupportedLocale } from './types';

export const defaultLanguage: SupportedLocale = 'ar';

export const locales: MessageKeyValue = { ar, fr, en, hi };

interface LanguageKey {
  key: string;
  name: string;
}

export const localesTranslation: Record<SupportedLocale, LanguageKey> = {
  ar: { key: 'arabic', name: 'العربية' },
  fr: { key: 'french', name: 'Français' },
  en: { key: 'english', name: 'English' },
  hi: { key: 'hinduism', name: 'हिन्दू धर्म' },
};
