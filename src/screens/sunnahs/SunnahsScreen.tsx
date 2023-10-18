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
        description: TKeys.SUNNAHS_HABITS_TITLE,
        imageSource: require('./../../../assets/img/sunnahs/step1.jpg'),
      },
      {
        route: 'Worship',
        name: TKeys.PHASE_2,
        description: TKeys.SUNNAHS_WORSHIP_TITLE,
        imageSource: require('./../../../assets/img/sunnahs/step2.jpg'),
      },
      {
        route: 'Truths',
        name: TKeys.PHASE_3,
        description: TKeys.SUNNAHS_TRUTHS_TITLE,
        imageSource: require('./../../../assets/img/sunnahs/step3.jpg'),
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
    width: 270,
    paddingVertical: 10,
    backgroundColor: '#b3f1d5',
    borderRadius: 25,
    elevation: 6,
  },
});
