import BodyPart from './BodyPart';
import Mind from './Mind';
import Soul from './Soul';

export default interface Purification {
  id: number;
  // Body parts step
  step1: BodyPart[];
  // Mind step
  step2: Mind[];
  // Soul step
  step3: Soul[];
}
