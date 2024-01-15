import { useKeepAwake } from 'expo-keep-awake';
import React, { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import SimpleDialog, { SimpleDialogRef } from '../../../components/dialogs/SimpleDialog';
import { Color } from '../../../constants/Color';
import { TKeys } from '../../../locales/constants';
import Chapters from './Chapters';

export default function OverflowInvocationsScreen() {
  useKeepAwake(); // This screen will never sleep!
  const ref = useRef<SimpleDialogRef>(null);

  const handleClick = useCallback((titleKey: TKeys, summaryKey: TKeys) => {
    ref.current?.open(summaryKey, titleKey);
  }, []);

  return (
    <View style={styles.container}>
      <Chapters onClick={handleClick} />
      <SimpleDialog ref={ref} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: Color.backgroundColor },
});
