import SunnahStageContainer from '../common/SunnahStageContainer';
import { habitsRules } from '../common/data';

export default function HabitsScreen() {
  return <SunnahStageContainer stage="habits" rules={habitsRules} />;
}
