import { Avatar, VStack } from '@react-native-material/core';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import { BodyPartProgressScreenRouteProp } from '../../../../../navigation/types';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import { PurificationStep } from '../BodyPartsScreen';
import { findPartProps } from '../common/Helper';
import BodyPartProgress from './BodyPartProgress';

export default function BodyPartProgressScreen() {
  const { value } = useRoute<BodyPartProgressScreenRouteProp>().params;

  function step(step: PurificationStep, lines: ProgressLine[]) {
    return (
      <VStack>
        <BodyPartProgress step={step} part={value.name} lines={lines} />
      </VStack>
    );
  }

  return (
    <SafeAreaView
      style={{
        ...GlobalStyles.center,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <Avatar image={findPartProps(value.name)} size={140} />
      <ScrollView>
        <VStack spacing={15} mt={15} mb={15}>
          {value.cleaning && step('cleaning', value.cleaning)}
          {value.enlightenment && step('enlightenment', value.enlightenment)}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
