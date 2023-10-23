import McIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { HStack, Text } from '@react-native-material/core';
import { StyleSheet } from 'react-native';
import { useApplication } from '../../../hooks/use-application';

interface Props {
  label: string;
  value: string | number;
  icon: any;
  color: string;
}
export default function ProgressStatusInfo(props: Props) {
  const { arabic } = useApplication();

  return (
    <HStack spacing={8} mt={1} reverse={arabic} style={styles.center}>
      <McIcon name={props.icon} size={20} color={props.color} />
      <Text variant="body1" style={{ fontSize: arabic ? 16 : 13 }}>
        {props.label} :
      </Text>
      <Text variant="body1" style={{ ...styles.bold, fontSize: arabic ? 16 : 13 }}>
        {props.value}
      </Text>
    </HStack>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center' },
  bold: { fontWeight: '500' },
});
