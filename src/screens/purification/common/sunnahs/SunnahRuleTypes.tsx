import { Divider } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import Text from '../../../../components/Text';
import VStack from '../../../../components/stack/VStack';
import { useMessage } from '../../../../hooks/use-message';
import { TKeys } from '../../../../locales/constants';
import GlobalStyles from '../../../../styles/GlobalStyles';
import SunnahRuleTypeItem from './SunnahRuleTypeItem';

interface Props {
  type: TKeys;
  items: string[];
  showType: boolean;
  hasProgress: boolean;
}
export default function SunnahRuleTypes({ type, items, showType, hasProgress }: Props) {
  const { formatMessage } = useMessage();

  const count = items.length;
  if (count === 0) {
    return <></>;
  }

  const color = hasProgress ? 'green' : 'blue';

  return (
    <VStack spacing={5} style={GlobalStyles.container}>
      {count >= 1 && showType && (
        <Text variant="bodyLarge" style={{ fontWeight: '900', fontSize: 18 }} color={color}>
          {formatMessage(type)} :
        </Text>
      )}
      <Animated.FlatList
        StickyHeaderComponent={() => <Animated.Text>test</Animated.Text>}
        data={items}
        renderItem={({ item, index }) => (
          <SunnahRuleTypeItem index={index} summary={formatMessage(item)} count={count} color={color} />
        )}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={() => <Divider />}
      />
    </VStack>
  );
}
