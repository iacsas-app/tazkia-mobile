import React, { useCallback, useMemo, useRef, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import BottomSheet, { BottomSheetRef } from '../../../../../components/bottomSheet/BottomSheet';
import PressableItem from '../../../../../components/progressItem/PressableItem';
import VStack from '../../../../../components/stack/VStack';
import { Color } from '../../../../../constants/Color';
import Soul, { SoulPart, SoulPartLevel } from '../../../../../domains/purification/Soul';
import { useApplication } from '../../../../../hooks/use-application';
import { useMessage } from '../../../../../hooks/use-message';
import usePurification from '../../../../../hooks/use-purification';
import { TKeys } from '../../../../../locales/constants';
import { useSnackbar } from '../../../../../providers/SnackbarProvider';
import { PURIFICATION_MAX_DAYS, progressPercentage2 } from '../../../../../services/Helpers';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import LevelSelector from '../helpers/LevelSelector';
import { hasSubTitle, soulRules } from '../helpers/data';

export default function HomeScreen() {
  const ref = useRef<BottomSheetRef>(null);
  const { arabic } = useApplication();
  const [part, setPart] = useState<SoulPart>();
  const { formatMessage } = useMessage();
  const { displaySnackbar } = useSnackbar();
  const { createSoul, findSoul, evaluateSoul, restartSoul } = usePurification();

  const parts: string[] = useMemo(() => Object.keys(soulRules), []);
  const levels: number[] = useMemo(() => Object.values(soulRules).map((item) => item.length), []);

  function handleStart(level: SoulPartLevel) {
    if (part) {
      createSoul(part, level);
      close();
      displaySnackbar(formatMessage(TKeys.MESSAGE_ADDED_SUCCESSFULLY), 'success');
    }
  }

  function handleRestart(level: SoulPartLevel) {
    if (part) {
      restartSoul(part, level);
      close();
    }
  }

  function handlePress(part: SoulPart) {
    setPart(part);
    ref.current?.open();
  }

  const handleEvaluate = useCallback((part: SoulPart, level: SoulPartLevel, checked: boolean) => {
    evaluateSoul(part, level, checked);
    displaySnackbar(formatMessage(TKeys.MESSAGE_EVALUATED_SUCCESSFULLY), 'success');
  }, []);

  function close() {
    setPart(undefined);
    ref.current?.close();
  }

  function getProgress(value: Soul | undefined): string[] | undefined {
    return value ? value.partProgress.map((p) => formatMessage(TKeys.LEVEL, { value: p.level })) : [];
  }

  function getSum(value: Soul | undefined): number {
    return value
      ? value.partProgress
          .map((i) => progressPercentage2(i.progress, PURIFICATION_MAX_DAYS))
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      : 0;
  }

  return (
    <BottomSheet
      ref={ref}
      style={{ backgroundColor: Color.backgroundColor }}
      content={
        <LevelSelector part={part} onStart={handleStart} onRestart={handleRestart} onEvaluate={handleEvaluate} />
      }
    >
      <SafeAreaView>
        <ScrollView contentContainerStyle={{ ...GlobalStyles.center, paddingVertical: 15 }}>
          <VStack>
            {parts.map((soulPart, index) => {
              const hasSubtitle = hasSubTitle.some((part) => part.toString() === soulPart);
              const soul = findSoul(soulPart as any);
              const hasProgress = soul !== undefined;
              const idx = index + 1;
              const size = soul ? levels[soul.part - 1] : 0;

              return (
                <PressableItem
                  key={idx}
                  index={idx}
                  stepTitle={idx.toString()}
                  partTitleSize={arabic ? 14 : 12}
                  stepTitleSize={12}
                  stepTitleWidth={27}
                  summaryKey={`purification.soul.${soulPart}.title`}
                  subSummaryKey={hasSubtitle ? `purification.soul.${soulPart}.sub.title` : undefined}
                  inProgress={hasProgress}
                  percentage={getSum(soul) / size}
                  progress={getProgress(soul)}
                  arabic={arabic}
                  circularProgressRadius={21}
                  subSummarySize={11}
                  onPress={() => handlePress(idx as any)}
                />
              );
            })}
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </BottomSheet>
  );
}
