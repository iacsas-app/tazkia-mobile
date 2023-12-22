import { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import Text from '../../../../components/Text';
import BottomSheet, { BottomSheetRef } from '../../../../components/bottomSheet/BottomSheet';
import ProgressDialog, { ProgressDialogRef } from '../../../../components/dialogs/ProgressDialog';
import ProgressView from '../../../../components/progress/ProgressView';
import PressableItem from '../../../../components/progressItem/PressableItem';
import HStack from '../../../../components/stack/HStack';
import VStack from '../../../../components/stack/VStack';
import { Color } from '../../../../constants/Color';
import { Font } from '../../../../constants/Font';
import { SCREEN_WIDTH } from '../../../../constants/Screen';
import ProgressLine from '../../../../domains/common/ProgressLine';
import { SunnahType } from '../../../../domains/sunnahs/Sunnah';
import { SunnahStage } from '../../../../domains/sunnahs/Sunnahs';
import { useMessage } from '../../../../hooks/use-message';
import useSunnahs from '../../../../hooks/use-sunnahs';
import useWindow from '../../../../hooks/use-window';
import { TKeys } from '../../../../locales/constants';
import { useGlobal } from '../../../../providers/AppProvider';
import { useSnackbar } from '../../../../providers/SnackbarProvider';
import { SUNNAHS_MAX_DAYS, progressPercentage2 } from '../../../../services/Helpers';
import GlobalStyles from '../../../../styles/GlobalStyles';
import { sunnahsImages } from './Helper';
import SunnahRule from './SunnahRule';

interface Props {
  stage: SunnahStage;
  rules: Record<number, Record<SunnahType, string[]>>;
}
export default function SunnahStageContainer({ stage, rules }: Props) {
  const ref = useRef<BottomSheetRef>(null);
  const progressDialogRef = useRef<ProgressDialogRef>(null);
  const { arabic } = useGlobal();
  const { paddingHorizontal } = useWindow();
  const { formatMessage } = useMessage();
  const [id, setId] = useState<number>();
  const { displaySnackbar } = useSnackbar();
  const { find, create, evaluate, restart, globalPercentage } = useSunnahs();

  const current = id ? find(stage, id) : undefined;

  const sunnahRules = useMemo(() => {
    if (!id) {
      return <></>;
    }
    const { verbal, actional } = rules[id];
    return <SunnahRule verbals={verbal} actionals={actional} hasProgress={current !== undefined} />;
  }, [id]);

  const questionMultiple: boolean = useMemo(() => {
    if (!id) {
      return false;
    }
    const { verbal, actional } = rules[id];
    return verbal.length > 1 || actional.length > 1;
  }, [id]);

  function handlePress(id: number) {
    setId(id);
    ref.current?.open();
  }

  function handleStart() {
    if (id) {
      create(stage, id);
      close();
      displaySnackbar(formatMessage(TKeys.MESSAGE_ADDED_SUCCESSFULLY), 'success');
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
      close();
      displaySnackbar(formatMessage(TKeys.MESSAGE_EVALUATED_SUCCESSFULLY), 'success');
    }
  }

  const handleHistory = useCallback(
    (progress: ProgressLine[]) => {
      if (id) {
        progressDialogRef.current?.open(
          formatMessage(`sunnahs.${stage}.${id}.title`),
          undefined,
          undefined,
          progress,
          SUNNAHS_MAX_DAYS,
        );
      }
    },
    [id],
  );

  return (
    <BottomSheet
      ref={ref}
      style={{ backgroundColor: Color.backgroundColor }}
      content={
        <ProgressView
          titleKey={`sunnahs.${stage}.${id}.title`}
          summaryKey=""
          summary={sunnahRules}
          progress={current?.progress}
          maxDays={SUNNAHS_MAX_DAYS}
          questionMultiple={questionMultiple}
          onStart={handleStart}
          onRestart={handleRestart}
          onEvaluate={handleEvaluate}
          onHistory={handleHistory}
        />
      }
    >
      <HStack style={styles.header}>
        <Avatar.Image source={sunnahsImages[stage]} size={70} />
        <Text
          variant="bodyMedium"
          style={{ ...styles.summary, fontSize: Font.size(arabic ? 18 : 14), color: 'seagreen' }}
        >
          {formatMessage(`sunnahs.${stage}.title`)}
        </Text>
        <CircularProgress
          value={globalPercentage()}
          maxValue={100}
          duration={600}
          radius={30}
          valueSuffix={arabic ? '' : '%'}
          valuePrefix={arabic ? '%' : ''}
          progressValueStyle={{ fontWeight: '900' }}
          inActiveStrokeColor={'#3cb371'}
          activeStrokeWidth={10}
          inActiveStrokeWidth={10}
          valuePrefixStyle={{ marginRight: -4, marginLeft: 2, fontSize: 10, marginTop: -3 }}
          valueSuffixStyle={{ marginLeft: -2, marginRight: 5 }}
          inActiveStrokeOpacity={0.2}
        />
      </HStack>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.scroll}>
        <Text variant="bodySmall" style={{ ...styles.introduction, paddingHorizontal }}>
          {formatMessage(`sunnahs.${stage}.introduction`)}
        </Text>
        <VStack style={GlobalStyles.container}>
          {Object.keys(rules).map((_, index) => {
            const idx = index + 1;
            const current = find(stage, idx);
            const percentage = progressPercentage2(current?.progress, SUNNAHS_MAX_DAYS);
            return (
              <PressableItem
                key={idx}
                index={idx}
                stepTitle={idx.toString()}
                stepTitleSize={Font.size(12)}
                partTitleSize={Font.size(12)}
                stepTitleWidth={30}
                summaryKey={`sunnahs.${stage}.${idx}.title`}
                inProgress={current !== undefined}
                percentage={percentage}
                flexBasis={47}
                arabic={arabic}
                circularProgressRadius={20}
                onPress={() => handlePress(idx as any)}
              />
            );
          })}
        </VStack>
      </ScrollView>
      <ProgressDialog ref={progressDialogRef} />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 1,
    backgroundColor: '#fffafa',
    height: 80,
    width: '100%',
    top: 0,
  },
  summary: {
    fontFamily: 'ReemKufiFun',
    textAlign: 'center',
    width: SCREEN_WIDTH - 180,
  },
  introduction: {
    textAlign: 'justify',
    marginBottom: 8,
  },
  scroll: {
    ...GlobalStyles.center,
    width: SCREEN_WIDTH,
    paddingVertical: 12,
  },
});
