import React from 'react';
import { Image, StyleSheet, View, ViewToken } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Text from '../../../components/Text';
import HStack from '../../../components/stack/HStack';
import VStack from '../../../components/stack/VStack';
import { SCREEN_WIDTH } from '../../../constants/Screen';
import { Book } from '../../../domains/presentation/Book';
import GlobalStyles from '../../../styles/GlobalStyles';

type Props = {
  viewableItems: Animated.SharedValue<ViewToken[]>;
  book: Book;
};

export const FlatBook: React.FC<Props> = React.memo(({ book, viewableItems }) => {
  const box1With = SCREEN_WIDTH - 310;

  const rStyle = useAnimatedStyle(() => {
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
    <Animated.View style={[rStyle, styles.row]}>
      <VStack spacing={10} style={{ width: SCREEN_WIDTH - 80 }}>
        <Text variant="bodyLarge" style={{ fontSize: 14, fontWeight: '900' }}>
          {book.title}
        </Text>
        <HStack spacing={30}>
          <View style={{ width: box1With }}>
            <VStack style={GlobalStyles.center}>
              <Image source={book.image} style={styles.image} />
            </VStack>
          </View>
          <View style={{ width: SCREEN_WIDTH - box1With - 100 }}>
            <VStack>
              <Text variant="bodyLarge" style={{ ...styles.summary, fontSize: 14 }}>
                {book.summary}
              </Text>
              <Text variant="bodyLarge" style={styles.link}>
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

  image: {
    width: 80,
    height: 160,
  },
  summary: {
    textAlign: 'justify',
  },
  link: {
    fontSize: 14,
  },
});
