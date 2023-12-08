import React from 'react';
import { Image, StyleSheet, View, ViewToken } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Text from '../../../components/Text';
import HStack from '../../../components/stack/HStack';
import VStack from '../../../components/stack/VStack';
import { Font } from '../../../constants/Font';
import { SCREEN_WIDTH } from '../../../constants/Screen';
import { Book } from '../../../domains/presentation/Book';

type Props = {
  viewableItems: Animated.SharedValue<ViewToken[]>;
  book: Book;
};

export const FlatBook: React.FC<Props> = React.memo(({ book, viewableItems }) => {
  const imageWith = SCREEN_WIDTH - 320;

  const rowStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value.filter((item) => item.isViewable).find((viewableItem) => viewableItem.item.id === book.id),
    );

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.6),
        },
      ],
    };
  }, []);

  return (
    <Animated.View style={[rowStyle, styles.row]}>
      <VStack spacing={10} style={{ width: SCREEN_WIDTH - 80 }}>
        <Text variant="bodyMedium" style={styles.title}>
          {book.title}
        </Text>
        <HStack spacing={30}>
          <Image source={book.image} style={{ ...styles.image, width: imageWith }} />
          <View style={{ width: SCREEN_WIDTH - imageWith - 100 }}>
            <VStack>
              <Text variant="bodyMedium" style={styles.summary}>
                {book.summary}
              </Text>
              <Text variant="bodyMedium" style={styles.link}>
                {book.link}
              </Text>
            </VStack>
          </View>
        </HStack>
      </VStack>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    elevation: 14,
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 8,
    marginHorizontal: 10,
    paddingTop: 15,
    paddingVertical: 1,
  },
  title: { fontSize: Font.size(14), fontWeight: '900' },
  image: {
    width: 80,
    height: 160,
  },
  summary: {
    textAlign: 'justify',
    fontSize: Font.size(14),
  },
  link: {
    fontSize: Font.size(14),
  },
});
