import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { I18nManager, StyleSheet, View } from 'react-native';
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
  const marginRight = I18nManager.isRTL ? margin : 15;
  const marginLeft = I18nManager.isRTL ? 15 : margin;
  return (
    <View style={{ marginBottom: -15 }}>
      <Text variant="labelSmall" style={{ ...styles.text, marginRight, marginLeft }}>
        {count}
      </Text>
      <Icon name="reload" size={45} color={color} style={styles.icon} />
    </View>
  );
}

RepeatCount.defaultProps = {
  color: 'orange',
};

const styles = StyleSheet.create({
  text: { fontSize: 12, fontWeight: '700', marginBottom: -30, textAlign: 'center' },
  icon: { marginTop: -1, opacity: 0.5 },
});
