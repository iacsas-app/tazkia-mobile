import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, TouchableRipple } from 'react-native-paper';
import Text from '../../../components/Text';
import VStack from '../../../components/stack/VStack';
import { SCREEN_WIDTH } from '../../../constants/Screen';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import GlobalStyles from '../../../styles/GlobalStyles';
import { ImmunizationPeriod } from './data';

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
    <VStack style={styles.container} spacing={12}>
      {periods.map(({ name, image }) => (
        <TouchableRipple key={name} style={styles.pressable} onPress={() => onSelect(name as ImmunizationPeriod)}>
          <View style={styles.titleContainer}>
            <Avatar.Image source={image} size={60} style={styles.image} />
            <Text variant="bodyLarge" style={styles.title}>
              {formatMessage(TKeys.INVOCATIONS_IMMUNIZATION_TITLE, { period: formatMessage(name) })}
            </Text>
          </View>
        </TouchableRipple>
      ))}
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.center,
    paddingTop: 10,
    paddingBottom: 30,
  },
  pressable: {
    ...GlobalStyles.circle,
    backgroundColor: 'powderblue',
    width: SCREEN_WIDTH - 50,
    elevation: 8,
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    alignContent: 'stretch',
    justifyContent: 'center',
    alignSelf: 'stretch',
    height: 70,
  },
  title: { fontWeight: '900', fontSize: 16, marginLeft: 25 },
  image: { position: 'absolute', left: 6 },
});
