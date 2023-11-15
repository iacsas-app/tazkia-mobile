import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Animated, { FadeIn, FadeInUp, FadeOutUp, SlideOutDown } from 'react-native-reanimated';
import Text from '../../../../../components/Text';
import FailedAttempts from '../../../../../components/progress/failedAttempts/FailedAttempts';
import { ProgressStatus } from '../../../../../components/progress/progressStatus/ProgressStatus';
import ProgressStatusInfo from '../../../../../components/progress/progressStatus/ProgressStatusInfo';
import HStack from '../../../../../components/stack/HStack';
import VStack from '../../../../../components/stack/VStack';
import { SCREEN_WIDTH } from '../../../../../constants/Screen';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import Soul, { SoulPart } from '../../../../../domains/purification/Soul';
import { useMessage } from '../../../../../hooks/use-message';
import usePurification from '../../../../../hooks/use-purification';
import { TKeys } from '../../../../../locales/constants';
import { PURIFICATION_MAX_DAYS, isCompleted } from '../../../../../services/Helpers';
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
  const { formatMessage, formatNumber, intl } = useMessage();
  const [open, setOpen] = useState(false);
  const [showEvalute, setShowEvalute] = useState(false);
  const { findSoul } = usePurification();
  const soul = findSoul(part, index as any);
  const progress = findSoulLevel(soul);

  const countDays = progress
    ? progress.map((p) => p.day).reduce((total, currentValue) => (total += currentValue), 0)
    : 0;
  const countProgress = progress ? progress.length - 1 : 0;
  const lastDay = progress ? progress[countProgress] : undefined;

  const endDate = lastDay
    ? lastDay.day >= PURIFICATION_MAX_DAYS && lastDay.evaluated === true && lastDay.errors.length === 0
      ? lastDay.startDate + lastDay.day
      : undefined
    : undefined;
  const failed = lastDay ? (lastDay.failedAttempts ? lastDay.failedAttempts : 0) : 0;
  const completed = isCompleted(progress, PURIFICATION_MAX_DAYS);

  function findSoulLevel(soul: Soul | undefined): ProgressLine[] | undefined {
    if (!soul) {
      return undefined;
    }
    return soul.partProgress.find((item) => item.level === index)?.progress;
  }

  function formatAttempt(line: ProgressLine) {
    return formatMessage(TKeys.PROGRESS_FAILED_ATTEMPTS_RULE_SIMPLE, { day: line.day });
  }

  function handleStart() {
    props.onSelect(index);
  }

  function handleTouch() {
    props.onTouch(index);
    /*setOpen(!open);*/
  }

  function handleEvaluateShow() {
    setShowEvalute(true);
  }

  function handleYesPress() {
    evaluate(true);
  }

  function handleNoPress() {
    evaluate(false);
  }

  function evaluate(checked: boolean) {
    props.onEvaluate(part, index, checked);
  }

  useEffect(() => {
    setOpen(index === props.opened);
  }, [props.opened]);

  return (
    <VStack
      style={{ ...styles.container, backgroundColor: soul ? '#d9e9d9' : '#add8e6' }}
      spacing={10}
      center
      onTouchStart={handleTouch}
    >
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
          <ProgressStatus last={lastDay} count={countProgress} maxDays={PURIFICATION_MAX_DAYS} completed={completed} />
        )}
      </HStack>
      {open && (
        <Animated.View>
          {showEvalute && (
            <Animated.Text entering={FadeIn.delay(400).duration(800).springify()} style={styles.question}>
              {formatMessage(TKeys.PROGRESS_EVALUATION_QUESTION)}
            </Animated.Text>
          )}
          <Animated.Text
            entering={FadeInUp.springify().delay(100).duration(300)}
            exiting={FadeOutUp.delay(100).duration(200)}
            style={styles.levelSummary}
          >
            {formatMessage(levelKey)}
          </Animated.Text>
          {showEvalute && (
            <Animated.View entering={FadeInUp.delay(400).duration(800).springify()}>
              <HStack spacing={15} style={GlobalStyles.center}>
                <Button
                  mode="elevated"
                  style={styles.btn}
                  uppercase={false}
                  textColor="#66cdaa"
                  icon={() => <Icon name="thumb-up-outline" size={16} color="black" {...props} />}
                  compact
                  dark
                  onPress={handleYesPress}
                >
                  <Text variant="bodyLarge" color="black" style={{ fontSize: 16, fontWeight: '900' }}>
                    {formatMessage(TKeys.BUTTON_YES)}
                  </Text>
                </Button>
                <Button
                  mode="elevated"
                  style={styles.btn}
                  uppercase={false}
                  textColor="#c0c0c0"
                  icon={() => <Icon name="thumb-down-outline" size={16} color="black" {...props} />}
                  compact
                  dark
                  onPress={handleNoPress}
                >
                  <Text color="black" style={{ fontSize: 16, fontWeight: '900' }}>
                    {formatMessage(TKeys.BUTTON_NO)}
                  </Text>
                </Button>
              </HStack>
            </Animated.View>
          )}
          {lastDay && !showEvalute && (
            <VStack style={{ ...GlobalStyles.center, paddingBottom: 15, paddingTop: 10 }} spacing={13}>
              <Animated.View
                entering={FadeInUp.delay(400).duration(800).springify()}
                exiting={SlideOutDown.delay(10).damping(100)}
              >
                <VStack style={{ backgroundColor: 'white', padding: 20, borderRadius: 20 }}>
                  <ProgressStatusInfo
                    label={formatMessage(TKeys.PROGRESS_START_DATE)}
                    value={intl.formatDate(lastDay.startDate)}
                    icon="calendar"
                    color="#000080"
                  />
                  {endDate && (
                    <ProgressStatusInfo
                      label={formatMessage(TKeys.PROGRESS_END_DATE)}
                      value={intl.formatDate(endDate)}
                      icon="calendar-check"
                      color="#2e8b57"
                    />
                  )}
                  <ProgressStatusInfo
                    label={formatMessage(TKeys.PROGRESS_TOTAL_DAYS)}
                    value={countDays}
                    icon="calendar-clock-outline"
                    color="#4169e1"
                  />
                  {!endDate && (
                    <ProgressStatusInfo
                      label={formatMessage(TKeys.PROGRESS_SUCCESSFUL_DAYS)}
                      value={`${lastDay.day - failed}/${PURIFICATION_MAX_DAYS}`}
                      icon="flag-checkered"
                      color="green"
                    />
                  )}
                  {progress && <FailedAttempts attempts={progress.slice(0, -1)} attemptFormatter={formatAttempt} />}
                </VStack>
                {!completed && (
                  <Button
                    mode="elevated"
                    compact
                    icon={() => <Icon name="check-circle" size={19} color="blue" />}
                    uppercase={false}
                    labelStyle={{ ...styles.startButtonLabel, color: 'blue' }}
                    style={{ marginTop: 10, elevation: 8 }}
                    onTouchStart={handleEvaluateShow}
                  >
                    {formatMessage(TKeys.PROGRESS_START_DAILY_EVALUATION)}
                  </Button>
                )}
              </Animated.View>
            </VStack>
          )}
        </Animated.View>
      )}
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.rounded,
    width: SCREEN_WIDTH - 20,
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
  btn: { minWidth: 65, marginTop: 10 },
  question: { fontWeight: '900', textAlign: 'justify', fontSize: 18, alignSelf: 'center', marginBottom: 10 },
});
