import Animated from 'react-native-reanimated';
import Text from '../Text';

type Props = {
  label: string;
  roundedStart: boolean;
  roundedEnd: boolean;
};
export default function SegmentedItem({ label, roundedStart, roundedEnd }: Props) {
  const rStart = roundedStart ? 15 : 0;
  const rEnd = roundedEnd ? 15 : 0;
  return (
    <Animated.View
      style={{
        borderTopEndRadius: rEnd,
        borderBottomEndRadius: rEnd,
        borderTopStartRadius: rStart,
        borderBottomStartRadius: rStart,
        backgroundColor: '#f5fffa',
        borderLeftWidth: roundedStart ? 0.2 : 0.5,
        borderRightWidth: 0.1,
        borderColor: 'green',
        elevation: 1,
        opacity: 0.9,
        height: 15,
      }}
    >
      <Text variant="labelSmall" style={{ paddingHorizontal: 2, color: '#075907', fontSize: 9 }}>
        {label}
      </Text>
    </Animated.View>
  );
}
