import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';
import Text from './Text';

export default function Basmalah() {
  const { formatMessage } = useMessage();
  return (
    <Text
      style={{
        paddingVertical: 1,
        fontSize: 14,
        fontWeight: '900',
        textAlign: 'justify',
      }}
    >
      {formatMessage(TKeys.BASMALAH)}
    </Text>
  );
}
