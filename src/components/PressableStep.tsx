import { Avatar, Pressable, Stack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { ImageSourcePropType, PixelRatio, StyleSheet } from 'react-native';
import { useApplication } from '../hooks/use-application';
import { useMessage } from '../hooks/use-message';
import { PresentationParamList, PurificationParamList, SunnahsParamList } from '../navigation/types';
import Text from './Text';

export interface Part {
  name?: string;
  route: keyof PurificationParamList | keyof SunnahsParamList | keyof PresentationParamList;
  description: string;
  imageSource: ImageSourcePropType;
}

interface Props {
  item: Part;
  nameTextSize?: number;
  descriptionTextSize?: number;
}
export default function PressableStep({ item, nameTextSize, descriptionTextSize }: Props) {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();
  const navigation = useNavigation<any>();

  const fontScale = PixelRatio.getFontScale();
  const getFontSize = (size: number) => size / fontScale;

  function handlePress() {
    navigation.navigate(item.route as any);
  }

  return (
    <Pressable onPress={handlePress}>
      <Stack spacing={item.name ? 1 : 8} style={styles.container}>
        <Avatar image={item.imageSource} imageStyle={styles.img} size={90} />
        {item.name && (
          <Text variant="body1" style={{ fontSize: getFontSize(nameTextSize ? nameTextSize : arabic ? 17 : 13) }}>
            {formatMessage(item.name)}
          </Text>
        )}
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: getFontSize(descriptionTextSize ? descriptionTextSize : arabic ? 15 : 13),
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {formatMessage(item.description)}
        </Text>
      </Stack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
  },
  img: {
    width: 90,
    height: 90,
  },
});
