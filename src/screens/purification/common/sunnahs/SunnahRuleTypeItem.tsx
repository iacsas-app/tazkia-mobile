import { Avatar, Divider } from 'react-native-paper';
import Animated, { FadeIn } from 'react-native-reanimated';
import Text from '../../../../components/Text';
import HStack from '../../../../components/stack/HStack';
import { SCREEN_WIDTH } from '../../../../constants/Screen';
import GlobalStyles from '../../../../styles/GlobalStyles';

interface Props {
  index: number;
  summary: string;
  count: number;
  color: string;
}
export default function SunnahRuleTypeItem({ index, summary, count, color }: Props) {
  return (
    <Animated.View
      entering={FadeIn.delay(100 * index)
        .duration(100)
        .springify()}
      style={{ paddingStart: 5 }}
    >
      <HStack spacing={5} style={{ ...GlobalStyles.center, paddingHorizontal: 10 }}>
        {count > 1 && (
          <Avatar.Text
            label={(index + 1) as any}
            size={20}
            style={{ backgroundColor: color, opacity: 0.6 }}
            labelStyle={{ fontWeight: '600', fontSize: 11 }}
          />
        )}
        <Text
          variant={count > 3 ? 'bodySmall' : 'bodyMedium'}
          style={{ textAlign: 'justify', width: SCREEN_WIDTH - 30, paddingHorizontal: 5 }}
        >
          {summary}
        </Text>
      </HStack>
      {count > 1 && index < count - 1 && <Divider />}
    </Animated.View>
  );
}
