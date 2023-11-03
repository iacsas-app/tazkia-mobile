import { VStack } from '@react-native-material/core';
import { StyleSheet } from 'react-native';
import Text from '../../../../components/Text';
import ScrollViewLayout from '../../../../components/layout/ScrollViewLayout';
import { useMessage } from '../../../../hooks/use-message';
import { TKeys } from '../../../../locales/constants';

export default function Step3Screen() {
  const { formatMessage } = useMessage();

  return (
    <ScrollViewLayout>
      <Text variant="body1" style={{ ...styles.title, color: '#ff6347', fontSize: 22 }}>
        {formatMessage(TKeys.INVOCATION_STEP_3)}
      </Text>
      <VStack spacing={20}>
        <VStack spacing={10}>
          <Text variant="h6" color="black" style={{ fontWeight: '600' }}>
            {formatMessage(TKeys.INVOCATION_STEP_3_RULE_1_SUMMARY)}
          </Text>
          <Text style={{ fontWeight: '900', fontSize: 17, textAlign: 'justify' }} color="green">
            {formatMessage(TKeys.INVOCATION_STEP_3_RULE_1_BODY)}
          </Text>
          <Text variant="h6" color="black" style={{ textAlign: 'justify', fontSize: 17 }}>
            {formatMessage(TKeys.INVOCATION_STEP_3_RULE_1_DESC)}
          </Text>
        </VStack>
        <VStack spacing={10}>
          <Text variant="h6" color="black" style={{ fontWeight: '600' }}>
            {formatMessage(TKeys.INVOCATION_STEP_3_RULE_2)}
          </Text>
          <Text style={{ textAlign: 'justify', fontSize: 17 }}>
            {formatMessage(TKeys.INVOCATION_STEP_3_RULE_2_DESC)}
          </Text>
        </VStack>
        <VStack spacing={10}>
          <Text variant="h6" color="black" style={{ fontWeight: '600' }}>
            {formatMessage(TKeys.INVOCATION_STEP_3_RULE_3)}
          </Text>
          <Text style={{ textAlign: 'justify', fontSize: 17 }}>
            {formatMessage(TKeys.INVOCATION_STEP_3_RULE_3_DESC)}
          </Text>
        </VStack>
      </VStack>
      <Text style={{ textAlign: 'justify', fontSize: 17, fontWeight: '800' }}>
        {formatMessage(TKeys.INVOCATION_STEP_3_IMPORTANCE)}
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
