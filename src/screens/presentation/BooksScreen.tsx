import React, { useMemo } from 'react';
import { FlatList, ViewToken } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { Book } from '../../domains/presentation/Book';
import { useMessage } from '../../hooks/use-message';
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
    <FlatList
      data={books}
      keyExtractor={(book) => book.id.toString()}
      onViewableItemsChanged={({ viewableItems: vItems }) => {
        viewableItems.value = vItems;
      }}
      renderItem={({ item }) => <FlatBook book={item} viewableItems={viewableItems} />}
    />
  );
}
