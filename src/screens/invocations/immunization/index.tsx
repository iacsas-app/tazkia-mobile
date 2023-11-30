import { VStack } from '@react-native-material/core';
import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, StyleSheet, View, useWindowDimensions } from 'react-native';
import Basmalah from '../../../components/Basmalah';
import Text from '../../../components/Text';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import { InvocationsScreenRouteProp } from '../../../navigation/types';
import BasePresentationLayout from '../../presentation/common/BasePresentationLayout';

import Immunization from './Immunization';
import { immunizationData } from './data';

export default function ImmunizationInvocationsScreen() {
  const { formatMessage } = useMessage();
  const { period } = useRoute<InvocationsScreenRouteProp>().params;
  const { width } = useWindowDimensions();

  const data = immunizationData[period];
  const [showImmunization, setShowImmunization] = useState(false);

  const handleStartImmunization = () => {
    setShowImmunization(true);
  };

  return (
    <BasePresentationLayout>
      <View style={{ width: width - 6 }}>
        <VStack spacing={10} style={{ marginBottom: 15 }}>
          <Basmalah />
          <Text variant="bodyLarge" style={{ textAlign: 'justify', fontWeight: '600' }}>
            {formatMessage(TKeys.INVOCATIONS_IMMUNIZATION_INTRODUCTION)}
          </Text>
        </VStack>
        <View style={{ marginVertical: 20, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <Button title="ابدأ" onPress={handleStartImmunization} color="darkgreen" />
          {showImmunization && <Immunization period={period} />}
        </View>
        <View>
          {data.map((item, index) => (
            <View style={styles.container} key={index}>
              <Text>{formatMessage(item.key)}</Text>
              <Text style={styles.text}>
                {' '}
                {formatMessage(item.repeat > 1 ? TKeys.TIMES_COUNT_PLURAL : TKeys.TIMES_COUNT, {
                  times: item.repeat,
                })}
              </Text>
            </View>
          ))}
        </View>
        {/* <Immunization period={period} /> */}
        <Text variant="bodyLarge" style={{ textAlign: 'justify', fontWeight: '600', marginTop: 10 }}>
          {formatMessage(TKeys.INVOCATIONS_IMMUNIZATION_CONCLUSION)}
        </Text>
      </View>
    </BasePresentationLayout>
  );
}
export const PRIMARY_COLOR = '#001A72';
export const ACCENT_COLOR = '#782AEB';
export const BACKGROUND_COLOR = '#F8F9FF';
export const BORDER_COLOR = '#C1C6E5';
export const BACKDROP_COLOR = 'rgba(0, 0, 0, 0.3)';
export const HEIGHT = 200;
export const OVERDRAG = 10;

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'column',
    // flex: 1,
    paddingTop: 5,
    paddingBottom: 20,
    borderRadius: 25,
    backgroundColor: 'lightblue',
    padding: 10,
  },
  text: {
    justifyContent: 'center',

    backgroundColor: 'seashell',
    borderRadius: 10,
    paddingVertical: -80,
    paddingHorizontal: 150,
    marginVertical: 7,
  },
  button: {
    padding: 20,
    borderRadius: 5,
    width: 40,
    height: 20,
  },
  title: {
    fontWeight: '500',
    textAlign: 'justify',
  },
  description: {
    fontSize: 20,
    // marginTop: 22,
    marginTop: 22,
    fontWeight: '500',
    textAlign: 'justify',
  },
});
