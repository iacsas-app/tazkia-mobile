import { IconButton } from 'react-native-paper';

interface MoreMenuProps {
  onClick(): void;
}

export default function MoreMenu(props: MoreMenuProps) {
  return <IconButton icon="dots-vertical" size={30} onPress={props.onClick} />;
}
