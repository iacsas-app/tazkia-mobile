import { PropsWithChildren } from 'react';
import { ColorValue } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import Basmalah from '../../../components/Basmalah';
import Text from '../../../components/Text';
import VStack from '../../../components/stack/VStack';
import { Font } from '../../../constants/Font';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import { useGlobal } from '../../../providers/AppProvider';
import GlobalStyles from '../../../styles/GlobalStyles';
import { purificationStyles } from './Style';

interface Props extends PropsWithChildren {
  summary: TKeys;
  body: TKeys;
  titleColor?: ColorValue;
}
export default function PurificationPrezLayout(props: Props) {
  const { formatMessage } = useMessage();
  const { arabic } = useGlobal();

  return (
    <Animated.View
      entering={FadeInDown.delay(300).duration(150).springify()}
      exiting={FadeOutDown}
      style={GlobalStyles.center}
    >
      <VStack>
        <VStack spacing={2}>
          <Text
            variant="bodyMedium"
            style={{ ...purificationStyles.title, fontSize: Font.size(arabic ? 18 : 14), color: 'seagreen' }}
          >
            {formatMessage(props.summary)}
          </Text>
          <Basmalah />
          <Text
            variant="bodyMedium"
            style={{
              paddingTop: 10,
              textAlign: 'justify',
            }}
          >
            {formatMessage(props.body)}
          </Text>
        </VStack>
        {props.children}
      </VStack>
    </Animated.View>
  );
}
