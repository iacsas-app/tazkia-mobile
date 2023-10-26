import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { BodyPartType } from '../../../../../domains/purification/BodyPart';
import { useStoreActions, useStoreState } from '../../../../../stores/hooks';
import { PurificationStage } from '../BodyPartsScreen';

import { Avatar, HStack, VStack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Text from '../../../../../components/Text';
import ScrollViewLayout from '../../../../../components/layout/ScrollViewLayout';
import SimpleRule from '../../../../../components/rules/SimpleRule';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import Purification from '../../../../../domains/purification/Purification';
import { useApplication } from '../../../../../hooks/use-application';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import { PurificationStackNavigationProp } from '../../../../../navigation/types';
import { capitalize } from '../../../../../services/Helpers';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import { buildBodyParts, findPartProps } from '../common/Helper';
import { rules } from '../common/data';

interface BodyPartsRulesProps {
  part: BodyPartType;
  step: PurificationStage;
}
export default function BodyPartsRules({ part, step }: BodyPartsRulesProps) {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();
  const navigation = useNavigation<PurificationStackNavigationProp>();
  const createOrUpdate = useStoreActions((actions) => actions.purification.createOrUpdate);
  const findBodyPart = useStoreState((state) => state.purification.findByPartTypeAndStage);
  let purification: Purification | undefined = useStoreState((state) => state.purification.item);
  const items: string[] = useMemo(() => rules[part][step], []);

  const progress: ProgressLine[] | undefined = findBodyPart(part, step);
  const isCleaning = step === 'cleaning';

  function handlePress() {
    purification = buildBodyParts(part, step, purification);

    if (purification) {
      createOrUpdate(purification);
      navigation.push('Purification');
    }
  }

  function stepTitle() {
    const partName = formatMessage(`purification.body-parts.${part}`).toLowerCase();
    return capitalize(formatMessage(`purification.bodypart.${step}.phase`, { part: partName }));
  }

  return (
    <ScrollViewLayout>
      <Avatar image={findPartProps(part)} size={80} />
      <Text
        variant="body1"
        style={{ fontWeight: '600', marginVertical: 5, marginHorizontal: 0, fontSize: arabic ? 22 : 18 }}
        color="green"
      >
        {stepTitle()}
      </Text>
      <HStack spacing={10} style={styles.system}>
        <Icon name={isCleaning ? 'account-tie-hat' : 'lightbulb-on'} color={isCleaning ? 'red' : 'green'} size={23} />
        <Text variant="body1" style={{ ...styles.title, fontSize: arabic ? 20 : 16 }}>
          {formatMessage(`${step}.bodypart.disciplinary-system`)}
        </Text>
      </HStack>
      <VStack mv={10}>
        {items.map((rule: string, index: number) => (
          <SimpleRule key={index} id={index + 1} item={formatMessage(rule)} />
        ))}
      </VStack>
      {!progress && (
        <Button style={styles.action} mode="contained" buttonColor="green" onPress={handlePress}>
          {formatMessage(TKeys.BUTTON_ADD)}
        </Button>
      )}
    </ScrollViewLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    ...GlobalStyles.center,
  },
  title: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  system: { alignItems: 'flex-start', paddingHorizontal: 16.5, marginVertical: 5 },
  image: { borderRadius: 80 },
  action: {
    marginTop: 5,
    marginBottom: 15,
    marginHorizontal: 55,
  },
});
