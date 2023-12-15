import { memo, useState } from 'react';
import { StyleSheet, ViewToken } from 'react-native';
import Animated, { FadeInUp, FadeOutDown, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Text from '../../../components/Text';
import { Color } from '../../../constants/Color';
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
  const [isOpen, setOpen] = useState(false);

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
    } else {
      setOpen(!isOpen);
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
          marginBottom: last ? 20 : first ? 10 : 2,
        },
      ]}
      onTouchEnd={handlePress}
    >
      <Text
        variant="titleLarge"
        style={{
          ...styles.title,
          ...styles.box,
          color: first ? 'white' : isOpen ? 'teal' : 'black',
          fontSize: isOpen ? 18 : 16,
        }}
      >
        {formatMessage(titleKey)}
      </Text>
      {!first && isOpen && (
        <Animated.Text
          entering={FadeInUp.duration(200).mass(1)}
          exiting={FadeOutDown.duration(200).mass(1)}
          style={{ ...styles.box, ...styles.summary }}
        >
          {formatMessage(summaryKey)}
        </Animated.Text>
      )}
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
    gap: 15,
  },
  box: { paddingHorizontal: 15, marginHorizontal: 10 },
  title: { textAlign: 'center', fontWeight: '900' },
  summary: { fontSize: 15, textAlign: 'justify', fontWeight: '500', paddingBottom: 15 },
  id: { elevation: 2, backgroundColor: '#3db371', position: 'absolute', left: 5 },
});

export default memo(Chapter);
