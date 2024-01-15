import React, { memo, useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import SimpleDialog, { SimpleDialogRef } from '../../../components/dialogs/SimpleDialog';
import { Color } from '../../../constants/Color';
import { TKeys } from '../../../locales/constants';
import Day from './Day';

function JewelsInvocationsScreen() {
  const ref = useRef<SimpleDialogRef>(null);
  // array index + 1 represent the day,
  // and the value is the number of parts for this day. 0 is for intro and conclusion
  const partsByDay = useMemo(() => [0, 2, 2, 1, 2, 2, 2, 3, 0], []);

  const handleInfo = useCallback((title: TKeys, summary: TKeys) => {
    ref.current?.open(summary, title);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={partsByDay}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => <Day day={index} partNumbers={item} onInfo={handleInfo} />}
        style={{ backgroundColor: Color.backgroundColor }}
      />
      <SimpleDialog ref={ref} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: Color.backgroundColor, flex: 1 },
});

export default memo(JewelsInvocationsScreen);
