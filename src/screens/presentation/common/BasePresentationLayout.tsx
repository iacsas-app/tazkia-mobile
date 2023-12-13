import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import ScrollViewLayout from '../../../components/layout/ScrollViewLayout';
import { Color } from '../../../constants/Color';
import GlobalStyles from '../../../styles/GlobalStyles';

export default function BasePresentationLayout({ children }: PropsWithChildren) {
  return (
    <ScrollViewLayout style={styles.root}>
      <View style={GlobalStyles.container}>{children}</View>
    </ScrollViewLayout>
  );
}

const styles = StyleSheet.create({
  root: { backgroundColor: Color.backgroundColor },
});
