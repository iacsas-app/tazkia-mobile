import Purification from '../../domains/purification/Purification';

export interface PurificationGateway {
  /**
   * Find existing purification
   */
  find(): Promise<Purification>;

  /**
   * Create or update existing purification
   * @param value to create or update
   */
  createOrUpdate(value: Purification): Promise<Purification>;
}
