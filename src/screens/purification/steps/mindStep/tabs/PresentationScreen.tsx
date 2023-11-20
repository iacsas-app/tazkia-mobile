import Animated, { FadeIn, FadeOutDown } from 'react-native-reanimated';
import ScrollViewLayout from '../../../../../components/layout/ScrollViewLayout';
import { TKeys } from '../../../../../locales/constants';
import PurificationPrezLayout from '../../../common/PurificationPrezLayout';

export default function PresentationScreen() {
  return (
    <ScrollViewLayout>
      <Animated.Image
        source={require('../../../../../../assets/img/purification/step2.jpg')}
        style={{ height: 150, aspectRatio: 1, borderRadius: 100 }}
        entering={FadeIn.delay(500).duration(100)}
        exiting={FadeOutDown}
      />
      <PurificationPrezLayout summary={TKeys.PURIFICATION_MIND_SUMMARY} body={TKeys.PURIFICATION_MIND_INTRODUCTION} />
    </ScrollViewLayout>
  );
}
