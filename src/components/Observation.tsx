import { memo } from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { SCREEN_WIDTH } from '../constants/Screen';

const size = SCREEN_WIDTH - 100;

function Observation() {
  return <Animated.Image source={require('../../assets/img/purification/soul/mourakaba.png')} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: { width: size, height: size, borderRadius: 20 },
});

export default memo(Observation);
