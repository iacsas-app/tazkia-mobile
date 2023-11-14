import { Box, HStack, VStack } from '@react-native-material/core';
import React from 'react';
import { Image, StyleSheet, ViewToken, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Text from '../../../components/Text';
import { Book } from '../../../domains/presentation/Book';
import GlobalStyles from '../../../styles/GlobalStyles';

type Props = {
  viewableItems: Animated.SharedValue<ViewToken[]>;
  book: Book;
};

export const FlatBook: React.FC<Props> = React.memo(({ book, viewableItems }) => {
  const { width } = useWindowDimensions();
  const box1With = width - 310;

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
      <VStack spacing={10} style={{ width: width - 80 }}>
        <Text variant="bodyLarge" style={{ fontSize: 14, fontWeight: '900' }}>
          {book.title}
        </Text>
        <HStack spacing={30}>
          <Box style={{ width: box1With }}>
            <VStack style={GlobalStyles.center}>
              <Image source={book.image} style={styles.image} />
            </VStack>
          </Box>
          <Box style={{ width: width - box1With - 100 }}>
            <VStack>
              <Text variant="bodyLarge" style={{ ...styles.summary, fontSize: 14 }}>
                {book.summary}
              </Text>
              <Text variant="bodyLarge" style={styles.link}>
                {book.link}
              </Text>
            </VStack>
          </Box>
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
