import { memo } from 'react';
import { useApplication } from '../hooks/use-application';
import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';
import Text from './Text';

function Basmalah() {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();
  return (
    <Text
      variant="bodySmall"
      style={{
        fontWeight: '900',
        textAlign: 'justify',
      }}
    >
      {formatMessage(TKeys.BASMALAH)}
    </Text>
  );
}

export default memo(Basmalah);
