import { PathType } from '../../domains/common/PathType';
import Purification from '../../domains/purification/Purification';
import { readData, storeData } from '../../stores/storage-engine';
import { PurificationGateway } from './purificationGateway';

/**
 * Adapter for purification gateway
 *
 * @author Khalid ALIANNE
 * @since 20/09/2023
 */
export class PurificationAdapter implements PurificationGateway {
  private readonly path: PathType = 'tazkia';

  find(): Promise<Purification> {
    return readData(this.path).then((value: Purification) => value);
  }

  createOrUpdate(value: Purification): Promise<Purification> {
    return storeData(this.path, value).then(() => value);
  }
}
