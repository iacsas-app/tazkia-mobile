import { Stack, Surface } from '@react-native-material/core';
import { TKeys } from '../../locales/constants';
import { commonStyles } from '../../styles/CommonStyles';
import PressablePart, { Part } from './PressablePart';

const parts: Part[] = [
  {
    route: 'Part1',
    name: TKeys.STEP_1,
    description: TKeys.TAZKIA_BODYPART_TITLE,
    imageSource: require('./../../../assets/img/tazkia_part1.jpg'),
  },
  {
    route: 'Part2',
    name: TKeys.STEP_2,
    description: TKeys.TAZKIA_MIND_TITLE,
    imageSource: require('./../../../assets/img/tazkia_part2.jpg'),
  },
  {
    route: 'Part3',
    name: TKeys.STEP_3,
    description: TKeys.TAZKIA_SOUL_TITLE,
    imageSource: require('./../../../assets/img/tazkia_part3.jpg'),
  },
];

export default function TazkiaHomeScreen() {
  return (
    <Stack style={commonStyles.container} items="center" spacing={15}>
      {parts.map((item: Part, index: number) => (
        <Surface key={index} elevation={7} category="large" style={{ width: 300 }}>
          <PressablePart item={item} />
        </Surface>
      ))}
    </Stack>
  );
}
