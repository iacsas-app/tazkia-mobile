import Animated, { FadeIn, FadeOutDown } from 'react-native-reanimated';
import ScrollViewLayout from '../../../../../components/layout/ScrollViewLayout';
import { Color } from '../../../../../constants/Color';
import { TKeys } from '../../../../../locales/constants';
import PurificationPrezLayout from '../../../common/PurificationPrezLayout';
import Obstacles from '../helpers/Obstacles';

export default function PresentationScreen() {
  return (
    <ScrollViewLayout style={{ backgroundColor: Color.backgroundColor }}>
      <Animated.Image
        source={require('../../../../../../assets/img/purification/step2.jpg')}
        style={{ height: 150, aspectRatio: 1, borderRadius: 100 }}
        entering={FadeIn.delay(500).duration(100)}
        exiting={FadeOutDown}
      />
      <PurificationPrezLayout summary={TKeys.PURIFICATION_MIND_SUMMARY} body={TKeys.PURIFICATION_MIND_INTRODUCTION}>
        <Obstacles />
      </PurificationPrezLayout>
    </ScrollViewLayout>
  );
}
