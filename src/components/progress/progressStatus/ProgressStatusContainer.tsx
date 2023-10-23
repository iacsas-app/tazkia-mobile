import McIcon from '@expo/vector-icons/MaterialCommunityIcons';

import { Box, Button, HStack, Text, VStack } from '@react-native-material/core';
import { StyleSheet } from 'react-native';

import ProgressLine from '../../../domains/common/ProgressLine';
import { useApplication } from '../../../hooks/use-application';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import { progressPercentage } from '../../../services/Helpers';
import { FailedAttemptsBase } from '../BaseProps';
import FailedAttempts from '../failedAttempts/FailedAttempts';
import ProgressStatusInfo from './ProgressStatusInfo';

interface Props extends FailedAttemptsBase {
  title: string;
  backgroundColor: string;
  iconName: string;
  iconColor: string;
  lines: ProgressLine[];
  maxDays: number;
}
export default function ProgressStatusContainer(props: Props) {
  const { title, iconName, iconColor, backgroundColor, lines, maxDays } = props;
  const { formatMessage } = useMessage();
  const { arabicOrientation } = useApplication();
  const last = lines.at(lines.length - 1);

  function handlePress() {}

  if (!last) {
    return <></>;
  }

  return (
    <Box style={{ ...styles.container, backgroundColor }}>
      <VStack spacing={15}>
        <Box mb={15}>
          <HStack spacing={15} style={styles.center} reverse={arabicOrientation}>
            <McIcon name={iconName as any} size={35} color={iconColor} />
            <Text variant="h5" style={{ fontWeight: '700' }}>
              {title}
            </Text>
          </HStack>
        </Box>
        <Box>
          <ProgressStatusInfo
            label={formatMessage(TKeys.PROGRESS_START_DATE)}
            value={last.startDate}
            icon="calendar"
            color="#000080"
            reverse={arabicOrientation}
          />
          <ProgressStatusInfo
            label={formatMessage(TKeys.PROGRESS_TITLE)}
            value={progressPercentage(last.day, maxDays)}
            icon="progress-clock"
            color="#2e8b57"
            reverse={arabicOrientation}
          />
          <ProgressStatusInfo
            label={formatMessage(TKeys.PROGRESS_SUCCESSFUL_DAYS)}
            value={`${last.day}/${maxDays}`}
            icon="flag-checkered"
            color="green"
            reverse={arabicOrientation}
          />
          <FailedAttempts attempts={lines.slice(0, -1)} attemptFormatter={props.attemptFormatter} />
        </Box>
        <Button title={formatMessage(TKeys.PROGRESS_START_DAILY_EVALUATION)} onPress={handlePress} style={styles.btn} />
      </VStack>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 25, paddingVertical: 15, borderRadius: 15 },
  btn: { marginTop: 10 },
  center: { alignItems: 'center' },
});
