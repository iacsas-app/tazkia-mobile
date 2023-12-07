import { memo, useMemo } from 'react';
import { FlatList, ViewToken } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Chapter from './Chapter';

interface Props {
  section: number;
}
function Chapters({ section }: Props) {
  const viewableItems = useSharedValue<ViewToken[]>([]);
  const chapters = useMemo(() => Array.from({ length: 20 }, (_, i) => i + 1), []);

  return (
    <FlatList
      data={chapters}
      keyExtractor={(item) => item.toString()}
      onViewableItemsChanged={({ viewableItems: vItems }) => (viewableItems.value = vItems)}
      renderItem={({ item }) => <Chapter section={section} chapter={item} total={20} viewableItems={viewableItems} />}
    />
  );
}

export default memo(Chapters);
