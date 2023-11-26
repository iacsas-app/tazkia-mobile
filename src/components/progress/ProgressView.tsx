import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { ReactNode, useRef } from 'react';
import { PrimitiveType } from 'react-intl';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import Animated, { FadeInUp, SlideInDown } from 'react-native-reanimated';
import { SCREEN_WIDTH } from '../../constants/Screen';
import ProgressLine from '../../domains/common/ProgressLine';
import { useMessage } from '../../hooks/use-message';
import useProgress from '../../hooks/use-progress';
import { TKeys } from '../../locales/constants';
import GlobalStyles from '../../styles/GlobalStyles';
import Text from '../Text';
import ConfirmRestartDialog, { ConfirmRestartDialogRef } from '../dialogs/ConfirmRestartDialog';
import Header from './Header';
import RuleProgress from './RuleProgress';

type Props = {
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
export default function ProgressView(props: Props) {
  const { formatMessage } = useMessage();
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
    <Animated.View entering={FadeInUp.delay(400).duration(50).springify()} style={styles.container}>
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
          backgroundColor: props.progress ? '#dbf6e8' : '#d8f0ff',
          alignItems: 'center',
          width: SCREEN_WIDTH,
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
        {!props.progress && (
          <Animated.View entering={SlideInDown.duration(10).springify()} style={{ paddingBottom: 20 }}>
            <Button
              mode="elevated"
              icon={() => <Icon name="clock-plus" size={20} color="#4169e1" />}
              uppercase={false}
              onPress={props.onStart}
              style={styles.startButton}
            >
              <Text variant="titleMedium" color="#4169e1" style={{ fontWeight: '900' }}>
                {formatMessage(TKeys.BUTTON_START)}
              </Text>
            </Button>
          </Animated.View>
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
  startButton: {
    width: 180,
  },
});
