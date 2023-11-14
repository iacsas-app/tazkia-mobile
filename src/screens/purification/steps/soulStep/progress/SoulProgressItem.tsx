import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import Text from '../../../../../components/Text';
import HStack from '../../../../../components/stack/HStack';
import VStack from '../../../../../components/stack/VStack';
import { SCREEN_WIDTH } from '../../../../../constants/Screen';
import Soul, { SoulPart, SoulPartLevel } from '../../../../../domains/purification/Soul';
import { useMessage } from '../../../../../hooks/use-message';
import { hasSubTitle } from '../helpers/data';
import SegmentedSoulProgress from './SegmentedSoulProgress';

type Props = {
  soul: Soul;
  onClick(part: SoulPart, level: SoulPartLevel): void;
};
export default function SoulProgressItem({ soul, ...props }: Props) {
  const { formatMessage, formatNumber } = useMessage();

  const { part, partProgress } = soul;
  const hasSubtitle = hasSubTitle.some((i) => i == part);
  const isCompleted = false;

  return (
    <VStack center spacing={0} index={soul.part}>
      <HStack style={{ ...styles.part, backgroundColor: isCompleted ? '#66cdaa' : '#fffafa' }}>
        <Avatar.Text size={25} label={formatNumber(part)} color="#191970" style={styles.partNumber} />
        <VStack center>
          <Text variant="bodyLarge" style={{ ...styles.partTitle }}>
            {formatMessage(`purification.soul.${part}.title`)}
          </Text>
          {hasSubtitle && (
            <Text variant="bodyLarge" style={{ ...styles.partSubTitle }}>
              {formatMessage(`purification.soul.${part}.sub.title`)}
            </Text>
          )}
        </VStack>
        {isCompleted && <Icon name="progress-check" style={styles.partProgress} color={'#00fa9a'} />}
      </HStack>
      <SegmentedSoulProgress progress={partProgress} onClick={(level) => props.onClick(soul.part, level)} />
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f0e275',
  },
  partNumber: { left: 10, position: 'absolute', backgroundColor: '#add8e6' },
  partProgress: { right: 10, position: 'absolute', fontSize: 35 },
  partTitle: { fontSize: 18, fontWeight: '900' },
  partSubTitle: { fontSize: 14, fontWeight: '500', color: 'black' },
  part: {
    elevation: 6,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'justify',
    flexBasis: 60,
    minHeight: 40,
    width: SCREEN_WIDTH - 15,
  },
});
