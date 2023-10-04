import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Avatar, Button, HStack, Text, VStack } from '@react-native-material/core';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native';
import CheckableRule from '../../../../../components/rules/CheckableRule';
import { useApplication } from '../../../../../hooks/use-application';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import { BodyPartEvaluationNavigationProp, BodyPartEvaluationScreenRouteProp } from '../../../../../navigation/types';
import { useStoreActions } from '../../../../../stores/hooks';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import { findPartProps } from '../common/Helper';
import { rules } from '../common/data';

export default function BodyPartEvaluationScreen() {
  const { formatMessage } = useMessage();
  const [selected, setSelected] = useState<number[]>([]);
  const { arabic } = useApplication();
  const { part, step } = useRoute<BodyPartEvaluationScreenRouteProp>().params;
  const navigation = useNavigation<BodyPartEvaluationNavigationProp>();
  const evaluate = useStoreActions((actions) => actions.purification.evaluateBodyPart);
  const items = useMemo(() => rules[part][step], []);

  function handleSelect(id: number) {
    setSelected([...selected, id]);
  }
  function handleUnselect(id: number) {
    setSelected(selected.filter((item) => item !== id));
  }
  function handleSave() {
    evaluate([part, step, selected.sort()]).then(() => navigation.push('PurificationProgress'));
  }

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <Avatar image={findPartProps(part)} size={120} />
      <HStack spacing={15} style={styles.system} reverse={arabic}>
        <Icon name="playlist-check" color="red" size={30} />
        <Text variant="h6" style={styles.title}>
          {formatMessage(TKeys.PROGRESS_EVALUATION_MESSAGE)}
        </Text>
      </HStack>
      <ScrollView>
        <VStack mv={15}>
          {items.map((rule: string, index: number) => (
            <CheckableRule
              key={index}
              id={index + 1}
              item={formatMessage(rule)}
              reverse={arabic}
              onSelect={handleSelect}
              onUnselect={handleUnselect}
            />
          ))}
        </VStack>
        <Button title={formatMessage(TKeys.BUTTON_SAVE)} style={styles.action} onPress={handleSave} />
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
