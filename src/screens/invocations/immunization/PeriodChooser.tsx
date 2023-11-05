import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Avatar, Box } from '@react-native-material/core';

import React, { useMemo } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import Text from '../../../components/Text';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import GlobalStyles from '../../../styles/GlobalStyles';
import { ImmunizationPeriod } from './data';

const { width: windowWidth } = Dimensions.get('window');
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
  onToogle: () => void;
}
export default function PeriodChooser({ onSelect, onToogle }: Props) {
  const { formatMessage } = useMessage();
  const periods = useMemo(
    () => [
      { name: 'morning', image: require('./../../../../assets/img/invocations/morning.png') },
      { name: 'evening', image: require('./../../../../assets/img/invocations/evening.png') },
    ],
    [],
  );

  return (
    <View style={{ ...GlobalStyles.container }}>
      <Icon name="chevron-down" size={25} style={{ marginTop: -15 }} onPress={onToogle} />
      <View style={styles.container}>
        {periods.map(({ name, image }) => (
          <Pressable
            key={name}
            style={[
              {
                backgroundColor: '#ffb6c1',
                ...GlobalStyles.circle,
                elevation: 10,
                width: 230,
                alignItems: 'center',
              },
            ]}
            onPress={() => onSelect(name as ImmunizationPeriod)}
          >
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}
            >
              <Avatar image={image} size={40} />
              <Box>
                <Text style={{ fontWeight: '800', fontSize: 15 }}>
                  {formatMessage(TKeys.INVOCATIONS_IMMUNIZATION_TITLE, { period: formatMessage(name) })}
                </Text>
              </Box>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: gap,
    flex: 1,
    ...GlobalStyles.center,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: PRIMARY_COLOR,
  },
  swatch: {
    height: (windowWidth - 10 * gap) / 7,
    aspectRatio: 1,
    borderRadius: 4,
  },
});