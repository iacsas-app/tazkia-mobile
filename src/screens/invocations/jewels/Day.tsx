import { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  FadeOutDown,
  FadeOutLeft,
} from 'react-native-reanimated';
import Text from '../../../components/Text';
import HStack from '../../../components/stack/HStack';
import VStack from '../../../components/stack/VStack';
import { Color } from '../../../constants/Color';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import GlobalStyles from '../../../styles/GlobalStyles';

interface Props {
  day: number;
  partNumbers: number;
}
function Day({ day, partNumbers }: Props) {
  const { formatMessage } = useMessage();
  const [isOpen, setOpen] = useState(false);

  const baseKey = `invocations.jewels`;
  const first = day === 0;
  const last = day === 8;
  const titleKey = first ? TKeys.GENERAL_PRESENTATION_TITLE : last ? TKeys.CONCLUSION : `day.${day}.title`;
  const summaryKey = first ? `${baseKey}.introduction` : last ? TKeys.INVOCATIONS_JEWELS_CONCLUSION : '';
  const fade = first ? FadeInDown : last ? FadeInUp : FadeInLeft;

  function handlePress() {
    setOpen(!isOpen);
  }

  return (
    <Animated.View
      style={[
        styles.row,
        {
          backgroundColor:
            first || last ? Color.flatItemNoneBgColor : isOpen ? Color.progress : Color.partDefaultBgColor,
          marginTop: first || last ? 15 : 4,
          marginBottom: last ? 20 : first ? 15 : 4,
        },
      ]}
      onTouchEnd={handlePress}
    >
      <HStack style={{ ...GlobalStyles.center, paddingHorizontal: 5 }}>
        {!first && !last && <Avatar.Text label={day.toString()} size={25} style={styles.id} color="white" />}
        <HStack style={{ ...styles.container, paddingVertical: first || last ? 1 : 4 }} spacing={1}>
          {!first && !last && (
            <Animated.Text
              entering={FadeInRight.delay(300).duration(400).mass(13)}
              exiting={FadeOutLeft.duration(200).mass(1)}
              style={{
                ...styles.title,
                color: first || last ? 'white' : isOpen ? '#3db371' : 'black',
                fontSize: isOpen ? 18 : 16,
                flex: 10,
              }}
            >
              {formatMessage(`day.${day}`)}
            </Animated.Text>
          )}
          <Animated.Text
            entering={fade.delay(500).duration(400).mass(13)}
            exiting={FadeOutLeft.duration(200).mass(1)}
            style={{
              ...styles.title,
              color: first || last ? 'white' : isOpen ? '#3db371' : 'teal',
              fontSize: isOpen ? 18 : 16,
              flex: 15,
            }}
          >
            {formatMessage(titleKey)}
          </Animated.Text>
        </HStack>
      </HStack>
      {isOpen &&
        (first || last ? (
          <Animated.Text
            entering={FadeInUp.duration(400).mass(1)}
            exiting={FadeOutDown.duration(200).mass(1)}
            style={{ ...styles.box, ...styles.summary }}
          >
            {formatMessage(summaryKey)}
          </Animated.Text>
        ) : (
          <Animated.View
            entering={FadeInUp.duration(400).mass(1)}
            exiting={FadeOutDown.duration(200).mass(1)}
            style={{ ...GlobalStyles.center, flexDirection: 'column', gap: 20 }}
          >
            {Array.from({ length: partNumbers }, (_, i) => i + 1).map((part) => (
              <VStack key={`${day}_${part}`} spacing={5} style={GlobalStyles.center}>
                <Text variant="bodyLarge" style={{ fontWeight: '700' }}>
                  {formatMessage(`day.${day}.part.${part}.title`)}
                </Text>
                <Text key={part} variant="bodyMedium" style={{ ...GlobalStyles.justify }}>
                  {formatMessage(`day.${day}.part.${part}.summary`)}
                </Text>
              </VStack>
            ))}
          </Animated.View>
        ))}
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
  box: {},
  title: { textAlign: 'center', fontWeight: '900' },
  summary: { fontSize: 15, textAlign: 'justify', fontWeight: '500', paddingBottom: 15 },
  id: { elevation: 2, backgroundColor: '#3db371', flex: 1.2 },
  container: { ...GlobalStyles.center, flex: 12, paddingHorizontal: 15, marginHorizontal: 10 },
});

export default memo(Day);
