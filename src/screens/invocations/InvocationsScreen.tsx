import { useNavigation } from '@react-navigation/native';
import React, { ReactNode, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import Animated, { FadeInUp } from 'react-native-reanimated';
import Text from '../../components/Text';
import BottomSheet, { BottomSheetRef } from '../../components/bottomSheet/BottomSheet';
import VStack from '../../components/stack/VStack';
import { Color } from '../../constants/Color';
import { Font } from '../../constants/Font';
import { SCREEN_WIDTH } from '../../constants/Screen';
import { useApplication } from '../../hooks/use-application';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import GlobalStyles from '../../styles/GlobalStyles';
import SectionChooser from './ahzabs/SectionChooser';
import ImmunizationDialog, { ImmunizationDialogRef } from './immunization/ImmunizationDialog';
import PeriodChooser from './immunization/PeriodChooser';
import { ImmunizationPeriod } from './immunization/data';

export default function InvocationsScreen() {
  const ref = useRef<BottomSheetRef>(null);
  const immunizationDialogRef = useRef<ImmunizationDialogRef>(null);
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();
  const navigation = useNavigation<any>();
  const [content, setContent] = useState<ReactNode>();

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
        image: require('./../../../assets/img/presentation/books/ahzabs.png'),
      },
    ],
    [],
  );

  function handleIntroductionClick() {
    immunizationDialogRef.current?.open();
  }

  function handlePress(route: string) {
    if (route === 'Immunization') {
      setContent(<PeriodChooser onSelect={handlePeriodSelect} onMetaSelect={handleIntroductionClick} />);
      ref.current?.open();
    } else if (route === 'Ahzabs') {
      setContent(<SectionChooser onSelect={handleSectionSelect} />);
      ref.current?.open();
    } else {
      navigation.navigate(route);
    }
  }

  function handlePeriodSelect(period: ImmunizationPeriod) {
    navigation.navigate('Immunization', { period });
    ref.current?.close();
  }

  function handleSectionSelect(section: number) {
    if (section === 0 || section === 4) {
      const key = `invocations.ahzabs.${section === 0 ? 'introduction' : 'conclusion'}`;
      immunizationDialogRef.current?.open(key as TKeys);
    } else {
      navigation.navigate('Ahzabs', { section });
      ref.current?.close();
    }
  }

  return (
    <BottomSheet ref={ref} content={content}>
      <VStack spacing={15} style={styles.container}>
        {parts.map((item, index: number) => (
          <Animated.View
            key={index}
            entering={FadeInUp.delay(100 * (index * 2))}
            style={styles.part}
            onTouchStart={() => handlePress(item.route)}
          >
            {item.image && <Avatar.Image source={item.image} size={70} style={styles.image} />}
            <View style={styles.summary}>
              <Text
                variant="bodySmall"
                style={{ ...styles.summaryLabel, fontSize: Font.size(arabic ? 16 : 14), color: 'black' }}
              >
                {formatMessage(item.name)}
              </Text>
            </View>
          </Animated.View>
        ))}
      </VStack>
      <ImmunizationDialog ref={immunizationDialogRef} />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.center,
    flex: 1,
    width: SCREEN_WIDTH,
    backgroundColor: Color.backgroundColor,
  },
  part: {
    backgroundColor: Color.partDefaultBgColor,
    width: SCREEN_WIDTH - 10,
    flexBasis: 95,
    elevation: 6,
    borderRadius: 45,
    paddingVertical: 10,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'justify',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: { backgroundColor: 'whitesmoke', position: 'absolute', left: 6 },
  summary: {
    ...GlobalStyles.center,
    left: 28,
    width: '80%',
  },
  summaryLabel: {
    fontWeight: '700',
    flexBasis: 90,
    marginBottom: -6,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    verticalAlign: 'middle',
    paddingHorizontal: 20,
  },
});
