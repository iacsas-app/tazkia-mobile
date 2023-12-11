import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import ProgressLine from '../../../domains/common/ProgressLine';
import { useApplication } from '../../../hooks/use-application';
import { progressPercentage } from '../../../services/Helpers';
import GlobalStyles from '../../../styles/GlobalStyles';
import HStack from '../../stack/HStack';
import RepeatCount from '../RepeatCount';

interface Props {
  last: ProgressLine | undefined;
  count: number;
  maxDays: number;
  completed: boolean;
  radius?: number;
  progressValueFontSize?: number;
  activeStrokeWidth?: number;
  valueMarginRight?: number;
  valueMarginLeft?: number;
}
export function ProgressStatus({
  last,
  count,
  maxDays,
  completed,
  radius,
  progressValueFontSize,
  activeStrokeWidth,
  valueMarginRight,
  valueMarginLeft,
}: Props) {
  const { arabic } = useApplication();
  if (!last) {
    return <></>;
  }
  const failed = last.failedAttempts ? last.failedAttempts : 0;

  return (
    <HStack spacing={3} style={GlobalStyles.center}>
      {!completed && <RepeatCount count={count} />}
      <View>
        {completed ? (
          <Icon name="check-bold" size={radius ?? 30} color="seagreen" />
        ) : (
          <CircularProgress
            value={progressPercentage(last.day - failed, maxDays)}
            maxValue={100}
            duration={600}
            radius={radius ?? 23}
            valueSuffix={arabic ? '' : '%'}
            valuePrefix={arabic ? '%' : ''}
            inActiveStrokeColor={'#2ecc71'}
            activeStrokeWidth={activeStrokeWidth ?? 5}
            inActiveStrokeWidth={activeStrokeWidth ?? 5}
            valuePrefixStyle={{
              marginRight: valueMarginRight ?? -5,
              marginLeft: valueMarginLeft ?? 4,
              fontSize: 7,
              marginTop: -2,
            }}
            valueSuffixStyle={{ marginLeft: valueMarginRight ?? -5, marginRight: valueMarginLeft ?? 4 }}
            inActiveStrokeOpacity={0.2}
            progressValueStyle={{ ...styles.progress, fontSize: progressValueFontSize ?? 13 }}
          />
        )}
      </View>
    </HStack>
  );
}

const styles = StyleSheet.create({
  progress: { color: 'green', fontWeight: '600' },
});
