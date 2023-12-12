import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import Text from '../../../../../components/Text';

import { useEffect, useState } from 'react';
import Animated, { FadeInDown, SlideInLeft } from 'react-native-reanimated';
import Restart from '../../../../../components/progress/Restart';
import Start from '../../../../../components/progress/Start';
import { ProgressStatus } from '../../../../../components/progress/progressStatus/ProgressStatus';
import HStack from '../../../../../components/stack/HStack';
import VStack from '../../../../../components/stack/VStack';
import { Color } from '../../../../../constants/Color';
import { Font } from '../../../../../constants/Font';
import { SCREEN_WIDTH } from '../../../../../constants/Screen';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import { BodyPartType, PurificationStage } from '../../../../../domains/purification/BodyPart';
import { useApplication } from '../../../../../hooks/use-application';
import { useMessage } from '../../../../../hooks/use-message';
import useProgress from '../../../../../hooks/use-progress';
import usePurification from '../../../../../hooks/use-purification';
import { TKeys } from '../../../../../locales/constants';
import { arabic } from '../../../../../locales/messages/arabic';
import { useSnackbar } from '../../../../../providers/SnackbarProvider';
import { PURIFICATION_MAX_DAYS, isCompleted } from '../../../../../services/Helpers';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import StatusAndEvaluation from '../../../common/StatusAndEvaluation';
import { findStage } from '../common/Helper';

type Props = {
  part: BodyPartType;
  stage: PurificationStage;
  opened: PurificationStage | undefined;
  onStart(stage: PurificationStage): void;
  onOpen(stage: PurificationStage): void;
  onShowRules(stage: PurificationStage): void;
  onRestart(stage: PurificationStage): void;
  onEvaluate(stage: PurificationStage): void;
};
export default function Stage({ part, stage, ...props }: Props) {
  const { formatMessage } = useMessage();
  const { displaySnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const { locale } = useApplication();
  const { findBodyPart } = usePurification();

  const current = findBodyPart(part);
  const progress = findStage(current, stage);
  const hasProgress = progress !== undefined;
  const progressProps = useProgress(progress, PURIFICATION_MAX_DAYS);
  const cleaning = stage === 'cleaning';
  const iconName = cleaning ? 'allergy' : 'lightbulb-on';
  const iconColor = cleaning ? '#4b0082' : '#32cd32';

  function handleStart() {
    const canStart = cleaning || (current && isCompleted(current.cleaning, PURIFICATION_MAX_DAYS));
    if (canStart) {
      props.onStart(stage);
    } else {
      displaySnackbar(formatMessage(TKeys.PURIFICATION_BODYPART_ALERT), 'warning');
    }
  }

  function handleRestart() {
    props.onRestart(stage);
  }

  function handleTouch() {
    if (hasProgress) {
      if (!open) {
        props.onOpen(stage);
      }
    } else {
      props.onShowRules(stage);
    }
  }

  function handleEvaluateShow() {
    props.onEvaluate(stage);
  }

  function formatAttempt(line: ProgressLine) {
    return formatMessage(TKeys.PROGRESS_FAILED_ATTEMPTS_RULE_SIMPLE, { day: line.day });
  }

  useEffect(() => {
    const toOpen = stage === props.opened;
    if (toOpen !== open) {
      setOpen(toOpen);
    }
  }, [props.opened]);

  return (
    <View
      style={{
        ...styles.container,
        elevation: open ? 0.5 : 5,
        backgroundColor: open
          ? Color.active
          : hasProgress
          ? progressProps.completed
            ? Color.completed
            : Color.progress
          : Color.noProgress,
      }}
      onTouchStart={handleTouch}
    >
      <HStack style={styles.header}>
        <HStack spacing={10} style={GlobalStyles.center}>
          <Icon name={iconName} size={22} color="teal" />
          <HStack style={styles.stageTitle} spacing={10}>
            <Text
              variant="bodyMedium"
              style={{
                fontSize: Font.size((open ? 18 : 16) - (locale === 'id' ? 3 : 0)),
                color: 'teal',
                fontWeight: arabic ? '700' : 'normal',
              }}
            >
              {formatMessage(`purification.bodypart.${stage}`)}
            </Text>
            {!open && <Icon name="unfold-more-horizontal" size={20} color="teal" />}
          </HStack>
        </HStack>
        <Animated.View entering={SlideInLeft.duration(10).mass(1).springify()}>
          {!hasProgress ? (
            <Start
              onStart={handleStart}
              disabled={!(cleaning || (current && isCompleted(current.cleaning, PURIFICATION_MAX_DAYS)))}
            />
          ) : (
            <HStack style={GlobalStyles.center}>
              {progressProps.completed && <Restart onClick={handleRestart} />}
              <ProgressStatus
                last={progressProps.lastDay}
                count={progressProps.countProgress}
                maxDays={PURIFICATION_MAX_DAYS}
                completed={progressProps.completed}
                activeStrokeWidth={10}
                valueMarginLeft={2}
                valueMarginRight={-1}
                valuePrefixSize={10}
              />
            </HStack>
          )}
        </Animated.View>
      </HStack>
      {open && (
        <Animated.View entering={FadeInDown.springify()} style={styles.footer}>
          <VStack style={GlobalStyles.center}>
            <Button
              mode="elevated"
              icon={() => <Icon name={iconName} size={20} color={iconColor} />}
              uppercase={false}
              textColor={iconColor}
              labelStyle={styles.systemLabel}
              style={styles.system}
              compact={true}
              onPress={() => props.onShowRules(stage)}
            >
              {formatMessage(`${stage}.bodypart.disciplinary-system`)}
            </Button>
            <Divider style={styles.divider} />
            <StatusAndEvaluation
              {...progressProps}
              progress={progress}
              align={progressProps.completed ? 'center' : 'space-between'}
              maxDays={PURIFICATION_MAX_DAYS}
              formatAttempt={formatAttempt}
              onEvaluate={handleEvaluateShow}
            />
          </VStack>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - 30,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingVertical: 5,
  },
  stageTitle: {
    alignContent: 'stretch',
    alignItems: 'center',
    alignSelf: 'center',
    fontWeight: '900',
    color: '#4169e1',
    width: SCREEN_WIDTH - 200,
  },
  footer: { paddingVertical: 8 },
  divider: { backgroundColor: '#2e8b57', width: '100%', marginTop: 25 },
  systemLabel: { fontSize: 15, fontWeight: '700' },
  system: { paddingHorizontal: 10, backgroundColor: '#fffafa' },
});
