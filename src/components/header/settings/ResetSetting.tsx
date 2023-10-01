import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Avatar, HStack, Pressable, Surface, Text } from '@react-native-material/core';
import { StyleSheet } from 'react-native';
import { useApplication } from '../../../hooks/use-application';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import { useStoreActions } from '../../../stores/hooks';
import { SettingsStyles } from './SettingsStyles';

export function ResetSetting() {
  const { arabicOrientation } = useApplication();
  const { formatMessage } = useMessage();
  const reset = useStoreActions((state) => state.purification.reset);

  function handlePress() {
    reset();
  }

  return (
    <Surface elevation={3} style={SettingsStyles.container} category="large">
      <Pressable onPress={handlePress} style={SettingsStyles.surface}>
        <HStack spacing={17} reverse={arabicOrientation} style={styles.stack}>
          <Avatar icon={() => <Icon name="database-remove" size={40} />} size={40} style={styles.avatar} />
          <Text>{formatMessage(TKeys.SETTINGS_RESET)}</Text>
        </HStack>
      </Pressable>
    </Surface>
  );
}

const styles = StyleSheet.create({
  stack: { alignItems: 'center' },
  avatar: { backgroundColor: 'white' },
});
