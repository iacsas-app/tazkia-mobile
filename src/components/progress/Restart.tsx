import { IconButton } from 'react-native-paper';

type Props = {
  onClick(): void;
};
export default function Restart(props: Props) {
  return (
    <IconButton
      icon="cog-counterclockwise"
      mode="outlined"
      iconColor="#d35858"
      containerColor="#e9bcbc70"
      style={{ borderColor: '#e9bcbc70' }}
      size={25}
      onPress={props.onClick}
    />
  );
}
