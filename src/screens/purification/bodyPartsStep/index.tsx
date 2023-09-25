import { HStack, Text, VStack } from '@react-native-material/core';
import { ImageSourcePropType, View } from 'react-native';
import { TKeys } from '../../../locales/constants';
import BodyPartItem from './common/BodyPartItem';

type PartItem = {
  nameKey: string;
  imageSource: ImageSourcePropType;
};

const parts: PartItem[] = [
  {
    nameKey: TKeys.PURIFICATION_BODY_PARTS_EYES,
    imageSource: require('./../../../../assets/img/body-parts/eyes.jpg'),
  },
  {
    nameKey: TKeys.PURIFICATION_BODY_PARTS_HANDS,
    imageSource: require('./../../../../assets/img/body-parts/hands.jpg'),
  },
  {
    nameKey: TKeys.PURIFICATION_BODY_PARTS_TONGUE,
    imageSource: require('./../../../../assets/img/body-parts/tongue.jpg'),
  },
  {
    nameKey: TKeys.PURIFICATION_BODY_PARTS_EAR,
    imageSource: require('./../../../../assets/img/body-parts/ears.jpg'),
  },
  {
    nameKey: TKeys.PURIFICATION_BODY_PARTS_BELLY,
    imageSource: require('./../../../../assets/img/body-parts/belly.png'),
  },
  {
    nameKey: TKeys.PURIFICATION_BODY_PARTS_FEET,
    imageSource: require('./../../../../assets/img/body-parts/feet.jpg'),
  },
  {
    nameKey: TKeys.PURIFICATION_BODY_PARTS_PRIVATE_PARTS,
    imageSource: require('./../../../../assets/img/body-parts/private-parts.png'),
  },
];

export default function BodyPartsStepScreen() {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text variant="h5" style={{ marginVertical: 15 }}>
        Tazkia
      </Text>
      <VStack spacing={20} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <HStack spacing={15}>
          <View>
            <BodyPartItem name="Private parts" />
          </View>
          <View>
            <BodyPartItem name="Tongue" />
          </View>
        </HStack>
        <HStack spacing={15}>
          <View>
            <BodyPartItem name="Tongue" />
          </View>
          <View>
            <BodyPartItem name="Hands" />
          </View>
        </HStack>
        <HStack spacing={15}>
          <View>
            <BodyPartItem name="Tongue" />
          </View>
          <View>
            <BodyPartItem name="Hands" />
          </View>
        </HStack>
        <HStack spacing={15}>
          <View>
            <BodyPartItem name="Hands" />
          </View>
        </HStack>
      </VStack>
    </View>
  );
}
