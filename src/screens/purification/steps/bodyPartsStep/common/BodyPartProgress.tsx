import FoIcon from '@expo/vector-icons/FontAwesome';
import FaIcon from '@expo/vector-icons/Ionicons';
import McIcon from '@expo/vector-icons/MaterialCommunityIcons';

import { Box, Button, HStack, Text, VStack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, StyleSheet } from 'react-native';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import { BodyPartType } from '../../../../../domains/purification/BodyPart';
import { useApplication } from '../../../../../hooks/use-application';
import { useMessage } from '../../../../../hooks/use-message';
import { BodyPartEvaluationNavigationProp } from '../../../../../navigation/types';
import { PurificationType } from '../BodyPartsScreen';
import FailedAttempts from './FailedAttempts/FailedAttempts';

interface BodyPartProgressProps {
  part: BodyPartType;
  type: PurificationType;
  lines: ProgressLine[];
}
export default function BodyPartProgress({ part, type, lines }: BodyPartProgressProps) {
  const { formatMessage } = useMessage();
  const { arabicOrientation } = useApplication();
  const navigation = useNavigation<BodyPartEvaluationNavigationProp>();
  const repeatCount = lines.length;
  const last = lines.at(lines.length - 1);

  if (!last) {
    return <></>;
  }
  const bgColor = type === 'illumination' ? '#f5fffa' : '#add8e6';

  function handlePress() {
    navigation.navigate('BodyPartEvaluation', { partType: part, mode: type });
  }

  return (
    <SafeAreaView style={{ backgroundColor: bgColor, paddingHorizontal: 25, paddingVertical: 15, borderRadius: 15 }}>
      <VStack spacing={5}>
        <VStack spacing={3}>
          <HStack spacing={15} style={{ alignItems: 'center' }} reverse={arabicOrientation}>
            <McIcon name={type === 'purification' ? 'account-tie-hat' : 'lightbulb-on'} size={35} />
            <Text variant="h5" style={{ fontWeight: '700' }}>
              {formatMessage('step', { name: formatMessage(`button.${type}`).toLowerCase() })}
            </Text>
          </HStack>
          <HStack spacing={8} mt={20} reverse={arabicOrientation} style={{ alignItems: 'center' }}>
            <FaIcon name="calendar" size={21} color="#000080" />
            <Text>Start date : </Text>
            <Text style={styles.valueBold}>{last.startDate}</Text>
          </HStack>
          <HStack spacing={8} mt={2} ml={-2} reverse={arabicOrientation} style={{ alignItems: 'center' }}>
            <McIcon name="progress-clock" size={23} color="#48d1cc" />
            <Text>Progress : </Text>
            <Text style={styles.valueBold}>{((last.day * 100) / 30).toPrecision(last.day > 9 ? 1 : 2)}%</Text>
          </HStack>
          <HStack spacing={8} mt={2} ml={-2} reverse={arabicOrientation} style={{ alignItems: 'center' }}>
            <FoIcon name="flag-checkered" size={23} color="green" />
            <Text>Successful days : </Text>
            <Text style={styles.valueBold}>{last.day}/30</Text>
          </HStack>
        </VStack>
        <Button title="start daily evaluation" onPress={handlePress} style={{ marginTop: 15 }} />
        {repeatCount > 1 && (
          <Box mt={20}>
            <HStack spacing={8} mb={8} ml={-2} reverse={arabicOrientation} style={{ alignItems: 'center' }}>
              <McIcon name="repeat-off" size={23} color="#ff4500" />
              <Text>Failed attempts : </Text>
              <Text style={styles.valueBold}>{repeatCount - 1}</Text>
            </HStack>
            <FailedAttempts attempts={lines.slice(0, -1)} />
          </Box>
        )}
      </VStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: { marginBottom: 15, color: 'green' },
  valueBold: { fontWeight: '600' },
});
