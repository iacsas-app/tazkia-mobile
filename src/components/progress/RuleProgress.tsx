import React, { ReactNode, useCallback, useState } from 'react';
import { PrimitiveType } from 'react-intl';
import { StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';
import Animated, { FadeIn, FadeInUp, FadeOutUp, SlideOutDown, SlideOutUp } from 'react-native-reanimated';
import { Font } from '../../constants/Font';
import ProgressLine from '../../domains/common/ProgressLine';
import { useMessage } from '../../hooks/use-message';
import { ProgressProps } from '../../hooks/use-progress';
import { TKeys } from '../../locales/constants';
import { useGlobal } from '../../providers/AppProvider';
import StatusAndEvaluation from '../../screens/purification/common/StatusAndEvaluation';
import YesNoButtons from './YesNoButtons';

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
  const { arabic } = useGlobal();

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

  const align = props.completed ? 'center' : 'space-between';

  return (
    <View style={{ paddingBottom: 10, paddingTop: 5 }}>
      {showEvalute && (
        <Animated.Text
          entering={FadeIn.delay(400).duration(800).springify()}
          exiting={SlideOutUp}
          style={{ ...styles.question, fontSize: Font.size(arabic ? 18 : 16) }}
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
          style={{ paddingTop: 15, minWidth: '100%' }}
        >
          <Divider style={{ height: 1 }} />
          <StatusAndEvaluation
            {...props}
            progress={progress}
            align={align}
            maxDays={props.maxDays}
            formatAttempt={formatAttempt}
            onEvaluate={handleEvaluateShow}
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  levelSummary: { fontSize: Font.size(12), textAlign: 'justify', paddingHorizontal: 5 },
  question: { fontWeight: '900', textAlign: 'justify', alignSelf: 'center', marginBottom: 10 },
});
