import { filterTasks } from './filter-tasks';
import { pickupTasks } from '~/mocks/tasks';
import { ParcelStatus } from '~/constants/parcel';

describe('filterTask utils', () => {
  const filters = {
    round: ['1'],
    status: [ParcelStatus.Pending, ParcelStatus.ReadyToPick] as any,
  };

  test('should filter out pickup tasks by filter', () => {
    const filteredTasks = filterTasks(pickupTasks, filters);

    const target = pickupTasks.filter(
      (task) =>
        task.round === '1' &&
        (task.status === ParcelStatus.Pending ||
          task.status === ParcelStatus.ReadyToPick)
    );

    expect(filteredTasks).toEqual(target);
  });
});
