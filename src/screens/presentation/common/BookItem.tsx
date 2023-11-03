import { Box, HStack, VStack } from '@react-native-material/core';
import React, { ReactElement } from 'react';
import { Image, StyleSheet, View, useWindowDimensions } from 'react-native';
import Text from '../../../components/Text';
import { Book } from '../../../domains/presentation/Book';
import GlobalStyles from '../../../styles/GlobalStyles';

interface Props {
  book: Book;
}
export default function FlatBook({ book }: Props): ReactElement {
  const { width } = useWindowDimensions();
  const box1With = width - 310;

  return (
    <View style={styles.row}>
      <VStack spacing={10} style={{ width: width - 80 }}>
        <Text style={{ fontSize: 14, fontWeight: '900' }}>{book.title}</Text>
        <HStack spacing={30}>
          <Box style={{ width: box1With }}>
            <VStack style={GlobalStyles.center}>
              <Image source={book.image} style={styles.image} />
            </VStack>
          </Box>
          <Box style={{ width: width - box1With - 100 }}>
            <VStack>
              <Text style={{ ...styles.summary, fontSize: 14 }}>{book.summary}</Text>
              <Text style={styles.link}>{book.link}</Text>
            </VStack>
          </Box>
        </HStack>
      </VStack>
    </View>
  );
}

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
