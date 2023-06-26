import { useState } from 'react';
import { CircularProgress, Stack } from '@mui/material';

import type { Parcel } from '~/types';

import { ParcelCard } from '~/components/sorting/parcel-card';
import { SortFilter } from '~/components/sorting/sorting-filter';

import { useGetSortingParcels } from '~/hooks/use-get-sorting-parcels';

export const SortingContent: React.FC = () => {
  const { data: sortingList, isLoading } = useGetSortingParcels();

  const [parcelToSort, setParcelToSort] = useState<Parcel | null>(null);

  if (isLoading) return <CircularProgress sx={{ alignSelf: 'center' }} />;

  return (
    <>
      <SortFilter
        sortingList={sortingList!}
        parcelToSort={parcelToSort}
        setParcelToSort={setParcelToSort}
      />
      <ParcelCard parcel={parcelToSort} />
    </>
  );
};

export const Sorting: React.FC = () => {
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
      <SortingContent />
    </Stack>
  );
};
