import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Avatar, HStack, Pressable, Surface, Text } from '@react-native-material/core';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { useApplication } from '../../../hooks/use-application';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import { useStoreActions } from '../../../stores/hooks';
import { SettingsStyles } from './SettingsStyles';

export function ResetSetting() {
  const { arabic } = useApplication();
  const { formatMessage } = useMessage();
  const { width } = useWindowDimensions();
  const reset = useStoreActions((state) => state.purification.reset);

  function handlePress() {
    reset();
  }

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Surface elevation={2} style={{ width: width - 110, backgroundColor: 'transparent' }}>
        <Pressable onPress={handlePress} style={SettingsStyles.surface}>
          <HStack spacing={17} reverse={arabic} style={styles.stack}>
            <Avatar icon={() => <Icon name="database-remove" size={40} />} size={40} style={styles.avatar} />
            <Text>{formatMessage(TKeys.SETTINGS_RESET)}</Text>
          </HStack>
        </Pressable>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  stack: { alignItems: 'center', backgroundColor: 'transparent' },
  avatar: { backgroundColor: 'white' },
});
