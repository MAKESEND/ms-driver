import { parcelsToSort } from './parcels';

export type MockDataSet = null | {
  parcelsToSort: typeof parcelsToSort;
};

export const mockDataset: MockDataSet = {
  parcelsToSort,
};
