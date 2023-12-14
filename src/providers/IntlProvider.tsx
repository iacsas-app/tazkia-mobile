import { useStoreRehydrated } from 'easy-peasy';
import React, { PropsWithChildren } from 'react';
import { RawIntlProvider, createIntl, createIntlCache } from 'react-intl';
import { locales } from '../locales';
import FirstVisitScreen from '../screens/FirstVisitScreen';
import { useGlobal } from './AppProvider';

function WaitForStateRehydration({ children }: PropsWithChildren<unknown>) {
  const isRehydrated = useStoreRehydrated();
  return isRehydrated ? children : null;
}

export default function IntlProvider({ children }: PropsWithChildren<unknown>) {
  const { locale, firstVisitDate } = useGlobal();

  if (!locale) {
    return <></>;
  }

  const cache = createIntlCache();
  const intl = createIntl({ locale, messages: locales[locale] }, cache);

  return (
    <WaitForStateRehydration>
      <RawIntlProvider value={intl}>{firstVisitDate === null ? <FirstVisitScreen /> : children}</RawIntlProvider>
    </WaitForStateRehydration>
  );
}
