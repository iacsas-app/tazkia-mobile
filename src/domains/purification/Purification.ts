import BodyPart from './BodyPart';
import Mind from './Mind';
import Soul from './Soul';

export default interface Purification {
  id: number;
  // The 7 Body parts
  bodyParts: BodyPart[];
  // The 9 Mind levels
  mind: Mind[];
  // The 7 Soul levels
  soul: Soul[];
}
