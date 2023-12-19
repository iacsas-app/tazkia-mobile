import { ReactNode, useRef } from 'react';
import { PrimitiveType } from 'react-intl';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { Color } from '../../constants/Color';
import { SCREEN_WIDTH } from '../../constants/Screen';
import ProgressLine from '../../domains/common/ProgressLine';
import useProgress from '../../hooks/use-progress';
import GlobalStyles from '../../styles/GlobalStyles';
import ConfirmRestartDialog, { ConfirmRestartDialogRef } from '../dialogs/ConfirmRestartDialog';
import Header from './Header';
import RuleProgress from './RuleProgress';
import Start from './Start';

type ProgressViewProps = {
  titleKey: string;
  titleKeyParams?: Record<string, PrimitiveType>;
  subTitleKey?: string;
  summaryKey: string;
  summary?: ReactNode;
  progress: ProgressLine[] | undefined;
  maxDays: number;
  questionMultiple?: boolean;
  onStart(): void;
  onRestart(): void;
  onEvaluate(checked: boolean): void;
};

export default function ProgressView(props: ProgressViewProps) {
  const ref = useRef<ConfirmRestartDialogRef>(null);
  const progressProps = useProgress(props.progress, props.maxDays);

  function handleRestart() {
    ref.current?.open();
  }

  function handleConfirm(confirm: boolean) {
    if (confirm) {
      props.onRestart();
    }
    ref.current?.close();
  }

  return (
    <Animated.View
      entering={FadeInUp.delay(100).duration(100).springify()}
      exiting={FadeOutDown}
      style={styles.container}
    >
      <Header
        titleKey={props.titleKey}
        titleKeyParams={props.titleKeyParams}
        subTitleKey={props.subTitleKey}
        hasProgress={props.progress !== undefined}
        completed={progressProps.completed}
        countProgress={progressProps.countProgress}
        lastDay={progressProps.lastDay}
        maxDays={props.maxDays}
        onRestart={handleRestart}
      />
      <View
        style={{
          backgroundColor: Color.noProgress,
          alignItems: 'center',
          width: SCREEN_WIDTH,
          paddingBottom: 10,
        }}
      >
        <RuleProgress
          {...progressProps}
          summaryKey={props.summaryKey}
          summary={props.summary}
          progress={props.progress}
          maxDays={props.maxDays}
          questionMultiple={props.questionMultiple}
          onEvaluate={props.onEvaluate}
        />
        {!props.progress && props.onStart && (
          <View style={{ paddingBottom: 25 }}>
            <Start onStart={props.onStart} />
          </View>
        )}
      </View>
      <ConfirmRestartDialog ref={ref} onConfirm={handleConfirm} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    width: SCREEN_WIDTH,
  },
});
