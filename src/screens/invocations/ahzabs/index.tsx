import { useRoute } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../../../components/Text';
import { Color } from '../../../constants/Color';
import { useMessage } from '../../../hooks/use-message';
import { AhzabsScreenRouteProp } from '../../../navigation/types';
import GlobalStyles from '../../../styles/GlobalStyles';
import ChapterDialog, { ChapterDialogRef } from './ChapterDialog';
import Chapters from './Chapters';

export default function AhzabsInvocationsScreen() {
  const ref = useRef<ChapterDialogRef>(null);
  const { formatMessage } = useMessage();
  const { section } = useRoute<AhzabsScreenRouteProp>().params;

  const handleSelect = useCallback((section: number, chapter: number) => {
    ref.current?.open(section, chapter);
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="bodyMedium" style={GlobalStyles.fixedHeader}>
        {formatMessage(`invocations.ahzabs.section.${section}`)}
      </Text>
      <Chapters section={section} onSelect={handleSelect} />
      <ChapterDialog ref={ref} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: Color.backgroundColor },
});
