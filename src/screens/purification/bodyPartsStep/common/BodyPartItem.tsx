import { Avatar, Box, HStack, Pressable, Surface, Text } from '@react-native-material/core';
import { ImageSourcePropType, StyleSheet } from 'react-native';
import { PurificationMode } from '..';
import { useMessage } from '../../../../hooks/use-message';
import { TKeys } from '../../../../locales/constants';

interface BodyPartItemProps {
  partId: number;
  nameKey: string;
  imageSource: ImageSourcePropType;
  onDetailsOpen: (partId: number, mode: PurificationMode) => void;
}
export default function BodyPartItem({
  partId,
  nameKey,
  imageSource,
  onDetailsOpen: onOpenDetails,
}: BodyPartItemProps) {
  const { formatMessage } = useMessage();

  function handlePress(mode: PurificationMode) {
    onOpenDetails(partId, mode);
  }

  return (
    <Surface elevation={6} category="medium" style={styles.container}>
      <Box h={90} w={170} style={{ backgroundColor: '#e0ffff', justifyContent: 'center', alignItems: 'center' }}>
        <Avatar size={50} style={{ marginTop: -18 }} image={imageSource} />
        <Avatar
          size={20}
          style={{ marginTop: -8 }}
          color="white"
          label={
            <Text variant="caption" color="#008080">
              {partId}
            </Text>
          }
        />
        <Text variant="h6" style={{ fontWeight: 'bold', marginTop: 3 }}>
          {formatMessage(nameKey)}
        </Text>
      </Box>
      <Box h={40} w={170} style={{ backgroundColor: '#fffafa', justifyContent: 'center', alignItems: 'center' }}>
        <HStack spacing={5}>
          <Surface elevation={2} category="small" style={{ backgroundColor: '#f5fffa' }}>
            <Pressable style={{ padding: 5 }} onPress={() => handlePress('illumination')}>
              <Text variant="caption">{formatMessage(TKeys.BUTTON_ILLUMINATION)}</Text>
            </Pressable>
          </Surface>
          <Surface elevation={2} category="small" style={{ backgroundColor: '#f5fffa' }}>
            <Pressable style={{ padding: 5 }} onPress={() => handlePress('purification')}>
              <Text variant="caption">{formatMessage(TKeys.BUTTON_PURIFICATION)}</Text>
            </Pressable>
          </Surface>
        </HStack>
      </Box>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: { width: 170, height: 130, justifyContent: 'center', alignItems: 'center' },
});
