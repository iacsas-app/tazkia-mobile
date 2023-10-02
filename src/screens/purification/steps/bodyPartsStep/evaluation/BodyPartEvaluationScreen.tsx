import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Avatar, Button, HStack, Text, VStack } from '@react-native-material/core';
import { useRoute } from '@react-navigation/native';
import { useMemo } from 'react';
import { Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native';
import CheckableRule from '../../../../../components/rules/CheckableRule';
import { useApplication } from '../../../../../hooks/use-application';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import { BodyPartEvaluationScreenRouteProp } from '../../../../../navigation/types';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import { findPartProps, rules } from '../common/Helper';

export default function BodyPartEvaluationScreen() {
  const { formatMessage } = useMessage();
  const { arabicOrientation } = useApplication();
  const { part, step } = useRoute<BodyPartEvaluationScreenRouteProp>().params;
  const items = useMemo(() => rules[part][step], []);
  const isCleaning = step === 'cleaning';

  function handlePress() {
    Alert.alert('In progress');
  }

  function title() {
    const name = formatMessage(`purification.body-parts.${part}_${step === 'cleaning' ? 1 : 2}`);
    const subject = formatMessage(`${step}.bodypart.disciplinary-system`, { name });
    return subject;
  }

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <Avatar image={findPartProps(part)} size={120} />
      <HStack spacing={15} style={styles.system} reverse={arabicOrientation}>
        <Icon name="playlist-check" color="red" size={30} />
        <Text variant="h6" style={styles.title}>
          {formatMessage(TKeys.PROGRESS_EVALUATION_MESSAGE)}
        </Text>
      </HStack>
      <ScrollView>
        <VStack mv={15}>
          {items.map((rule: string, index: number) => (
            <CheckableRule key={index} id={index + 1} item={formatMessage(rule)} reverse={arabicOrientation} />
          ))}
        </VStack>
        <Button title={formatMessage(TKeys.BUTTON_SAVE)} style={styles.action} onPress={handlePress} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    ...GlobalStyles.center,
  },
  action: {
    marginVertical: 25,
    marginHorizontal: 55,
  },
  system: { alignItems: 'flex-start', paddingHorizontal: 15, marginVertical: 15 },
  title: {
    marginBottom: 15,
    textAlign: 'justify',
    fontWeight: '600',
    fontSize: 22,
  },
});
