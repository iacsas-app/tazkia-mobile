import ProgressLine from '../../../domains/common/ProgressLine';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import { formatDate } from '../../../services/Helpers';
import VStack from '../../stack/VStack';
import ProgressStatusInfo from './ProgressStatusInfo';

type Props = {
  progress: ProgressLine[] | undefined;
  lastDay: ProgressLine;
  endDate: number | undefined;
  countDays: number;
  failed: number;
  maxDays: number;
};
export default function ProgressInfos(props: Props) {
  const { formatMessage } = useMessage();
  const FailedAttempts = props.progress ? props.progress.slice(0, -1).length : 0;

  return (
    <VStack>
      <ProgressStatusInfo
        label={formatMessage(TKeys.PROGRESS_START_DATE)}
        value={formatDate(props.lastDay.startDate)}
        icon="calendar"
        color="#000080"
      />
      {props.endDate && (
        <ProgressStatusInfo
          label={formatMessage(TKeys.PROGRESS_END_DATE)}
          value={formatDate(props.endDate)}
          icon="calendar-check"
          color="#2e8b57"
        />
      )}
      {!props.endDate && (
        <ProgressStatusInfo
          label={formatMessage(TKeys.PROGRESS_SUCCESSFUL_DAYS)}
          value={`${props.lastDay.day - props.failed}/${props.maxDays}`}
          icon="flag-checkered"
          color="green"
        />
      )}
      {FailedAttempts > 0 && (
        <ProgressStatusInfo
          label={formatMessage(TKeys.PROGRESS_FAILED_ATTEMPTS)}
          value={FailedAttempts}
          icon="repeat-off"
          color="#ff4500"
        />
      )}
      <ProgressStatusInfo
        label={formatMessage(TKeys.PROGRESS_TOTAL_DAYS)}
        value={props.countDays}
        icon="calendar-clock-outline"
        color="#4169e1"
      />
    </VStack>
  );
}
