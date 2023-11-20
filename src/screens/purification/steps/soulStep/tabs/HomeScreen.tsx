import React, { useCallback, useMemo, useRef, useState } from 'react';
import BottomSheet, { BottomSheetRef } from '../../../../../components/bottomSheet/BottomSheet';
import PressableItem from '../../../../../components/progressItem/PressableItem';
import VStack from '../../../../../components/stack/VStack';
import Soul, { SoulPart, SoulPartLevel } from '../../../../../domains/purification/Soul';
import { useMessage } from '../../../../../hooks/use-message';
import usePurification from '../../../../../hooks/use-purification';
import { TKeys } from '../../../../../locales/constants';
import { PURIFICATION_MAX_DAYS, progressPercentage2 } from '../../../../../services/Helpers';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import LevelChooser from '../helpers/LevelChooser';
import { hasSubTitle, soulRules } from '../helpers/data';

export default function HomeScreen() {
  const ref = useRef<BottomSheetRef>(null);
  const [part, setPart] = useState<SoulPart>();
  const { formatMessage, formatNumber } = useMessage();
  const { createSoul, findSoul, evaluateSoul } = usePurification();

  const parts: string[] = useMemo(() => Object.keys(soulRules), []);
  const levels: number[] = useMemo(() => Object.values(soulRules).map((item) => item.length), []);

  function handleStart(level: SoulPartLevel) {
    if (part) {
      createSoul(part, level);
      setPart(undefined);
      ref.current?.close();
    }
  }

  function handlePress(level: SoulPart) {
    setPart(level);
    ref.current?.open();
  }

  const handleEvaluate = useCallback((part: SoulPart, level: SoulPartLevel, checked: boolean) => {
    evaluateSoul(part, level, checked);
  }, []);

  function getProgress(value: Soul | undefined): string[] | undefined {
    return value ? value.partProgress.map((p) => formatMessage(TKeys.LEVEL, { value: formatNumber(p.level) })) : [];
  }

  function getSum(value: Soul | undefined): number {
    return value
      ? value.partProgress
          .map((i) => progressPercentage2(i.progress, PURIFICATION_MAX_DAYS))
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      : 0;
  }

  return (
    <BottomSheet ref={ref} content={<LevelChooser part={part} onStart={handleStart} onEvaluate={handleEvaluate} />}>
      <VStack style={GlobalStyles.container}>
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
              stepTitle={formatNumber(idx)}
              stepTitleSize={14}
              stepTitleWidth={30}
              summaryKey={`purification.soul.${soulPart}.title`}
              subSummaryKey={hasSubtitle ? `purification.soul.${soulPart}.sub.title` : undefined}
              inProgress={hasProgress}
              percentage={getSum(soul) / size}
              progress={getProgress(soul)}
              flexBasis={60}
              circularProgressRadius={25}
              subSummarySize={12}
              onPress={() => handlePress(idx as any)}
            />
          );
        })}
      </VStack>
    </BottomSheet>
  );
}
