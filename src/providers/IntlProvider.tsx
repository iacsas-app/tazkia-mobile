import { useStoreRehydrated } from 'easy-peasy';
import { PropsWithChildren, useEffect } from 'react';
import { RawIntlProvider, createIntl, createIntlCache } from 'react-intl';
import { defaultLanguage } from '../locales';
import { useStoreActions, useStoreState } from '../stores/hooks';

function WaitForStateRehydration({ children }: PropsWithChildren<unknown>) {
  const isRehydrated = useStoreRehydrated();
  return isRehydrated ? children : null;
}

export default function IntlProvider({ children }: PropsWithChildren<unknown>) {
  const locale = useStoreState((state) => state.intl.locale);
  const messages = useStoreState((state) => state.intl.messages);
  const update = useStoreActions((actions) => actions.intl.update);

  useEffect(() => {
    if (locale !== defaultLanguage) {
      update(locale);
    }
  }, [locale]);

  const cache = createIntlCache();
  const intl = createIntl({ locale, messages: messages as any }, cache);

  return (
    <WaitForStateRehydration>
      <RawIntlProvider value={intl}>{children}</RawIntlProvider>
    </WaitForStateRehydration>
  );
}
