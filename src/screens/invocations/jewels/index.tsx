import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Color } from '../../../constants/Color';
import Day from './Day';

function JewelsInvocationsScreen() {
  // array index + 1 represent the day,
  // and the value is the number of parts for this day. 0 is for intro and conclusion
  const partsByDay = useMemo(() => [0, 2, 2, 1, 2, 2, 2, 3, 0], []);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={partsByDay}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => <Day day={index} partNumbers={item} />}
        style={{ backgroundColor: Color.backgroundColor }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: Color.backgroundColor, flex: 1 },
});

export default memo(JewelsInvocationsScreen);
