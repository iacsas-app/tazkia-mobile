import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Box, Text } from '@react-native-material/core';
import { StyleSheet } from 'react-native';

interface Props {
  count: number;
  color?: string;
}
export default function RepeatCount({ count, color }: Props) {
  return (
    <Box style={styles.container}>
      <Text variant="body2" style={{ ...styles.text, marginLeft: count < 10 ? 8 : 5 }}>
        {count}
      </Text>
      <Icon name="reload" size={25} color={color} style={styles.icon} />
    </Box>
  );
}

RepeatCount.defaultProps = {
  color: 'orange',
};

const styles = StyleSheet.create({
  container: { marginBottom: -7 },
  text: { marginBottom: -12, fontSize: 9, fontWeight: '600' },
  icon: { marginTop: -7 },
});
