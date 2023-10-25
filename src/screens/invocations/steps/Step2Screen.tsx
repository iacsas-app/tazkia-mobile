import { StyleSheet } from 'react-native';
import Text from '../../../components/Text';
import ScrollViewLayout from '../../../components/layout/ScrollViewLayout';
import { useApplication } from '../../../hooks/use-application';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';

export default function Step2Screen() {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();

  return (
    <ScrollViewLayout>
      <Text variant="body1" style={{ ...styles.title, color: 'orange', fontSize: arabic ? 28 : 20 }}>
        {formatMessage(TKeys.INVOCATIONS_PART_2_TITLE)}
      </Text>
    </ScrollViewLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
