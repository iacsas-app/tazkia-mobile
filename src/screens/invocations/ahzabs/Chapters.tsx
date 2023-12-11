import { memo, useMemo } from 'react';
import { ViewToken } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { Color } from '../../../constants/Color';
import Chapter from './Chapter';
import { chaptersData } from './data';

type Props = {
  section: number;
  onSelect(section: number, chapter: number): void;
};
function Chapters(props: Props) {
  const size = 20;
  const viewableItems = useSharedValue<ViewToken[]>([]);
  const chapters = useMemo(() => Array.from({ length: size + 1 }, (_, i) => i), []);
  const metaData = useMemo(() => chaptersData[props.section], [props.section]);

  return (
    <Animated.FlatList
      data={chapters}
      keyExtractor={(item) => item.toString()}
      onViewableItemsChanged={({ viewableItems: vItems }) => (viewableItems.value = vItems)}
      renderItem={({ item }) => (
        <Chapter
          chapter={item}
          total={size}
          viewableItems={viewableItems}
          metaData={item > 0 ? metaData[item] : undefined}
          {...props}
        />
      )}
      style={{ backgroundColor: Color.backgroundColor }}
    />
  );
}

export default memo(Chapters);
