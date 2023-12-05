import { memo, useMemo } from 'react';
import { FlatList, ViewToken } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import InvocationItem from '../../../components/InvocationItem';
import InvocationRepeat from '../../../domains/common/InvocationRepeat';

interface Props {
  items: InvocationRepeat[];
}
function Immunization({ items }: Props) {
  const viewableItems = useSharedValue<ViewToken[]>([]);
  const size = useMemo(() => items.length - 1, []);

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.key}
      onViewableItemsChanged={({ viewableItems: vItems }) => (viewableItems.value = vItems)}
      renderItem={({ item, index }) => (
        <InvocationItem index={index + 1} total={size} item={item} viewableItems={viewableItems} />
      )}
      style={{ backgroundColor: 'mintcream' }}
    />
  );
}

export default memo(Immunization);
