import ProgressLine from './ProgressLine';
import Rule from './Rule';

export default interface RuleResult extends Rule {
  progress: ProgressLine[];
}
