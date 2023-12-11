import { useCallback, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeInUp, FadeOutDown } from 'react-native-reanimated';
import ConfirmRestartDialog, { ConfirmRestartDialogRef } from '../../../../../components/dialogs/ConfirmRestartDialog';
import VStack from '../../../../../components/stack/VStack';
import { SCREEN_WIDTH } from '../../../../../constants/Screen';
import { BodyPartType, PurificationStage } from '../../../../../domains/purification/BodyPart';
import { useMessage } from '../../../../../hooks/use-message';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import { findPartImageSource } from '../common/Helper';
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
  const [openedStage, setOpenedStage] = useState<PurificationStage>();
  const imageSource = findPartImageSource(part);

  function handleOpen(stage: PurificationStage) {
    setOpenedStage(stage);
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

  const handleEvaluate = useCallback(
    (errors: number[]) => {
      if (openedStage) {
        props.onEvaluate(openedStage, errors);
      }
    },
    [openedStage],
  );

  function handleConfirm(confirm: boolean) {
    if (confirm && stageRef.current) {
      props.onRestart(stageRef.current);
      setOpenedStage(undefined);
    }
    restartRef.current?.close();
  }

  if (!part) {
    return <></>;
  }

  return (
    <Animated.View entering={FadeInUp.delay(100).duration(50).springify()} style={styles.container}>
      <VStack style={styles.header} spacing={5}>
        {imageSource && (
          <Animated.Image
            source={imageSource}
            entering={FadeIn.delay(500).duration(100)}
            exiting={FadeOutDown}
            style={styles.image}
          />
        )}
        <Animated.Text
          entering={FadeInUp.delay(300).duration(200).mass(1).springify()}
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
            opened={openedStage}
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
