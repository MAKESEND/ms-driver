import { useState, useEffect } from 'react';
import { Divider, Stack } from '@mui/material';

import type { PickupTask } from '~/types';

import { NoTask } from '~/components/tasks/no-tasks';
import { TaskFilter } from '~/components/tasks/task-filter';
import { PickupTaskHeader } from '~/components/tasks/pickup/page/header';
import { PickupTaskList } from '~/components/tasks/pickup/page/pickup-task-list';

import { TasksContext } from '~/providers/tasks-provider';
import { useMockData } from '~/providers/mock-data-provider';

export const Pickup: React.FC = () => {
  // TODO: remove mock data
  const { mockData, isLoading } = useMockData();
  const pickupTasks = mockData?.pickupTasks ?? [];
  const pickupTaskCount = mockData?.pickupTasks.length;

  const [filteredTasks, setFilteredTasks] = useState<PickupTask[]>([]);

  useEffect(() => {
    if (mockData?.pickupTasks) {
      setFilteredTasks(mockData?.pickupTasks);
    }
  }, [mockData?.pickupTasks]);

  if (isLoading) return null;

  if (!pickupTaskCount) return <NoTask />;

  return (
    <TasksContext.Provider value={[pickupTasks, setFilteredTasks]}>
      <Stack
        sx={{
          p: 3,
          mx: 'auto',
          width: '100%',
          maxWidth: (theme) => theme.layout.size.portMaxWidth,
        }}
      >
        <PickupTaskHeader taskCount={pickupTaskCount} />
        <TaskFilter />
        <Divider />
        <PickupTaskList pickupTasks={filteredTasks} />
      </Stack>
    </TasksContext.Provider>
  );
};
