import { useState } from 'react';
import { Stack } from '@mui/material';

import { Parcel } from '~/types';

import { ParcelCard } from '~/components/sorting/parcel-card';
import { SortFilter } from '~/components/sorting/sorting-filter';

// TODO: remove mock data
import { useMockData } from '~/providers/mock-data-provider';

export const Sorting: React.FC = () => {
  const mock = useMockData();
  const sortingList = mock?.parcelsToSort ?? [];

  const [parcelToSort, setParcelToSort] = useState<Parcel | null>(null);

  return (
    <Stack
      flexGrow={1}
      sx={{
        p: 3,
        mx: 'auto',
        width: '100%',
        maxWidth: (theme) => theme.layout.size.portMaxWidth,
      }}
    >
      <SortFilter
        sortingList={sortingList}
        parcelToSort={parcelToSort}
        setParcelToSort={setParcelToSort}
      />
      <ParcelCard parcel={parcelToSort} />
    </Stack>
  );
};
