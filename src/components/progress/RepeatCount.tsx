import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Box } from '@react-native-material/core';
import { I18nManager, StyleSheet } from 'react-native';
import Text from '../Text';

interface Props {
  count: number;
  color?: string;
}
export default function RepeatCount({ count, color }: Props) {
  if (count === 0) {
    return <></>;
  }
  const margin = count < 10 ? 8 : 5;
  const marginRight = I18nManager.isRTL ? margin : 0;
  const marginLeft = I18nManager.isRTL ? 0 : margin;
  return (
    <Box style={styles.container}>
      <Text variant="body2" style={{ ...styles.text, marginRight, marginLeft }}>
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
