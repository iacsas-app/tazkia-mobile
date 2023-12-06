import { Image } from 'react-native';
import ScrollViewLayout from '../../../../../components/layout/ScrollViewLayout';
import { TKeys } from '../../../../../locales/constants';
import PurificationPrezLayout from '../../../common/PurificationPrezLayout';
import { BACKGROUND_COLOR } from '../../../common/sunnahs/Helper';

export default function PresentationScreen() {
  return (
    <ScrollViewLayout style={{ backgroundColor: BACKGROUND_COLOR }}>
      <Image
        source={require('../../../../../../assets/img/sunnahs/step3.jpg')}
        style={{ height: 150, aspectRatio: 1, borderRadius: 100 }}
      />
      <PurificationPrezLayout summary={TKeys.PURIFICATION_SOUL_SUMMARY} body={TKeys.PURIFICATION_SOUL_INTRODUCTION} />
    </ScrollViewLayout>
  );
}
