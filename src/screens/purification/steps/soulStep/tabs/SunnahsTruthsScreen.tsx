import SunnahStageContainer from '../../../../sunnahs/common/SunnahStageContainer';
import { truthsRules } from '../../../../sunnahs/common/data';

export default function SunnahsTruthsScreen() {
  return <SunnahStageContainer stage="truths" rules={truthsRules} />;
}
