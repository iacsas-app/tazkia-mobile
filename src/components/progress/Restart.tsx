import { IconButton } from 'react-native-paper';

type Props = {
  onClick(): void;
};
export default function Restart(props: Props) {
  return (
    <IconButton
      icon="cog-counterclockwise"
      mode="outlined"
      iconColor="teal"
      containerColor="#f5fffa"
      style={{ borderColor: '#f5fffa', padding: 0, marginVertical: 0 }}
      size={22}
      onPress={props.onClick}
    />
  );
}
