import { SupportedLocale } from '../locales/types';
import { useStoreActions, useStoreState } from '../stores/hooks';

export interface Application {
  locale: SupportedLocale;
  arabicOrientation: boolean;
  hasProgress: boolean;
  hasPurificationProgress: boolean;
  hasSunnahsProgress: boolean;
  setLocale(value: SupportedLocale): void;
}

export function useApplication(): Application {
  const locale = useStoreState((state) => state.intl.locale);
  const arabicOrientation = useStoreState((state) => state.global.arabicOrientation);
  const purification = useStoreState((state) => state.purification.item);
  const sunnahs = useStoreState((state) => state.sunnahs.item);
  const setLocale = useStoreActions((actions) => actions.intl.update);
  const setArabicOrientation = useStoreActions((actions) => actions.global.setArabicOrientation);

  const hasPurificationProgress = purification !== undefined;
  const hasSunnahsProgress = sunnahs !== undefined;

  function handleLocaleChange(value: SupportedLocale) {
    setLocale(value);
    setArabicOrientation(value === 'ar');
  }

  return {
    locale,
    hasPurificationProgress,
    hasSunnahsProgress,
    arabicOrientation,
    hasProgress: hasPurificationProgress || hasSunnahsProgress,
    setLocale: handleLocaleChange,
  };
}
