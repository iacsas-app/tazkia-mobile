import React from 'react';
import { View } from 'react-native';
import Text from '../../../components/Text';
import GlobalStyles from './../../../styles/GlobalStyles';

export default function JewelsInvocationsScreen() {
  return (
    <View style={GlobalStyles.container}>
      <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>
        Jewels Invocations
      </Text>
    </View>
  );
}
