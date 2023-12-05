import { useStoreRehydrated } from 'easy-peasy';
import { PropsWithChildren, useEffect } from 'react';
import { RawIntlProvider, createIntl, createIntlCache } from 'react-intl';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import CenteredView from '../components/CenteredView';
import { useApplication } from '../hooks/use-application';
import { LOCALE_KEY } from '../locales/types';
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
  const firstVisitDate = useStoreState((state) => state.global.firstVisitDate);
  const update = useStoreActions((actions) => actions.intl.update);
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
    return (
      <CenteredView>
        <ActivityIndicator animating={true} size={100} color={MD2Colors.green400} />
      </CenteredView>
    );
  }

  const cache = createIntlCache();
  const intl = createIntl({ locale, messages: messages as any }, cache);

  return (
    <WaitForStateRehydration>
      <RawIntlProvider value={intl}>{firstVisitDate === null ? <FirstVisitScreen /> : children}</RawIntlProvider>
    </WaitForStateRehydration>
  );
}
