import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Avatar, Button, HStack, VStack } from '@react-native-material/core';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import Text from '../../../../../components/Text';
import ScrollViewLayout from '../../../../../components/layout/ScrollViewLayout';
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
    evaluate([part, step, selected.sort()]).then(() => navigation.popToTop());
  }

  return (
    <ScrollViewLayout>
      <Avatar image={findPartProps(part)} size={90} />
      <HStack spacing={15} style={styles.system} reverse={arabic}>
        <Icon name="playlist-check" color="red" size={30} />
        <Text variant="h6" style={{ ...styles.title, fontSize: arabic ? 20 : 15 }}>
          {formatMessage(TKeys.PROGRESS_EVALUATION_MESSAGE)}
        </Text>
      </HStack>
      <VStack mv={15}>
        {items.map((rule: string, index: number) => (
          <CheckableRule
            key={index}
            id={index + 1}
            item={formatMessage(rule)}
            onSelect={handleSelect}
            onUnselect={handleUnselect}
          />
        ))}
      </VStack>
      <Button title={formatMessage(TKeys.BUTTON_SAVE)} style={styles.action} onPress={handleSave} />
    </ScrollViewLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    ...GlobalStyles.center,
  },
  action: {
    marginVertical: 10,
    marginHorizontal: 55,
  },
  system: { alignItems: 'flex-start', paddingHorizontal: 15, marginBottm: 10 },
  title: {
    marginTop: 5,
    textAlign: 'justify',
    fontWeight: '600',
  },
});
