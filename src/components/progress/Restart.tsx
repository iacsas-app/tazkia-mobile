import { IconButton } from 'react-native-paper';

type Props = {
  onClick(): void;
};
export default function Restart(props: Props) {
  return (
    <IconButton
      icon="cog-counterclockwise"
      mode="outlined"
      iconColor="#48d1cc"
      containerColor="#f5fffa"
      style={{ borderColor: '#f5fffa', padding: 0, marginVertical: 0 }}
      size={30}
      onPress={props.onClick}
    />
  );
}
