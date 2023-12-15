import Animated, { FadeInLeft } from 'react-native-reanimated';
import HStack from '../stack/HStack';
import SegmentedItem from './SegmentedItem';

type Props = {
  progress: string[] | undefined;
};
export default function SegmentedProgress({ progress }: Props) {
  if (!progress) {
    return <></>;
  }
  progress = progress.sort();
  const size = progress.length;

  return (
    <HStack spacing={0} center>
      {progress.map((item, index) => (
        <Animated.View key={index} entering={FadeInLeft.delay(250 * index)}>
          <SegmentedItem label={item} roundedStart={index === 0} roundedEnd={index === size - 1} />
        </Animated.View>
      ))}
    </HStack>
  );
}
