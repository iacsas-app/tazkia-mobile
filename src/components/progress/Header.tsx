import { PrimitiveType } from 'react-intl';
import { StyleSheet } from 'react-native';
import { Font } from '../../constants/Font';
import { SCREEN_WIDTH } from '../../constants/Screen';
import ProgressLine from '../../domains/common/ProgressLine';
import { useApplication } from '../../hooks/use-application';
import { useMessage } from '../../hooks/use-message';
import GlobalStyles from '../../styles/GlobalStyles';
import Text from '../Text';
import HStack from '../stack/HStack';
import VStack from '../stack/VStack';
import Restart from './Restart';
import { ProgressStatus } from './progressStatus/ProgressStatus';

type Props = {
  titleKey: string;
  hasProgress: boolean;
  completed: boolean;
  maxDays: number;
  countProgress: number;
  lastDay: ProgressLine | undefined;
  titleKeyParams?: Record<string, PrimitiveType>;
  subTitleKey?: string;
  onRestart(): void;
};
export default function Header({ hasProgress, ...props }: Props) {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();
  return (
    <HStack
      style={{
        ...styles.status,
        justifyContent: hasProgress ? 'space-between' : 'center',
      }}
    >
      <VStack style={{ alignSelf: 'center' }}>
        <Text
          variant="bodyLarge"
          style={{
            fontWeight: '900',
            fontSize: Font.size(arabic ? 18 : 16),
            textAlign: hasProgress ? 'auto' : 'center',
          }}
          color={hasProgress ? 'green' : 'blue'}
        >
          {formatMessage(props.titleKey, props.titleKeyParams)}
        </Text>
        {props.subTitleKey && (
          <Text
            variant="bodySmall"
            style={{
              textAlign: hasProgress ? 'auto' : 'center',
              width: SCREEN_WIDTH - (hasProgress ? 125 : 10),
              fontSize: Font.size(arabic ? 14 : 12),
            }}
          >
            {formatMessage(props.subTitleKey)}
          </Text>
        )}
      </VStack>
      <HStack style={GlobalStyles.center} spacing={5}>
        {props.completed && <Restart onClick={props.onRestart} />}
        {hasProgress && (
          <ProgressStatus
            last={props.lastDay}
            count={props.countProgress}
            maxDays={props.maxDays}
            completed={props.completed}
          />
        )}
      </HStack>
    </HStack>
  );
}

const styles = StyleSheet.create({
  status: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'stretch',
    alignSelf: 'stretch',
    verticalAlign: 'middle',
  },
});
