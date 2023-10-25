import { Image, ImageSourcePropType, useWindowDimensions } from 'react-native';

interface Props {
  source: ImageSourcePropType;
}
export default function ImageLayout({ source }: Props) {
  const { width } = useWindowDimensions();

  return <Image source={source} style={{ width: width - 60, height: width - 150, borderRadius: 30 }} />;
}
