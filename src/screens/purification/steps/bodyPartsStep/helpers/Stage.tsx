import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Text from '../../../../../components/Text';

import { useEffect, useState } from 'react';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import Restart from '../../../../../components/progress/Restart';
import Start from '../../../../../components/progress/Start';
import { ProgressStatus } from '../../../../../components/progress/progressStatus/ProgressStatus';
import HStack from '../../../../../components/stack/HStack';
import { Font } from '../../../../../constants/Font';
import { SCREEN_WIDTH } from '../../../../../constants/Screen';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import BodyPart, { BodyPartType, PurificationStage } from '../../../../../domains/purification/BodyPart';
import { useMessage } from '../../../../../hooks/use-message';
import useProgress from '../../../../../hooks/use-progress';
import usePurification from '../../../../../hooks/use-purification';
import { PURIFICATION_MAX_DAYS } from '../../../../../services/Helpers';

type Props = {
  part: BodyPartType;
  stage: PurificationStage;
  opened: PurificationStage | undefined;
  onStart(stage: PurificationStage): void;
  onTouch(stage: PurificationStage): void;
  onRestart(stage: PurificationStage): void;
  onEvaluate(stage: PurificationStage, errors: number[]): void;
};
export default function Stage({ part, stage, ...props }: Props) {
  const { formatMessage } = useMessage();
  const [open, setOpen] = useState(false);
  const { findBodyPart } = usePurification();
  const current: BodyPart | undefined = findBodyPart(part);
  const progress = findStage();
  const progressProps = useProgress(progress, PURIFICATION_MAX_DAYS);
  const cleaning = stage === 'cleaning';

  function findStage(): ProgressLine[] | undefined {
    if (!current) {
      return undefined;
    }
    return current[stage];
  }

  function handleStart() {
    props.onStart(stage);
  }

  function handleRestart() {
    props.onRestart(stage);
  }

  function handleTouch() {
    props.onTouch(stage);
  }

  function handleEvaluate(errors: number[]) {
    props.onEvaluate(stage, errors);
  }

  useEffect(() => {
    setOpen(stage === props.opened);
  }, [props.opened]);

  return (
    <TouchableRipple
      style={{
        ...styles.container,
        backgroundColor: progress ? (progressProps.completed ? '#8de0b6' : '#dbf6e8') : '#d8f0ff',
      }}
      onPress={handleTouch}
    >
      <View>
        <HStack style={styles.header}>
          <HStack spacing={10}>
            <Icon
              name={cleaning ? 'account-tie-hat' : 'lightbulb-on'}
              size={22}
              color={cleaning ? '#4b0082' : '#32cd32'}
            />
            <Text
              variant="bodyLarge"
              style={{ ...styles.levelTitle, fontSize: Font.size(open ? 18 : 16) }}
              color={progress ? 'seagreen' : '#4169e1'}
            >
              {formatMessage(`purification.bodypart.${stage}`)}
            </Text>
          </HStack>
          <Animated.View entering={SlideInLeft.duration(10).springify()}>
            {!progress ? (
              <Start onStart={handleStart} />
            ) : (
              <HStack>
                {!progressProps.completed && <Restart onClick={handleRestart} />}
                <ProgressStatus
                  last={progressProps.lastDay}
                  count={progressProps.countProgress}
                  maxDays={PURIFICATION_MAX_DAYS}
                  completed={progressProps.completed}
                />
              </HStack>
            )}
          </Animated.View>
        </HStack>
        {open && <Text>Open</Text>}
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - 50,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 25,
    elevation: 6,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingVertical: 5,
  },
  levelTitle: { fontWeight: '900', color: '#4169e1' },
  startButtonLabel: { fontWeight: '900', color: '#4169e1', marginTop: 3 },
});
