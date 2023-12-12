import ProgressLine from '../../../domains/common/ProgressLine';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import VStack from '../../stack/VStack';
import FailedAttempts from '../failedAttempts/FailedAttempts';
import ProgressStatusInfo from './ProgressStatusInfo';

type Props = {
  progress: ProgressLine[] | undefined;
  lastDay: ProgressLine;
  endDate: number | undefined;
  countDays: number;
  failed: number;
  maxDays: number;
  formatAttempt(line: ProgressLine): string;
};
export default function ProgressInfos(props: Props) {
  const { formatMessage, intl } = useMessage();

  return (
    <VStack>
      <ProgressStatusInfo
        label={formatMessage(TKeys.PROGRESS_START_DATE)}
        value={format(props.lastDay.startDate)}
        icon="calendar"
        color="#000080"
      />
      {props.endDate && (
        <ProgressStatusInfo
          label={formatMessage(TKeys.PROGRESS_END_DATE)}
          value={format(props.endDate)}
          icon="calendar-check"
          color="#2e8b57"
        />
      )}
      <ProgressStatusInfo
        label={formatMessage(TKeys.PROGRESS_TOTAL_DAYS)}
        value={props.countDays}
        icon="calendar-clock-outline"
        color="#4169e1"
      />
      {!props.endDate && (
        <ProgressStatusInfo
          label={formatMessage(TKeys.PROGRESS_SUCCESSFUL_DAYS)}
          value={`${props.lastDay.day - props.failed}/${props.maxDays}`}
          icon="flag-checkered"
          color="green"
        />
      )}
      {props.progress && (
        <FailedAttempts attempts={props.progress.slice(0, -1)} attemptFormatter={props.formatAttempt} />
      )}
    </VStack>
  );
}

function format(date: number): string {
  return new Date(date).toLocaleDateString('fr-FR');
}
