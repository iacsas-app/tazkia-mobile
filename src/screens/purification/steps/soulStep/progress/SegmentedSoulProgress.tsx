import Animated, { FadeInLeft } from 'react-native-reanimated';
import HStack from '../../../../../components/stack/HStack';
import { SoulPartProgress } from '../../../../../domains/purification/Soul';
import SegmentedItem from './SegmentedItem';

type Props = {
  progress: SoulPartProgress[];
};
export default function SegmentedSoulProgress({ progress, ...props }: Props) {
  const size = progress.length;
  return (
    <HStack spacing={0} center>
      {progress.map((item, index) => (
        <Animated.View key={index} entering={FadeInLeft.delay(250 * index)}>
          <SegmentedItem key={item.level} progress={item} roundedStart={index === 0} roundedEnd={index === size - 1} />
        </Animated.View>
      ))}
    </HStack>
  );
}
