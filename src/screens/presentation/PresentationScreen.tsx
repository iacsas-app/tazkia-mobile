import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import VStack from '../../components/stack/VStack';
import { Color } from '../../constants/Color';
import { SCREEN_WIDTH } from '../../constants/Screen';
import { TKeys } from '../../locales/constants';
import GlobalStyles from '../../styles/GlobalStyles';
import Pressable, { Part } from './common/Pressable';

export default function PresentationScreen() {
  const parts: Part[] = useMemo(
    () => [
      {
        description: TKeys.PRESENTATION_CENTER_TITLE,
        route: 'Center',
        imageSource: require('./../../../assets/img/presentation/center.jpg'),
      },
      {
        description: TKeys.PRESENTATION_CHEIKH_TITLE,
        route: 'Cheikh',
        imageSource: require('./../../../assets/img/presentation/cheikh2.jpg'),
      },
      {
        description: TKeys.PRESENTATION_APPROACH_TITLE,
        route: 'Approach',
        imageSource: require('./../../../assets/img/presentation/manhaj1.jpg'),
      },
      {
        description: TKeys.PRESENTATION_BOOKS_TITLE,
        route: 'Books',
        imageSource: require('./../../../assets/img/presentation/library.jpg'),
      },
    ],
    [],
  );

  return (
    <VStack style={styles.container} spacing={15}>
      {parts.map((item: Part, index: number) => (
        <Pressable key={index} item={item} index={index} style={styles.part} />
      ))}
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: { ...GlobalStyles.container, backgroundColor: Color.backgroundColor },
  part: {
    width: SCREEN_WIDTH - 50,
    paddingVertical: 10,
    borderRadius: 25,
    elevation: 6,
  },
});
