import SunnahStageContainer from '../../../common/sunnahs/SunnahStageContainer';
import { habitsRules } from '../../../common/sunnahs/data';

export default function SunnahsScreen() {
  return <SunnahStageContainer stage="habits" rules={habitsRules} />;
}
