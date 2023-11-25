import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import React, { ReactNode, useCallback, useState } from 'react';
import { PrimitiveType } from 'react-intl';
import { StyleSheet, View } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import Animated, { FadeIn, FadeInUp, FadeOutUp, SlideOutDown, SlideOutUp } from 'react-native-reanimated';
import Text from '../../components/Text';
import { Font } from '../../constants/Font';
import { SCREEN_WIDTH } from '../../constants/Screen';
import ProgressLine from '../../domains/common/ProgressLine';
import { useApplication } from '../../hooks/use-application';
import { useMessage } from '../../hooks/use-message';
import { ProgressProps } from '../../hooks/use-progress';
import { TKeys } from '../../locales/constants';
import YesNoButtons from './YesNoButtons';
import ProgressInfos from './progressStatus/ProgressInfos';

type Props = ProgressProps & {
  summaryKey: string;
  summaryKeyProps?: Record<string, PrimitiveType>;
  summary?: ReactNode;
  progress: ProgressLine[] | undefined;
  maxDays: number;
  questionMultiple?: boolean;
  onEvaluate(checked: boolean): void;
};
export default function RuleProgress({ progress, ...props }: Props) {
  const { formatMessage } = useMessage();
  const [showEvalute, setShowEvalute] = useState(false);
  const { arabic } = useApplication();

  function handleEvaluateShow() {
    setShowEvalute(true);
  }

  const handleEvaluate = useCallback((checked: boolean) => {
    props.onEvaluate(checked);
    setShowEvalute(false);
  }, []);

  function formatAttempt(line: ProgressLine) {
    return formatMessage(TKeys.PROGRESS_FAILED_ATTEMPTS_RULE_SIMPLE, { day: line.day });
  }

  return (
    <View style={{ paddingVertical: 20 }}>
      {showEvalute && (
        <Animated.Text
          entering={FadeIn.delay(400).duration(800).springify()}
          exiting={SlideOutUp}
          style={styles.question}
        >
          {formatMessage(`progress.evaluation.question${props.questionMultiple ? 's' : ''}`)}
        </Animated.Text>
      )}
      <View style={{ paddingHorizontal: 15 }}>
        {props.summary ?? (
          <Animated.Text
            entering={FadeInUp.springify().delay(100).duration(300)}
            exiting={FadeOutUp.delay(100).duration(200)}
            style={styles.levelSummary}
          >
            {formatMessage(props.summaryKey, props.summaryKeyProps)}
          </Animated.Text>
        )}
      </View>
      {showEvalute && <YesNoButtons onEvaluate={handleEvaluate} />}
      {props.lastDay && !showEvalute && (
        <Animated.View
          entering={FadeInUp.delay(400).duration(800).springify()}
          exiting={SlideOutDown.delay(10).damping(100)}
          style={{ paddingTop: 15 }}
        >
          <Divider style={{ height: 1 }} />
          <View style={styles.progress}>
            <ProgressInfos
              progress={progress}
              lastDay={props.lastDay}
              countDays={props.countDays}
              endDate={props.endDate}
              failed={props.failed}
              maxDays={props.maxDays}
              formatAttempt={formatAttempt}
            />
            {!props.completed && (
              <Button
                mode="elevated"
                compact
                icon={() => <Icon name="check-circle" size={15} color="seagreen" />}
                uppercase={false}
                style={styles.evalBtn}
                onTouchStart={handleEvaluateShow}
              >
                <Text
                  variant="titleSmall"
                  color="seagreen"
                  style={{ fontWeight: '500', fontSize: Font.size(arabic ? 13 : 11) }}
                >
                  {formatMessage(TKeys.PROGRESS_START_DAILY_EVALUATION)}
                </Text>
              </Button>
            )}
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  levelSummary: { fontSize: Font.size(12), textAlign: 'justify', paddingHorizontal: 10 },
  question: { fontWeight: '900', textAlign: 'justify', fontSize: Font.size(18), alignSelf: 'center', marginBottom: 10 },
  progress: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingTop: 10,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH - 20,
  },
  evalBtn: { elevation: 8 },
});
