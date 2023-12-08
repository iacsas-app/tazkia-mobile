import { useRoute } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Color } from '../../../constants/Color';
import { AhzabsScreenRouteProp } from '../../../navigation/types';
import ChapterDialog, { ChapterDialogRef } from './ChapterDialog';
import Chapters from './Chapters';

export default function AhzabsInvocationsScreen() {
  const ref = useRef<ChapterDialogRef>(null);
  const { section } = useRoute<AhzabsScreenRouteProp>().params;

  const handleSelect = useCallback((section: number, chapter: number) => {
    ref.current?.open(section, chapter);
  }, []);

  return (
    <View style={styles.container}>
      <Chapters section={section} onSelect={handleSelect} />
      <ChapterDialog ref={ref} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: Color.backgroundColor },
});
