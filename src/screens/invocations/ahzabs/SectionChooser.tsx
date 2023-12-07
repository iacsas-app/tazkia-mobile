import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, TouchableRipple } from 'react-native-paper';
import Text from '../../../components/Text';
import VStack from '../../../components/stack/VStack';
import { Color } from '../../../constants/Color';
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
      {[1, 2, 3].map((section: number) => (
        <TouchableRipple key={section} style={styles.pressable} onPress={() => onSelect(section)}>
          <View style={styles.titleContainer}>
            <Avatar.Text
              label={formatMessage(TKeys.SECTION, { value: section })}
              size={25}
              style={styles.id}
              color="white"
            />
            <Text variant="bodyMedium" style={styles.title}>
              {formatMessage(`invocations.ahzabs.section.${section}`)}
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
    backgroundColor: Color.partBgColor,
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
  title: { fontWeight: '700', fontSize: 16, marginLeft: 25 },
  id: { position: 'absolute', left: 10, elevation: 2, width: 52 },
});
