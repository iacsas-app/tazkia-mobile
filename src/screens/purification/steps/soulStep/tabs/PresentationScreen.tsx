import ScrollViewLayout from '../../../../../components/layout/ScrollViewLayout';
import { TKeys } from '../../../../../locales/constants';
import PurificationPrezLayout from '../../../common/PurificationPrezLayout';

export default function PresentationScreen() {
  return (
    <ScrollViewLayout>
      <PurificationPrezLayout summary={TKeys.PURIFICATION_SOUL_SUMMARY} body={TKeys.PURIFICATION_SOUL_INTRODUCTION} />
    </ScrollViewLayout>
  );
}
