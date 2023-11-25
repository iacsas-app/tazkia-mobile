import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import Animated, { FadeInUp } from 'react-native-reanimated';
import Text from '../../../../../components/Text';
import HStack from '../../../../../components/stack/HStack';
import VStack from '../../../../../components/stack/VStack';
import { SoulPart } from '../../../../../domains/purification/Soul';
import { useMessage } from '../../../../../hooks/use-message';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import LevelRule from './LevelRule';
import { hasSubTitle, soulRules } from './data';

interface Props {
  part: SoulPart | undefined;
  onStart(level: number): void;
  onEvaluate(part: SoulPart, level: number, checked: boolean): void;
}
export default function LevelChooser({ part, ...props }: Props) {
  const { formatMessage, formatNumber } = useMessage();
  const [opened, setOpened] = useState<number>();

  if (!part) {
    return <></>;
  }
  const levelKeys = soulRules[part];
  const subtitle = hasSubTitle.some((item) => item === part);

  function handleTouch(level: number) {
    setOpened(level);
  }

  return (
    <Animated.View entering={FadeInUp.delay(400).duration(50).springify()} style={styles.container}>
      <HStack spacing={20} style={styles.header}>
        <Avatar.Text label={formatNumber(part)} size={35} color="#191970" style={{ backgroundColor: '#add8e6' }} />
        <VStack style={GlobalStyles.center}>
          <Text variant="titleLarge" style={{ fontWeight: '900', fontSize: 18, textAlign: 'center' }}>
            {formatMessage(`purification.soul.${part}.title`)}
          </Text>
          {subtitle && <Text variant="titleSmall">{formatMessage(`purification.soul.${part}.sub.title`)}</Text>}
        </VStack>
      </HStack>
      <VStack style={styles.content} spacing={5}>
        {levelKeys.map((levelKey, index) => (
          <LevelRule
            key={index}
            part={part}
            index={index + 1}
            levelKey={levelKey}
            opened={opened}
            onSelect={props.onStart}
            onTouch={handleTouch}
            onEvaluate={props.onEvaluate}
          />
        ))}
      </VStack>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.center,
    width: '100%',
    paddingBottom: 40,
  },
  header: {
    ...GlobalStyles.center,
    paddingVertical: 5,
  },
  content: {
    flex: 1,
  },
});
