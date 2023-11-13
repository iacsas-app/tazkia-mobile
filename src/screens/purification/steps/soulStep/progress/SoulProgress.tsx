import { useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetRefProps } from '../../../../../components/BottomSheet';
import Text from '../../../../../components/Text';
import ProgressContainer from '../../../../../components/progress/ProgressContainer';
import VStack from '../../../../../components/stack/VStack';
import Soul, { SoulPart, SoulPartLevel } from '../../../../../domains/purification/Soul';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import { PurificationParamList } from '../../../../../navigation/types';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import SoulProgressItem from './SoulProgressItem';

interface SoulProgressProps {
  items: Soul[];
  onAdd: (route: keyof PurificationParamList) => void;
}

export default function SoulProgress({ items, onAdd }: SoulProgressProps) {
  const { formatMessage } = useMessage();

  const ref = useRef<BottomSheetRefProps>(null);
  const [level, setLevel] = useState<SoulPartLevel>();

  const handleClick = useCallback((part: SoulPart, level: SoulPartLevel) => {
    const isActive = ref?.current?.isActive();
    setLevel(level);
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-200);
    }
  }, []);

  function handleAddAction() {
    onAdd('Soul');
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <ProgressContainer
        title={formatMessage(TKeys.PURIFICATION_SOUL_TITLE)}
        subtitle={formatMessage(TKeys.PHASE_3)}
        variant="blue"
        onAdd={handleAddAction}
      >
        <View style={GlobalStyles.container}>
          <VStack style={styles.container} spacing={8}>
            {items.map((item) => (
              <SoulProgressItem key={item.part} soul={item} onClick={handleClick} />
            ))}
          </VStack>
        </View>
      </ProgressContainer>
      <BottomSheet ref={ref}>
        <View style={{ flex: 1, backgroundColor: 'orange' }}>
          <Text variant="h1">{level}</Text>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d5ecf37a',
  },
});
