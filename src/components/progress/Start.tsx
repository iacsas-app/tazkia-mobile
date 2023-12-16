import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { Font } from '../../constants/Font';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import { useGlobal } from '../../providers/AppProvider';

type Props = {
  onStart(): void;
  disabled?: boolean;
};
export default function Start(props: Props) {
  const { formatMessage } = useMessage();
  const { arabic } = useGlobal();

  return (
    <Animated.View entering={SlideInDown.duration(30)}>
      <Button
        mode="elevated"
        icon={() => <Icon name="clock-plus" size={17} color="teal" />}
        uppercase={false}
        style={styles.btn}
        labelStyle={{ ...styles.startButtonLabel, fontSize: Font.size(arabic ? 15 : 11) }}
        disabled={props.disabled}
        onTouchStart={props.onStart}
      >
        {formatMessage(TKeys.BUTTON_START)}
      </Button>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  startButtonLabel: { fontWeight: '900', color: 'teal', marginTop: 6 },
  btn: { paddingVertical: 4 },
});
