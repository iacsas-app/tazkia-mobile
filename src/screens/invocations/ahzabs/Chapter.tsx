import { memo } from 'react';
import { StyleSheet, View, ViewToken } from 'react-native';
import { Avatar } from 'react-native-paper';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Text from '../../../components/Text';
import HStack from '../../../components/stack/HStack';
import VStack from '../../../components/stack/VStack';
import { Color } from '../../../constants/Color';
import { SCREEN_WIDTH } from '../../../constants/Screen';
import { useMessage } from '../../../hooks/use-message';
import GlobalStyles from '../../../styles/GlobalStyles';

interface Props {
  section: number;
  chapter: number;
  total: number;
  viewableItems: Animated.SharedValue<ViewToken[]>;
  onSelect(section: number, chapter: number): void;
}
function Chapter({ section, chapter, total, viewableItems, onSelect }: Props) {
  const { formatMessage } = useMessage();

  const sectionKey = `invocations.ahzabs.section.${section}`;

  const first = chapter === 0;
  const last = chapter === total;

  const summaryKey = `${sectionKey}.${chapter !== 0 ? `chapter.${chapter}.title` : 'introduction.title'}`;
  const subSummaryKey = first ? sectionKey : `${sectionKey}.chapter.${chapter}.why`;

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
    onSelect(section, chapter);
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
        <HStack style={GlobalStyles.center}>
          {!first && <Avatar.Text label={chapter.toString()} size={25} style={styles.id} color="white" />}
          <VStack style={GlobalStyles.center}>
            <Text variant="titleSmall" style={{ ...styles.summary, color: first ? 'white' : 'black' }}>
              {formatMessage(summaryKey)}
            </Text>
            {!first && (
              <Text variant="labelSmall" style={styles.subSummary}>
                {formatMessage(subSummaryKey)}
              </Text>
            )}
          </VStack>
        </HStack>
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
  container: { width: SCREEN_WIDTH - 32 },
  summary: { fontSize: 16, textAlign: 'justify', fontWeight: '700' },
  subSummary: { maxWidth: SCREEN_WIDTH - 130, justifyContent: 'center', textAlign: 'center' },
  id: { elevation: 2, backgroundColor: '#3db371', position: 'absolute', left: 5 },
});

export default memo(Chapter);
