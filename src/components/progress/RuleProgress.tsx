import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import React, { ReactNode, useState } from 'react';
import { PrimitiveType } from 'react-intl';
import { StyleSheet } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import Animated, { FadeIn, FadeInUp, FadeOutUp, SlideOutDown, SlideOutUp } from 'react-native-reanimated';
import Text from '../../components/Text';
import FailedAttempts from '../../components/progress/failedAttempts/FailedAttempts';
import ProgressStatusInfo from '../../components/progress/progressStatus/ProgressStatusInfo';
import HStack from '../../components/stack/HStack';
import VStack from '../../components/stack/VStack';
import ProgressLine from '../../domains/common/ProgressLine';
import { useMessage } from '../../hooks/use-message';
import { ProgressProps } from '../../hooks/use-progress';
import { TKeys } from '../../locales/constants';
import GlobalStyles from '../../styles/GlobalStyles';

type Props = ProgressProps & {
  summaryKey: string;
  summaryKeyProps?: Record<string, PrimitiveType>;
  summary?: ReactNode;
  progress: ProgressLine[] | undefined;
  maxDays: number;
  onEvaluate(checked: boolean): void;
};
export default function RuleProgress({ progress, ...props }: Props) {
  const { formatMessage, intl } = useMessage();
  const [showEvalute, setShowEvalute] = useState(false);

  function handleEvaluateShow() {
    setShowEvalute(true);
  }

  function evaluate(checked: boolean) {
    props.onEvaluate(checked);
    setShowEvalute(false);
  }

  function formatAttempt(line: ProgressLine) {
    return formatMessage(TKeys.PROGRESS_FAILED_ATTEMPTS_RULE_SIMPLE, { day: line.day });
  }

  return (
    <Animated.View>
      {showEvalute && (
        <Animated.Text
          entering={FadeIn.delay(400).duration(800).springify()}
          exiting={SlideOutUp}
          style={styles.question}
        >
          {formatMessage(TKeys.PROGRESS_EVALUATION_QUESTION)}
        </Animated.Text>
      )}
      <VStack>
        {props.summary ?? (
          <Animated.Text
            entering={FadeInUp.springify().delay(100).duration(300)}
            exiting={FadeOutUp.delay(100).duration(200)}
            style={styles.levelSummary}
          >
            {formatMessage(props.summaryKey, props.summaryKeyProps)}
          </Animated.Text>
        )}
      </VStack>
      {showEvalute && (
        <Animated.View
          entering={FadeInUp.delay(400).duration(800).springify()}
          exiting={SlideOutDown.delay(10).damping(100)}
        >
          <HStack spacing={15} style={GlobalStyles.center}>
            <Button
              mode="elevated"
              style={styles.btn}
              uppercase={false}
              icon={() => <Icon name="thumb-up-outline" size={15} color="green" {...props} />}
              compact
              dark
              onPress={() => evaluate(true)}
            >
              <Text variant="titleMedium" color="green" style={{ fontWeight: '900' }}>
                {formatMessage(TKeys.BUTTON_YES)}
              </Text>
            </Button>
            <Button
              mode="elevated"
              style={styles.btn}
              uppercase={false}
              icon={() => <Icon name="thumb-down-outline" size={15} color="red" {...props} />}
              compact
              dark
              onPress={() => evaluate(false)}
            >
              <Text variant="titleMedium" color="red" style={{ fontWeight: '900' }}>
                {formatMessage(TKeys.BUTTON_NO)}
              </Text>
            </Button>
          </HStack>
        </Animated.View>
      )}
      {!showEvalute && progress && <Divider style={{ height: 1, marginVertical: 7 }} />}
      {props.lastDay && !showEvalute && (
        <Animated.View
          entering={FadeInUp.delay(400).duration(800).springify()}
          exiting={SlideOutDown.delay(10).damping(100)}
          style={styles.progress}
        >
          <VStack>
            <ProgressStatusInfo
              label={formatMessage(TKeys.PROGRESS_START_DATE)}
              value={intl.formatDate(props.lastDay.startDate)}
              icon="calendar"
              color="#000080"
            />
            {props.endDate && (
              <ProgressStatusInfo
                label={formatMessage(TKeys.PROGRESS_END_DATE)}
                value={intl.formatDate(props.endDate)}
                icon="calendar-check"
                color="#2e8b57"
              />
            )}
            <ProgressStatusInfo
              label={formatMessage(TKeys.PROGRESS_TOTAL_DAYS)}
              value={props.countDays}
              icon="calendar-clock-outline"
              color="#4169e1"
            />
            {!props.endDate && (
              <ProgressStatusInfo
                label={formatMessage(TKeys.PROGRESS_SUCCESSFUL_DAYS)}
                value={`${props.lastDay.day - props.failed}/${props.maxDays}`}
                icon="flag-checkered"
                color="green"
              />
            )}
            {progress && <FailedAttempts attempts={progress.slice(0, -1)} attemptFormatter={formatAttempt} />}
          </VStack>
          {!props.completed && (
            <Button
              mode="elevated"
              compact
              icon={() => <Icon name="check-circle" size={15} color="green" />}
              uppercase={false}
              style={{ marginTop: 10, elevation: 8 }}
              onTouchStart={handleEvaluateShow}
            >
              <Text variant="titleMedium" color="green" style={{ fontWeight: '900' }}>
                {formatMessage(TKeys.PROGRESS_START_DAILY_EVALUATION)}
              </Text>
            </Button>
          )}
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  levelSummary: { fontWeight: '800', fontSize: 13, textAlign: 'justify' },
  startButtonLabel: { fontWeight: '900', fontSize: 17, color: '#4169e1' },
  btn: { minWidth: 65, marginTop: 10 },
  question: { fontWeight: '900', textAlign: 'justify', fontSize: 18, alignSelf: 'center', marginBottom: 10 },
  progress: {
    ...GlobalStyles.container,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
});
