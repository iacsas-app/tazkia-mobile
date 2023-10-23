import { Box, Stack } from '@react-native-material/core';
import { StyleSheet } from 'react-native';
import { useApplication } from '../../hooks/use-application';
import { TKeys } from '../../locales/constants';
import GlobalStyles from '../../styles/GlobalStyles';
import PressableStep, { Part } from './PressableStep';
import PurificationProgressScreen from './PurificationProgressScreen';

export default function PurificationScreen() {
  const { hasPurificationProgress } = useApplication();

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
    backgroundColor: '#f5fffa',
    borderRadius: 20,
    elevation: 6,
  },
});

const parts: Part[] = [
  {
    route: 'BodyParts',
    name: TKeys.STEP_1,
    description: TKeys.PURIFICATION_BODYPART_TITLE,
    imageSource: require('./../../../assets/img/purification/step1.png'),
  },
  {
    route: 'Mind',
    name: TKeys.STEP_2,
    description: TKeys.PURIFICATION_MIND_TITLE,
    imageSource: require('./../../../assets/img/purification/step2.jpg'),
  },
  {
    route: 'Soul',
    name: TKeys.STEP_3,
    description: TKeys.PURIFICATION_SOUL_TITLE,
    imageSource: require('./../../../assets/img/purification/step3.jpg'),
  },
];
