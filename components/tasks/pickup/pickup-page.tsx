import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { Divider } from '@mui/material';

import type { PickupTask } from '~/types';
import { PickupFilterOptions } from '~/constants/tasks';

import { InDrawerLayout } from '~/components/layouts/in-drawer-layout';
import { DrawerContentSkeleton } from '~/components/common/loader/drawer-content-skeleton';

import { NoTask } from '~/components/tasks/no-tasks';
import { TaskFilter } from '~/components/tasks/task-filter';
import { PickupTaskHeader } from '~/components/tasks/pickup/page/header';
import { PickupTaskList } from '~/components/tasks/pickup/page/pickup-task-list';

import { TasksContext } from '~/providers/tasks-provider';
import { useMockData } from '~/providers/mock-data-provider';

export const Pickup: React.FC = () => {
  // TODO: remove mock data
  const { mockData, isLoading } = useMockData();
  const allPickupTasks = mockData?.pickupTasks ?? [];
  const pickupTaskCount = mockData?.pickupTasks.length;

  const { t } = useTranslation('sorting');
  const labelText = t('round');

  useEffect(() => {
    if (mockData?.pickupTasks) {
      setFilteredTasks(mockData?.pickupTasks);
    }
  }, [mockData?.pickupTasks]);

  const [filteredTasks, setFilteredTasks] = useState<PickupTask[]>([]);

  if (isLoading) return <DrawerContentSkeleton />;

  if (!pickupTaskCount) return <NoTask />;

  return (
    <TasksContext.Provider value={[allPickupTasks, setFilteredTasks]}>
      <InDrawerLayout>
        <PickupTaskHeader taskCount={pickupTaskCount} />
        <TaskFilter
          label={labelText}
          taskType='pickup'
          taskPropsToFilter='round'
          filterOptions={PickupFilterOptions}
        />
        <Divider />
        <PickupTaskList pickupTasks={filteredTasks} />
      </InDrawerLayout>
    </TasksContext.Provider>
  );
};
