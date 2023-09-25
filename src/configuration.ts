import { GlobalAdapter } from './services/global/globalAdapter';
import { GlobalGateway } from './services/global/globalGateway';
import { PurificationAdapter } from './services/purification/purificationAdapter';
import { PurificationGateway } from './services/purification/purificationGateway';

class ManualDependenciesConfiguration {
  private readonly _globalGateway: GlobalGateway;
  private readonly _purificationGateway: PurificationGateway;

  constructor() {
    this._globalGateway = new GlobalAdapter();
    this._purificationGateway = new PurificationAdapter();
  }

  get globalGateway(): GlobalGateway {
    return this._globalGateway;
  }

  get purificationGateway(): PurificationGateway {
    return this._purificationGateway;
  }
}

export const Configuration = new ManualDependenciesConfiguration();
