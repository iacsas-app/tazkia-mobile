import { Box, Stack } from '@react-native-material/core';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import PressableStep, { Part } from '../../components/PressableStep';
import { TKeys } from '../../locales/constants';
import GlobalStyles from '../../styles/GlobalStyles';

export default function SunnahsScreen() {
  const parts: Part[] = useMemo(
    () => [
      {
        route: 'Habits',
        name: TKeys.PHASE_1,
        description: TKeys.PURIFICATION_BODYPART_TITLE,
        imageSource: require('./../../../assets/img/purification/step1.png'),
      },
      {
        route: 'Practice',
        name: TKeys.PHASE_2,
        description: TKeys.PURIFICATION_MIND_TITLE,
        imageSource: require('./../../../assets/img/purification/step2.jpg'),
      },
      {
        route: 'SpiritTravels',
        name: TKeys.PHASE_3,
        description: TKeys.PURIFICATION_SOUL_TITLE,
        imageSource: require('./../../../assets/img/purification/step3.jpg'),
      },
    ],
    [],
  );

  return (
    <Stack style={GlobalStyles.container} items="center" spacing={15}>
      {parts.map((item: Part, index: number) => (
        <Box key={index} style={styles.part}>
          <PressableStep item={item} />
        </Box>
      ))}
    </Stack>
  );
}

const styles = StyleSheet.create({
  part: {
    width: 250,
    paddingVertical: 10,
    backgroundColor: '#f5fffa',
    borderRadius: 20,
    elevation: 6,
  },
});
