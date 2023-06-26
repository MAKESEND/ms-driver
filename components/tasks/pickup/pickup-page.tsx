import { useState } from 'react';
import { Divider } from '@mui/material';

import type { PickupTask } from '~/types';
import { PickupFilterOptions } from '~/constants/tasks';
import { useGetPickupTasks } from '~/hooks/use-get-pickup-tasks';

import { InDrawerLayout } from '~/components/layouts/in-drawer-layout';
import { DrawerContentSkeleton } from '~/components/common/loader/drawer-content-skeleton';

import { NoTask } from '~/components/tasks/no-tasks';
import { TaskFilter } from '~/components/tasks/task-filter';
import { PickupTaskHeader } from '~/components/tasks/pickup/page/header';
import { PickupTaskList } from '~/components/tasks/pickup/page/pickup-task-list';
import { PickupUpdateController } from '~/components/tasks/pickup/pickup-update-controller';

import { TasksContext } from '~/providers/tasks-provider';

export const Pickup: React.FC = () => {
  const { data: allPickupTasks, isLoading } = useGetPickupTasks({
    initialData: [],
    refetchOnWindowFocus: false,
  });

  const pickupTaskCount = allPickupTasks?.length;

  if (isLoading) return <DrawerContentSkeleton />;

  if (!pickupTaskCount) return <NoTask />;

  return (
    <InDrawerLayout>
      <PickupUpdateController />
      <PickupView allPickupTasks={allPickupTasks} />
    </InDrawerLayout>
  );
};

export const PickupView: React.FC<{ allPickupTasks: PickupTask[] }> = ({
  allPickupTasks,
}) => {
  const pickupTaskCount = allPickupTasks.length;
  const [filteredTasks, setFilteredTasks] = useState<PickupTask[]>([]);

  return (
    <TasksContext.Provider value={[allPickupTasks, setFilteredTasks]}>
      <PickupTaskHeader
        taskCount={pickupTaskCount}
        filteredTaskCount={filteredTasks.length}
      />
      <TaskFilter taskType='pickup' filterOptions={PickupFilterOptions} />
      <Divider />
      <PickupTaskList pickupTasks={filteredTasks} />
    </TasksContext.Provider>
  );
};
