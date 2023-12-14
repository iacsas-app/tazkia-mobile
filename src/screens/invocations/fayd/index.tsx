import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../../../components/Text';
import { Color } from '../../../constants/Color';
import { useMessage } from '../../../hooks/use-message';
import GlobalStyles from '../../../styles/GlobalStyles';
import Chapters from './Chapters';

export default function OverflowInvocationsScreen() {
  const { formatMessage } = useMessage();

  return (
    <View style={styles.container}>
      <Text variant="bodyMedium" style={GlobalStyles.fixedHeader}>
        {formatMessage(`invocations.ahzabs.section.1`)}
      </Text>
      <Chapters />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: Color.backgroundColor },
});
