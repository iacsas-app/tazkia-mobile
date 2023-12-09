import { lowerFirst } from 'lodash';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import PressableStep, { Part } from '../../components/PressableStep';
import VStack from '../../components/stack/VStack';
import { Color } from '../../constants/Color';
import { SCREEN_WIDTH } from '../../constants/Screen';
import { PurificationType } from '../../domains/purification/Purification';
import usePurification from '../../hooks/use-purification';
import GlobalStyles from '../../styles/GlobalStyles';
import { purificationStages } from './common/Helper';

export default function PurificationScreen() {
  const { hasProgress } = usePurification();
  const parts: Part[] = useMemo(() => purificationStages, []);

  return (
    <VStack style={styles.container} spacing={25}>
      {parts.map((item: Part, index: number) => (
        <PressableStep
          key={index}
          item={item}
          index={index}
          hasProgress={hasProgress(lowerFirst(item.route) as PurificationType)}
          style={styles.part}
        />
      ))}
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: Color.backgroundColor,
  },
  part: {
    width: SCREEN_WIDTH - 100,
    paddingVertical: 10,
    borderRadius: 25,
    elevation: 6,
  },
});
