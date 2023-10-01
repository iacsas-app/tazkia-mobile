import OctIcon from '@expo/vector-icons/Octicons';
import BodyPart, { BodyPartType } from '../../../../../domains/purification/BodyPart';
import { useStoreActions, useStoreState } from '../../../../../stores/hooks';
import { PurificationType } from '../BodyPartsScreen';

import { Box, Button, HStack, Text, VStack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import SimpleRule from '../../../../../components/rules/SimpleRule';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import Purification from '../../../../../domains/purification/Purification';
import { useApplication } from '../../../../../hooks/use-application';
import { useMessage } from '../../../../../hooks/use-message';
import { PurificationStackNavigationProp } from '../../../../../navigation/types';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import { findBodyPartProgress, orderBodyParts, rules } from './Helper';

interface BodyPartsRulesProps {
  part: BodyPartType;
  mode: PurificationType;
}
export default function BodyPartsRules({ part, mode }: BodyPartsRulesProps) {
  const { formatMessage, intl } = useMessage();
  const { arabicOrientation } = useApplication();
  const navigation = useNavigation<PurificationStackNavigationProp>();
  let purification: Purification | undefined = useStoreState((state) => state.purification.item);
  const createOrUpdate = useStoreActions((actions) => actions.purification.createOrUpdate);

  const items: string[] = useMemo(() => rules[part][mode], []);
  const progress: ProgressLine[] | undefined = useMemo(() => findBodyPartProgress(purification, part, mode), []);

  function handleStartPress() {
    const newLine: ProgressLine = { startDate: intl.formatDate(Date()), day: 5, errors: [] };
    const newPart: BodyPart = { name: part, [mode]: [newLine, newLine, newLine] };

    if (!purification) {
      purification = { id: 0, bodyParts: [newPart], mind: [], soul: [] };
    } else {
      if (!purification.bodyParts.find((item) => item.name === part)) {
        purification.bodyParts.push(newPart);
      } else {
        purification.bodyParts = purification.bodyParts.map((item) =>
          item.name === part ? { ...item, [mode]: [newLine] } : item,
        );
      }
      purification.bodyParts = orderBodyParts(purification.bodyParts);
    }
    createOrUpdate(purification);
    navigation.push('Purification');
  }

  function title(part: BodyPartType, mode: PurificationType) {
    const name = formatMessage(`purification.body-parts.${part}_${mode === 'purification' ? 1 : 2}`);
    const subject = formatMessage(`${mode}.bodypart.code-of-conduct`, { name });
    return subject;
  }

  return (
    <View style={styles.container}>
      <HStack spacing={8} style={{ padding: 22 }} reverse={arabicOrientation}>
        <OctIcon name="checklist" size={40} />
        <Text variant="h6" style={styles.title}>
          {title(part, mode)}
        </Text>
      </HStack>
      <VStack spacing={8}>
        {items.map((item: string, index: number) => (
          <Box key={index} style={styles.line}>
            <SimpleRule id={index + 1} item={item} reverse={arabicOrientation} />
          </Box>
        ))}
      </VStack>
      {progress ? (
        <Text>Already started</Text>
      ) : (
        <Button title="start" style={styles.button} onPress={handleStartPress} />
      )}
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
  },
  line: {
    marginHorizontal: 20,
  },
  button: {
    marginTop: 30,
  },
});
