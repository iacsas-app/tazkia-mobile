import { Box, HStack, VStack } from '@react-native-material/core';
import React, { ReactElement } from 'react';
import { Image, StyleSheet, View, useWindowDimensions } from 'react-native';
import Text from '../../../components/Text';
import { Book } from '../../../domains/presentation/Book';
import { arabic } from '../../../locales/messages/arabic';
import GlobalStyles from '../../../styles/GlobalStyles';

interface Props {
  book: Book;
}
export default function FlatBook({ book }: Props): ReactElement {
  const { width } = useWindowDimensions();
  const box1With = width - 310;

  return (
    <View style={styles.row}>
      <HStack spacing={25}>
        <Box style={{ width: box1With }}>
          <VStack style={GlobalStyles.center}>
            <Image source={book.image} style={styles.image} />
            <Text style={{ fontSize: arabic ? 16 : 14, fontWeight: '900' }}>{book.title}</Text>
          </VStack>
        </Box>
        <Box style={{ width: width - box1With - 90 }}>
          <VStack>
            <Text style={{ ...styles.summary, fontSize: arabic ? 17 : 14 }}>{book.summary}</Text>
            <Text style={styles.link}>{book.link}</Text>
          </VStack>
        </Box>
      </HStack>
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
    width: 115,
    height: 205,
  },
  summary: {
    textAlign: 'justify',
  },
  link: {
    fontSize: 14,
  },
});
