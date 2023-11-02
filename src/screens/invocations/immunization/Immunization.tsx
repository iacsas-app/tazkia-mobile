import { useMemo } from 'react';
import { DikrType } from './common/dikr';
import { immunizationData } from './dicrtype';

interface Props {
  type: DikrType;
}
export default function Immunization({ type }: Props) {
  const data: Record<string, number> = useMemo(() => immunizationData[type], []);

  return <></>;
}
