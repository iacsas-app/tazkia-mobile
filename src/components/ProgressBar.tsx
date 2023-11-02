import { MD2Colors, ProgressBar as NativeProgress } from 'react-native-paper';
import { percentage } from '../services/Helpers';

interface Props {
  day: number;
  maxDays: number;
}
export default function ProgressBar({ day, maxDays }: Props) {
  return (
    <NativeProgress progress={percentage(day, maxDays) / 100} theme={{ colors: { primary: MD2Colors.green500 } }} />
  );
}
