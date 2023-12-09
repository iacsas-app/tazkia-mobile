import { memo, useMemo } from 'react';
import { FlatList, ViewToken } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { Color } from '../../../constants/Color';
import InvocationRepeat from '../../../domains/common/InvocationRepeat';
import { TKeys } from '../../../locales/constants';
import Immunization from './Immunization';

interface Props {
  items: InvocationRepeat[];
  onSelect(key?: TKeys, detailsId?: number): void;
}
function Immunizations({ items, ...props }: Props) {
  const viewableItems = useSharedValue<ViewToken[]>([]);
  const size = useMemo(() => items.length - 1, []);

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.key}
      onViewableItemsChanged={({ viewableItems: vItems }) => (viewableItems.value = vItems)}
      renderItem={({ item, index }) => (
        <Immunization index={index + 1} total={size} item={item} viewableItems={viewableItems} {...props} />
      )}
      style={{ backgroundColor: Color.backgroundColor }}
    />
  );
}

export default memo(Immunizations);
