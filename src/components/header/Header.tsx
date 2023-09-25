import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { AppBar, IconButton } from '@react-native-material/core';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import MoreMenu from './MoreMenu';

export default function Header() {
  const { formatMessage } = useMessage();
  return (
    <AppBar
      enableColorOnDark
      color="secondary"
      centerTitle={true}
      title={formatMessage(TKeys.APPLICATION_TITLE_PRIMARY)}
      subtitle={formatMessage(TKeys.APPLICATION_TITLE_SECONDARY)}
      leading={(props) => <IconButton icon={(props) => <Icon name="menu" {...props} />} {...props} />}
      trailing={(props) => <MoreMenu {...props} />}
    />
  );
}
