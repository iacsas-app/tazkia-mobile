import Animated, { FadeInLeft } from 'react-native-reanimated';
import HStack from '../../../../../components/stack/HStack';
import { SCREEN_WIDTH } from '../../../../../constants/Screen';
import { SoulPartLevel, SoulPartProgress } from '../../../../../domains/purification/Soul';
import SoulProgressButton from './SoulProgressButton';

type Props = {
  progress: SoulPartProgress[];
  onClick(level: SoulPartLevel): void;
};
export default function SegmentedSoulProgress({ progress, ...props }: Props) {
  const size = progress.length;
  return (
    <HStack
      style={{
        backgroundColor: '#fffafa',
        paddingTop: 3,
        border: 0,
        paddingBottom: 8,
        width: SCREEN_WIDTH - 15,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
      }}
      spacing={0}
      center
    >
      {progress.map((item, index) => (
        <Animated.View key={index} entering={FadeInLeft.delay(250 * index)}>
          <SoulProgressButton
            key={item.level}
            progress={item}
            roundedStart={index === 0}
            roundedEnd={index === size - 1}
            onClick={props.onClick}
          />
        </Animated.View>
      ))}
    </HStack>
  );
}
