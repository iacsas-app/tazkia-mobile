import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { memo } from 'react';
import { Avatar } from 'react-native-paper';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { Font } from '../constants/Font';
import { SCREEN_WIDTH } from '../constants/Screen';
import { useApplication } from '../hooks/use-application';
import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';
import GlobalStyles from '../styles/GlobalStyles';
import Text from './Text';
import HStack from './stack/HStack';
import VStack from './stack/VStack';

function InvocationGoodManners() {
  const { formatMessage, formatNumber } = useMessage();
  const { arabic } = useApplication();
  const fade = arabic ? FadeInRight : FadeInLeft;

  return (
    <VStack
      spacing={15}
      style={{
        ...GlobalStyles.center,
        marginVertical: 20,
      }}
    >
      <HStack style={GlobalStyles.center} spacing={15}>
        <Icon name="seal" size={30} color="lightseagreen" />
        <Text variant="bodyLarge" style={{ fontSize: Font.size(arabic ? 19 : 16), fontWeight: '900' }} color="black">
          {formatMessage(TKeys.INVOCATION_GOOD_MANNERS_TITLE)}
        </Text>
      </HStack>
      <VStack spacing={10}>
        {Array.from({ length: 4 }, (_, i) => i).map((id) => (
          <Animated.View
            key={id}
            entering={fade.delay(200 * id).duration(450 * id)}
            style={{ ...GlobalStyles.centerAlign, flexDirection: 'row', gap: 15 }}
          >
            <Avatar.Text
              label={formatNumber(id + 1)}
              size={25}
              style={{ backgroundColor: '#2e8b5770' }}
              labelStyle={{ fontWeight: '900', color: 'white' }}
            />
            <Text
              variant="bodyMedium"
              style={{ fontSize: Font.size(arabic ? 16 : 14), fontWeight: '600', width: SCREEN_WIDTH - 60 }}
              color="black"
            >
              {formatMessage(`invocation.good-manners_${id + 1}`)}
            </Text>
          </Animated.View>
        ))}
      </VStack>
    </VStack>
  );
}

export default memo(InvocationGoodManners);
