import { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeInUp, FadeOutDown, SlideInLeft } from 'react-native-reanimated';
import ConfirmRestartDialog, { ConfirmRestartDialogRef } from '../../../../../components/dialogs/ConfirmRestartDialog';
import VStack from '../../../../../components/stack/VStack';
import { SCREEN_WIDTH } from '../../../../../constants/Screen';
import { BodyPartType, PurificationStage } from '../../../../../domains/purification/BodyPart';
import { useMessage } from '../../../../../hooks/use-message';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import { findPartProps } from '../common/Helper';
import Stage from './Stage';
import RulesDialog, { RulesDialogRef } from './rules/RulesDialog';

type Props = {
  part: BodyPartType | undefined;
  onStart(stage: PurificationStage): void;
  onRestart(stage: PurificationStage): void;
  onEvaluate(stage: PurificationStage, errors: number[]): void;
};
export default function StageSelector({ part, ...props }: Props) {
  const stageRef = useRef<PurificationStage>();
  const rulesDialogRef = useRef<RulesDialogRef>(null);
  const restartRef = useRef<ConfirmRestartDialogRef>(null);
  const { formatMessage } = useMessage();
  const [opened, setOpened] = useState<PurificationStage>();
  const source = findPartProps(part);

  function handleOpen(stage: PurificationStage) {
    setOpened(stage);
  }

  function handleShowRules(stage: PurificationStage) {
    if (part) {
      rulesDialogRef.current?.show(part, stage);
    }
  }

  function handleShowEvaluate(stage: PurificationStage) {
    if (part) {
      rulesDialogRef.current?.evaluate(part, stage);
    }
  }

  function handleRestart(stage: PurificationStage) {
    stageRef.current = stage;
    restartRef.current?.open();
  }

  function handleEvaluate(errors: number[]) {
    if (opened) {
      props.onEvaluate(opened, errors);
    }
  }

  function handleConfirm(confirm: boolean) {
    if (confirm && stageRef.current) {
      props.onRestart(stageRef.current);
    }
    restartRef.current?.close();
  }

  if (!part) {
    return <></>;
  }

  return (
    <Animated.View entering={FadeInUp.delay(400).duration(50).springify()} style={styles.container}>
      <VStack style={styles.header} spacing={5}>
        {source && (
          <Animated.Image
            source={source}
            entering={FadeIn.delay(500).duration(100)}
            exiting={FadeOutDown}
            style={styles.image}
          />
        )}
        <Animated.Text
          entering={SlideInLeft.delay(200).duration(200).springify()}
          exiting={FadeOutDown.duration(10)}
          style={styles.partName}
        >
          {formatMessage(`purification.body-parts.${part}`)}
        </Animated.Text>
      </VStack>
      <VStack spacing={10}>
        {['cleaning', 'enlightenment'].map((stage, index) => (
          <Stage
            key={index}
            part={part}
            stage={stage as any}
            opened={opened}
            onStart={props.onStart}
            onOpen={handleOpen}
            onShowRules={handleShowRules}
            onRestart={handleRestart}
            onEvaluate={handleShowEvaluate}
          />
        ))}
      </VStack>
      <RulesDialog ref={rulesDialogRef} onEvaluate={handleEvaluate} />
      <ConfirmRestartDialog ref={restartRef} onConfirm={handleConfirm} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    width: SCREEN_WIDTH,
    paddingBottom: 30,
  },
  header: {
    paddingVertical: 10,
  },
  image: {
    ...GlobalStyles.circle,
    width: 100,
    height: 100,
  },
  partName: { ...GlobalStyles.center, fontWeight: '900', fontSize: 25 },
});
