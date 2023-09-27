import { Text } from '@react-native-material/core';
import { ReactElement } from 'react';
import { View } from 'react-native';
import { commonStyles } from '../../styles/CommonStyles';

/**
 * Main screen
 * @returns {ReactElement}
 */
export default function ProgressScreen(): ReactElement {
  return (
    <View style={commonStyles.container}>
      <Text variant="h5">My progress and statistics</Text>
    </View>
  );
}
