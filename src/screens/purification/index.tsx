import { Stack, Surface } from '@react-native-material/core';
import { useMemo } from 'react';
import { TKeys } from '../../locales/constants';
import { commonStyles } from '../../styles/CommonStyles';
import PressablePart, { Part } from './common/PressablePart';

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

export default function PurificationScreen() {
  const steps = useMemo(() => parts, []);

  return (
    <Stack style={commonStyles.container} items="center" spacing={15}>
      {steps.map((item: Part, index: number) => (
        <Surface key={index} elevation={7} category="large" style={{ width: 320 }}>
          <PressablePart item={item} />
        </Surface>
      ))}
    </Stack>
  );
}
