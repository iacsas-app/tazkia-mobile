import { VStack } from '@react-native-material/core';
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
      <Text variant="body1" style={{ ...styles.title, color: '#ff6347', fontSize: arabic ? 28 : 20 }}>
        {formatMessage(TKeys.INVOCATION_STEP_2)}
      </Text>
      <VStack spacing={20}>
        <VStack spacing={10}>
          <Text variant="h6" color="black" style={{ fontWeight: '600' }}>
            {formatMessage(TKeys.INVOCATION_STEP_2_RULE_1)}
          </Text>
          <Text style={{ textAlign: 'justify', fontSize: 17 }}>
            {formatMessage(TKeys.INVOCATION_STEP_2_RULE_1_DESC)}
          </Text>
        </VStack>
        <VStack spacing={10}>
          <Text variant="h6" color="black" style={{ fontWeight: '600' }}>
            {formatMessage(TKeys.INVOCATION_STEP_2_RULE_2_SUMMARY)}
          </Text>
          <Text style={{ fontWeight: '900', fontSize: 17, textAlign: 'justify' }} color="green">
            {formatMessage(TKeys.INVOCATION_STEP_2_RULE_2_BODY)}
          </Text>
          <Text style={{ textAlign: 'justify', fontSize: 17 }}>
            {formatMessage(TKeys.INVOCATION_STEP_2_RULE_2_DESC)}
          </Text>
        </VStack>
        <VStack spacing={15}>
          <Text style={{ textAlign: 'justify', fontSize: 14, fontWeight: '700', color: '#ff6347' }}>
            {formatMessage(TKeys.INVOCATION_STEP_2_RULE_2_CROYANCE_1)}
          </Text>
          <Text style={{ textAlign: 'justify', fontSize: 14, fontWeight: '700', color: '#ff6347' }}>
            {formatMessage(TKeys.INVOCATION_STEP_2_RULE_2_CROYANCE_2)}
          </Text>
          <Text style={{ textAlign: 'justify', fontSize: 14, fontWeight: '700', color: '#ff6347' }}>
            {formatMessage(TKeys.INVOCATION_STEP_2_RULE_2_CROYANCE_3)}
          </Text>
        </VStack>
        <VStack spacing={10}>
          <Text variant="h6" color="black" style={{ fontWeight: '600' }}>
            {formatMessage(TKeys.INVOCATION_STEP_2_RULE_3)}
          </Text>
          <Text style={{ textAlign: 'justify', fontSize: 17 }}>
            {formatMessage(TKeys.INVOCATION_STEP_2_RULE_3_DESC)}
          </Text>
        </VStack>
        <VStack spacing={10}>
          <Text variant="h6" color="black" style={{ fontWeight: '600' }}>
            {formatMessage(TKeys.INVOCATION_STEP_2_RULE_4)}
          </Text>
          <Text style={{ textAlign: 'justify', fontSize: 17 }}>
            {formatMessage(TKeys.INVOCATION_STEP_2_RULE_4_DESC)}
          </Text>
        </VStack>
      </VStack>
    </ScrollViewLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
