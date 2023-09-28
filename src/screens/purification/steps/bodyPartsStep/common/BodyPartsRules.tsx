import { BodyPartType } from '../../../../../domains/purification/BodyPart';
import { useStoreActions, useStoreState } from '../../../../../stores/hooks';
import { PurificationType } from '../BodyPartsScreen';

import { Box, Button, Text, VStack } from '@react-native-material/core';
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
import BodyPartProgress from './BodyPartProgress';
import { findBodyPartProgress, rules } from './Helper';

interface BodyPartsRulesProps {
  part: BodyPartType;
  mode: PurificationType;
}
export default function BodyPartsRules({ part, mode }: BodyPartsRulesProps) {
  const { formatMessage } = useMessage();
  const { arabicOrientation } = useApplication();
  const navigation = useNavigation<PurificationStackNavigationProp>();
  let purification: Purification | undefined = useStoreState((state) => state.purification.item);
  const createOrUpdate = useStoreActions((actions) => actions.purification.createOrUpdate);

  const items: string[] = useMemo(() => rules[part][mode], []);
  const progress: ProgressLine[] | undefined = useMemo(() => findBodyPartProgress(purification, part, mode), []);

  function handleStartPress() {
    const newLine: ProgressLine = { startDate: new Date(), day: 1, errors: [] };
    const newPart = { name: part, [mode]: [newLine] };

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
    }
    createOrUpdate(purification);
    navigation.push('Purification');
  }

  return (
    <View style={styles.container}>
      <Text variant="h5" style={styles.title}>
        {title(formatMessage, part, mode)}
      </Text>
      <VStack spacing={8}>
        {items.map((item: string, index: number) => (
          <Box key={index} style={styles.line}>
            <SimpleRule id={index + 1} item={item} reverse={arabicOrientation} />
          </Box>
        ))}
      </VStack>
      {progress ? (
        <BodyPartProgress lines={progress} />
      ) : (
        <Button title="start" style={styles.button} onPress={handleStartPress} />
      )}
    </View>
  );
}

function title(format: (id: string) => string, part: BodyPartType, mode: PurificationType) {
  const partName = format(`purification.body-parts.${part}`);
  const subject: string = mode === 'purification' ? 'Système éducatif concernant' : 'Règles de bon usage concernant';
  return `${subject} ${partName.toLocaleLowerCase()}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...GlobalStyles.center,
  },
  title: {
    paddingHorizontal: 15,
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
