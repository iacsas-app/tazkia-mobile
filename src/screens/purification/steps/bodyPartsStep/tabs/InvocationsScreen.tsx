import { Image } from 'react-native';

import { List } from 'react-native-paper';
import Text from '../../../../../components/Text';
import ScrollViewLayout from '../../../../../components/layout/ScrollViewLayout';
import VStack from '../../../../../components/stack/VStack';
import { SCREEN_WIDTH } from '../../../../../constants/Screen';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import InvocationAccordion from '../../../common/InvocationAccordion';
import { purificationStyles } from '../../../common/Style';

export default function InvocationsScreen() {
  const { formatMessage } = useMessage();

  return (
    <ScrollViewLayout>
      <Text variant="bodyLarge" style={purificationStyles.title} color="seagreen">
        {formatMessage(TKeys.INVOCATION_STEP_1)}
      </Text>
      <List.AccordionGroup>
        <InvocationAccordion id={1} titleKey={TKeys.INVOCATION_STEP_1_RULE_1_SUMMARY} duration={15}>
          <VStack spacing={10}>
            <Text
              variant="bodyLarge"
              style={{ fontWeight: '900', fontSize: 17, textAlign: 'justify' }}
              color="seagreen"
            >
              {formatMessage(TKeys.INVOCATION_STEP_1_RULE_1_BODY)}
            </Text>
            <Text variant="bodyLarge" style={{ textAlign: 'justify', fontSize: 17 }}>
              {formatMessage(TKeys.INVOCATION_STEP_1_RULE_1_DESC)}
            </Text>
            <VStack spacing={15}>
              <Text
                variant="bodyLarge"
                style={{ textAlign: 'justify', fontSize: 14, fontWeight: '700', color: '#ff6347' }}
              >
                {formatMessage(TKeys.INVOCATION_STEP_1_RULE_1_CROYANCE_1)}
              </Text>
              <Text
                variant="bodyLarge"
                style={{ textAlign: 'justify', fontSize: 14, fontWeight: '700', color: '#ff6347' }}
              >
                {formatMessage(TKeys.INVOCATION_STEP_1_RULE_1_CROYANCE_2)}
              </Text>
              <Text
                variant="bodyLarge"
                style={{ textAlign: 'justify', fontSize: 14, fontWeight: '700', color: '#ff6347' }}
              >
                {formatMessage(TKeys.INVOCATION_STEP_1_RULE_1_CROYANCE_3)}
              </Text>
            </VStack>
          </VStack>
        </InvocationAccordion>
        <InvocationAccordion id={2} titleKey={TKeys.INVOCATION_STEP_1_RULE_2} duration={15}>
          <Text variant="bodyLarge" style={{ textAlign: 'justify', fontSize: 17 }}>
            {formatMessage(TKeys.INVOCATION_STEP_1_RULE_2_DESC)}
          </Text>
        </InvocationAccordion>
        <InvocationAccordion id={3} titleKey={TKeys.INVOCATION_STEP_1_RULE_3} duration={10}>
          <VStack spacing={10}>
            <Text variant="bodyLarge" style={{ textAlign: 'justify', fontSize: 17 }}>
              {formatMessage(TKeys.INVOCATION_STEP_1_RULE_3_DESC)}
            </Text>
            <Image
              source={require('../../../../../../assets/img/purification/soul/mourakaba.png')}
              style={{ width: SCREEN_WIDTH - 100, aspectRatio: 1, borderRadius: 40 }}
            />
          </VStack>
        </InvocationAccordion>
      </List.AccordionGroup>
    </ScrollViewLayout>
  );
}
