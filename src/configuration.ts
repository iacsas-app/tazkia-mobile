import { PurificationAdapter } from './services/purification/purificationAdapter';
import { PurificationGateway } from './services/purification/purificationGateway';

class ManualDependenciesConfiguration {
  private readonly _purificationGateway: PurificationGateway;

  constructor() {
    this._purificationGateway = new PurificationAdapter();
  }

  get purificationGateway(): PurificationGateway {
    return this._purificationGateway;
  }
}

export const Configuration = new ManualDependenciesConfiguration();
