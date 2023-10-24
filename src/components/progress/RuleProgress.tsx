import OctIcon from '@expo/vector-icons/Octicons';
import { Box, HStack, Pressable, VStack } from '@react-native-material/core';
import { useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import ProgressLine from '../../domains/common/ProgressLine';
import Rule from '../../domains/common/Rule';
import { useApplication } from '../../hooks/use-application';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import { isCompleted } from '../../services/Helpers';
import GlobalStyles from '../../styles/GlobalStyles';
import Text from '../Text';
import FailedAttempts from './failedAttempts/FailedAttempts';
import { ProgressStatus } from './progressStatus/ProgressStatus';
import ProgressStatusInfo from './progressStatus/ProgressStatusInfo';

interface Props {
  rule: Rule;
  maxDays: number;
  onEvaluate: (rule: Rule) => void;
}

export default function RuleProgress({ rule, maxDays, ...props }: Props) {
  const { formatMessage, intl } = useMessage();
  const { width } = useWindowDimensions();
  const { arabic } = useApplication();
  const [show, setShow] = useState(false);

  const countDays = rule.progress
    ? rule.progress.map((p) => p.day).reduce((total, currentValue) => (total += currentValue), 0)
    : 0;
  const countProgress = rule.progress ? rule.progress.length - 1 : 0;
  const lastDay = rule.progress ? rule.progress[countProgress] : undefined;
  const isLastCompleted = isCompleted(rule.progress, maxDays);

  function handleCollapse() {
    setShow(!show);
  }

  function handleOpen() {
    setShow(!show);
  }

  function handleEvaluate() {
    props.onEvaluate(rule);
  }

  function formatAttempt(line: ProgressLine) {
    return formatMessage(TKeys.PROGRESS_FAILED_ATTEMPTS_RULE_SIMPLE, { day: line.day });
  }

  if (!lastDay) {
    return <></>;
  }
  const endDate =
    lastDay.day >= maxDays && lastDay.evaluated === true && lastDay.errors.length === 0
      ? lastDay.startDate + lastDay.day
      : undefined;
  const failed = lastDay.failedAttempts ? lastDay.failedAttempts : 0;
  return (
    <Box
      style={{
        ...styles.box,
        width: width - 40,
        borderLeftWidth: isLastCompleted ? 8 : 0,
        borderColor: '#20b2aa',
        backgroundColor: isLastCompleted ? '#f5fffa' : '#fffafa',
      }}
    >
      <Pressable onPress={handleOpen} onLongPress={() => setShow(false)}>
        <HStack spacing={1} style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <HStack spacing={2} style={{ alignItems: 'center', paddingHorizontal: 2 }}>
            <IconButton
              icon={(_, ...props) => <OctIcon name={show ? 'chevron-up' : 'chevron-down'} size={15} {...props} />}
              style={{ width: 20, height: 20 }}
              onPressIn={handleCollapse}
            />
            <HStack spacing={10} style={{ width: width - (arabic ? 195 : 200), alignItems: 'center' }}>
              <Text
                style={{
                  fontWeight: '900',
                  fontSize: arabic ? 12 : 10,
                  color: isLastCompleted ? '#20b2aa' : '#ff4500',
                }}
              >
                {rule.title}
              </Text>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: arabic ? 12 : 10,
                }}
              >
                {rule.summary}
              </Text>
            </HStack>
          </HStack>
          <Box style={{ paddingHorizontal: 10 }}>
            <ProgressStatus last={lastDay} count={countProgress} maxDays={maxDays} completed={isLastCompleted} />
          </Box>
        </HStack>
        {show && <Box style={{ padding: 15 }}>{rule.description}</Box>}
      </Pressable>
      {show && (
        <VStack style={{ ...GlobalStyles.center, paddingBottom: 15, paddingTop: 10 }} spacing={13}>
          <Box>
            <ProgressStatusInfo
              label={formatMessage(TKeys.PROGRESS_START_DATE)}
              value={intl.formatDate(lastDay.startDate)}
              icon="calendar"
              color="#000080"
            />
            {endDate && (
              <ProgressStatusInfo
                label={formatMessage(TKeys.PROGRESS_END_DATE)}
                value={intl.formatDate(endDate)}
                icon="calendar-check"
                color="#2e8b57"
              />
            )}
            <ProgressStatusInfo
              label={formatMessage(TKeys.PROGRESS_TOTAL_DAYS)}
              value={countDays}
              icon="calendar-clock-outline"
              color="#4169e1"
            />
            {!endDate && (
              <ProgressStatusInfo
                label={formatMessage(TKeys.PROGRESS_SUCCESSFUL_DAYS)}
                value={`${lastDay.day - failed}/${maxDays}`}
                icon="flag-checkered"
                color="green"
              />
            )}
            <FailedAttempts attempts={rule.progress.slice(0, -1)} attemptFormatter={formatAttempt} />
          </Box>
          {!isLastCompleted && (
            <Button mode="contained" onPress={handleEvaluate} uppercase={false}>
              {formatMessage(TKeys.PROGRESS_START_DAILY_EVALUATION)}
            </Button>
          )}
        </VStack>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  box: {
    paddingVertical: 5,
    borderRadius: 15,
    elevation: 5,
    backgroundColor: 'white',
  },
});
