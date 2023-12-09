import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Animated, { FadeInUp, SlideOutDown } from 'react-native-reanimated';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import GlobalStyles from '../../styles/GlobalStyles';
import Text from '../Text';
import HStack from '../stack/HStack';

type Props = {
  onEvaluate(yes: boolean): void;
};
const YesNoButtons = memo(function YesNoButtons(props: Props) {
  const { formatMessage } = useMessage();

  return (
    <Animated.View
      entering={FadeInUp.delay(400).duration(800).springify()}
      exiting={SlideOutDown.delay(10).damping(100)}
    >
      <HStack spacing={15} style={GlobalStyles.center}>
        <Button
          mode="elevated"
          style={styles.btn}
          uppercase={false}
          icon={() => <Icon name="thumb-up-outline" size={15} color="seagreen" />}
          compact
          dark
          onPress={() => props.onEvaluate(true)}
        >
          <Text variant="titleMedium" style={{ fontWeight: '900', color: 'seagreen' }}>
            {formatMessage(TKeys.BUTTON_YES)}
          </Text>
        </Button>
        <Button
          mode="elevated"
          style={styles.btn}
          uppercase={false}
          icon={() => <Icon name="thumb-down-outline" size={15} color="red" />}
          compact
          dark
          onPress={() => props.onEvaluate(false)}
        >
          <Text variant="titleMedium" style={{ fontWeight: '900', color: 'red' }}>
            {formatMessage(TKeys.BUTTON_NO)}
          </Text>
        </Button>
      </HStack>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  btn: { marginTop: 10, paddingHorizontal: 5, minWidth: 100 },
});

export default YesNoButtons;
