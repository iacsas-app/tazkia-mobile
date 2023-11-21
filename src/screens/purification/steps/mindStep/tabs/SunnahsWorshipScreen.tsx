import SunnahStageContainer from '../../../common/sunnahs/SunnahStageContainer';
import { worshipRules } from '../../../common/sunnahs/data';

export default function SunnahsWorshipScreen() {
  return <SunnahStageContainer stage="worship" rules={worshipRules} />;
}
