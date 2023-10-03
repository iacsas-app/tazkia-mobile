import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { BodyPartType } from '../../../../../domains/purification/BodyPart';
import { useStoreActions, useStoreState } from '../../../../../stores/hooks';
import { PurificationStep } from '../BodyPartsScreen';

import { Avatar, Button, HStack, Text, VStack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native';
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
  step: PurificationStep;
}
export default function BodyPartsRules({ part, step }: BodyPartsRulesProps) {
  const { formatMessage } = useMessage();
  const { arabicOrientation } = useApplication();
  const navigation = useNavigation<PurificationStackNavigationProp>();
  const createOrUpdate = useStoreActions((actions) => actions.purification.createOrUpdate);
  const findBodyPart = useStoreState((state) => state.purification.findByPartAndStep);
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
    return capitalize(formatMessage(`purification.bodypart.${step}.step`, { part: partName }));
  }

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <Avatar image={findPartProps(part)} size={120} />
      <Text
        variant="body1"
        style={{ fontWeight: '600', marginVertical: 15, marginHorizontal: 0, fontSize: arabicOrientation ? 30 : 18 }}
        color="blue"
      >
        {stepTitle()}
      </Text>
      <HStack spacing={12} style={styles.system} reverse={arabicOrientation}>
        <Icon name={isCleaning ? 'account-tie-hat' : 'lightbulb-on'} color={isCleaning ? 'red' : 'green'} size={28} />
        <Text variant="body1" style={{ ...styles.title, fontSize: arabicOrientation ? 25 : 18 }}>
          {formatMessage(`${step}.bodypart.disciplinary-system`)}
        </Text>
      </HStack>
      <ScrollView>
        <VStack mv={17}>
          {items.map((rule: string, index: number) => (
            <SimpleRule key={index} id={index + 1} item={formatMessage(rule)} reverse={arabicOrientation} />
          ))}
        </VStack>
        {!progress && <Button title={formatMessage(TKeys.BUTTON_ADD)} style={styles.action} onPress={handlePress} />}
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
  title: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  system: { alignItems: 'flex-start', paddingHorizontal: 16.5, marginVertical: 5 },
  image: { borderRadius: 80 },
  action: {
    marginVertical: 15,
    marginHorizontal: 55,
  },
});
