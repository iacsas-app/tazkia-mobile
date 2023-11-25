import SunnahStageContainer from '../../../common/sunnahs/SunnahStageContainer';
import { truthsRules } from '../../../common/sunnahs/data';

export default function SunnahsScreen() {
  return <SunnahStageContainer stage="truths" rules={truthsRules} />;
}
