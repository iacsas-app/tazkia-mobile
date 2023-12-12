import { Image, ImageSourcePropType } from 'react-native';
import { SCREEN_WIDTH } from '../constants/Screen';

interface Props {
  source: ImageSourcePropType;
}
export default function ImageLayout({ source }: Props) {
  return <Image source={source} style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH - 150, borderRadius: 0 }} />;
}
