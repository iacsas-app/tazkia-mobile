import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import Text from '../../../../../components/Text';
import RuleProgress2 from '../../../../../components/progress/RuleProgress2';
import { ProgressStatus } from '../../../../../components/progress/progressStatus/ProgressStatus';
import HStack from '../../../../../components/stack/HStack';
import VStack from '../../../../../components/stack/VStack';
import { SCREEN_WIDTH } from '../../../../../constants/Screen';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import Soul, { SoulPart } from '../../../../../domains/purification/Soul';
import { useMessage } from '../../../../../hooks/use-message';
import useProgress from '../../../../../hooks/use-progress';
import usePurification from '../../../../../hooks/use-purification';
import { TKeys } from '../../../../../locales/constants';
import { PURIFICATION_MAX_DAYS } from '../../../../../services/Helpers';
import GlobalStyles from '../../../../../styles/GlobalStyles';

type Props = {
  part: SoulPart;
  index: number;
  levelKey: TKeys;
  opened: number | undefined;
  onSelect(level: number): void;
  onTouch(level: number): void;
  onEvaluate(part: SoulPart, level: number, checked: boolean): void;
};

export default function LevelRule({ part, index, levelKey, ...props }: Props) {
  const { formatMessage, formatNumber } = useMessage();
  const [open, setOpen] = useState(false);
  const { findSoul, restartSoul } = usePurification();
  const soul = findSoul(part, index as any);
  const progress = findSoulLevel(soul);
  const progressProps = useProgress(progress, PURIFICATION_MAX_DAYS);

  function findSoulLevel(soul: Soul | undefined): ProgressLine[] | undefined {
    if (!soul) {
      return undefined;
    }
    return soul.partProgress.find((item) => item.level === index)?.progress;
  }

  function handleStart() {
    props.onSelect(index);
  }

  function handleRestart() {
    restartSoul(part, index as any);
  }

  function handleTouch() {
    props.onTouch(index);
  }

  function handleEvaluate(checked: boolean) {
    props.onEvaluate(part, index, checked);
  }

  function radius() {
    return soul ? 30 : 20;
  }

  useEffect(() => {
    setOpen(index === props.opened);
  }, [props.opened]);

  return (
    <VStack
      style={{
        ...styles.container,
        elevation: 4,
        paddingRight: open ? 8 : 3,
        paddingLeft: 8,
        paddingVertical: open ? 5 : 3,
        borderBottomLeftRadius: soul ? 30 : open ? 15 : radius(),
        borderBottomRightRadius: soul ? 30 : open ? 15 : radius(),
        borderTopLeftRadius: radius(),
        borderTopRightRadius: radius(),
        backgroundColor: soul ? (progressProps.completed ? '#8de0b6' : '#dbf6e8') : '#d8f0ff',
      }}
      spacing={10}
      center
      onTouchStart={handleTouch}
    >
      <HStack style={styles.header}>
        <HStack spacing={10}>
          <Icon name="comma-circle" size={22} color={soul ? 'green' : '#4169e1'} />
          <Text variant="bodyLarge" style={styles.levelTitle} color={soul ? 'green' : '#4169e1'}>
            {formatMessage(TKeys.LEVEL, { value: formatNumber(index) })}
          </Text>
        </HStack>
        <Animated.View entering={SlideInLeft.duration(10).springify()}>
          {!soul ? (
            <Button
              mode="elevated"
              compact
              icon={() => <Icon name="clock-check" size={19} color="#4169e1" />}
              uppercase={false}
              style={{ height: 30, padding: 0, margin: 0 }}
              contentStyle={{ marginTop: -5 }}
              labelStyle={styles.startButtonLabel}
              onTouchStart={handleStart}
            >
              {formatMessage(TKeys.BUTTON_START)}
            </Button>
          ) : (
            <HStack>
              {progressProps.completed && (
                <IconButton icon="backup-restore" iconColor="red" size={30} onPress={handleRestart} />
              )}
              <ProgressStatus
                last={progressProps.lastDay}
                count={progressProps.countProgress}
                maxDays={PURIFICATION_MAX_DAYS}
                completed={progressProps.completed}
              />
            </HStack>
          )}
        </Animated.View>
      </HStack>
      {open && (
        <RuleProgress2
          {...progressProps}
          summaryKey={levelKey}
          progress={progress}
          maxDays={PURIFICATION_MAX_DAYS}
          onEvaluate={handleEvaluate}
        />
      )}
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.rounded,
    width: SCREEN_WIDTH - 20,
    elevation: 1,
  },
  header: {
    alignContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  levelTitle: { fontWeight: '900', fontSize: 16, color: '#4169e1' },
  levelSummary: { fontWeight: '800', fontSize: 12.5, textAlign: 'justify' },
  startButtonLabel: { fontWeight: '900', fontSize: 17, color: '#4169e1' },
  btn: { minWidth: 65, marginTop: 10 },
  question: { fontWeight: '900', textAlign: 'justify', fontSize: 18, alignSelf: 'center', marginBottom: 10 },
});
