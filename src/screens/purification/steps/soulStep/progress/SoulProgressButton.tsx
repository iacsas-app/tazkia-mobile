import { Button } from 'react-native-paper';
import Text from '../../../../../components/Text';
import { SoulPartLevel, SoulPartProgress } from '../../../../../domains/purification/Soul';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';

type Props = {
  progress: SoulPartProgress;
  roundedStart: boolean;
  roundedEnd: boolean;
  onClick(level: SoulPartLevel): void;
};
export default function SoulProgressButton({ progress, roundedStart, roundedEnd, ...props }: Props) {
  const { formatMessage, formatNumber } = useMessage();
  const rStart = roundedStart ? 15 : 0;
  const rEnd = roundedEnd ? 15 : 0;
  return (
    <Button
      style={{
        borderTopEndRadius: rEnd,
        borderBottomEndRadius: rEnd,
        borderTopStartRadius: rStart,
        borderBottomStartRadius: rStart,
        backgroundColor: '#f5f5dc',
        borderLeftWidth: roundedStart ? 0.2 : 0.5,
        borderRightWidth: 0.1,
        borderColor: 'green',
      }}
      onPress={() => props.onClick(progress.level)}
    >
      <Text variant="bodyLarge" style={{ fontSize: 13, color: 'green' }}>
        {formatMessage(TKeys.LEVEL, { value: formatNumber(progress.level) })}
      </Text>
    </Button>
  );
}
