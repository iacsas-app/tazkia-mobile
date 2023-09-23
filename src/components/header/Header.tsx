import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { AppBar, IconButton } from '@react-native-material/core';
import MoreMenu from './MoreMenu';

export default function Header() {
  return (
    <AppBar
      enableColorOnDark
      color="secondary"
      centerTitle={true}
      leading={(props) => <IconButton icon={(props) => <Icon name="menu" {...props} />} {...props} />}
      trailing={(props) => <MoreMenu {...props} />}
    />
  );
}
