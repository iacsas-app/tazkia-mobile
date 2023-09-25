import { GlobalGateway } from '../services/global/globalGateway';
import { PurificationGateway } from '../services/purification/purificationGateway';

export interface Injections {
  globalService: GlobalGateway;
  tazkiaService: PurificationGateway;
}
