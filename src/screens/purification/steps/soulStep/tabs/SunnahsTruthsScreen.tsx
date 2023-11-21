import SunnahStageContainer from '../../../common/sunnahs/SunnahStageContainer';
import { truthsRules } from '../../../common/sunnahs/data';

export default function SunnahsTruthsScreen() {
  return <SunnahStageContainer stage="truths" rules={truthsRules} />;
}
