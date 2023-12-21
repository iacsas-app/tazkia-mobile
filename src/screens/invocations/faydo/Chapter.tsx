import { memo, useState } from 'react';
import { StyleSheet, ViewToken } from 'react-native';
import { Avatar } from 'react-native-paper';
import Animated, { FadeInUp, FadeOutDown, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Text from '../../../components/Text';
import HStack from '../../../components/stack/HStack';
import { Color } from '../../../constants/Color';
import { Font } from '../../../constants/Font';
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
          backgroundColor: first ? Color.flatItemNoneBgColor : isOpen ? Color.progress : Color.partDefaultBgColor,
          marginTop: first ? 20 : 3,
          marginBottom: last ? 20 : first ? 10 : 2,
        },
      ]}
      onTouchEnd={handlePress}
    >
      <HStack style={{ ...GlobalStyles.center, paddingHorizontal: 5 }}>
        {!first && <Avatar.Text label={chapter.toString()} size={30} style={styles.id} color="white" />}
        <Text
          variant="titleLarge"
          style={{
            ...styles.title,
            ...styles.box,
            color: first ? 'white' : isOpen ? '#3db371' : 'black',
            fontSize: isOpen ? 18 : 16,
            flex: 10,
          }}
        >
          {formatMessage(titleKey)}
        </Text>
      </HStack>
      {!first && isOpen && (
        <Animated.Text
          entering={FadeInUp.duration(400).mass(1)}
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
  title: { textAlign: 'center', fontFamily: 'ReemKufiFun' },
  summary: {
    textAlign: 'justify',
    fontSize: Font.size(18),
    fontFamily: 'AmiriQuran',
    paddingBottom: 10,
    lineHeight: 30,
  },
  id: { elevation: 2, backgroundColor: '#3db371', flex: 1.2 },
});

export default memo(Chapter);
