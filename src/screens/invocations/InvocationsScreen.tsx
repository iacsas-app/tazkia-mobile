import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import Animated, { FadeInUp } from 'react-native-reanimated';
import Text from '../../components/Text';
import BottomSheet, { BottomSheetRef } from '../../components/bottomSheet/BottomSheet';
import VStack from '../../components/stack/VStack';
import { Font } from '../../constants/Font';
import { SCREEN_WIDTH } from '../../constants/Screen';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import GlobalStyles from '../../styles/GlobalStyles';
import PeriodChooser from './immunization/PeriodChooser';
import { ImmunizationPeriod } from './immunization/data';

export default function InvocationsScreen() {
  const ref = useRef<BottomSheetRef>(null);
  const { formatMessage } = useMessage();
  const navigation = useNavigation<any>();

  const parts = useMemo(
    () => [
      {
        route: 'Immunization',
        name: TKeys.INVOCATION_IMMUNIZATION_TITLE,
        image: require('./../../../assets/img/presentation/books/altahsin.png'),
      },
      {
        route: 'Jewels',
        name: TKeys.INVOCATION_JEWELS_TITLE,
        image: require('./../../../assets/img/presentation/books/jawaher.png'),
      },
      {
        route: 'Overflow',
        name: TKeys.INVOCATION_OVERFLOW_TITLE,
        image: require('./../../../assets/img/presentation/books/alfayd_alrahmani.png'),
      },
      {
        route: 'Ahzabs',
        name: TKeys.INVOCATION_AHZABS_TITLE,
      },
    ],
    [],
  );

  function handlePress(route: string) {
    if (route === 'Immunization') {
      ref.current?.open();
    } else {
      navigation.navigate(route);
    }
  }

  function handleSelect(period: ImmunizationPeriod) {
    navigation.navigate('Immunization', { period });
    ref.current?.close();
  }

  return (
    <BottomSheet ref={ref} content={<PeriodChooser onSelect={handleSelect} />}>
      <VStack spacing={15} style={styles.container}>
        {parts.map((item, index: number) => (
          <Animated.View
            key={index}
            entering={FadeInUp.delay(200 * (index * 2))}
            style={styles.part}
            onTouchStart={() => handlePress(item.route)}
          >
            {item.image && <Avatar.Image source={item.image} size={80} style={styles.image} />}
            <View style={styles.summary}>
              <Text variant="bodyMedium" style={styles.summaryLabel} color="black">
                {formatMessage(item.name)}
              </Text>
            </View>
          </Animated.View>
        ))}
      </VStack>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.center,
    flex: 1,
    width: SCREEN_WIDTH,
    backgroundColor: '#f5fffa',
  },
  part: {
    backgroundColor: '#cde7f7',
    width: SCREEN_WIDTH - 20,
    flexBasis: 90,
    elevation: 6,
    borderRadius: 45,
    paddingVertical: 10,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'justify',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: { backgroundColor: 'whitesmoke', position: 'absolute', left: 5 },
  summary: {
    maxWidth: SCREEN_WIDTH - 120,
    flexGrow: 1,
    left: 45,
  },
  summaryLabel: {
    fontSize: Font.size(18),
    fontWeight: '800',
    textAlign: 'auto',
  },
});
