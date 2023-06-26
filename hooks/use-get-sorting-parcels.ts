import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import type { Parcel } from '~/types';
import { httpClient } from '~/services/api';
import { QueryKeys } from '~/constants/query-keys';

export const useGetSortingParcels = (config?: UseQueryOptions<Parcel[]>) => {
  return useQuery<Parcel[]>({
    queryKey: [QueryKeys.SORTING_TASK],
    queryFn: () => httpClient('/api/sorting'),
    ...config,
  });
};
