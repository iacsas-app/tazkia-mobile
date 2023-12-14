import { useColorScheme } from 'react-native';
import { SupportedLocale } from '../locales/types';
import { useGlobal } from '../providers/AppProvider';
import { useStoreActions, useStoreState } from '../stores/hooks';

export interface Application {
  hasProgress: boolean;
  hasPurificationProgress: boolean;
  hasSunnahsProgress: boolean;
  isDarkMode: boolean;
  isPurification: boolean;
  locale: SupportedLocale | undefined;
  arabic: boolean;
  defaultLang: SupportedLocale;
  setFirstVisitDate(date: number | null): void;
  setIsPurification(clicked: boolean): void;
  setLocale(locale: SupportedLocale): void;
}

export function useApplication(): Application {
  const { locale, arabic, defaultLang, setLocale } = useGlobal();
  const purification = useStoreState((state) => state.purification.item);
  const sunnahs = useStoreState((state) => state.sunnahs.item);
  const isPurification = useStoreState((state) => state.global.isPurification);
  const setFirstVisitDate = useStoreActions((actions) => actions.global.setFirstVisitDate);
  const setIsPurification = useStoreActions((actions) => actions.global.setIsPurification);
  const isDarkMode = useColorScheme() === 'dark';
  const hasPurificationProgress = purification !== undefined;
  const hasSunnahsProgress = sunnahs !== undefined;

  return {
    isDarkMode,
    hasPurificationProgress,
    hasSunnahsProgress,
    hasProgress: hasPurificationProgress || hasSunnahsProgress,
    setFirstVisitDate,
    isPurification,
    setIsPurification,
    arabic,
    locale,
    defaultLang,
    setLocale,
  };
}
