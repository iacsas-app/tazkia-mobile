import SunnahStageContainer from '../common/SunnahStageContainer';
import { worshipRules } from '../common/data';

export default function WorshipScreen() {
  return <SunnahStageContainer stage="worship" rules={worshipRules} />;
}
