import { PixelRatio } from 'react-native';

export namespace Font {
  const fontScale = PixelRatio.getFontScale();
  export const size = (size: number) => size / fontScale;
}
