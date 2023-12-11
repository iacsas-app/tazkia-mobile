import { useCallback, useMemo, useRef, useState } from 'react';
import BottomSheet, { BottomSheetRef } from '../../../../../components/bottomSheet/BottomSheet';
import HStack from '../../../../../components/stack/HStack';
import VStack from '../../../../../components/stack/VStack';
import { Color } from '../../../../../constants/Color';
import { BodyPartType, BodyPartsOrder, PurificationStage } from '../../../../../domains/purification/BodyPart';
import usePurification from '../../../../../hooks/use-purification';
import { groupBy } from '../../../../../services/Helpers';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import { PartItem, bodyParts } from '../common/Helper';
import BodyPartItem from '../helpers/BodyPartItem';
import StageSelector from '../helpers/StageSelector';

export default function HomeScreen() {
  const ref = useRef<BottomSheetRef>(null);
  const [selected, setSelected] = useState<BodyPartType>();
  const { createBodyPart, evaluateBodyPart, restartBodyPart } = usePurification();
  const partsByLine = useMemo(() => groupBy(bodyParts, 'line'), []);

  const handlePress = useCallback((part: BodyPartType) => {
    setSelected(part);
    ref.current?.open();
  }, []);

  function handleStart(stage: PurificationStage) {
    if (selected) {
      createBodyPart(selected, stage);
      setSelected(undefined);
      ref.current?.close();
    }
  }

  const handleEvaluate = useCallback(
    (stage: PurificationStage, errors: number[]) => {
      if (selected) {
        evaluateBodyPart(selected, stage, errors);
      }
    },
    [selected],
  );

  const handleRestart = useCallback(
    (stage: PurificationStage) => {
      if (selected) {
        restartBodyPart(selected, stage);
      }
    },
    [selected],
  );

  return (
    <BottomSheet
      ref={ref}
      style={{ backgroundColor: Color.backgroundColor }}
      content={
        <StageSelector part={selected} onStart={handleStart} onRestart={handleRestart} onEvaluate={handleEvaluate} />
      }
    >
      <VStack style={GlobalStyles.container} spacing={20}>
        {Object.keys(partsByLine).map((key: string) => (
          <HStack key={key} spacing={8}>
            {partsByLine[key].map(({ line, ...props }: PartItem, index: number) => (
              <BodyPartItem
                key={`${key}_${index}_${line}`}
                id={BodyPartsOrder[props.part]}
                selected={selected}
                {...props}
                onPress={handlePress}
              />
            ))}
          </HStack>
        ))}
      </VStack>
    </BottomSheet>
  );
}
