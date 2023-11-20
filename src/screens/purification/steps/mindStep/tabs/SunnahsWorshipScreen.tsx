import SunnahStageContainer from '../../../../sunnahs/common/SunnahStageContainer';
import { worshipRules } from '../../../../sunnahs/common/data';

export default function SunnahsWorshipScreen() {
  return <SunnahStageContainer stage="worship" rules={worshipRules} />;
}
