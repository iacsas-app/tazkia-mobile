import McIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { HStack } from '@react-native-material/core';
import { StyleSheet } from 'react-native';
import { useApplication } from '../../../hooks/use-application';
import Text from '../../Text';

interface Props {
  label: string;
  value: string | number;
  icon: any;
  color: string;
}
export default function ProgressStatusInfo(props: Props) {
  const { arabic } = useApplication();
  const fontSize = arabic ? 12 : 11;

  return (
    <HStack spacing={8} mt={1} style={styles.center}>
      <McIcon name={props.icon} size={20} color={props.color} />
      <Text variant="bodyLarge" style={{ fontSize }}>
        {props.label} :
      </Text>
      <Text variant="bodyLarge" style={{ ...styles.bold, fontSize }}>
        {props.value}
      </Text>
    </HStack>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center' },
  bold: { fontWeight: '500' },
});
