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
      style={{ paddingHorizontal: 5 }}
    >
      <HStack spacing={10} style={GlobalStyles.center}>
        {count > 1 && (
          <Text variant="bodyMedium" style={{ fontWeight: '700' }} color={color}>
            {index + 1}
          </Text>
        )}
        <Text variant="bodyMedium" style={{ textAlign: 'justify', width: SCREEN_WIDTH - 45 }}>
          {summary}
        </Text>
      </HStack>
    </Animated.View>
  );
}
