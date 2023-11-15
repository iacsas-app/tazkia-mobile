import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import VStack from '../../../../../components/stack/VStack';
import { SoulPart } from '../../../../../domains/purification/Soul';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import LevelRule from './LevelRule';
import { soulRules } from './data';

interface Props {
  part: SoulPart | undefined;
  onSelect(level: number): void;
  onToogle: () => void;
  onEvaluate(part: SoulPart, level: number, checked: boolean): void;
}
export default function LevelChooser({ part, onSelect, onToogle, onEvaluate }: Props) {
  const [opened, setOpened] = useState<number>();
  if (!part) {
    return <></>;
  }
  const levelKeys = soulRules[part];

  function handleTouch(level: number) {
    setOpened(level);
  }

  return (
    <View style={GlobalStyles.container}>
      <Icon name="chevron-down" size={35} style={{ fontWeight: '900' }} onPress={onToogle} />
      <VStack style={styles.container} spacing={5}>
        {levelKeys.map((levelKey, index) => (
          <LevelRule
            key={index}
            part={part}
            index={index + 1}
            levelKey={levelKey}
            opened={opened}
            onSelect={onSelect}
            onTouch={handleTouch}
            onEvaluate={onEvaluate}
          />
        ))}
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    flex: 1,
  },
});
