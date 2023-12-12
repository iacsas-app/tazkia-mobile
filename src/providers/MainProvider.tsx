import { StoreProvider as ReactStoreProvider } from 'easy-peasy';
import { PropsWithChildren, useEffect } from 'react';
import FirstVisitScreen from '../screens/FirstVisitScreen';
import { FIRST_VISIT_DATE } from '../services/Helpers';
import store from '../stores';
import { useStoreActions, useStoreState } from '../stores/hooks';
import { storageEngine } from '../stores/storage-engine';

export default function MainProvider({ children }: PropsWithChildren<unknown>) {
  const firstVisitDate = useStoreState((state) => state.global.firstVisitDate);
  const setFirstVisitDate = useStoreActions((actions) => actions.global.setFirstVisitDate);

  useEffect(() => {
    if (!firstVisitDate) {
      try {
        storageEngine.getItem(FIRST_VISIT_DATE).then((date) => setFirstVisitDate(date));
      } catch (e) {
        // ignore errors
      }
    }
  }, [firstVisitDate]);

  if (firstVisitDate === undefined) {
    return null;
  }

  return (
    <ReactStoreProvider store={store}>{firstVisitDate === null ? <FirstVisitScreen /> : children}</ReactStoreProvider>
  );
}
