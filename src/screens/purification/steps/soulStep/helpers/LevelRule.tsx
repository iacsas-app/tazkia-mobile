import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import Text from '../../../../../components/Text';
import Restart from '../../../../../components/progress/Restart';
import RuleProgress from '../../../../../components/progress/RuleProgress';
import Start from '../../../../../components/progress/Start';
import { ProgressStatus } from '../../../../../components/progress/progressStatus/ProgressStatus';
import HStack from '../../../../../components/stack/HStack';
import { Color } from '../../../../../constants/Color';
import { Font } from '../../../../../constants/Font';
import { SCREEN_WIDTH } from '../../../../../constants/Screen';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import { SoulPart } from '../../../../../domains/purification/Soul';
import { useMessage } from '../../../../../hooks/use-message';
import useProgress from '../../../../../hooks/use-progress';
import usePurification from '../../../../../hooks/use-purification';
import { TKeys } from '../../../../../locales/constants';
import { useSnackbar } from '../../../../../providers/SnackbarProvider';
import { PURIFICATION_MAX_DAYS, isCompleted } from '../../../../../services/Helpers';
import { soulRules } from './data';

type Props = {
  part: SoulPart;
  index: number;
  levelKey: TKeys;
  opened: number | undefined;
  onSelect(level: number): void;
  onTouch(level: number): void;
  onRestart(): void;
  onEvaluate(part: SoulPart, level: number, checked: boolean): void;
};

export default function LevelRule({ part, index, levelKey, ...props }: Props) {
  const { formatMessage } = useMessage();
  const [open, setOpen] = useState(false);
  const { findSoul } = usePurification();
  const { displaySnackbar } = useSnackbar();
  const current = findSoul(part, index as any);
  const progress = findSoulLevel();
  const progressProps = useProgress(progress, PURIFICATION_MAX_DAYS);

  function findSoulLevel(): ProgressLine[] | undefined {
    if (!current) {
      return undefined;
    }
    return current.partProgress.find((item) => item.level === index)?.progress;
  }

  function handleStart() {
    // Check if we can start start this level
    const value = findSoul(part);
    if (value) {
      const lastLevel = value.partProgress.at(value.partProgress.length - 1);
      if (lastLevel) {
        if (!isCompleted(lastLevel.progress, PURIFICATION_MAX_DAYS)) {
          displaySnackbar(formatMessage(TKeys.PURIFICATION_RULE_1, { level: lastLevel.level }), 'warning');
          return;
        }
        if (lastLevel.level !== index - 1 && lastLevel.level != soulRules[part].length) {
          displaySnackbar(formatMessage(TKeys.PURIFICATION_RULE_2, { level: lastLevel.level + 1 }), 'warning');
          return;
        }
      }
    }
    props.onSelect(index);
  }

  function handleTouch() {
    props.onTouch(index);
  }

  function handleEvaluate(checked: boolean) {
    props.onEvaluate(part, index, checked);
  }

  function radius() {
    return current ? 30 : 20;
  }

  useEffect(() => {
    setOpen(index === props.opened);
  }, [props.opened]);

  return (
    <TouchableRipple
      onPress={handleTouch}
      style={{
        ...styles.container,
        paddingTop: open ? 4 : 0,
        borderBottomLeftRadius: current ? 30 : open ? 15 : radius(),
        borderBottomRightRadius: current ? 30 : open ? 15 : radius(),
        borderTopLeftRadius: radius(),
        borderTopRightRadius: radius(),
        backgroundColor: open
          ? Color.active
          : current
          ? progressProps.completed
            ? Color.completed
            : Color.progress
          : Color.noProgress,
      }}
    >
      <View>
        <HStack style={styles.header}>
          <HStack spacing={10}>
            <Icon name={`unfold-${open ? 'less' : 'more'}-horizontal`} size={22} color="teal" />
            <Text
              variant="bodyLarge"
              style={{
                ...styles.levelTitle,
                fontSize: Font.size(open ? 16 : 14),
                color: 'teal',
              }}
            >
              {formatMessage(TKeys.LEVEL, { value: index })}
            </Text>
          </HStack>
          <Animated.View entering={SlideInLeft.duration(10).springify()}>
            {!current ? (
              <Start onStart={handleStart} />
            ) : (
              <HStack>
                {progressProps.completed && <Restart onClick={props.onRestart} />}
                <ProgressStatus
                  last={progressProps.lastDay}
                  count={progressProps.countProgress}
                  maxDays={PURIFICATION_MAX_DAYS}
                  completed={progressProps.completed}
                  valueMarginRight={-2}
                  valueMarginLeft={-4}
                />
              </HStack>
            )}
          </Animated.View>
        </HStack>
        {open && (
          <RuleProgress
            {...progressProps}
            summaryKey={levelKey}
            progress={progress}
            maxDays={PURIFICATION_MAX_DAYS}
            onEvaluate={handleEvaluate}
          />
        )}
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - 10,
    elevation: 4,
    paddingHorizontal: 5,
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
