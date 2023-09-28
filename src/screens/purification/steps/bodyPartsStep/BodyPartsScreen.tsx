import { HStack, Text, VStack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import { BodyPartType } from '../../../../domains/purification/BodyPart';
import { useApplication } from '../../../../hooks/use-application';
import { useMessage } from '../../../../hooks/use-message';
import { TKeys } from '../../../../locales/constants';
import { BodyPartsRulesStackNavigationProp } from '../../../../navigation/types';
import { groupBy } from '../../../../services/Helpers';
import GlobalStyles from '../../../../styles/GlobalStyles';
import BodyPartItem from './common/BodyPartItem';

export type PurificationType = 'purification' | 'illumination';

export type PartItem = {
  id: number;
  type: BodyPartType;
  line: number;
  nameKey: string;
  imageSource: ImageSourcePropType;
};

export default function BodyPartsScreen() {
  const { arabicOrientation } = useApplication();
  const { formatMessage } = useMessage();
  const navigation = useNavigation<BodyPartsRulesStackNavigationProp>();
  const partsByLine = useMemo(() => groupBy(parts, 'line'), []);

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
                <BodyPartItem {...props} onDetailsOpen={handleDetailsOpen} />
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

const parts: PartItem[] = [
  {
    id: 1,
    type: 'eye',
    line: 1,
    nameKey: TKeys.PURIFICATION_BODY_PARTS_EYES,
    imageSource: require('./../../../../../assets/img/purification/body-parts/eye.jpg'),
  },
  {
    id: 2,
    type: 'hands',
    line: 1,
    nameKey: TKeys.PURIFICATION_BODY_PARTS_HANDS,
    imageSource: require('./../../../../../assets/img/purification/body-parts/hands.jpg'),
  },
  {
    id: 3,
    type: 'tongue',
    line: 2,
    nameKey: TKeys.PURIFICATION_BODY_PARTS_TONGUE,
    imageSource: require('./../../../../../assets/img/purification/body-parts/tongue.jpg'),
  },
  {
    id: 4,
    type: 'ear',
    line: 2,
    nameKey: TKeys.PURIFICATION_BODY_PARTS_EAR,
    imageSource: require('./../../../../../assets/img/purification/body-parts/ear.jpg'),
  },
  {
    id: 5,
    type: 'belly',
    line: 3,
    nameKey: TKeys.PURIFICATION_BODY_PARTS_BELLY,
    imageSource: require('./../../../../../assets/img/purification/body-parts/belly.png'),
  },
  {
    id: 6,
    type: 'feet',
    line: 3,
    nameKey: TKeys.PURIFICATION_BODY_PARTS_FEET,
    imageSource: require('./../../../../../assets/img/purification/body-parts/feet.jpg'),
  },
  {
    id: 7,
    type: 'private-parts',
    line: 4,
    nameKey: TKeys.PURIFICATION_BODY_PARTS_PRIVATE_PARTS,
    imageSource: require('./../../../../../assets/img/purification/body-parts/private-parts.png'),
  },
];
