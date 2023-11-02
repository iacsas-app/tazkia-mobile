import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import { Box, HStack, VStack } from '@react-native-material/core';
import { StyleSheet } from 'react-native';

import { Button } from 'react-native-paper';
import ProgressLine from '../../../domains/common/ProgressLine';
import { useApplication } from '../../../hooks/use-application';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import { PURIFICATION_MAX_DAYS, capitalize, isCompleted, progressPercentage } from '../../../services/Helpers';
import GlobalStyles from '../../../styles/GlobalStyles';
import ProgressBar from '../../ProgressBar';
import Text from '../../Text';
import { FailedAttemptsBase } from '../BaseProps';
import FailedAttempts from '../failedAttempts/FailedAttempts';
import ProgressStatusInfo from './ProgressStatusInfo';

interface Props extends FailedAttemptsBase {
  title: string;
  lines: ProgressLine[];
  last: ProgressLine;
  maxDays: number;
  iconName: string;
  iconColor: string;
  backgroundColor: string;
  onEvaluate: () => void;
}
export default function ProgressStatusContainer(props: Props) {
  const { title, iconName, iconColor, backgroundColor, lines, maxDays } = props;
  const { formatMessage, intl } = useMessage();
  const { arabic } = useApplication();
  const last = props.last;

  const completed = isCompleted(props.lines, PURIFICATION_MAX_DAYS);
  const radius = completed ? 15 : 0;
  const endDate =
    last.day >= maxDays && last.evaluated === true && last.errors.length === 0 ? last.startDate + last.day : undefined;

  return (
    <>
      <Box
        style={{
          ...styles.container,
          backgroundColor,
          borderBottomLeftRadius: radius,
          borderBottomRightRadius: radius,
        }}
      >
        <VStack spacing={11}>
          <Box mb={1}>
            <HStack spacing={10} style={styles.center}>
              <Icon name={iconName as any} size={28} color={iconColor} />
              <Text style={{ fontWeight: '700', fontSize: arabic ? 20 : 15 }}>{capitalize(title)}</Text>
            </HStack>
          </Box>
          <Box>
            <ProgressStatusInfo
              label={formatMessage(TKeys.PROGRESS_START_DATE)}
              value={intl.formatDate(last.startDate)}
              icon="calendar"
              color="#000080"
            />
            {endDate && (
              <ProgressStatusInfo
                label={formatMessage(TKeys.PROGRESS_END_DATE)}
                value={intl.formatDate(endDate)}
                icon="calendar"
                color="#2e8b57"
              />
            )}
            {!endDate && (
              <>
                <ProgressStatusInfo
                  label={formatMessage(TKeys.PROGRESS_TITLE)}
                  value={progressPercentage(last.day, maxDays)}
                  icon="progress-clock"
                  color="black"
                />
                <ProgressStatusInfo
                  label={formatMessage(TKeys.PROGRESS_SUCCESSFUL_DAYS)}
                  value={`${last.day}/${maxDays}`}
                  icon="flag-checkered"
                  color="green"
                />
              </>
            )}
            <FailedAttempts attempts={lines.slice(0, -1)} attemptFormatter={props.attemptFormatter} />
          </Box>
          {endDate ? (
            <Box style={GlobalStyles.center}>
              <Icon name="check-decagram" size={50} color="green" />
            </Box>
          ) : (
            <Button mode="contained" buttonColor="green" onPress={props.onEvaluate} uppercase={false}>
              {formatMessage(TKeys.PROGRESS_START_DAILY_EVALUATION)}
            </Button>
          )}
        </VStack>
      </Box>
      {!completed && <ProgressBar day={last.day} maxDays={PURIFICATION_MAX_DAYS} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 15, elevation: 1 },
  center: { alignItems: 'center', width: 200 },
});
