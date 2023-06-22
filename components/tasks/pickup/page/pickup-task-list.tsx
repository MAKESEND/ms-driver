import { Box, Fade, Stack, styled } from '@mui/material';

import type { PickupTask } from '~/types';
import { PickupTaskCard } from './pickup-task-card';

const PickupTaskListLayout = styled(Stack)(() => ({
  margin: '1rem 0',
  gap: 16,
  justifyContent: 'center',
  alignItems: 'center',
}));

export interface PickupTaskListProps {
  pickupTasks: PickupTask[];
}

export const PickupTaskList: React.FC<PickupTaskListProps> = ({
  pickupTasks,
}) => {
  if (!pickupTasks.length) return null;

  return (
    <Fade in>
      <Box height='100%' overflow='auto'>
        <PickupTaskListLayout>
          {pickupTasks.map((pickupTask) => (
            <PickupTaskCard key={pickupTask.order_id} pickupTask={pickupTask} />
          ))}
        </PickupTaskListLayout>
      </Box>
    </Fade>
  );
};
