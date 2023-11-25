import SunnahStageContainer from '../../../common/sunnahs/SunnahStageContainer';
import { worshipRules } from '../../../common/sunnahs/data';

export default function SunnahsScreen() {
  return <SunnahStageContainer stage="worship" rules={worshipRules} />;
}
