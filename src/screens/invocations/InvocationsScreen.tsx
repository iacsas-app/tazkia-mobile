import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useRef } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import Text from '../../components/Text';
import BottomSheet, { BottomSheetRef } from '../../components/bottomSheet/BottomSheet';
import VStack from '../../components/stack/VStack';
import { Font } from '../../constants/Font';
import { SCREEN_WIDTH } from '../../constants/Screen';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import GlobalStyles from '../../styles/GlobalStyles';
import PeriodChooser, { BACKDROP_COLOR, HEIGHT, OVERDRAG } from './immunization/PeriodChooser';
import { ImmunizationPeriod } from './immunization/data';

export default function InvocationsScreen() {
  const ref = useRef<BottomSheetRef>(null);
  const { formatMessage } = useMessage();
  const { width } = useWindowDimensions();
  const navigation = useNavigation<any>();

  const parts = useMemo(
    () => [
      {
        route: 'Immunization',
        name: TKeys.INVOCATION_IMMUNIZATION_TITLE,
      },
      {
        route: 'Jewels',
        name: TKeys.INVOCATION_JEWELS_TITLE,
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
            style={{ ...styles.part, width: width - 40, flexBasis: 90 }}
            onTouchStart={() => handlePress(item.route)}
          >
            <Text
              variant="bodyMedium"
              style={{ fontSize: Font.size(18), fontWeight: '800', textAlign: 'center' }}
              color="#4169e1"
            >
              {formatMessage(item.name)}
            </Text>
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
    elevation: 6,
    borderRadius: 45,
    paddingVertical: 10,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'justify',
    alignItems: 'center',
  },
  sheet: {
    backgroundColor: 'white',
    padding: 16,
    height: HEIGHT,
    width: '100%',
    position: 'absolute',
    bottom: -OVERDRAG * 1.1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: BACKDROP_COLOR,
    zIndex: 1,
  },
});
