import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type WindowProps = {
  paddingHorizontal: number;
};
export default function useWindow(): WindowProps {
  const insets = useSafeAreaInsets();
  const paddingHorizontal = useMemo(() => Math.max(15, insets.left + insets.right), []);
  return { paddingHorizontal };
}
