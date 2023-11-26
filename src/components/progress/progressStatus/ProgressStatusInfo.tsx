import McIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { HStack } from '@react-native-material/core';
import { StyleSheet } from 'react-native';
import { Font } from '../../../constants/Font';
import Text from '../../Text';

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
        <Text variant="labelSmall" style={styles.bold} color="black">
          {props.label} :
        </Text>
      </HStack>
      <Text variant="labelSmall" style={styles.bold}>
        {props.value}
      </Text>
    </HStack>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center' },
  bold: { fontWeight: '900', fontSize: Font.size(10) },
});
