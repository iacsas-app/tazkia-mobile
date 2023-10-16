import React, { PropsWithChildren } from 'react';

import { StyleSheet, View, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Text from './Text';

type SectionProps = PropsWithChildren<{
  title: string;
  color?: string;
}>;
export default function TextSection({ children, title, color }: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: color ? color : isDarkMode ? 'green' : Colors.black,
          },
        ]}
      >
        {title}
      </Text>
      {children && (
        <Text
          style={[
            styles.sectionDescription,
            {
              color: isDarkMode ? Colors.light : Colors.dark,
            },
          ]}
        >
          {children}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
