import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { BodyPartType } from '../../../../../domains/purification/BodyPart';
import { useStoreActions, useStoreState } from '../../../../../stores/hooks';
import { PurificationStep } from '../BodyPartsScreen';

import { Avatar, Box, Button, HStack, Text, VStack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import SimpleRule from '../../../../../components/rules/SimpleRule';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import Purification from '../../../../../domains/purification/Purification';
import { useApplication } from '../../../../../hooks/use-application';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import { PurificationStackNavigationProp } from '../../../../../navigation/types';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import { buildBodyParts, findPartProps, rules } from '../common/Helper';

interface BodyPartsRulesProps {
  part: BodyPartType;
  step: PurificationStep;
}
export default function BodyPartsRules({ part, step }: BodyPartsRulesProps) {
  const { formatMessage, intl } = useMessage();
  const { arabicOrientation } = useApplication();
  const navigation = useNavigation<PurificationStackNavigationProp>();
  const createOrUpdate = useStoreActions((actions) => actions.purification.createOrUpdate);
  const findBodyPart = useStoreState((state) => state.purification.findByPartAndStep);
  let purification: Purification | undefined = useStoreState((state) => state.purification.item);

  const items: string[] = useMemo(() => rules[part][step], []);
  const progress: ProgressLine[] | undefined = findBodyPart(part, step);

  function handlePress() {
    purification = buildBodyParts(part, step, purification, intl.formatDate);

    if (purification) {
      createOrUpdate(purification);
      navigation.push('Purification');
    }
  }

  function title(part: BodyPartType, step: PurificationStep) {
    const name = formatMessage(`purification.body-parts.${part}_${step === 'cleaning' ? 1 : 2}`);
    const subject = formatMessage(`${step}.bodypart.disciplinary-system`, { name });
    return subject;
  }

  return (
    <View style={styles.container}>
      <Avatar image={findPartProps(part)} size={150} />
      <HStack spacing={8} style={styles.system} reverse={arabicOrientation}>
        <Icon name="account-tie-hat" size={40} color="red" />
        <Text variant="body1" style={styles.title}>
          {title(part, step)}
        </Text>
      </HStack>
      <VStack spacing={8}>
        {items.map((item: string, index: number) => (
          <Box key={index} style={styles.line}>
            <SimpleRule id={index + 1} item={item} reverse={arabicOrientation} />
          </Box>
        ))}
      </VStack>
      {!progress && <Button title={formatMessage(TKeys.BUTTON_ADD)} style={styles.action} onPress={handlePress} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    ...GlobalStyles.center,
  },
  title: {
    marginBottom: 35,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
  },
  system: { alignItems: 'baseline', padding: 17 },
  line: {
    marginHorizontal: 20,
  },
  image: { borderRadius: 80 },
  action: {
    marginTop: 30,
  },
});
