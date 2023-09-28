import globalModel, { GlobalModel } from './global.model';
import intlModel, { IntlModel } from './intl.model';
import purificationModel, { PurificationModel } from './purification.model';
import sunnahsModel, { SunnahsModel } from './sunnahs.model';

export interface AppStoreModel {
  global: GlobalModel;
  intl: IntlModel;
  purification: PurificationModel;
  sunnahs: SunnahsModel;
}

const model: AppStoreModel = {
  global: globalModel,
  intl: intlModel,
  purification: purificationModel,
  sunnahs: sunnahsModel,
};

// export the typed hooks
export default model;
