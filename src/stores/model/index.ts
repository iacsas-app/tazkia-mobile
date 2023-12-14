import purificationModel, { PurificationModel } from './purification.model';
import sunnahsModel, { SunnahsModel } from './sunnahs.model';

export interface AppStoreModel {
  purification: PurificationModel;
  sunnahs: SunnahsModel;
}

const model: AppStoreModel = {
  purification: purificationModel,
  sunnahs: sunnahsModel,
};

// export the typed hooks
export default model;
