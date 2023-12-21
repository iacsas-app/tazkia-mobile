import { StyleSheet } from 'react-native';
import { Color } from '../constants/Color';
import { Font } from '../constants/Font';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/Screen';

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rounded: {
    borderRadius: 10,
  },
  circle: { borderRadius: 100 },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  centerAlign: { alignItems: 'center' },
  description: {
    marginTop: 15,
    fontSize: Font.size(18),
    lineHeight: 35,
    alignSelf: 'center',
  },
  spaceBetween: {
    alignContent: 'space-between',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  closeFab: {
    borderRadius: 100,
    position: 'absolute',
    left: 15,
    bottom: 15,
    backgroundColor: Color.flatItemNoneBgColor,
    opacity: 0.6,
  },
  defaultDialog: {
    marginLeft: 0,
    maxHeight: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: 'white',
  },
  justify: { textAlign: 'justify' },
  fixedHeader: {
    padding: 10,
    backgroundColor: '#fffafa',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default GlobalStyles;
