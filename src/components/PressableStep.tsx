import { useNavigation } from '@react-navigation/native';
import { ImageSourcePropType, PixelRatio, StyleSheet, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { useApplication } from '../hooks/use-application';
import { useMessage } from '../hooks/use-message';
import {
  InvocationsParamList,
  PresentationParamList,
  PurificationParamList,
  SunnahsParamList,
} from '../navigation/types';
import GlobalStyles from '../styles/GlobalStyles';

export interface Part {
  name?: string;
  route:
    | keyof PurificationParamList
    | keyof SunnahsParamList
    | keyof PresentationParamList
    | keyof InvocationsParamList;
  description: string;
  imageSource?: ImageSourcePropType;
}

interface Props {
  index: number;
  item: Part;
  nameTextSize?: number;
  descriptionTextSize?: number;
}
export default function PressableStep({ index, item, nameTextSize, descriptionTextSize }: Props) {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();
  const navigation = useNavigation<any>();

  const fontScale = PixelRatio.getFontScale();
  const getFontSize = (size: number) => size / fontScale;

  function handlePress() {
    navigation.navigate(item.route as any);
  }

  return (
    <TouchableRipple onPress={handlePress}>
      <View style={{ ...styles.container, gap: item.name ? 1 : 8 }}>
        {item.imageSource && (
          <Animated.Image
            entering={FadeInRight.duration(300 * (index * 2)).delay(300)}
            source={item.imageSource}
            style={styles.img}
          />
        )}
        {item.name && (
          <Animated.Text
            entering={FadeInRight.delay(400 + index * 50)}
            style={{ fontSize: getFontSize(nameTextSize ? nameTextSize : arabic ? 17 : 13) }}
          >
            {formatMessage(item.name)}
          </Animated.Text>
        )}
        <Animated.Text
          entering={FadeInLeft.delay(400 + index * 60).duration(600)}
          style={{
            fontWeight: '900',
            fontSize: getFontSize(descriptionTextSize ? descriptionTextSize : arabic ? 15 : 13),
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {formatMessage(item.description)}
        </Animated.Text>
      </View>
    </TouchableRipple>
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
    ...GlobalStyles.circle,
  },
});
