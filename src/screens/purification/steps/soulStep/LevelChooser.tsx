import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import React from 'react';
import { StyleSheet, View } from 'react-native';
import VStack from '../../../../components/stack/VStack';
import { SoulPart } from '../../../../domains/purification/Soul';
import GlobalStyles from '../../../../styles/GlobalStyles';
import LevelRule from './LevelRule';
import { soulRules } from './data';

interface Props {
  part: SoulPart | undefined;
  onSelect(level: number): void;
  onToogle: () => void;
}
export default function LevelChooser({ part, onSelect, onToogle }: Props) {
  if (!part) {
    return <></>;
  }
  const levelKeys = soulRules[part];

  return (
    <View style={GlobalStyles.container}>
      <Icon name="chevron-down" size={40} style={{ marginTop: -20, fontWeight: '900' }} onPress={onToogle} />
      <VStack style={styles.container} spacing={10}>
        {levelKeys.map((levelKey, index) => (
          <LevelRule key={index} part={part} index={index + 1} levelKey={levelKey} onSelect={onSelect} />
        ))}
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
});
