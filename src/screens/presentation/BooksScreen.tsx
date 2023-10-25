import React, { useMemo } from 'react';
import { FlatList } from 'react-native';
import { Book } from '../../domains/presentation/Book';
import { useMessage } from '../../hooks/use-message';
import FlatBook from './common/BookItem';
import { booksList } from './common/data';

export default function BooksScreen() {
  const { formatMessage } = useMessage();
  const books: Book[] = useMemo(
    () =>
      booksList.map((book) => ({ ...book, title: formatMessage(book.title), summary: formatMessage(book.summary) })),
    [],
  );

  return (
    <FlatList
      data={books}
      keyExtractor={(book) => book.id.toString()}
      renderItem={({ item }) => <FlatBook book={item} />}
    />
  );
}
