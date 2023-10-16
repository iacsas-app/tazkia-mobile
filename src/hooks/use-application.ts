import { useColorScheme } from 'react-native';
import { SupportedLocale } from '../locales/types';
import { useStoreActions, useStoreState } from '../stores/hooks';

export interface Application {
  locale: SupportedLocale;
  firstVisit: boolean;
  arabic: boolean;
  hasProgress: boolean;
  hasPurificationProgress: boolean;
  hasSunnahsProgress: boolean;
  isDarkMode: boolean;
  setLocale(value: SupportedLocale): void;
  setFirstVisit(isFirst: boolean): void;
}

export function useApplication(): Application {
  const locale = useStoreState((state) => state.intl.locale);
  const firstVisit = useStoreState((state) => state.global.firstVisit);
  const arabic = useStoreState((state) => state.global.arabic);
  const purification = useStoreState((state) => state.purification.item);
  const sunnahs = useStoreState((state) => state.sunnahs.item);
  const setLocale = useStoreActions((actions) => actions.intl.update);
  const setFirstVisit = useStoreActions((actions) => actions.global.setFirstVisit);
  const setArabicOrientation = useStoreActions((actions) => actions.global.setArabicOrientation);
  const isDarkMode = useColorScheme() === 'dark';

  const hasPurificationProgress = purification !== undefined;
  const hasSunnahsProgress = sunnahs !== undefined;

  function handleLocaleChange(value: SupportedLocale) {
    setArabicOrientation(locale === 'ar');
    setLocale(value);
  }

  function handleFirstVisitChange(isFirst: boolean) {
    setFirstVisit(isFirst);
  }

  return {
    isDarkMode,
    firstVisit,
    locale,
    hasPurificationProgress,
    hasSunnahsProgress,
    arabic,
    hasProgress: hasPurificationProgress || hasSunnahsProgress,
    setLocale: handleLocaleChange,
    setFirstVisit: handleFirstVisitChange,
  };
}
