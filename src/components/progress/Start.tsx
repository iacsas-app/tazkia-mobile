import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { Font } from '../../constants/Font';
import { useApplication } from '../../hooks/use-application';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';

type Props = {
  onStart(): void;
  disabled?: boolean;
};
export default function Start(props: Props) {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();

  return (
    <Animated.View entering={SlideInDown.duration(10).springify()}>
      <Button
        mode="elevated"
        compact
        icon={() => <Icon name="clock-plus" size={15} color="teal" />}
        uppercase={false}
        style={{ height: 30, paddingEnd: 5 }}
        labelStyle={{ ...styles.startButtonLabel, fontSize: Font.size(arabic ? 13 : 11) }}
        disabled={props.disabled}
        onTouchStart={props.onStart}
      >
        {formatMessage(TKeys.BUTTON_START)}
      </Button>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  startButtonLabel: { fontWeight: '900', color: 'teal', marginTop: 3 },
});
