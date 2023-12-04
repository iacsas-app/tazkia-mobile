import React, { useMemo } from 'react';
import { FlatList, View, ViewToken } from 'react-native';
import { Banner } from 'react-native-paper';
import { useSharedValue } from 'react-native-reanimated';
import Text from '../../components/Text';
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
      <Banner visible={true}>
        <Text variant="bodyLarge">{formatMessage(TKeys.PRESENTATION_BOOKS)}</Text>
      </Banner>
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
