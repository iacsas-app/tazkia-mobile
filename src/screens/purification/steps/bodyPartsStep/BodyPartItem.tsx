import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Avatar, Box, HStack, Pressable, Surface, Text } from '@react-native-material/core';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import { BodyPartType } from '../../../../domains/purification/BodyPart';
import { useApplication } from '../../../../hooks/use-application';
import { useMessage } from '../../../../hooks/use-message';
import { isBodyPartStepInProgress } from '../../../../services/Helpers';
import { useStoreState } from '../../../../stores/hooks';
import GlobalStyles from '../../../../styles/GlobalStyles';
import { PurificationStage } from './BodyPartsScreen';
import { isFullyCompleted } from './common/Helper';

interface BodyPartItemProps {
  id: number;
  type: BodyPartType;
  nameKey: string;
  imageSource: ImageSourcePropType;
  onOpenRules: (type: BodyPartType, mode: PurificationStage) => void;
}
export default function BodyPartItem({ id, type, nameKey, imageSource, onOpenRules }: BodyPartItemProps) {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();
  const findBodyPart = useStoreState((state) => state.purification.findByPart);

  const width = 175;
  const space = arabic ? 10 : 2;
  const btnFontSize = arabic ? 15 : 10;
  const progress = findBodyPart(type);
  const inProgress = progress !== undefined;
  const isCompleted = inProgress && isFullyCompleted(progress);
  const isCleaningInProgress = isBodyPartStepInProgress(progress, 'cleaning');
  const isEnlightenmentInProgress = isBodyPartStepInProgress(progress, 'enlightenment');

  const backgroundColor = isCompleted ? '#2e8b57' : inProgress ? '#66cdaa' : '#87ceeb';

  function handlePress(step: PurificationStage) {
    onOpenRules(type, step);
  }

  return (
    <View style={styles.container}>
      <Box h={80} w={width} style={{ ...styles.topBox, backgroundColor }}>
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
        <HStack spacing={10} style={GlobalStyles.center}>
          <Text style={{ ...styles.partName, color: isCompleted ? 'white' : 'black', fontSize: arabic ? 18 : 15 }}>
            {formatMessage(nameKey)}
          </Text>
          {isCompleted && <Icon name="check" size={26} color="white" />}
        </HStack>
      </Box>
      {!isCompleted && (
        <Box h={40} w={width} style={styles.bottomBox}>
          <HStack spacing={arabic ? 20 : 5} reverse={arabic}>
            {!isCleaningInProgress && (
              <Surface elevation={2} category="small" style={styles.action}>
                <Pressable style={{ padding: 3 }} onPress={() => handlePress('cleaning')}>
                  <HStack spacing={space} style={GlobalStyles.center} reverse={arabic}>
                    <Icon name="account-tie-hat" size={15} color="#4b0082" />
                    <Text style={{ fontSize: btnFontSize }}>{formatMessage(`button.cleaning`)}</Text>
                  </HStack>
                </Pressable>
              </Surface>
            )}
            {!isEnlightenmentInProgress && (
              <Surface elevation={2} category="small" style={styles.action}>
                <Pressable style={{ padding: 3 }} onPress={() => handlePress('enlightenment')}>
                  <HStack spacing={space} style={GlobalStyles.center} reverse={arabic}>
                    <Icon name="lightbulb-on" size={15} color="#32cd32" />
                    <Text style={{ fontSize: btnFontSize }}>{formatMessage(`button.enlightenment`)}</Text>
                  </HStack>
                </Pressable>
              </Surface>
            )}
            {isCleaningInProgress && isEnlightenmentInProgress && (
              <Icon name="progress-check" size={25} color="#20b2aa" />
            )}
          </HStack>
        </Box>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: 185, height: 130, ...GlobalStyles.center },
  id: { fontWeight: 'bold' },
  topBox: {
    ...GlobalStyles.center,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 6,
  },
  bottomBox: {
    ...GlobalStyles.center,
    backgroundColor: '#fffafa',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  partName: { fontWeight: 'bold', marginTop: 3 },
  action: {},
  typeAvatar: { marginTop: -18 },
  idAvatar: { marginTop: -8 },
});
