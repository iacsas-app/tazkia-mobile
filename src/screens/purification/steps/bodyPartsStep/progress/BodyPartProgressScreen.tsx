import { Avatar, VStack } from '@react-native-material/core';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import BodyPart from '../../../../../domains/purification/BodyPart';
import { BodyPartProgressScreenRouteProp } from '../../../../../navigation/types';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import { findPartProps } from '../common/Helper';
import BodyPartProgress from './BodyPartProgress';

export default function BodyPartProgressScreen() {
  const { value } = useRoute<BodyPartProgressScreenRouteProp>().params;

  return (
    <SafeAreaView
      style={{
        ...GlobalStyles.center,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <Avatar image={findPartProps(value.name)} size={80} />
      <ScrollView>
        <VStack spacing={15} mt={15} mb={15}>
          {['cleaning', 'enlightenment'].map((step) => {
            const lines = value[step as keyof BodyPart['cleaning' | 'enlightenment']];
            return (
              lines && (
                <VStack key={step}>
                  <BodyPartProgress step={step as any} part={value.name} lines={lines} />
                </VStack>
              )
            );
          })}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
