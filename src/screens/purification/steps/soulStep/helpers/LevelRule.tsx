import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Text from '../../../../../components/Text';
import HStack from '../../../../../components/stack/HStack';
import VStack from '../../../../../components/stack/VStack';
import { SCREEN_WIDTH } from '../../../../../constants/Screen';
import { SoulPart } from '../../../../../domains/purification/Soul';
import { useMessage } from '../../../../../hooks/use-message';
import usePurification from '../../../../../hooks/use-purification';
import { TKeys } from '../../../../../locales/constants';
import GlobalStyles from '../../../../../styles/GlobalStyles';

type Props = {
  part: SoulPart;
  index: number;
  levelKey: TKeys;
  onSelect(level: number): void;
};
export default function LevelRule({ part, index, levelKey, onSelect }: Props) {
  const { formatMessage, formatNumber } = useMessage();
  const { findSoul } = usePurification();
  const soul = findSoul(part, index as any);

  function handleStart() {
    onSelect(index);
  }

  return (
    <VStack style={styles.container} spacing={10} center>
      <HStack style={styles.header}>
        <HStack spacing={10}>
          <Icon name="comma-circle" size={22} color="#4169e1" />
          <Text variant="bodyLarge" style={styles.levelTitle}>
            {formatMessage(TKeys.LEVEL, { value: formatNumber(index) })}
          </Text>
        </HStack>
        {!soul ? (
          <Button
            mode="elevated"
            compact
            icon={() => <Icon name="clock-check" size={19} color="green" />}
            uppercase={false}
            style={{ height: 30, padding: 0, margin: 0 }}
            contentStyle={{ marginTop: -5 }}
            labelStyle={styles.startButtonLabel}
            onTouchStart={handleStart}
          >
            {formatMessage(TKeys.BUTTON_START)}
          </Button>
        ) : (
          <Icon name="progress-check" color={'#f5fffa'} size={30} />
        )}
      </HStack>

      <Text variant="bodyLarge" style={styles.levelSummary}>
        {formatMessage(levelKey)}
      </Text>
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.rounded,
    width: SCREEN_WIDTH - 20,
    backgroundColor: '#add8e6',
    padding: 10,
    elevation: 1,
  },
  header: {
    alignContent: 'flex-start',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  levelTitle: { fontWeight: '900', fontSize: 18, color: '#4169e1' },
  levelSummary: { fontWeight: '800', fontSize: 14, textAlign: 'justify' },
  startButtonLabel: { fontWeight: '900', fontSize: 17, color: 'green' },
});
