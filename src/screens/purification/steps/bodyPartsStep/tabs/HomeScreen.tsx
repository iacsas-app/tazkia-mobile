import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { View } from 'react-native';
import ScrollViewLayout from '../../../../../components/layout/ScrollViewLayout';
import HStack from '../../../../../components/stack/HStack';
import VStack from '../../../../../components/stack/VStack';
import { BodyPartType, BodyPartsOrder } from '../../../../../domains/purification/BodyPart';
import { BodyPartsRulesNavigationProp } from '../../../../../navigation/types';
import { groupBy } from '../../../../../services/Helpers';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import { PartItem, bodyParts } from '../common/Helper';
import BodyPartItem from '../helpers/BodyPartItem';

export type PurificationStage = 'cleaning' | 'enlightenment';

export default function HomeScreen() {
  const navigation = useNavigation<BodyPartsRulesNavigationProp>();
  const partsByLine = useMemo(() => groupBy(bodyParts, 'line'), []);

  function handleOpenRules(part: BodyPartType, step: PurificationStage) {
    navigation.navigate('BodyPartsRules', { part, step });
  }

  return (
    <ScrollViewLayout>
      <VStack spacing={15} style={{ ...GlobalStyles.center, alignItems: 'center', marginTop: 15 }}>
        {Object.keys(partsByLine).map((key: string) => (
          <HStack key={key} spacing={10}>
            {partsByLine[key].map(({ line, ...props }: PartItem, index: number) => (
              <View key={`${key}_${index}_${line}`}>
                <BodyPartItem id={BodyPartsOrder[props.type]} {...props} onOpenRules={handleOpenRules} />
              </View>
            ))}
          </HStack>
        ))}
      </VStack>
    </ScrollViewLayout>
  );
}
