import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Avatar, Box, HStack, Pressable } from '@react-native-material/core';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import Text from '../../../../../components/Text';
import { BodyPartType } from '../../../../../domains/purification/BodyPart';
import { useApplication } from '../../../../../hooks/use-application';
import { useMessage } from '../../../../../hooks/use-message';
import { isBodyPartStepInProgress } from '../../../../../services/Helpers';
import { useStoreState } from '../../../../../stores/hooks';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import { isFullyCompleted } from '../common/Helper';
import { PurificationStage } from '../tabs/HomeScreen';

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

  const width = 170;
  const space = arabic ? 10 : 2;
  const btnFontSize = arabic ? 15 : 9;
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
            <Text variant="bodySmall" color="#008080" style={styles.id}>
              {id}
            </Text>
          }
        />
        <HStack spacing={10}>
          <Text
            variant="bodyLarge"
            style={{ ...styles.partName, color: isCompleted ? 'white' : 'black', fontSize: arabic ? 18 : 15 }}
          >
            {formatMessage(nameKey)}
          </Text>
          {isCompleted && <Icon name="check" size={26} color="white" />}
        </HStack>
      </Box>
      {!isCompleted && (
        <Box h={40} w={width} style={styles.bottomBox}>
          <HStack spacing={arabic ? 20 : 5}>
            {!isCleaningInProgress && (
              <Box style={styles.btn}>
                <Pressable style={{ padding: 3 }} onPress={() => handlePress('cleaning')}>
                  <HStack spacing={space} style={GlobalStyles.center}>
                    <Icon name="account-tie-hat" size={12} color="#4b0082" />
                    <Text variant="bodyLarge" style={{ fontSize: btnFontSize }}>
                      {formatMessage(`button.cleaning`)}
                    </Text>
                  </HStack>
                </Pressable>
              </Box>
            )}
            {!isEnlightenmentInProgress && (
              <Box style={styles.btn}>
                <Pressable style={{ padding: 3 }} onPress={() => handlePress('enlightenment')}>
                  <HStack spacing={space} style={GlobalStyles.center}>
                    <Icon name="lightbulb-on" size={12} color="#32cd32" />
                    <Text variant="bodyLarge" style={{ fontSize: btnFontSize }}>
                      {formatMessage(`button.enlightenment`)}
                    </Text>
                  </HStack>
                </Pressable>
              </Box>
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
  container: { height: 130 },
  id: { fontWeight: 'bold' },
  topBox: {
    ...GlobalStyles.center,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 5,
  },
  bottomBox: {
    ...GlobalStyles.center,
    backgroundColor: '#fffafa',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  partName: { fontWeight: 'bold', marginTop: 3 },
  typeAvatar: { marginTop: -18 },
  idAvatar: { marginTop: -8 },
  btn: { elevation: 2, backgroundColor: '#f5fffa', borderRadius: 5, paddingHorizontal: 1 },
});
