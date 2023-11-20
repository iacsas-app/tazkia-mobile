import SunnahStageContainer from '../../../../sunnahs/common/SunnahStageContainer';
import { habitsRules } from '../../../../sunnahs/common/data';

export default function SunnahsHabitsScreen() {
  return <SunnahStageContainer stage="habits" rules={habitsRules} />;
}
