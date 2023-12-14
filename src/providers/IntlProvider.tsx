import { useStoreRehydrated } from 'easy-peasy';
import React, { PropsWithChildren } from 'react';
import { RawIntlProvider, createIntl, createIntlCache } from 'react-intl';
import { locales } from '../locales';
import { useGlobal } from './AppProvider';

function WaitForStateRehydration({ children }: PropsWithChildren<unknown>) {
  const isRehydrated = useStoreRehydrated();
  return isRehydrated ? children : null;
}

export default function IntlProvider({ children }: PropsWithChildren<unknown>) {
  const { locale } = useGlobal();

  if (!locale) {
    return <></>;
  }

  const cache = createIntlCache();
  const intl = createIntl({ locale, messages: locales[locale] }, cache);

  return (
    <WaitForStateRehydration>
      <RawIntlProvider value={intl}>{children}</RawIntlProvider>
    </WaitForStateRehydration>
  );
}
