import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import { Box, Button, HStack, Text, VStack } from '@react-native-material/core';
import { StyleSheet } from 'react-native';

import ProgressLine from '../../../domains/common/ProgressLine';
import { useApplication } from '../../../hooks/use-application';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import { capitalize, progressPercentage } from '../../../services/Helpers';
import GlobalStyles from '../../../styles/GlobalStyles';
import { FailedAttemptsBase } from '../BaseProps';
import FailedAttempts from '../failedAttempts/FailedAttempts';
import ProgressStatusInfo from './ProgressStatusInfo';

interface Props extends FailedAttemptsBase {
  title: string;
  lines: ProgressLine[];
  maxDays: number;
  iconName: string;
  iconColor: string;
  backgroundColor: string;
  onEvaluate: () => void;
}
export default function ProgressStatusContainer(props: Props) {
  const { title, iconName, iconColor, backgroundColor, lines, maxDays } = props;
  const { formatMessage, intl } = useMessage();
  const { arabicOrientation } = useApplication();
  const last = lines.at(lines.length - 1);

  if (!last) {
    return <></>;
  }
  const endDate =
    last.day >= maxDays && last.evaluated === true && last.errors.length === 0 ? last.startDate + last.day : undefined;

  return (
    <Box style={{ ...styles.container, backgroundColor }}>
      <VStack spacing={15}>
        <Box mb={15}>
          <HStack spacing={15} style={styles.center} reverse={arabicOrientation}>
            <Icon name={iconName as any} size={35} color={iconColor} />
            <Text variant="h5" style={{ fontWeight: '700' }}>
              {capitalize(title)}
            </Text>
          </HStack>
        </Box>
        <Box>
          <ProgressStatusInfo
            label={formatMessage(TKeys.PROGRESS_START_DATE)}
            value={intl.formatDate(last.startDate)}
            icon="calendar"
            color="#000080"
            reverse={arabicOrientation}
          />
          {endDate && (
            <ProgressStatusInfo
              label={formatMessage(TKeys.PROGRESS_END_DATE)}
              value={intl.formatDate(endDate)}
              icon="calendar"
              color="#2e8b57"
              reverse={arabicOrientation}
            />
          )}
          {!endDate && (
            <>
              <ProgressStatusInfo
                label={formatMessage(TKeys.PROGRESS_TITLE)}
                value={progressPercentage(last.day, maxDays)}
                icon="progress-clock"
                color="black"
                reverse={arabicOrientation}
              />
              <ProgressStatusInfo
                label={formatMessage(TKeys.PROGRESS_SUCCESSFUL_DAYS)}
                value={`${last.day}/${maxDays}`}
                icon="flag-checkered"
                color="green"
                reverse={arabicOrientation}
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
          <Button
            style={styles.btn}
            title={formatMessage(TKeys.PROGRESS_START_DAILY_EVALUATION)}
            onPress={props.onEvaluate}
          />
        )}
      </VStack>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 25, paddingVertical: 15, borderRadius: 15, elevation: 1 },
  btn: { marginTop: 10 },
  center: { alignItems: 'center' },
});
