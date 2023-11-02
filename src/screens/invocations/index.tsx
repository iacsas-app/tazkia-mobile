import { Button, VStack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { View } from 'react-native';
import { PresentationParamList, PresentationStackNavigationProp } from '../../navigation/types';
import GlobalStyles from '../../styles/GlobalStyles';
import Immunization from '../immunization/Immunization';

export default function PresentationScreen() {
  const navigation = useNavigation<PresentationStackNavigationProp>();
  const parts = useMemo(() => ['Center', 'Cheikh', 'Approach'], []);

  function handlePress(route: keyof PresentationParamList) {
    navigation.navigate(route);
  }

  return (
    <View style={GlobalStyles.container}>
      <VStack spacing={20}>
        {parts.map((route, index) => (
          <Button key={index} title={`Go to ${route}`} uppercase={false} onPress={() => handlePress(route as any)} />
        ))}
        <Immunization type="morning" />
        <Immunization type="evening" />
      </VStack>
    </View>
  );
}
