import React, { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import Text from '../../../../../components/Text';
import ConfirmRestartDialog, { ConfirmRestartDialogRef } from '../../../../../components/dialogs/ConfirmRestartDialog';
import HStack from '../../../../../components/stack/HStack';
import VStack from '../../../../../components/stack/VStack';
import { Font } from '../../../../../constants/Font';
import { SoulPart, SoulPartLevel } from '../../../../../domains/purification/Soul';
import { useMessage } from '../../../../../hooks/use-message';
import { arabic } from '../../../../../locales/messages/arabic';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import LevelRule from './LevelRule';
import { hasSubTitle, soulRules } from './data';

interface Props {
  part: SoulPart | undefined;
  onStart(level: number): void;
  onEvaluate(part: SoulPart, level: number, checked: boolean): void;
  onRestart(level: SoulPartLevel): void;
}
export default function LevelSelector({ part, ...props }: Props) {
  const ref = useRef<ConfirmRestartDialogRef>(null);
  const { formatMessage } = useMessage();
  const [opened, setOpened] = useState<number>();
  const [selected, setSelected] = useState<number>();

  if (!part) {
    return <></>;
  }
  const levelKeys = soulRules[part];
  const subtitle = hasSubTitle.some((item) => item === part);

  function handleTouch(level: number) {
    setOpened(level);
  }

  function handleRestart(level: number) {
    setSelected(level);
    ref.current?.open();
  }

  function handleConfirm(confirm: boolean) {
    if (confirm && selected) {
      props.onRestart(selected as any);
    }
    ref.current?.close();
  }

  return (
    <Animated.View entering={FadeInUp.delay(400).duration(50).springify()} style={styles.container}>
      <HStack style={styles.header}>
        <VStack style={GlobalStyles.center}>
          <Text
            variant="titleSmall"
            style={{ fontWeight: '900', fontSize: Font.size(arabic ? 18 : 15), textAlign: 'center' }}
          >
            {formatMessage(`purification.soul.${part}.title`)}
          </Text>
          {subtitle && <Text variant="titleSmall">{formatMessage(`purification.soul.${part}.sub.title`)}</Text>}
        </VStack>
      </HStack>
      <VStack spacing={8}>
        {levelKeys.map((levelKey, index) => (
          <LevelRule
            key={index}
            part={part}
            index={index + 1}
            levelKey={levelKey}
            opened={opened}
            onSelect={props.onStart}
            onTouch={handleTouch}
            onRestart={() => handleRestart(index + 1)}
            onEvaluate={props.onEvaluate}
          />
        ))}
      </VStack>
      <ConfirmRestartDialog ref={ref} onConfirm={handleConfirm} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.center,
    width: '100%',
    paddingBottom: 25,
  },
  header: {
    paddingVertical: 10,
  },
});
