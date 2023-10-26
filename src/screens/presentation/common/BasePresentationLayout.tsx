import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import ScrollViewLayout from '../../../components/layout/ScrollViewLayout';
import GlobalStyles from '../../../styles/GlobalStyles';

export default function BasePresentationLayout({ children }: PropsWithChildren) {
  return (
    <ScrollViewLayout>
      <View style={styles.container}>{children}</View>
    </ScrollViewLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    paddingHorizontal: 8,
  },
});
