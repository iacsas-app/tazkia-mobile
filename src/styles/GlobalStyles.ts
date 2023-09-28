import { StyleSheet } from 'react-native';

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
  center: { justifyContent: 'center', alignItems: 'center' },
});

export default GlobalStyles;
