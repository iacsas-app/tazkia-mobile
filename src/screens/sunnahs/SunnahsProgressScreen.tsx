import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { HStack, VStack } from '@react-native-material/core';

import { useNavigation } from '@react-navigation/native';
import { ReactNode } from 'react';
import { useWindowDimensions } from 'react-native';
import Text from '../../components/Text';
import ScrollViewLayout from '../../components/layout/ScrollViewLayout';
import Sunnah from '../../domains/sunnahs/Sunnah';
import { SunnahsType } from '../../domains/sunnahs/Sunnahs';
import { useApplication } from '../../hooks/use-application';
import { useMessage } from '../../hooks/use-message';
import { SunnahsParamList, SunnahsStackNavigationProp } from '../../navigation/types';
import { capitalize } from '../../services/Helpers';
import { useStoreState } from '../../stores/hooks';
import GlobalStyles from '../../styles/GlobalStyles';
import SunnahStepProgress from './steps/common/SunnahStepProgress';
import { habitsRules } from './steps/common/data';

export default function SunnahsProgressScreen() {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();
  const { width } = useWindowDimensions();
  const navigation = useNavigation<SunnahsStackNavigationProp>();
  const sunnahs = useStoreState((state) => state.sunnahs.item);

  function handleAdd(route: keyof SunnahsParamList) {
    navigation.navigate(capitalize(route) as any);
  }

  function habitSummaryFormat(id: number): string {
    return formatMessage(`sunnahs.habits.${id}.title`);
  }
  function habitDescriptionFormat(sunnah: Sunnah): ReactNode {
    return (
      <VStack style={{ width: width - 100 }}>
        {habitsRules[sunnah.id].map((ruleKey) => (
          <HStack key={ruleKey} spacing={5} style={GlobalStyles.centerAlign}>
            <Icon name={`chevron-double-${arabic ? 'left' : 'right'}`} size={18} color="#008000" />
            <Text style={{ fontSize: 13, textAlign: 'justify' }}>{formatMessage(ruleKey)}</Text>
          </HStack>
        ))}
      </VStack>
    );
  }

  function worshipSummaryFormat(id: number): string {
    return 'worship summary';
  }
  function worshipDescriptionFormat(): ReactNode {
    return <Text>worship description</Text>;
  }

  function truthsSummaryFormat(id: number): string {
    return 'truths summary';
  }
  function truthsDescriptionFormat(sunnah: Sunnah): ReactNode {
    return <Text>truths description</Text>;
  }

  if (!sunnahs) {
    return <></>;
  }

  const parts: {
    part: SunnahsType;
    items: Sunnah[];
    summaryFormatter: (id: number) => string;
    descriptionFormatter: (sunnah: Sunnah) => ReactNode;
  }[] = [
    {
      part: 'habits',
      items: sunnahs.habits,
      summaryFormatter: habitSummaryFormat,
      descriptionFormatter: habitDescriptionFormat,
    },
    {
      part: 'worship',
      items: sunnahs.worship,
      summaryFormatter: worshipSummaryFormat,
      descriptionFormatter: worshipDescriptionFormat,
    },
    {
      part: 'truths',
      items: sunnahs.truths,
      summaryFormatter: truthsSummaryFormat,
      descriptionFormatter: truthsDescriptionFormat,
    },
  ];

  return (
    <ScrollViewLayout>
      {parts.map((part, index: number) => (
        <SunnahStepProgress
          key={index}
          index={index + 1}
          part={part.part}
          items={part.items}
          summaryFormatter={part.summaryFormatter}
          descriptionFormatter={part.descriptionFormatter}
          onAdd={handleAdd}
        />
      ))}
    </ScrollViewLayout>
  );
}
