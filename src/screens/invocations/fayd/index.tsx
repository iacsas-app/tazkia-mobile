import React, { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import SimpleDialog, { SimpleDialogRef } from '../../../components/dialogs/SimpleDialog';
import { Color } from '../../../constants/Color';
import { TKeys } from '../../../locales/constants';
import Chapters from './Chapters';

export default function OverflowInvocationsScreen() {
  const ref = useRef<SimpleDialogRef>(null);

  const handleIntro = useCallback(() => {
    ref.current?.open(TKeys.INVOCATIONS_FAYDO_INTRODUCTION, TKeys.GENERAL_PRESENTATION_TITLE);
  }, []);

  return (
    <View style={styles.container}>
      <Chapters onIntro={handleIntro} />
      <SimpleDialog ref={ref} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: Color.backgroundColor },
});
