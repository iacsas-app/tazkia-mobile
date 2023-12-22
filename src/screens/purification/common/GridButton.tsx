import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Color } from '../../../constants/Color';
import { switchScreenOrientation } from '../../../services/Helpers';

type Props = {
  small?: boolean;
  onShow(): void;
};
function GridButton(props: Props) {
  function handlePress() {
    switchScreenOrientation();
    props.onShow();
  }
  return (
    <IconButton
      icon="grid"
      mode="contained"
      iconColor={Color.flatItemNoneBgColor}
      containerColor="#f5fffa"
      style={styles.btn}
      size={props.small ? 20 : 35}
      animated
      onPress={handlePress}
    />
  );
}

const styles = StyleSheet.create({
  btn: {
    borderColor: Color.flatItemNoneBgColor,
    borderWidth: 0.5,
    padding: 0,
    marginVertical: 0,
    opacity: 0.7,
  },
});

export default memo(GridButton);
