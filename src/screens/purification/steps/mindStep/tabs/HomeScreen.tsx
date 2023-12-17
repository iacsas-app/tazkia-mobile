import React, { useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetRef } from '../../../../../components/bottomSheet/BottomSheet';
import ProgressView from '../../../../../components/progress/ProgressView';
import PressableItem from '../../../../../components/progressItem/PressableItem';
import VStack from '../../../../../components/stack/VStack';
import { Color } from '../../../../../constants/Color';
import { MindLevel, mindLevels } from '../../../../../domains/purification/Mind';
import { useMessage } from '../../../../../hooks/use-message';
import usePurification from '../../../../../hooks/use-purification';
import { TKeys } from '../../../../../locales/constants';
import { useGlobal } from '../../../../../providers/AppProvider';
import { useSnackbar } from '../../../../../providers/SnackbarProvider';
import { PURIFICATION_MAX_DAYS, isCompleted, progressPercentage2 } from '../../../../../services/Helpers';
import GlobalStyles from '../../../../../styles/GlobalStyles';

export default function HomeScreen() {
  const ref = useRef<BottomSheetRef>(null);
  const { arabic } = useGlobal();
  const { formatMessage } = useMessage();
  const [level, setLevel] = useState<MindLevel>();
  const { displaySnackbar } = useSnackbar();
  const { createMind, findMind, evaluateMind, restartMind, lastMindLevel } = usePurification();

  const current = level ? findMind(level) : undefined;

  function handlePress(level: MindLevel) {
    setLevel(level);
    ref.current?.open();
  }

  function handleStart() {
    if (level) {
      const last = lastMindLevel();
      if (last) {
        if (!isCompleted(last.progress, PURIFICATION_MAX_DAYS)) {
          displaySnackbar(formatMessage(TKeys.PURIFICATION_RULE_1, { level: last.level }), 'warning');
          return;
        }
        if (level - 1 !== last.level) {
          displaySnackbar(formatMessage(TKeys.PURIFICATION_RULE_2, { level: last.level + 1 }), 'warning');
          return;
        }
      }

      createMind(level);
      close();
      displaySnackbar(formatMessage(TKeys.MESSAGE_ADDED_SUCCESSFULLY), 'success');
    }
  }

  function handleRestart() {
    if (level) {
      restartMind(level);
      close();
    }
  }

  function handleEvaluate(checked: boolean) {
    if (level) {
      evaluateMind(level, checked);
      close();
      displaySnackbar(formatMessage(TKeys.MESSAGE_EVALUATED_SUCCESSFULLY), 'success');
    }
  }

  function close() {
    setLevel(undefined);
    ref.current?.close();
  }

  return (
    <BottomSheet
      ref={ref}
      style={{ backgroundColor: Color.backgroundColor }}
      content={
        <ProgressView
          titleKey={TKeys.LEVEL}
          titleKeyParams={level ? { value: level } : undefined}
          subTitleKey={`purification.mind.summary.level-${level}`}
          summaryKey={`purification.mind.description.level-${level}`}
          progress={current?.progress}
          maxDays={PURIFICATION_MAX_DAYS}
          onStart={handleStart}
          onRestart={handleRestart}
          onEvaluate={handleEvaluate}
        />
      }
    >
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
          <VStack>
            {mindLevels.map((level, index) => {
              const mind = findMind(level);
              const percentage = progressPercentage2(mind?.progress, PURIFICATION_MAX_DAYS);
              return (
                <PressableItem
                  key={index}
                  index={index}
                  stepTitle={formatMessage(TKeys.LEVEL, { value: level })}
                  stepTitleSize={9}
                  stepTitleWidth={55}
                  partTitleSize={arabic ? 13 : 10}
                  summaryKey={`purification.mind.summary.level-${level}`}
                  inProgress={mind !== undefined}
                  percentage={percentage}
                  arabic={arabic}
                  circularProgressRadius={18}
                  onPress={() => handlePress((index + 1) as any)}
                />
              );
            })}
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: { ...GlobalStyles.center, paddingTop: 15, paddingBottom: 65 },
});
