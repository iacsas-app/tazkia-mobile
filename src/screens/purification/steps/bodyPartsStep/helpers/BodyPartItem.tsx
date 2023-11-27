import { ImageSourcePropType, StyleSheet } from 'react-native';
import { Avatar, TouchableRipple } from 'react-native-paper';
import Text from '../../../../../components/Text';
import HStack from '../../../../../components/stack/HStack';
import { Font } from '../../../../../constants/Font';
import { SCREEN_WIDTH } from '../../../../../constants/Screen';
import { BodyPartType } from '../../../../../domains/purification/BodyPart';
import { useApplication } from '../../../../../hooks/use-application';
import { useMessage } from '../../../../../hooks/use-message';
import { useStoreState } from '../../../../../stores/hooks';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import { isFullyCompleted } from '../common/Helper';

interface BodyPartItemProps {
  id: number;
  part: BodyPartType;
  imageSource: ImageSourcePropType;
  onPress: (part: BodyPartType) => void;
}
export default function BodyPartItem({ id, part, imageSource, ...props }: BodyPartItemProps) {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();
  const findBodyPart = useStoreState((state) => state.purification.findBodyPart);

  const progress = findBodyPart(part);
  const inProgress = progress !== undefined;
  const completed = inProgress && isFullyCompleted(progress);
  const backgroundColor = inProgress ? (completed ? '#8de0b6' : '#ccf3df') : '#f5fffa';

  function handlePress() {
    props.onPress(part);
  }

  return (
    <TouchableRipple style={{ ...styles.container, backgroundColor }} onPress={handlePress}>
      <>
        <Avatar.Image size={60} style={styles.typeAvatar} source={imageSource} />
        <Avatar.Text
          size={25}
          style={{ ...styles.idAvatar, backgroundColor: completed ? '#dffcef' : inProgress ? 'white' : '#c5f5c5' }}
          labelStyle={{ fontSize: Font.size(12), fontWeight: '900' }}
          color="seagreen"
          label={id.toString()}
        />
        <HStack spacing={10}>
          <Text
            variant="bodyLarge"
            style={{ ...styles.partName, color: completed ? 'white' : 'black', fontSize: arabic ? 18 : 15 }}
          >
            {formatMessage(`purification.body-parts.${part}`)}
          </Text>
        </HStack>
      </>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.center,
    width: (SCREEN_WIDTH - 40) / 2,
    height: 100,
    borderRadius: 30,
    elevation: 6,
  },
  id: { fontWeight: 'bold' },
  partName: { fontWeight: 'bold', marginTop: 3 },
  typeAvatar: { marginTop: -18 },
  idAvatar: { marginTop: -8, backgroundColor: 'red' },
});
