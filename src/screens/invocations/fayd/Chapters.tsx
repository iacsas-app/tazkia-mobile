import { memo, useMemo } from 'react';
import { ViewToken } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { Color } from '../../../constants/Color';
import Chapter from './Chapter';

type Props = {
  onIntro(): void;
};
function Chapters(props: Props) {
  const size = 43;
  const viewableItems = useSharedValue<ViewToken[]>([]);
  const chapters = useMemo(() => Array.from({ length: size + 1 }, (_, i) => i), []);

  return (
    <Animated.FlatList
      data={chapters}
      keyExtractor={(item) => item.toString()}
      onViewableItemsChanged={({ viewableItems: vItems }) => (viewableItems.value = vItems)}
      renderItem={({ item }) => <Chapter chapter={item} total={size} viewableItems={viewableItems} {...props} />}
      style={{ backgroundColor: Color.backgroundColor }}
    />
  );
}

export default memo(Chapters);
