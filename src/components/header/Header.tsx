import { VStack } from '@react-native-material/core';
import { StyleSheet } from 'react-native';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import Text from '../Text';

export default function Header() {
  const { formatMessage } = useMessage();
  return (
    <VStack>
      <Text variant="body1" style={styles.title}>
        {formatMessage(TKeys.APPLICATION_TITLE_PRIMARY)}
      </Text>
      <Text variant="caption">{formatMessage(TKeys.APPLICATION_TITLE_SECONDARY)}</Text>
    </VStack>
  );
}

const styles = StyleSheet.create({
  title: { fontWeight: 'bold' },
});
