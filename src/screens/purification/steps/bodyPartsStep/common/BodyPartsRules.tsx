import { BodyPartType } from '../../../../../domains/purification/BodyPart';
import { useStoreActions, useStoreState } from '../../../../../stores/hooks';
import { PurificationType } from '../BodyPartsScreen';

import { Box, Button, Text, VStack } from '@react-native-material/core';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import SimpleRule from '../../../../../components/rules/SimpleRule';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import Purification from '../../../../../domains/purification/Purification';
import { useApplication } from '../../../../../hooks/use-application';
import { useMessage } from '../../../../../hooks/use-message';
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
  let purification: Purification | undefined = useStoreState((state) => state.purification.item);
  const createOrUpdate = useStoreActions((state) => state.purification.load);
  const items: string[] = useMemo(() => rules[part][mode], []);
  const progress: ProgressLine[] | undefined = useMemo(() => findBodyPartProgress(purification, part, mode), []);

  function handleStartPress() {
    if (!purification) {
      purification = { id: 1, bodyParts: [], mind: [], soul: [] };
    }
    //const bodyPart: BodyPart = { name: part, [mode]: [] };
    //purification.bodyParts = [...purification.bodyParts, bodyPart];
    createOrUpdate(purification);
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
