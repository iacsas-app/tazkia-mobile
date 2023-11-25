import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import ProgressLine from '../../../domains/common/ProgressLine';
import { progressPercentage } from '../../../services/Helpers';
import GlobalStyles from '../../../styles/GlobalStyles';
import HStack from '../../stack/HStack';
import RepeatCount from '../RepeatCount';

interface Props {
  last: ProgressLine | undefined;
  count: number;
  maxDays: number;
  completed: boolean;
}
export function ProgressStatus({ last, count, maxDays, completed }: Props) {
  if (!last) {
    return <></>;
  }
  const failed = last.failedAttempts ? last.failedAttempts : 0;

  return (
    <HStack spacing={3} style={GlobalStyles.center}>
      {!completed && <RepeatCount count={count} />}
      <View>
        {completed ? (
          <Icon name="check-bold" size={30} color="green" />
        ) : (
          <CircularProgress
            value={progressPercentage(last.day - failed, maxDays)}
            maxValue={100}
            duration={600}
            radius={25}
            valuePrefix={'%'}
            inActiveStrokeColor={'#2ecc71'}
            inActiveStrokeOpacity={0.2}
            progressValueStyle={styles.progress}
          />
        )}
      </View>
    </HStack>
  );
}

const styles = StyleSheet.create({
  progress: { color: 'green', fontWeight: '700', fontSize: 13 },
});
