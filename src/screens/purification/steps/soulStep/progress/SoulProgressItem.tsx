import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import Animated, { useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import HStack from '../../../../../components/stack/HStack';
import VStack from '../../../../../components/stack/VStack';
import Soul, { SoulPart, SoulPartLevel } from '../../../../../domains/purification/Soul';
import { useMessage } from '../../../../../hooks/use-message';
import { hasSubTitle } from '../data';
import SegmentedSoulProgress from './SegmentedSoulProgress';

const { width: windowWidth } = Dimensions.get('window');

const DURATION = 1000;
const DELAY = 500;

type Props = {
  soul: Soul;
  onClick(part: SoulPart, level: SoulPartLevel): void;
};
export default function SoulProgressItem({ soul, ...props }: Props) {
  const { formatMessage, formatNumber } = useMessage();
  const opacity1 = useSharedValue(0);
  const opacity2 = useSharedValue(0);

  const { part, partProgress } = soul;

  const hasSubtitle = hasSubTitle.some((i) => i == part);
  const isCompleted = false;

  useEffect(() => {
    opacity1.value = withDelay(1 * DELAY, withTiming(1, { duration: DURATION }));
    opacity2.value = withDelay(2 * DELAY, withTiming(2, { duration: DURATION }));

    return () => {
      opacity1.value = withDelay(1 * DELAY, withTiming(1, { duration: DURATION }));
      opacity2.value = withDelay(2 * DELAY, withTiming(1, { duration: DURATION }));
    };
  }, []);

  return (
    <VStack center spacing={0} index={soul.part}>
      <HStack style={{ ...styles.part, backgroundColor: isCompleted ? '#66cdaa' : '#fffafa' }}>
        <Avatar.Text size={25} label={formatNumber(part)} color="#191970" style={styles.partNumber} />
        <VStack center>
          <Animated.Text style={{ ...styles.partTitle, opacity: opacity1 }}>
            {formatMessage(`purification.soul.${part}.title`)}
          </Animated.Text>
          {hasSubtitle && (
            <Animated.Text style={{ ...styles.partSubTitle, opacity: opacity2 }}>
              {formatMessage(`purification.soul.${part}.sub.title`)}
            </Animated.Text>
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
  partSubTitle: { fontSize: 16, fontWeight: '600', color: 'grey' },
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
    width: windowWidth - 15,
  },
});
