import { parcelsToSort } from './parcels';
import { pickupTasks } from './tasks';

export type MockDataSet = null | {
  parcelsToSort: typeof parcelsToSort;
  pickupTasks: typeof pickupTasks;
};

export const mockDataset: MockDataSet = {
  parcelsToSort,
  pickupTasks,
};
