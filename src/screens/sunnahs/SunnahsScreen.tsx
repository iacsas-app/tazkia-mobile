import { Box, HStack, Stack, VStack } from '@react-native-material/core';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import PressableStep, { Part } from '../../components/PressableStep';
import Text from '../../components/Text';
import ScrollViewLayout from '../../components/layout/ScrollViewLayout';
import { useApplication } from '../../hooks/use-application';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import GlobalStyles from '../../styles/GlobalStyles';
import SunnahsProgressScreen from './SunnahsProgressScreen';

export default function SunnahsScreen() {
  const { formatMessage } = useMessage();
  const { arabic, hasSunnahsProgress } = useApplication();

  const parts: Part[] = useMemo(
    () => [
      {
        route: 'Habits',
        name: TKeys.PHASE_1,
        description: TKeys.SUNNAHS_HABITS_TITLE,
        imageSource: require('./../../../assets/img/sunnahs/step1.jpg'),
      },
      {
        route: 'Worship',
        name: TKeys.PHASE_2,
        description: TKeys.SUNNAHS_WORSHIP_TITLE,
        imageSource: require('./../../../assets/img/sunnahs/step2.jpg'),
      },
      {
        route: 'Truths',
        name: TKeys.PHASE_3,
        description: TKeys.SUNNAHS_TRUTHS_TITLE,
        imageSource: require('./../../../assets/img/sunnahs/step3.jpg'),
      },
    ],
    [],
  );

  if (hasSunnahsProgress) {
    return <SunnahsProgressScreen />;
  }

  return (
    <ScrollViewLayout>
      <Text style={{ ...GlobalStyles.description, fontSize: arabic ? 25 : 20 }}>
        {formatMessage(TKeys.SUNNAHS_DESCRIPTION)}
      </Text>
      <HStack spacing={25} mt={25} style={{ alignItems: 'center' }}>
        <VStack style={{ width: arabic ? 175 : 160 }}>
          <Text
            style={{
              paddingVertical: 10,
              fontSize: arabic ? 15 : 12,
              fontWeight: '900',
              textAlign: arabic ? 'justify' : 'auto',
            }}
          >
            {formatMessage(TKeys.BASMALAH)}
          </Text>
          <Text
            style={{
              paddingTop: arabic ? 8 : 0,
              marginBottom: 30,
              fontSize: arabic ? 14 : 13,
              fontWeight: arabic ? '600' : 'normal',
              textAlign: 'justify',
            }}
          >
            {formatMessage(TKeys.SUNNAHS_INTRODUTION)}
          </Text>
        </VStack>
        <Stack style={GlobalStyles.container} items="center" spacing={15}>
          {parts.map((item: Part, index: number) => (
            <Box key={index} style={{ ...styles.part, marginRight: arabic ? -15 : -25 }}>
              <PressableStep item={item} nameTextSize={12} descriptionTextSize={arabic ? 14 : 12} />
            </Box>
          ))}
        </Stack>
      </HStack>
    </ScrollViewLayout>
  );
}

const styles = StyleSheet.create({
  part: {
    width: 190,
    paddingVertical: 10,
    backgroundColor: '#b3f1d5',
    elevation: 6,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
  },
});
