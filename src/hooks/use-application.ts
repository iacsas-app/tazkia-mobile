import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { defaultLanguage, localesTranslation } from '../locales';
import { SupportedLocale } from '../locales/types';
import { deviceLanguage } from '../services/Helpers';
import { useStoreActions, useStoreState } from '../stores/hooks';

export interface Application {
  locale: SupportedLocale | undefined;
  defaultLang: SupportedLocale;
  arabic: boolean;
  hasProgress: boolean;
  hasPurificationProgress: boolean;
  hasSunnahsProgress: boolean;
  isDarkMode: boolean;
  isSystemLanguageSupported: boolean;
  systemLanguage: string;
  setLocale(value: SupportedLocale | undefined): void;
  setFirstVisitDate(date: number | null): void;
}

export function useApplication(): Application {
  const locale = useStoreState((state) => state.intl.locale);
  const purification = useStoreState((state) => state.purification.item);
  const sunnahs = useStoreState((state) => state.sunnahs.item);
  const setLocale = useStoreActions((actions) => actions.intl.update);
  const setFirstVisitDate = useStoreActions((actions) => actions.global.setFirstVisitDate);
  const isDarkMode = useColorScheme() === 'dark';
  const languageKeys = useMemo(() => Object.keys(localesTranslation) as SupportedLocale[], []);
  const systemLanguage = useMemo(() => deviceLanguage(), []);

  const hasPurificationProgress = purification !== undefined;
  const hasSunnahsProgress = sunnahs !== undefined;
  const isLangSupported = isDeviceLanguageHandled();

  const defaultLang: SupportedLocale = isLangSupported ? (systemLanguage as SupportedLocale) : defaultLanguage;

  function isDeviceLanguageHandled() {
    return languageKeys.find((item) => item === systemLanguage) !== undefined;
  }

  function handleLocaleChange(value: SupportedLocale) {
    setLocale(value);
  }

  return {
    isDarkMode,
    locale,
    hasPurificationProgress,
    hasSunnahsProgress,
    arabic: locale === 'ar',
    hasProgress: hasPurificationProgress || hasSunnahsProgress,
    systemLanguage,
    isSystemLanguageSupported: isLangSupported,
    defaultLang,
    setFirstVisitDate,
    setLocale: handleLocaleChange,
  };
}
