import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Box, HStack, IconButton } from '@react-native-material/core';
import { useState } from 'react';
import ProgressLine from '../../../domains/common/ProgressLine';
import { useApplication } from '../../../hooks/use-application';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import GlobalStyles from '../../../styles/GlobalStyles';
import { FailedAttemptsBase } from '../BaseProps';
import ProgressStatusInfo from '../progressStatus/ProgressStatusInfo';
import FailedAttempt from './FailedAttempt';

interface Props extends FailedAttemptsBase {
  attempts: ProgressLine[];
}

export default function FailedAttempts({ attempts, attemptFormatter }: Props) {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();
  const [open, setOpen] = useState(false);
  const count = attempts.length;

  function handlePress() {
    setOpen(!open);
  }

  if (count === 0) {
    return <></>;
  }

  return (
    <Box mt={-10}>
      <HStack style={GlobalStyles.centerAlign} reverse={arabic}>
        <ProgressStatusInfo
          label={formatMessage(TKeys.PROGRESS_FAILED_ATTEMPTS)}
          value={count}
          icon="repeat-off"
          color="#ff4500"
        />
        <IconButton
          icon={() => <Icon name={open ? 'eye-off' : 'history'} size={23} color="#2e8b57" />}
          onPress={handlePress}
        />
      </HStack>
      {open && (
        <Box mt={10}>
          {attempts.map((attempt, index: number) => (
            <FailedAttempt key={index} attempt={attempt} reverse={arabic} attemptFormatter={attemptFormatter} />
          ))}
        </Box>
      )}
    </Box>
  );
}
