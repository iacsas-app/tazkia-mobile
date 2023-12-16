import { IconButton } from 'react-native-paper';
import { Color } from '../../constants/Color';

type Props = {
  onClick(): void;
};
export default function Restart(props: Props) {
  return (
    <IconButton
      icon="cog-counterclockwise"
      mode="outlined"
      iconColor={Color.flatItemNoneBgColor}
      containerColor="#f5fffa"
      style={{ borderColor: '#f5fffa', padding: 0, marginVertical: 0, opacity: 0.7 }}
      size={20}
      onPress={props.onClick}
    />
  );
}
