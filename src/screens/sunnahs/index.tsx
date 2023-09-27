import { Button, VStack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { View } from 'react-native';
import { SunnahsParamList, SunnahsStackNavigationProp } from '../../navigation/types';
import { commonStyles } from '../../styles/CommonStyles';

export default function SunnahsScreen() {
  const navigation = useNavigation<SunnahsStackNavigationProp>();
  const parts = useMemo(() => ['Habits', 'Practice', 'SpiritTravels'], []);

  function handlePress(route: keyof SunnahsParamList) {
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
