import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import Animated, { FadeInLeft, FadeInRight, SlideInDown } from 'react-native-reanimated';
import Text from '../../../components/Text';
import HStack from '../../../components/stack/HStack';
import VStack from '../../../components/stack/VStack';
import { Color } from '../../../constants/Color';
import { Font } from '../../../constants/Font';
import { SCREEN_WIDTH } from '../../../constants/Screen';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import GlobalStyles from '../../../styles/GlobalStyles';

interface Props {
  onSelect(section: number): void;
}
export default function SectionChooser({ onSelect }: Props) {
  const { formatMessage } = useMessage();

  return (
    <VStack style={styles.container} spacing={12}>
      <Animated.View
        entering={FadeInRight.delay(600).duration(500).mass(80)}
        style={styles.common}
        onTouchEnd={() => onSelect(0)}
      >
        <Text variant="titleLarge" style={styles.commonBody}>
          {formatMessage(TKeys.GENERAL_INTRODUCTION_TITLE)}
        </Text>
      </Animated.View>
      {[1, 2, 3].map((section: number) => (
        <Animated.View
          key={section}
          entering={SlideInDown.delay(50 * section)
            .duration(200 * section)
            .mass(1)
            .springify()}
          style={styles.pressable}
          onTouchEnd={() => onSelect(section)}
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
      <Animated.View
        entering={FadeInLeft.delay(600).duration(500).mass(80)}
        style={styles.common}
        onTouchEnd={() => onSelect(4)}
      >
        <Text variant="titleLarge" style={styles.commonBody}>
          {formatMessage(TKeys.CONCLUSION)}
        </Text>
      </Animated.View>
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
    fontWeight: '700',
    fontSize: Font.size(16),
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
    width: SCREEN_WIDTH - 200,
    height: 30,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  commonBody: {
    fontWeight: '900',
    textAlign: 'center',
    fontSize: Font.size(16),
    color: Color.flatItemNoneColor,
  },
});
