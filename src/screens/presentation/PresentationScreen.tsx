import { Box, Stack } from '@react-native-material/core';
import { useMemo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import PressableStep, { Part } from '../../components/PressableStep';
import { TKeys } from '../../locales/constants';
import GlobalStyles from '../../styles/GlobalStyles';
import BasePresentationLayout from './common/BasePresentationLayout';

export default function PresentationScreen() {
  const { width } = useWindowDimensions();
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
        imageSource: require('./../../../assets/img/presentation/cheikh.png'),
      },
      {
        description: TKeys.PRESENTATION_APPROACH_TITLE,
        route: 'Approach',
        imageSource: require('./../../../assets/img/presentation/manhaj.jpg'),
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
    <BasePresentationLayout>
      <Stack style={styles.container} items="center" spacing={15}>
        {parts.map((item: Part, index: number) => (
          <Box key={index} style={{ ...styles.part, width: width - 70 }}>
            <PressableStep item={item} />
          </Box>
        ))}
      </Stack>
    </BasePresentationLayout>
  );
}

const styles = StyleSheet.create({
  container: { ...GlobalStyles.container, backgroundColor: '#dcdcf730' },
  part: {
    paddingVertical: 10,
    backgroundColor: '#f5fffa',
    borderRadius: 15,
    elevation: 6,
  },
});
