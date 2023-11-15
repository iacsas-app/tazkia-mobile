import Animated from 'react-native-reanimated';
import Text from '../../../../../components/Text';
import { SoulPartProgress } from '../../../../../domains/purification/Soul';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';

type Props = {
  progress: SoulPartProgress;
  roundedStart: boolean;
  roundedEnd: boolean;
};
export default function SegmentedItem({ progress, roundedStart, roundedEnd }: Props) {
  const { formatMessage, formatNumber } = useMessage();
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
        height: 18,
      }}
    >
      <Text variant="labelSmall" color="#075907" style={{ paddingHorizontal: 5 }}>
        {formatMessage(TKeys.LEVEL, { value: formatNumber(progress.level) })}
      </Text>
    </Animated.View>
  );
}
