import BodyPart from './BodyPart';
import Mind from './Mind';
import Soul from './Soul';

export default interface Purification {
  id: number;
  // The 7 body parts
  bodyParts: BodyPart[];
  // The 9 mind levels
  mind: Mind[];
  // The 7 soul levels
  soul: Soul[];
}
