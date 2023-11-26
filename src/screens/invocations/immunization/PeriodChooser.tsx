import { Avatar } from '@react-native-material/core';

import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Text from '../../../components/Text';
import { SCREEN_WIDTH } from '../../../constants/Screen';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import GlobalStyles from '../../../styles/GlobalStyles';
import { ImmunizationPeriod } from './data';

const gap = 10;

export const PRIMARY_COLOR = '#001A72';
export const ACCENT_COLOR = '#782AEB';
export const BACKGROUND_COLOR = '#F8F9FF';
export const BORDER_COLOR = '#C1C6E5';
export const BACKDROP_COLOR = 'rgba(0, 0, 0, 0.3)';
export const HEIGHT = 200;
export const OVERDRAG = 10;

interface Props {
  onSelect(period: ImmunizationPeriod): void;
}
export default function PeriodChooser({ onSelect }: Props) {
  const { formatMessage } = useMessage();
  const periods = useMemo(
    () => [
      { name: 'morning', image: require('./../../../../assets/img/invocations/morning.png') },
      { name: 'evening', image: require('./../../../../assets/img/invocations/evening.png') },
    ],
    [],
  );

  return (
    <View style={styles.container}>
      {periods.map(({ name, image }) => (
        <Pressable
          key={name}
          style={[
            {
              backgroundColor: 'powderblue',
              ...GlobalStyles.circle,
              elevation: 10,
              width: SCREEN_WIDTH - 120,
              alignItems: 'center',
            },
          ]}
          onPress={() => onSelect(name as ImmunizationPeriod)}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              paddingHorizontal: 5,
              paddingVertical: 10,
              gap: 25,
            }}
          >
            <Avatar image={image} size={50} style={{ right: 0, left: 0 }} />
            <Text variant="bodyLarge" style={{ fontWeight: '800', fontSize: 15 }}>
              {formatMessage(TKeys.INVOCATIONS_IMMUNIZATION_TITLE, { period: formatMessage(name) })}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: gap,
    flex: 1,
    ...GlobalStyles.center,
    paddingTop: 10,
    paddingBottom: 30,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: PRIMARY_COLOR,
  },
  swatch: {
    height: (SCREEN_WIDTH - 10 * gap) / 7,
    aspectRatio: 1,
    borderRadius: 4,
  },
});
