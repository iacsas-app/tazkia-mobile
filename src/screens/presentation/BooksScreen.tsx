import React, { useMemo } from 'react';
import { FlatList, View, ViewToken } from 'react-native';
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
    <View>
      <Text
        variant="bodySmall"
        style={{
          padding: 10,
          backgroundColor: '#fffafa',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          fontWeight: '700',
          elevation: 10,
        }}
      >
        {formatMessage(TKeys.PRESENTATION_BOOKS)}
      </Text>
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
