import { parcelsToSort, parcelsByOrderId } from './parcels';
import { pickupTasks } from './tasks';

export type MockDataSet = null | {
  parcelsToSort: typeof parcelsToSort;
  pickupTasks: typeof pickupTasks;
  parcelsByOrderId: typeof parcelsByOrderId;
};

export const mockDataset: MockDataSet = {
  parcelsToSort,
  pickupTasks,
  parcelsByOrderId,
};
