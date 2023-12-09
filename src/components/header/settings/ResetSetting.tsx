import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import { useStoreActions } from '../../../stores/hooks';
import Text from '../../Text';
import HStack from '../../stack/HStack';
import { SettingsStyles } from './SettingsStyles';

type Props = {
  onClick?(): void;
};
export function ResetSetting(props: Props) {
  const { formatMessage } = useMessage();
  const { width } = useWindowDimensions();
  const resetPurification = useStoreActions((state) => state.purification.reset);
  const resetSunnahs = useStoreActions((state) => state.sunnahs.reset);

  function handlePress() {
    resetPurification();
    resetSunnahs();
    if (props.onClick) {
      props.onClick();
    }
  }

  return (
    <TouchableOpacity onPress={handlePress} style={SettingsStyles.surface}>
      <HStack spacing={17} style={styles.stack}>
        <Avatar.Icon icon={() => <Icon name="database-remove" size={30} />} size={30} style={styles.avatar} />
        <Text variant="titleMedium" style={{ fontWeight: '700', color: 'black' }}>
          {formatMessage(TKeys.SETTINGS_RESET)}
        </Text>
      </HStack>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  stack: { alignItems: 'center', backgroundColor: 'transparent' },
  avatar: { backgroundColor: 'white' },
});
