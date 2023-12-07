import { memo } from 'react';
import { StyleSheet, ViewToken } from 'react-native';
import { Avatar } from 'react-native-paper';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Text from '../../../components/Text';
import HStack from '../../../components/stack/HStack';
import VStack from '../../../components/stack/VStack';
import { SCREEN_WIDTH } from '../../../constants/Screen';
import { useMessage } from '../../../hooks/use-message';
import GlobalStyles from '../../../styles/GlobalStyles';

interface Props {
  section: number;
  chapter: number;
  total: number;
  viewableItems: Animated.SharedValue<ViewToken[]>;
}
function Chapter({ section, chapter, total, viewableItems }: Props) {
  const { formatMessage } = useMessage();

  const animatedStyle = useAnimatedStyle(() => {
    const isLast = chapter > total;
    const isVisible = Boolean(
      viewableItems.value.filter((item) => item.isViewable).find((viewableItem) => viewableItem.item === chapter),
    );

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.6),
        },
      ],
      marginBottom: withTiming(isLast ? 90 : 5),
      backgroundColor: withTiming(isLast ? 'transparent' : 'white'),
      elevation: withTiming(isLast ? 0 : 14),
    };
  }, []);

  function handlePress() {}

  return (
    <Animated.View style={[animatedStyle, styles.row]} onTouchEnd={handlePress}>
      <VStack style={styles.container}>
        <HStack>
          <Avatar.Text label={chapter.toString()} size={25} style={styles.id} color="white" />
          <Text variant="titleLarge" style={styles.summary}>
            {formatMessage(`invocations.ahzabs.section.${section}.chapter.${chapter}.title`)}
          </Text>
        </HStack>
      </VStack>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    ...GlobalStyles.center,
    borderRadius: 30,
    marginHorizontal: 10,
    paddingVertical: 10,
    marginTop: 5,
  },
  container: { width: SCREEN_WIDTH - 40 },
  summary: { fontSize: 18, textAlign: 'justify', fontWeight: '700', marginLeft: 45 },
  id: { position: 'absolute', left: 1, elevation: 2 },
});

export default memo(Chapter);
