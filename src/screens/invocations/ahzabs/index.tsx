import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Basmalah from '../../../components/Basmalah';
import Text from '../../../components/Text';
import { Color } from '../../../constants/Color';
import { useMessage } from '../../../hooks/use-message';
import { AhzabsScreenRouteProp } from '../../../navigation/types';
import Chapters from './Chapters';

export default function AhzabsInvocationsScreen() {
  const { formatMessage } = useMessage();
  const { section } = useRoute<AhzabsScreenRouteProp>().params;

  return (
    <View style={{ backgroundColor: Color.backgroundColor }}>
      <View style={styles.header}>
        <Basmalah />
        <Text variant="bodyMedium" style={styles.introduction}>
          {formatMessage(`invocations.ahzabs.section.${section}.introduction`)}
        </Text>
      </View>
      <View style={{ paddingBottom: 150 }}>
        <Chapters section={section} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  introduction: { textAlign: 'justify', fontWeight: '600', paddingBottom: 5 },
});
