import { Avatar, Box, Button, VStack } from '@react-native-material/core';
import { useRoute } from '@react-navigation/native';
import { useMemo } from 'react';
import { Alert, StyleSheet } from 'react-native';
import CheckableRule from '../../../../../components/rules/CheckableRule';
import { useApplication } from '../../../../../hooks/use-application';
import { useMessage } from '../../../../../hooks/use-message';
import { BodyPartEvaluationScreenRouteProp } from '../../../../../navigation/types';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import { findPartProps, rules } from '../common/Helper';

export default function BodyPartEvaluationScreen() {
  const { formatMessage } = useMessage();
  const { arabicOrientation } = useApplication();
  const { part, step } = useRoute<BodyPartEvaluationScreenRouteProp>().params;
  const items = useMemo(() => rules[part][step], []);

  function handlePress() {
    Alert.alert('In progress');
  }

  return (
    <VStack spacing={20} style={GlobalStyles.container}>
      <Avatar image={findPartProps(part)} size={100} />
      <VStack spacing={5} mt={25}>
        {items.map((rule: string, index: number) => (
          <Box key={index} style={styles.line}>
            <CheckableRule id={index + 1} item={formatMessage(rule)} reverse={arabicOrientation} />
          </Box>
        ))}
      </VStack>
      <Button title="evaluate" style={styles.button} onPress={handlePress} />
    </VStack>
  );
}

const styles = StyleSheet.create({
  line: {
    marginHorizontal: 20,
  },
  button: {
    marginTop: 30,
  },
});
