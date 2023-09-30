import { Avatar, Box, HStack, Pressable, Surface, Text } from '@react-native-material/core';
import { ImageSourcePropType, StyleSheet } from 'react-native';
import { BodyPartType } from '../../../../../domains/purification/BodyPart';
import { useApplication } from '../../../../../hooks/use-application';
import { useMessage } from '../../../../../hooks/use-message';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import { PurificationType } from '../BodyPartsScreen';

interface BodyPartItemProps {
  id: number;
  type: BodyPartType;
  nameKey: string;
  imageSource: ImageSourcePropType;
  onDetailsOpen: (type: BodyPartType, mode: PurificationType) => void;
}
export default function BodyPartItem({ id, type, nameKey, imageSource, onDetailsOpen }: BodyPartItemProps) {
  const { formatMessage } = useMessage();
  const { arabicOrientation } = useApplication();
  const width = 185;

  function handlePress(mode: PurificationType) {
    onDetailsOpen(type, mode);
  }

  return (
    <Surface elevation={6} category="medium" style={styles.container}>
      <Box h={90} w={width} style={styles.topBox}>
        <Avatar size={50} style={styles.typeAvatar} image={imageSource} />
        <Avatar
          size={20}
          style={styles.idAvatar}
          color="white"
          label={
            <Text variant="caption" color="#008080" style={styles.id}>
              {id}
            </Text>
          }
        />
        <Text variant="h6" style={styles.partName}>
          {formatMessage(nameKey)}
        </Text>
      </Box>
      <Box h={40} w={width} style={styles.bottomBox}>
        <HStack spacing={5} reverse={arabicOrientation}>
          {['purification', 'illumination'].map((action) => (
            <Surface key={action} elevation={2} category="small" style={styles.action}>
              <Pressable style={{ padding: 5 }} onPress={() => handlePress(action as PurificationType)}>
                <Text variant="caption">{formatMessage(`button.${action}`)}</Text>
              </Pressable>
            </Surface>
          ))}
        </HStack>
      </Box>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: { width: 185, height: 130, ...GlobalStyles.center },
  id: { fontWeight: 'bold' },
  topBox: { backgroundColor: '#fdf5e6', ...GlobalStyles.center },
  bottomBox: { backgroundColor: '#fffafa', ...GlobalStyles.center },
  partName: { fontWeight: 'bold', marginTop: 3 },
  action: {},
  typeAvatar: { marginTop: -18 },
  idAvatar: { marginTop: -8 },
});
