import { useStoreRehydrated } from 'easy-peasy';
import { PropsWithChildren, useEffect } from 'react';
import { RawIntlProvider, createIntl, createIntlCache } from 'react-intl';
import { useApplication } from '../hooks/use-application';
import FirstVisitScreen from '../screens/FirstVisitScreen';
import { useStoreState } from '../stores/hooks';

function WaitForStateRehydration({ children }: PropsWithChildren<unknown>) {
  const isRehydrated = useStoreRehydrated();
  return isRehydrated ? children : null;
}

export default function IntlProvider({ children }: PropsWithChildren<unknown>) {
  const messages = useStoreState((state) => state.intl.messages);
  const { firstVisit, locale, setLocale } = useApplication();

  const cache = createIntlCache();
  const intl = createIntl({ locale, messages: messages as any }, cache);

  useEffect(() => {
    setLocale(locale);
  }, [locale]);

  return (
    <WaitForStateRehydration>
      <RawIntlProvider value={intl}>{firstVisit ? <FirstVisitScreen /> : children}</RawIntlProvider>
    </WaitForStateRehydration>
  );
}
