import { Dimensions } from 'react-native';
import HStack from '../../../../../components/stack/HStack';
import { SoulPartLevel, SoulPartProgress } from '../../../../../domains/purification/Soul';
import SoulProgressButton from './SoulProgressButton';

const { width: windowWidth } = Dimensions.get('window');

type Props = {
  progress: SoulPartProgress[];
  onClick(level: SoulPartLevel): void;
};
export default function SegmentedSoulProgress({ progress, ...props }: Props) {
  const size = progress.length;
  return (
    <HStack
      style={{
        backgroundColor: '#fffafa',
        paddingTop: 3,
        border: 0,
        paddingBottom: 8,
        width: windowWidth - 15,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
      }}
      spacing={0}
      center
    >
      {progress.map((item, index) => (
        <SoulProgressButton
          key={item.level}
          progress={item}
          roundedStart={index === 0}
          roundedEnd={index === size - 1}
          onClick={props.onClick}
        />
      ))}
    </HStack>
  );
}
