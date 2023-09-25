import globalModel, { GlobalModel } from './global.model';
import intlModel, { IntlModel } from './intl.model';
import { PurificationModel, purificationModel } from './purification.model';

export interface AppStoreModel {
  global: GlobalModel;
  intl: IntlModel;
  purification: PurificationModel;
}

const model: AppStoreModel = {
  global: globalModel,
  intl: intlModel,
  purification: purificationModel,
};

// export the typed hooks
export default model;
