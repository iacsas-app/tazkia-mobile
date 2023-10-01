import McIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { HStack, Text } from '@react-native-material/core';
import { StyleSheet } from 'react-native';

interface Props {
  label: string;
  value: string | number;
  icon: any;
  color: string;
  reverse: boolean;
}
export default function ProgressStatusInfo(props: Props) {
  return (
    <HStack spacing={8} mt={1} reverse={props.reverse} style={styles.center}>
      <McIcon name={props.icon} size={23} color={props.color} />
      <Text variant="body1">{props.label} : </Text>
      <Text variant="body1" style={styles.bold}>
        {props.value}
      </Text>
    </HStack>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center' },
  bold: { fontWeight: '500' },
});
