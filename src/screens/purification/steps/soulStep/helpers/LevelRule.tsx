import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton, TouchableRipple } from 'react-native-paper';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import Text from '../../../../../components/Text';
import RuleProgress from '../../../../../components/progress/RuleProgress';
import { ProgressStatus } from '../../../../../components/progress/progressStatus/ProgressStatus';
import HStack from '../../../../../components/stack/HStack';
import { Font } from '../../../../../constants/Font';
import { SCREEN_WIDTH } from '../../../../../constants/Screen';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import Soul, { SoulPart } from '../../../../../domains/purification/Soul';
import { useApplication } from '../../../../../hooks/use-application';
import { useMessage } from '../../../../../hooks/use-message';
import useProgress from '../../../../../hooks/use-progress';
import usePurification from '../../../../../hooks/use-purification';
import { TKeys } from '../../../../../locales/constants';
import { PURIFICATION_MAX_DAYS } from '../../../../../services/Helpers';

type Props = {
  part: SoulPart;
  index: number;
  levelKey: TKeys;
  opened: number | undefined;
  onSelect(level: number): void;
  onTouch(level: number): void;
  onEvaluate(part: SoulPart, level: number, checked: boolean): void;
};

export default function LevelRule({ part, index, levelKey, ...props }: Props) {
  const { formatMessage, formatNumber } = useMessage();
  const [open, setOpen] = useState(false);
  const { findSoul, restartSoul } = usePurification();
  const { arabic } = useApplication();
  const soul = findSoul(part, index as any);
  const progress = findSoulLevel(soul);
  const progressProps = useProgress(progress, PURIFICATION_MAX_DAYS);

  function findSoulLevel(soul: Soul | undefined): ProgressLine[] | undefined {
    if (!soul) {
      return undefined;
    }
    return soul.partProgress.find((item) => item.level === index)?.progress;
  }

  function handleStart() {
    props.onSelect(index);
  }

  function handleRestart() {
    restartSoul(part, index as any);
  }

  function handleTouch() {
    props.onTouch(index);
  }

  function handleEvaluate(checked: boolean) {
    props.onEvaluate(part, index, checked);
  }

  function radius() {
    return soul ? 30 : 20;
  }

  useEffect(() => {
    setOpen(index === props.opened);
  }, [props.opened]);

  return (
    <TouchableRipple
      onPress={handleTouch}
      style={{
        ...styles.container,
        elevation: 6,
        paddingRight: open ? 5 : 3,
        paddingHorizontal: 5,
        paddingTop: open ? 5 : 3,
        borderBottomLeftRadius: soul ? 30 : open ? 15 : radius(),
        borderBottomRightRadius: soul ? 30 : open ? 15 : radius(),
        borderTopLeftRadius: radius(),
        borderTopRightRadius: radius(),
        backgroundColor: soul ? (progressProps.completed ? '#8de0b6' : '#dbf6e8') : '#d8f0ff',
      }}
    >
      <View>
        <HStack style={styles.header}>
          <HStack spacing={10}>
            <Icon name="comma-circle" size={22} color={soul ? 'green' : '#4169e1'} />
            <Text
              variant="bodyLarge"
              style={{ ...styles.levelTitle, fontSize: Font.size(open ? 18 : 16) }}
              color={soul ? 'green' : '#4169e1'}
            >
              {formatMessage(TKeys.LEVEL, { value: formatNumber(index) })}
            </Text>
          </HStack>
          <Animated.View entering={SlideInLeft.duration(10).springify()}>
            {!soul ? (
              <Button
                mode="elevated"
                compact
                icon={() => <Icon name="clock-plus" size={15} color="#4169e1" />}
                uppercase={false}
                style={{ height: 30, paddingEnd: 5, marginTop: -3 }}
                labelStyle={{ ...styles.startButtonLabel, fontSize: Font.size(arabic ? 13 : 11) }}
                onTouchStart={handleStart}
              >
                {formatMessage(TKeys.BUTTON_START)}
              </Button>
            ) : (
              <HStack>
                {progressProps.completed && (
                  <IconButton icon="backup-restore" iconColor="red" size={30} onPress={handleRestart} />
                )}
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
    width: SCREEN_WIDTH - 15,
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
