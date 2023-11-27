import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { Font } from '../../constants/Font';
import { useApplication } from '../../hooks/use-application';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import Text from '../Text';

type Props = {
  onStart(): void;
};
export default function Start(props: Props) {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();

  return (
    <Animated.View entering={SlideInDown.duration(10).springify()}>
      <Button
        mode="elevated"
        compact
        icon={() => <Icon name="clock-plus" size={15} color="#4169e1" />}
        uppercase={false}
        style={{ height: 30, paddingEnd: 5 }}
        labelStyle={{ ...styles.startButtonLabel, fontSize: Font.size(arabic ? 14 : 11) }}
        onTouchStart={props.onStart}
      >
        <Text variant="titleMedium" color="#4169e1" style={{ fontWeight: '900' }}>
          {formatMessage(TKeys.BUTTON_START)}
        </Text>
      </Button>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  startButtonLabel: { fontWeight: '900', color: '#4169e1', marginTop: 3 },
});
