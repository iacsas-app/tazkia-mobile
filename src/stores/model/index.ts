import globalModel, { GlobalModel } from './global.model';
import purificationModel, { PurificationModel } from './purification.model';
import sunnahsModel, { SunnahsModel } from './sunnahs.model';

export interface AppStoreModel {
  global: GlobalModel;
  purification: PurificationModel;
  sunnahs: SunnahsModel;
}

const model: AppStoreModel = {
  global: globalModel,
  purification: purificationModel,
  sunnahs: sunnahsModel,
};

// export the typed hooks
export default model;
