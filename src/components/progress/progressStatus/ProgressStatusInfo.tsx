import McIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';
import { Font } from '../../../constants/Font';
import Text from '../../Text';
import HStack from '../../stack/HStack';

interface Props {
  label: string;
  value: string | number;
  icon: any;
  color: string;
}
export default function ProgressStatusInfo(props: Props) {
  return (
    <HStack spacing={1}>
      <HStack style={styles.center} spacing={5}>
        <McIcon name={props.icon} size={15} color={props.color} />
        <Text variant="labelSmall" style={styles.label}>
          {props.label} :
        </Text>
      </HStack>
      <Text variant="labelSmall" style={styles.label}>
        {props.value}
      </Text>
    </HStack>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center' },
  label: { fontWeight: '900', fontSize: Font.size(10), color: 'black' },
});
