import { Button, VStack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { View } from 'react-native';
import { PresentationParamList, PresentationStackNavigationProp } from '../../navigation/types';
import { commonStyles } from '../../styles/CommonStyles';

export default function PresentationScreen() {
  const navigation = useNavigation<PresentationStackNavigationProp>();
  const parts = useMemo(() => ['Center', 'Cheikh', 'Approach'], []);

  function handlePress(route: keyof PresentationParamList) {
    navigation.navigate(route);
  }

  return (
    <View style={commonStyles.container}>
      <VStack spacing={20}>
        {parts.map((route, index) => (
          <Button key={index} title={`Go to ${route}`} uppercase={false} onPress={() => handlePress(route as any)} />
        ))}
      </VStack>
    </View>
  );
}
