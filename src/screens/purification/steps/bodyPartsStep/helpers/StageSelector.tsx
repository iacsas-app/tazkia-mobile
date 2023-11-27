import { useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeInUp, FadeOutDown, SlideInLeft } from 'react-native-reanimated';
import VStack from '../../../../../components/stack/VStack';
import { SCREEN_WIDTH } from '../../../../../constants/Screen';
import { BodyPartType, PurificationStage } from '../../../../../domains/purification/BodyPart';
import { useMessage } from '../../../../../hooks/use-message';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import { findPartProps } from '../common/Helper';
import Stage from './Stage';

type Props = {
  part: BodyPartType | undefined;
  onStart(stage: PurificationStage): void;
  onRestart(stage: PurificationStage): void;
  onEvaluate(stage: PurificationStage, errors: number[]): void;
};
export default function StageSelector({ part, ...props }: Props) {
  if (!part) {
    return <></>;
  }
  const { formatMessage } = useMessage();
  const [opened, setOpened] = useState<PurificationStage>();
  const source = findPartProps(part);

  function handleTouch(stage: PurificationStage) {
    setOpened(stage);
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
          style={{ ...GlobalStyles.center, fontWeight: '900', fontSize: 25 }}
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
            onTouch={handleTouch}
            onRestart={props.onRestart}
            onEvaluate={props.onEvaluate}
          />
        ))}
      </VStack>
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
    width: 60,
    aspectRatio: 1,
  },
});
