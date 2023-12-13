import { PropsWithChildren, useEffect } from 'react';
import FirstVisitScreen from '../screens/FirstVisitScreen';
import { FIRST_VISIT_DATE } from '../services/Helpers';
import { useStoreActions, useStoreState } from '../stores/hooks';
import { storageEngine } from '../stores/storage-engine';

export default function FirstVisitProvider({ children }: PropsWithChildren<unknown>) {
  const firstVisitDate = useStoreState((state) => state.global.firstVisitDate);
  const setFirstVisitDate = useStoreActions((actions) => actions.global.setFirstVisitDate);

  useEffect(() => {
    const restore = async () => {
      try {
        storageEngine.getItem(FIRST_VISIT_DATE).then((date) => setFirstVisitDate(date));
      } catch (e) {}
    };
    restore();
  }, []);

  console.log('firstVisitDate', firstVisitDate);

  if (firstVisitDate === undefined) {
    return null;
  }
  if (firstVisitDate === null) {
    <FirstVisitScreen />;
  }

  return children;
}
