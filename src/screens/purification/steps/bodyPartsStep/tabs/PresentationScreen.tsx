import { Image } from 'react-native';
import ScrollViewLayout from '../../../../../components/layout/ScrollViewLayout';
import { TKeys } from '../../../../../locales/constants';
import PurificationPrezLayout from '../../../common/PurificationPrezLayout';
import { BACKGROUND_COLOR } from '../../../common/sunnahs/Helper';
import Obstacles from '../helpers/Obstacles';

export default function PresentationScreen() {
  return (
    <ScrollViewLayout style={{ backgroundColor: BACKGROUND_COLOR, flex: 1 }}>
      <Image
        source={require('../../../../../../assets/img/purification/step1.png')}
        style={{ height: 150, aspectRatio: 1, borderRadius: 100 }}
      />
      <PurificationPrezLayout
        summary={TKeys.PURIFICATION_BODYPART_SUMMARY}
        body={TKeys.PURIFICATION_BODYPART_INTRODUCTION}
      >
        <Obstacles />
      </PurificationPrezLayout>
    </ScrollViewLayout>
  );
}
