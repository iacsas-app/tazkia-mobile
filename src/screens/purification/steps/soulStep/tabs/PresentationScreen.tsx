import { Image } from 'react-native';
import ScrollViewLayout from '../../../../../components/layout/ScrollViewLayout';
import { Color } from '../../../../../constants/Color';
import { TKeys } from '../../../../../locales/constants';
import PurificationPrezLayout from '../../../common/PurificationPrezLayout';

export default function PresentationScreen() {
  return (
    <ScrollViewLayout style={{ backgroundColor: Color.backgroundColor }}>
      <Image
        source={require('../../../../../../assets/img/sunnahs/step3.jpg')}
        style={{ height: 150, aspectRatio: 1, borderRadius: 100 }}
      />
      <PurificationPrezLayout summary={TKeys.PURIFICATION_SOUL_SUMMARY} body={TKeys.PURIFICATION_SOUL_INTRODUCTION} />
    </ScrollViewLayout>
  );
}
