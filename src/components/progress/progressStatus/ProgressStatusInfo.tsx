import McIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { HStack } from '@react-native-material/core';
import { StyleSheet } from 'react-native';
import Text from '../../Text';

interface Props {
  label: string;
  value: string | number;
  icon: any;
  color: string;
}
export default function ProgressStatusInfo(props: Props) {
  return (
    <HStack spacing={8} mt={0} style={styles.center}>
      <McIcon name={props.icon} size={20} color={props.color} />
      <Text variant="labelMedium" style={styles.bold} color="black">
        {props.label} :
      </Text>
      <Text variant="labelMedium" style={styles.bold}>
        {props.value}
      </Text>
    </HStack>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center' },
  bold: { fontWeight: '900' },
});
