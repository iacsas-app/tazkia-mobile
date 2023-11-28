import React, { useMemo } from 'react';
import { FlatList, Text, View, ViewToken } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { Book } from '../../domains/presentation/Book';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import { FlatBook } from './common/BookItem';
import { booksList } from './common/data';

export default function BooksScreen() {
  const { formatMessage } = useMessage();
  const viewableItems = useSharedValue<ViewToken[]>([]);

  const books: Book[] = useMemo(
    () =>
      booksList.map((book) => ({ ...book, title: formatMessage(book.title), summary: formatMessage(book.summary) })),
    [],
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 16, backgroundColor: 'white' }}>
        {/* <Text>{TKeys.PRESENTATION_BOOKS}</Text> */}
        <Text>{formatMessage(TKeys.PRESENTATION_BOOKS)}</Text>
      </View>
      <FlatList
        data={books}
        keyExtractor={(book) => book.id.toString()}
        onViewableItemsChanged={({ viewableItems: vItems }) => {
          viewableItems.value = vItems;
        }}
        renderItem={({ item }) => <FlatBook book={item} viewableItems={viewableItems} />}
      />
    </View>
  );
}
