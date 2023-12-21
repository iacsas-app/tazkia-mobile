import { PropsWithChildren } from 'react';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import ImageLayout from '../../../components/ImageLayout';
import Text from '../../../components/Text';
import VStack from '../../../components/stack/VStack';
import { Font } from '../../../constants/Font';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import { useGlobal } from '../../../providers/AppProvider';
import GlobalStyles from '../../../styles/GlobalStyles';
import BasePresentationLayout from './BasePresentationLayout';

interface Props extends PropsWithChildren {
  title: TKeys;
  description: TKeys;
  source?: ImageSourcePropType;
}
export default function PresentationLayout(props: Props) {
  const { formatMessage } = useMessage();
  const { arabic } = useGlobal();

  return (
    <BasePresentationLayout>
      <VStack spacing={20} style={GlobalStyles.center}>
        {props.source && (
          <View style={{ marginTop: -15 }}>
            <ImageLayout source={props.source} />
          </View>
        )}
        <Animated.View
          entering={FadeInDown.delay(300).duration(150).springify()}
          exiting={FadeOutDown}
          style={GlobalStyles.center}
        >
          <Text variant="bodyLarge" style={{ fontSize: Font.size(arabic ? 18 : 14), fontFamily: 'Cairo' }}>
            {formatMessage(props.title)}
          </Text>
          <Text variant="bodyMedium" style={{ ...styles.description, fontSize: Font.size(arabic ? 16 : 14) }}>
            {formatMessage(props.description)}
          </Text>
        </Animated.View>
      </VStack>
      {props.children && <View style={styles.children}>{props.children}</View>}
    </BasePresentationLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
    textAlign: 'justify',
  },
  description: {
    marginTop: 22,
    fontFamily: 'AmiriQuran',
    lineHeight: 25,
    textAlign: 'justify',
  },
  children: { marginTop: 15 },
});
