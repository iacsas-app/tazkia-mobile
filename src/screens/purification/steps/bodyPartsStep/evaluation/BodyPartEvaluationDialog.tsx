import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Avatar, Box, HStack, VStack } from '@react-native-material/core';
import { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Divider, Modal } from 'react-native-paper';
import Text from '../../../../../components/Text';
import ScrollViewLayout from '../../../../../components/layout/ScrollViewLayout';
import CheckableRule from '../../../../../components/rules/CheckableRule';
import { BodyPartType } from '../../../../../domains/purification/BodyPart';
import { useApplication } from '../../../../../hooks/use-application';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import { useStoreActions } from '../../../../../stores/hooks';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import { findPartProps } from '../common/Helper';
import { rules } from '../common/data';
import { PurificationStage } from '../tabs/HomeScreen';

interface Props {
  type: BodyPartType;
  stage: PurificationStage;
  onSave: () => void;
}
export default function BodyPartEvaluationDialog({ type, stage, onSave }: Props) {
  const { formatMessage } = useMessage();
  const [selected, setSelected] = useState<number[]>([]);
  const { arabic } = useApplication();
  const evaluate = useStoreActions((actions) => actions.purification.evaluateBodyPart);
  const items = useMemo(() => rules[type][stage], []);

  function handleSelect(id: number) {
    setSelected([...selected, id]);
  }
  function handleUnselect(id: number) {
    setSelected(selected.filter((item) => item !== id));
  }
  function handleSave() {
    evaluate([type, stage, selected.sort()]).then(() => onSave());
  }

  return (
    <Modal visible={true} contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}>
      <ScrollViewLayout>
        <Avatar image={findPartProps(type)} size={90} />
        <HStack spacing={15} style={styles.system}>
          <Icon name="playlist-check" color="red" size={30} />
          <Text variant="headlineSmall" style={{ ...styles.title, fontSize: arabic ? 20 : 15 }}>
            {formatMessage(TKeys.PROGRESS_EVALUATION_MESSAGE)}
          </Text>
        </HStack>
        <VStack mv={15}>
          {items.map((rule: string, index: number) => (
            <Box key={index}>
              <CheckableRule
                key={index}
                id={index + 1}
                item={formatMessage(rule)}
                onSelect={handleSelect}
                onUnselect={handleUnselect}
              />
              <Divider />
            </Box>
          ))}
        </VStack>
        <Button style={styles.action} mode="contained" buttonColor="green" onPress={handleSave}>
          {formatMessage(TKeys.BUTTON_SAVE)}
        </Button>
      </ScrollViewLayout>
    </Modal>
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
