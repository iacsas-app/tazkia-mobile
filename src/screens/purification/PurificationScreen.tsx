import { Stack, Surface } from '@react-native-material/core';
import { StyleSheet } from 'react-native';
import { TKeys } from '../../locales/constants';
import GlobalStyles from '../../styles/GlobalStyles';
import PressableStep, { Part } from './common/PressableStep';

export default function PurificationScreen() {
  return (
    <Stack style={GlobalStyles.container} items="center" spacing={15}>
      {parts.map((item: Part, index: number) => (
        <Surface key={index} elevation={6} category="medium" style={styles.part}>
          <PressableStep item={item} />
        </Surface>
      ))}
    </Stack>
  );
}

const styles = StyleSheet.create({
  part: { width: 250, borderCurve: 'circular' },
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
