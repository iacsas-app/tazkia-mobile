import Icon from '@expo/vector-icons/MaterialCommunityIcons';
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
  const width = 194;
  const space = arabicOrientation ? 10 : 2;

  function handlePress(mode: PurificationType) {
    onDetailsOpen(type, mode);
  }

  return (
    <Box style={styles.container}>
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
        <HStack spacing={arabicOrientation ? 20 : 5} reverse={arabicOrientation}>
          <Surface elevation={2} category="small" style={styles.action}>
            <Pressable style={{ padding: 3 }} onPress={() => handlePress('purification')}>
              <HStack spacing={space} style={GlobalStyles.center} reverse={arabicOrientation}>
                <Icon name="account-tie-hat" size={15} color="#4b0082" />
                <Text variant="caption">{formatMessage(`button.purification`)}</Text>
              </HStack>
            </Pressable>
          </Surface>
          <Surface elevation={2} category="small" style={styles.action}>
            <Pressable style={{ padding: 3 }} onPress={() => handlePress('illumination')}>
              <HStack spacing={space} style={GlobalStyles.center} reverse={arabicOrientation}>
                <Icon name="lightbulb-on" size={15} color="#32cd32" />
                <Text variant="caption">{formatMessage(`button.illumination`)}</Text>
              </HStack>
            </Pressable>
          </Surface>
        </HStack>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: { width: 185, height: 130, ...GlobalStyles.center },
  id: { fontWeight: 'bold' },
  topBox: {
    ...GlobalStyles.center,
    backgroundColor: '#66cdaa',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  bottomBox: {
    ...GlobalStyles.center,
    backgroundColor: '#fffafa',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  partName: { fontWeight: 'bold', marginTop: 3 },
  action: {},
  typeAvatar: { marginTop: -18 },
  idAvatar: { marginTop: -8 },
});
