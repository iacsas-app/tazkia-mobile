import ScrollViewLayout from '../../../../../components/layout/ScrollViewLayout';
import { TKeys } from '../../../../../locales/constants';
import PurificationPrezLayout from '../../../common/PurificationPrezLayout';

export default function PresentationScreen() {
  return (
    <ScrollViewLayout>
      <PurificationPrezLayout summary={TKeys.PURIFICATION_MIND_SUMMARY} body={TKeys.PURIFICATION_MIND_INTRODUCTION} />
    </ScrollViewLayout>
  );
}
