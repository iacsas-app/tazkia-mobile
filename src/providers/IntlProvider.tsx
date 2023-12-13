import { useStoreRehydrated } from 'easy-peasy';
import React, { PropsWithChildren, useEffect, useMemo } from 'react';
import { RawIntlProvider, createIntl, createIntlCache } from 'react-intl';
import { useApplication } from '../hooks/use-application';
import { localesTranslation } from '../locales';
import { LOCALE_KEY, SupportedLocale } from '../locales/types';
import FirstVisitScreen from '../screens/FirstVisitScreen';
import { FIRST_VISIT_DATE } from '../services/Helpers';
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
  const firstVisitDate = useStoreState((state) => state.global.firstVisitDate);
  const setFirstVisitDate = useStoreActions((actions) => actions.global.setFirstVisitDate);

  useEffect(() => {
    if (!locale) {
      storageEngine.getItem(LOCALE_KEY).then((lang) => update(lang ? lang : defaultLang));
    }
    if (firstVisitDate === undefined) {
      storageEngine.getItem(FIRST_VISIT_DATE).then((date) => setFirstVisitDate(date));
    }
  }, [locale, firstVisitDate]);

  if (firstVisitDate === undefined || !locale) {
    return null;
  }

  const cache = createIntlCache();
  const intl = createIntl({ locale, messages: messages as any }, cache);

  return (
    <WaitForStateRehydration>
      <RawIntlProvider value={intl}>{firstVisitDate === null ? <FirstVisitScreen /> : children}</RawIntlProvider>
    </WaitForStateRehydration>
  );
}
