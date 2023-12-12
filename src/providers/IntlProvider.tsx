import { useStoreRehydrated } from 'easy-peasy';
import { PropsWithChildren, useEffect, useMemo } from 'react';
import { RawIntlProvider, createIntl, createIntlCache } from 'react-intl';
import { useApplication } from '../hooks/use-application';
import { localesTranslation } from '../locales';
import { LOCALE_KEY, SupportedLocale } from '../locales/types';
import { deviceLanguage } from '../services/Helpers';
import { useStoreActions, useStoreState } from '../stores/hooks';
import { storageEngine } from '../stores/storage-engine';

function WaitForStateRehydration({ children }: PropsWithChildren<unknown>) {
  const isRehydrated = useStoreRehydrated();
  return isRehydrated ? children : null;
}

export default function IntlProvider({ children }: PropsWithChildren<unknown>) {
  const { locale, defaultLang } = useApplication();
  const messages = useStoreState((state) => state.intl.messages);
  const update = useStoreActions((actions) => actions.intl.update);
  const languageKeys = useMemo(() => Object.keys(localesTranslation) as SupportedLocale[], []);

  useEffect(() => {
    if (!locale) {
      try {
        storageEngine.getItem(LOCALE_KEY).then((lang) => {
          let target = lang;
          if (!target) {
            const systemLanguage = deviceLanguage();
            const isSupported = languageKeys.find((item) => item === systemLanguage) !== undefined;
            target = isSupported ? systemLanguage : defaultLang;
          }
          update(target);
        });
      } catch (e) {
        update(defaultLang);
      }
    }
  }, [locale]);

  if (!locale) {
    return null;
  }

  const cache = createIntlCache();
  const intl = createIntl({ locale, messages: messages as any }, cache);

  return (
    <WaitForStateRehydration>
      <RawIntlProvider value={intl}>{children}</RawIntlProvider>
    </WaitForStateRehydration>
  );
}
