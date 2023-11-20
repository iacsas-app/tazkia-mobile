import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useRef } from 'react';
import { PrimitiveType } from 'react-intl';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import Animated, { FadeInUp, SlideInDown } from 'react-native-reanimated';
import ProgressLine from '../../domains/common/ProgressLine';
import { useMessage } from '../../hooks/use-message';
import useProgress from '../../hooks/use-progress';
import { TKeys } from '../../locales/constants';
import GlobalStyles from '../../styles/GlobalStyles';
import Text from '../Text';
import ConfirmRestartDialog, { ConfirmRestartDialogRef } from '../dialogs/ConfirmRestartDialog';
import HStack from '../stack/HStack';
import VStack from '../stack/VStack';
import RuleProgress2 from './RuleProgress2';
import { ProgressStatus } from './progressStatus/ProgressStatus';

type Props = {
  titleKey: string;
  titleKeyParams?: Record<string, PrimitiveType>;
  subTitleKey?: string;
  summaryKey: string;
  progress: ProgressLine[] | undefined;
  maxDays: number;
  onStart(): void;
  onRestart(): void;
  onEvaluate(checked: boolean): void;
};
export default function ProgressView(props: Props) {
  const { formatMessage } = useMessage();
  const ref = useRef<ConfirmRestartDialogRef>(null);
  const progressProps = useProgress(props.progress, props.maxDays);

  function onRestart() {
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
      entering={FadeInUp.delay(400).duration(50).springify()}
      style={{ ...GlobalStyles.center, backgroundColor: 'transparent' }}
    >
      <HStack style={{ ...styles.status, alignSelf: props.progress ? 'stretch' : 'center' }}>
        <VStack style={{ ...GlobalStyles.center, flexDirection: 'column' }}>
          <Text variant="titleLarge" style={{ fontWeight: '900' }} color={props.progress ? 'green' : 'blue'}>
            {formatMessage(props.titleKey, props.titleKeyParams)}
          </Text>
          {props.subTitleKey && <Text variant="titleSmall">{formatMessage(props.subTitleKey)}</Text>}
        </VStack>
        <HStack style={GlobalStyles.center} spacing={10}>
          {progressProps.completed && (
            <IconButton
              icon="cog-counterclockwise"
              mode="outlined"
              iconColor="#d35858"
              containerColor="#e9bcbc70"
              style={{ borderColor: '#e9bcbc70' }}
              size={25}
              onPress={onRestart}
            />
          )}
          {props.progress && (
            <Animated.View>
              <ProgressStatus
                last={progressProps.lastDay}
                count={progressProps.countProgress}
                maxDays={props.maxDays}
                completed={progressProps.completed}
              />
            </Animated.View>
          )}
        </HStack>
      </HStack>
      <View
        style={{
          ...styles.container,
          backgroundColor: props.progress ? (progressProps.completed ? '#8de0b6' : '#dbf6e8') : '#d8f0ff',
        }}
      >
        <RuleProgress2
          {...progressProps}
          summaryKey={props.summaryKey}
          progress={props.progress}
          maxDays={props.maxDays}
          onEvaluate={props.onEvaluate}
        />
        <Animated.View entering={SlideInDown.duration(10).springify()}>
          {!props.progress && (
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
          )}
        </Animated.View>
      </View>
      <ConfirmRestartDialog ref={ref} onConfirm={handleConfirm} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.center,
    paddingBottom: 30,
    flex: 1,
    padding: 10,
    marginTop: 10,
  },
  startButton: {
    width: 180,
  },
  status: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
