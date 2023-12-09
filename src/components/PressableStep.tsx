import { useNavigation } from '@react-navigation/native';
import { ImageSourcePropType, StyleProp, StyleSheet, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Animated, { FadeIn, FadeInLeft, FadeInRight, FadeInUp, FadeOut } from 'react-native-reanimated';
import { Color } from '../constants/Color';
import { Font } from '../constants/Font';
import { useApplication } from '../hooks/use-application';
import { useMessage } from '../hooks/use-message';
import { InvocationsParamList, PresentationParamList, PurificationParamList } from '../navigation/types';
import GlobalStyles from '../styles/GlobalStyles';

export interface Part {
  name?: string;
  route: keyof PurificationParamList | keyof PresentationParamList | keyof InvocationsParamList;
  description: string;
  imageSource?: ImageSourcePropType;
}

interface Props {
  index: number;
  item: Part;
  hasProgress?: boolean;
  nameTextSize?: number;
  descriptionTextSize?: number;
  style?: StyleProp<any>;
}
export default function PressableStep({ index, item, nameTextSize, descriptionTextSize, ...props }: Props) {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();
  const navigation = useNavigation<any>();

  const backgroundColor = props.hasProgress === true ? Color.partProgressBgColor : Color.partDefaultBgColor;

  function handlePress() {
    navigation.navigate(item.route as any);
  }

  return (
    <Animated.View entering={FadeInUp.delay(200 * (index * 2))} style={{ ...props.style, backgroundColor }}>
      <TouchableRipple onPress={handlePress}>
        <View style={{ ...styles.container, gap: item.name ? 1 : 8 }}>
          {item.imageSource && (
            <Animated.Image
              entering={FadeInRight.duration(300 * (index * 2))
                .delay(300)
                .springify()}
              source={item.imageSource}
              style={styles.img}
            />
          )}
          {item.name && (
            <Animated.Text
              entering={FadeIn}
              exiting={FadeOut}
              style={{ fontSize: Font.size(nameTextSize ?? arabic ? 14 : 13), textAlign: 'center' }}
            >
              {formatMessage(item.name)}
            </Animated.Text>
          )}
          <Animated.Text
            entering={FadeInLeft.delay(400 + index * 60).duration(600)}
            style={{
              fontWeight: '900',
              fontSize: Font.size(descriptionTextSize ?? arabic ? 14 : 13),
              textAlign: 'center',
            }}
          >
            {formatMessage(item.description)}
          </Animated.Text>
        </View>
      </TouchableRipple>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: -20,
    width: '95%',
    backfaceVisibility: 'hidden',
  },
  img: {
    width: 90,
    height: 90,
    ...GlobalStyles.circle,
  },
});
