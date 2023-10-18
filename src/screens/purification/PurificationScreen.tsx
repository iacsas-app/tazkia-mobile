import { Box, Stack } from '@react-native-material/core';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import PressableStep, { Part } from '../../components/PressableStep';
import { useApplication } from '../../hooks/use-application';
import { TKeys } from '../../locales/constants';
import GlobalStyles from '../../styles/GlobalStyles';
import PurificationProgressScreen from './PurificationProgressScreen';

export default function PurificationScreen() {
  const { hasPurificationProgress } = useApplication();
  const parts: Part[] = useMemo(
    () => [
      {
        route: 'BodyParts',
        name: TKeys.PHASE_1,
        description: TKeys.PURIFICATION_BODYPART_TITLE,
        imageSource: require('./../../../assets/img/purification/step1.png'),
      },
      {
        route: 'Mind',
        name: TKeys.PHASE_2,
        description: TKeys.PURIFICATION_MIND_TITLE,
        imageSource: require('./../../../assets/img/purification/step2.jpg'),
      },
      {
        route: 'Soul',
        name: TKeys.PHASE_3,
        description: TKeys.PURIFICATION_SOUL_TITLE,
        imageSource: require('./../../../assets/img/purification/step3.jpg'),
      },
    ],
    [],
  );

  if (hasPurificationProgress) {
    return <PurificationProgressScreen />;
  }

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
    backgroundColor: '#cde7f7',
    borderRadius: 25,
    elevation: 6,
  },
});
