import { Avatar, Box, Button, VStack } from '@react-native-material/core';
import { useRoute } from '@react-navigation/native';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import CheckableRule from '../../../../../components/rules/CheckableRule';
import { useApplication } from '../../../../../hooks/use-application';
import { BodyPartEvaluationScreenRouteProp } from '../../../../../navigation/types';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import { findPartProps, rules } from '../common/Helper';

export default function BodyPartEvaluationScreen() {
  const { arabicOrientation } = useApplication();
  const { part, step } = useRoute<BodyPartEvaluationScreenRouteProp>().params;
  const items = useMemo(() => rules[part][step], []);

  function handlePress() {}

  return (
    <View style={GlobalStyles.container}>
      <Avatar image={findPartProps(part)} size={100} />
      <VStack spacing={5}>
        {items.map((item: string, index: number) => (
          <Box key={index} style={styles.line}>
            <CheckableRule id={index + 1} item={item} reverse={arabicOrientation} />
          </Box>
        ))}
      </VStack>
      <Button title="evaluate" style={styles.button} onPress={handlePress} />
    </View>
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
