import { HStack, Text, VStack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { BodyPartType, BodyPartsOrder } from '../../../../domains/purification/BodyPart';
import { useApplication } from '../../../../hooks/use-application';
import { useMessage } from '../../../../hooks/use-message';
import { TKeys } from '../../../../locales/constants';
import { BodyPartsRulesNavigationProp } from '../../../../navigation/types';
import { groupBy } from '../../../../services/Helpers';
import GlobalStyles from '../../../../styles/GlobalStyles';
import BodyPartItem from './BodyPartItem';
import { PartItem, bodyParts } from './common/Helper';

export type PurificationStep = 'cleaning' | 'enlightenment';

export default function BodyPartsScreen() {
  const { arabicOrientation } = useApplication();
  const { formatMessage } = useMessage();
  const navigation = useNavigation<BodyPartsRulesNavigationProp>();
  const partsByLine = useMemo(() => groupBy(bodyParts, 'line'), []);

  function handleOpenRules(part: BodyPartType, step: PurificationStep) {
    navigation.navigate('BodyPartsRules', { part, step });
  }

  return (
    <View style={GlobalStyles.center}>
      <Text variant="body1" style={styles.description}>
        {formatMessage(TKeys.PURIFICATION_BODYPART_DESCRIPTION)}
      </Text>
      <VStack spacing={20} style={GlobalStyles.center}>
        {Object.keys(partsByLine).map((key: string) => (
          <HStack key={key} spacing={18} reverse={arabicOrientation}>
            {partsByLine[key].map(({ line, ...props }: PartItem, index: number) => (
              <View key={`${key}_${index}_${line}`}>
                <BodyPartItem id={BodyPartsOrder[props.type]} {...props} onOpenRules={handleOpenRules} />
              </View>
            ))}
          </HStack>
        ))}
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  description: { marginTop: 15, marginBottom: 25, paddingHorizontal: 18 },
});
