import { useMemo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import Text from '../../../../components/Text';
import BottomSheet, { BottomSheetRef } from '../../../../components/bottomSheet/BottomSheet';
import ProgressView from '../../../../components/progress/ProgressView';
import PressableItem from '../../../../components/progressItem/PressableItem';
import HStack from '../../../../components/stack/HStack';
import VStack from '../../../../components/stack/VStack';
import { SCREEN_WIDTH } from '../../../../constants/Screen';
import { SunnahType } from '../../../../domains/sunnahs/Sunnah';
import { SunnahStage } from '../../../../domains/sunnahs/Sunnahs';
import { useMessage } from '../../../../hooks/use-message';
import useSunnahs from '../../../../hooks/use-sunnahs';
import useWindow from '../../../../hooks/use-window';
import { SUNNAHS_MAX_DAYS, progressPercentage2 } from '../../../../services/Helpers';
import GlobalStyles from '../../../../styles/GlobalStyles';
import { purificationStyles } from '../Style';
import { sunnahsImages } from './Helper';
import SunnahRule from './SunnahRule';

interface Props {
  stage: SunnahStage;
  rules: Record<number, Record<SunnahType, string[]>>;
}
export default function SunnahStageContainer({ stage, rules }: Props) {
  const ref = useRef<BottomSheetRef>(null);
  const { paddingHorizontal } = useWindow();
  const { formatMessage, formatNumber } = useMessage();
  const [id, setId] = useState<number>();
  const { find, create, evaluate, restart, globalPercentage } = useSunnahs();

  const current = id ? find(stage, id) : undefined;

  const sunnahRules = useMemo(() => {
    if (!id) {
      return <></>;
    }
    const { verbal, actional } = rules[id];
    return <SunnahRule verbals={verbal} actionals={actional} hasProgress={current !== undefined} />;
  }, [id]);

  function handlePress(id: number) {
    setId(id);
    ref.current?.open();
  }

  function handleStart() {
    if (id) {
      create(stage, id);
      close();
    }
  }

  function handleRestart() {
    if (id) {
      restart(stage, id);
      close();
    }
  }

  function close() {
    setId(undefined);
    ref.current?.close();
  }

  function handleEvaluate(checked: boolean) {
    if (id) {
      evaluate(stage, id, checked);
    }
  }

  return (
    <BottomSheet
      ref={ref}
      content={
        <ProgressView
          titleKey={`sunnahs.${stage}.${id}.title`}
          summaryKey=""
          summary={sunnahRules}
          progress={current?.progress}
          maxDays={SUNNAHS_MAX_DAYS}
          onStart={handleStart}
          onRestart={handleRestart}
          onEvaluate={handleEvaluate}
        />
      }
    >
      <VStack style={{ ...GlobalStyles.center, paddingHorizontal, paddingTop: 8 }} spacing={10}>
        <HStack style={styles.header} spacing={15}>
          <Avatar.Image source={sunnahsImages[stage]} size={70} />
          <Text variant="bodyMedium" style={purificationStyles.title} color="blue">
            {formatMessage(`sunnahs.${stage}.title`)}
          </Text>
          <CircularProgress
            value={globalPercentage()}
            maxValue={100}
            duration={600}
            radius={35}
            valuePrefix={'%'}
            progressValueStyle={{ fontWeight: '900' }}
            inActiveStrokeColor={'#3cb371'}
            inActiveStrokeOpacity={0.2}
          />
        </HStack>
        <Text variant="bodyMedium" style={styles.introduction}>
          {formatMessage(`sunnahs.${stage}.introduction`)}
        </Text>
      </VStack>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.scroll}>
        <VStack style={GlobalStyles.container}>
          {Object.keys(rules).map((_, index) => {
            const idx = index + 1;
            const current = find(stage, idx);
            const percentage = progressPercentage2(current?.progress, SUNNAHS_MAX_DAYS);

            return (
              <PressableItem
                key={idx}
                index={idx}
                stepTitle={formatNumber(idx)}
                stepTitleSize={14}
                stepTitleWidth={30}
                summaryKey={`sunnahs.${stage}.${idx}.title`}
                inProgress={current !== undefined}
                percentage={percentage}
                flexBasis={47}
                circularProgressRadius={17}
                onPress={() => handlePress(idx as any)}
              />
            );
          })}
        </VStack>
      </ScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  header: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  introduction: {
    textAlign: 'justify',
    marginBottom: 15,
  },
  scroll: {
    ...GlobalStyles.center,
    width: SCREEN_WIDTH,
    paddingVertical: 15,
  },
});
