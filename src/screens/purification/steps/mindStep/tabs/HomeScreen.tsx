import { VStack } from '@react-native-material/core';
import React, { useRef, useState } from 'react';
import BottomSheet, { BottomSheetRef } from '../../../../../components/bottomSheet/BottomSheet';
import ProgressView from '../../../../../components/progress/ProgressView';
import PressableItem from '../../../../../components/progressItem/PressableItem';
import { MindLevel } from '../../../../../domains/purification/Mind';
import { useMessage } from '../../../../../hooks/use-message';
import usePurification from '../../../../../hooks/use-purification';
import { TKeys } from '../../../../../locales/constants';
import { PURIFICATION_MAX_DAYS, progressPercentage2 } from '../../../../../services/Helpers';
import GlobalStyles from '../../../../../styles/GlobalStyles';

const levels: MindLevel[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function HomeScreen() {
  const ref = useRef<BottomSheetRef>(null);
  const { formatMessage, formatNumber } = useMessage();
  const [level, setLevel] = useState<MindLevel>();
  const { createMind, findMind, evaluateMind, restartMind } = usePurification();

  const current = level ? findMind(level) : undefined;

  function handlePress(level: MindLevel) {
    setLevel(level);
    ref.current?.open();
  }

  function handleStart() {
    if (level) {
      createMind(level);
      close();
    }
  }

  function handleRestart() {
    if (level) {
      restartMind(level);
      close();
    }
  }

  function close() {
    setLevel(undefined);
    ref.current?.close();
  }

  function handleEvaluate(checked: boolean) {
    if (level) {
      evaluateMind(level, checked);
    }
  }

  return (
    <BottomSheet
      ref={ref}
      content={
        <ProgressView
          titleKey={TKeys.LEVEL}
          titleKeyParams={level ? { value: formatNumber(level) } : undefined}
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
      <VStack style={GlobalStyles.container}>
        {levels.map((level, index) => {
          const mind = findMind(level);
          const percentage = progressPercentage2(mind?.progress, PURIFICATION_MAX_DAYS);
          return (
            <PressableItem
              key={index}
              index={index}
              stepTitle={formatMessage(TKeys.LEVEL, { value: formatNumber(level) })}
              stepTitleSize={9}
              stepTitleWidth={55}
              summaryKey={`purification.mind.summary.level-${level}`}
              inProgress={mind !== undefined}
              percentage={percentage}
              circularProgressRadius={19}
              onPress={() => handlePress((index + 1) as any)}
            />
          );
        })}
      </VStack>
    </BottomSheet>
  );
}
