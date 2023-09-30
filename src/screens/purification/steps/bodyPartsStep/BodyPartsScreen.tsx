import { HStack, Text, VStack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { BodyPartType, BodyPartsOrder } from '../../../../domains/purification/BodyPart';
import { useApplication } from '../../../../hooks/use-application';
import { useMessage } from '../../../../hooks/use-message';
import { TKeys } from '../../../../locales/constants';
import { BodyPartsRulesStackNavigationProp } from '../../../../navigation/types';
import { groupBy } from '../../../../services/Helpers';
import GlobalStyles from '../../../../styles/GlobalStyles';
import BodyPartItem from './common/BodyPartItem';
import { PartItem, bodyParts } from './common/Helper';

export type PurificationType = 'purification' | 'illumination';

export default function BodyPartsScreen() {
  const { arabicOrientation } = useApplication();
  const { formatMessage } = useMessage();
  const navigation = useNavigation<BodyPartsRulesStackNavigationProp>();
  const partsByLine = useMemo(() => groupBy(bodyParts, 'line'), []);

  function handleDetailsOpen(type: BodyPartType, mode: PurificationType) {
    navigation.navigate('BodyPartsRules', { type, mode });
  }

  return (
    <View style={GlobalStyles.center}>
      <Text variant="body2" style={styles.description}>
        {formatMessage(TKeys.PURIFICATION_BODYPART_DESCRIPTION)}
      </Text>
      <VStack spacing={20} style={GlobalStyles.center}>
        {Object.keys(partsByLine).map((key: string) => (
          <HStack key={key} spacing={18} reverse={arabicOrientation}>
            {partsByLine[key].map(({ line, ...props }: PartItem, index: number) => (
              <View key={`${key}_${index}_${line}`}>
                <BodyPartItem id={BodyPartsOrder[props.type]} {...props} onDetailsOpen={handleDetailsOpen} />
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
