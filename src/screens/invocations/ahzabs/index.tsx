import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import Animated, { FadeInUp, FadeOut, SlideInDown } from 'react-native-reanimated';
import Text from '../../../components/Text';
import SimpleDialog, { SimpleDialogRef } from '../../../components/dialogs/SimpleDialog';
import HStack from '../../../components/stack/HStack';
import VStack from '../../../components/stack/VStack';
import { Color } from '../../../constants/Color';
import { Font } from '../../../constants/Font';
import { SCREEN_WIDTH } from '../../../constants/Screen';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import GlobalStyles from '../../../styles/GlobalStyles';

export default function AhzabsInvocationsScreen() {
  const dialog = useRef<SimpleDialogRef>(null);
  const { formatMessage } = useMessage();
  const navigation = useNavigation<any>();

  function handleSelect(section: number) {
    if (section < 0) {
      const intro = section === -1;
      const key = `invocations.ahzabs.${intro ? 'introduction' : 'conclusion'}`;
      const titleKey = intro ? TKeys.GENERAL_INTRODUCTION_TITLE : TKeys.CONCLUSION;
      dialog.current?.open(key as TKeys, titleKey);
    } else {
      navigation.navigate('AhzabsSection', { section });
    }
  }

  return (
    <VStack style={styles.container} spacing={10}>
      <VStack spacing={5} style={styles.header}>
        <Animated.Text entering={FadeInUp.delay(700).duration(500).mass(15)} exiting={FadeOut} style={styles.bookTitle}>
          {formatMessage(TKeys.INVOCATION_AHZABS_TITLE)}
        </Animated.Text>
      </VStack>
      <View style={styles.common} onTouchEnd={() => handleSelect(-1)}>
        <Text variant="titleLarge" style={styles.commonBody}>
          {formatMessage(TKeys.GENERAL_INTRODUCTION_TITLE)}
        </Text>
      </View>
      {[1, 2, 3].map((section: number) => (
        <Animated.View
          key={section}
          entering={SlideInDown.delay(50 * section)
            .duration(200 * section)
            .mass(2)}
          exiting={FadeOut}
          style={styles.pressable}
          onTouchEnd={() => handleSelect(section)}
        >
          <View style={{ width: SCREEN_WIDTH - 32 }}>
            <HStack style={styles.titleContainer}>
              <Avatar.Text
                label={formatMessage(TKeys.SECTION, { value: section })}
                size={25}
                style={styles.id}
                color="white"
              />
              <Text variant="bodySmall" style={styles.title}>
                {formatMessage(`invocations.ahzabs.section.${section}`)}
              </Text>
            </HStack>
          </View>
        </Animated.View>
      ))}

      <View style={styles.common} onTouchEnd={() => handleSelect(-2)}>
        <Text variant="titleLarge" style={styles.commonBody}>
          {formatMessage(TKeys.CONCLUSION)}
        </Text>
      </View>
      <SimpleDialog ref={dialog} />
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.center,
    paddingTop: 10,
    paddingBottom: 30,
  },
  header: { paddingBottom: 10 },
  pressable: {
    ...GlobalStyles.circle,
    backgroundColor: Color.partProgressBgColor,
    width: SCREEN_WIDTH - 20,
    elevation: 8,
    alignItems: 'center',
    paddingVertical: 10,
  },
  titleContainer: {
    ...GlobalStyles.center,
    paddingVertical: 10,
  },
  title: {
    fontFamily: 'ReemKufiFun',
    fontSize: Font.size(17),
    justifyContent: 'center',
    textAlign: 'auto',
    width: '80%',
    marginLeft: '20%',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  id: { position: 'absolute', left: 5, elevation: 2, width: 60, backgroundColor: '#3db371', marginEnd: 50 },
  common: {
    ...GlobalStyles.circle,
    backgroundColor: 'teal',
    elevation: 5,
    width: SCREEN_WIDTH - 20,
    height: 40,
    marginVertical: 10,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  commonBody: {
    textAlign: 'center',
    fontSize: Font.size(18),
    color: Color.flatItemNoneColor,
  },
  bookTitle: {
    ...GlobalStyles.center,
    fontFamily: 'AmiriQuran',
    fontSize: Font.size(20),
    paddingBottom: 10,
    textShadowRadius: 8,
    color: 'teal',
  },
});
