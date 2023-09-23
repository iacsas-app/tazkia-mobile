import { SupportedLocale } from '../locales/types';
import { useStoreActions, useStoreState } from '../stores/hooks';

export interface Application {
  locale: SupportedLocale;
  arabicOrientation: boolean;
  userHasProgress: boolean;
  setLocale(value: SupportedLocale): void;
}

export function useApplication(): Application {
  const locale = useStoreState((state) => state.intl.locale);
  const arabicOrientation = useStoreState((state) => state.global.arabicOrientation);
  const userHasProgress = useStoreState((state) => state.global.userHasProgress);
  const setLocale = useStoreActions((actions) => actions.intl.update);
  const setArabicOrientation = useStoreActions((actions) => actions.global.setArabicOrientation);

  function handleLocaleChange(value: SupportedLocale) {
    setLocale(value);
    setArabicOrientation(value === 'ar');
  }

  return {
    locale,
    arabicOrientation,
    userHasProgress,
    setLocale: handleLocaleChange,
  };
}
