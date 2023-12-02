import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Text from '../../../components/Text';
import ProgressInfos from '../../../components/progress/progressStatus/ProgressInfos';
import HStack from '../../../components/stack/HStack';
import { Font } from '../../../constants/Font';
import ProgressLine from '../../../domains/common/ProgressLine';
import { useApplication } from '../../../hooks/use-application';
import { useMessage } from '../../../hooks/use-message';
import { ProgressProps } from '../../../hooks/use-progress';
import { TKeys } from '../../../locales/constants';

type Props = ProgressProps & {
  align: 'center' | 'space-between';
  progress: ProgressLine[] | undefined;
  maxDays: number;
  formatAttempt(line: ProgressLine): string;
  onEvaluate(): void;
};
export default function StatusAndEvaluation(props: Props) {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();

  return (
    <HStack style={{ ...styles.progress, alignContent: props.align, justifyContent: props.align }}>
      {props.lastDay && (
        <ProgressInfos
          progress={props.progress}
          lastDay={props.lastDay}
          countDays={props.countDays}
          endDate={props.endDate}
          failed={props.failed}
          maxDays={props.maxDays}
          formatAttempt={props.formatAttempt}
        />
      )}
      {!props.completed && (
        <Button
          mode="elevated"
          compact
          icon={() => <Icon name="check-circle" size={15} color="seagreen" />}
          uppercase={false}
          style={styles.evalBtn}
          onTouchStart={props.onEvaluate}
        >
          <Text
            variant="titleSmall"
            color="seagreen"
            style={{ fontWeight: '500', fontSize: Font.size(arabic ? 13 : 11) }}
          >
            {formatMessage(TKeys.PROGRESS_START_DAILY_EVALUATION)}
          </Text>
        </Button>
      )}
    </HStack>
  );
}

const styles = StyleSheet.create({
  progress: {
    paddingHorizontal: 15,
    paddingTop: 10,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  evalBtn: { elevation: 8 },
});
