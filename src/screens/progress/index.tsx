import { Text } from '@react-native-material/core';
import { ReactElement } from 'react';
import { View } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';

/**
 * Main screen
 * @returns {ReactElement}
 */
export default function ProgressScreen(): ReactElement {
  return (
    <View style={GlobalStyles.container}>
      <Text variant="h5">My progress and statistics</Text>
    </View>
  );
}
