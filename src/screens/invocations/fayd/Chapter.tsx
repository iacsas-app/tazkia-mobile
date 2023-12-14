import { memo } from 'react';
import { StyleSheet, View, ViewToken } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Text from '../../../components/Text';
import VStack from '../../../components/stack/VStack';
import { Color } from '../../../constants/Color';
import { SCREEN_WIDTH } from '../../../constants/Screen';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import GlobalStyles from '../../../styles/GlobalStyles';

interface Props {
  chapter: number;
  total: number;
  viewableItems: Animated.SharedValue<ViewToken[]>;
  onIntro(): void;
}
function Chapter({ chapter, total, viewableItems, ...props }: Props) {
  const { formatMessage } = useMessage();

  const baseKey = `invocations.faydo`;
  const chapterBase = `${baseKey}.chapter.${chapter}`;
  const first = chapter === 0;
  const last = chapter === total;
  const titleKey = first ? TKeys.GENERAL_PRESENTATION_TITLE : `${chapterBase}.title`;
  const summaryKey = first ? `${baseKey}.introduction` : `${chapterBase}.summary`;

  const animatedStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value.filter((item) => item.isViewable).find((viewableItem) => viewableItem.item === chapter),
    );

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [{ scale: withTiming(isVisible ? 1 : 0.6) }],
    };
  }, []);

  function handlePress() {
    if (first) {
      props.onIntro();
    }
  }

  return (
    <Animated.View
      style={[
        animatedStyle,
        styles.row,
        {
          backgroundColor: first ? Color.flatItemNoneBgColor : Color.partDefaultBgColor,
          marginTop: first ? 20 : 3,
          marginBottom: last ? 60 : first ? 10 : 2,
        },
      ]}
      onTouchEnd={handlePress}
    >
      <View style={styles.container}>
        <VStack style={GlobalStyles.center} spacing={8}>
          <Text variant="titleLarge" style={{ ...styles.title, color: first ? 'white' : 'black' }}>
            {formatMessage(titleKey)}
          </Text>
          {!first && (
            <Text variant="bodyMedium" style={styles.summary}>
              {formatMessage(summaryKey)}
            </Text>
          )}
        </VStack>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    ...GlobalStyles.center,
    marginHorizontal: 10,
    paddingVertical: 8,
    elevation: 10,
    borderRadius: 25,
  },
  container: { width: SCREEN_WIDTH - 5 },
  title: { fontSize: 16, textAlign: 'center', fontWeight: '900' },
  summary: { fontSize: 13, textAlign: 'justify', fontWeight: '500', paddingHorizontal: 25 },
  id: { elevation: 2, backgroundColor: '#3db371', position: 'absolute', left: 5 },
});

export default memo(Chapter);
