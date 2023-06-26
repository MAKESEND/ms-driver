import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import type { PickupTask } from '~/types';
import { httpClient } from '~/services/api';
import { QueryKeys } from '~/constants/query-keys';

export const useGetPickupTasks = (option?: UseQueryOptions<PickupTask[]>) => {
  return useQuery<PickupTask[]>({
    queryKey: [QueryKeys.PICKUP_TASK],
    queryFn: () => httpClient('/api/tasks/pickup'),
    ...option,
  });
};
