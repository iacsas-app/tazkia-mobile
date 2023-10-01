import { Flex, VStack } from '@react-native-material/core';
import { useRoute } from '@react-navigation/native';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import { BodyPartProgressScreenRouteProp } from '../../../../../navigation/types';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import { PurificationType } from '../BodyPartsScreen';
import BodyPartProgress from '../common/BodyPartProgress';

export default function BodyPartProgressScreen() {
  const { params } = useRoute<BodyPartProgressScreenRouteProp>();
  const { value } = params;

  function step(type: PurificationType, lines: ProgressLine[]) {
    return (
      <VStack>
        <BodyPartProgress type={type} part={value.name} lines={lines} />
      </VStack>
    );
  }

  return (
    <Flex fill style={GlobalStyles.center}>
      <VStack spacing={15} mt={15}>
        {value.purification && step('purification', value.purification)}
        {value.illumination && step('illumination', value.illumination)}
      </VStack>
    </Flex>
  );
}
