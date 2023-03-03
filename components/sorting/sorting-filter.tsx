import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import {
  Skeleton,
  Grid,
  useMediaQuery,
  type Theme,
} from '@mui/material';

import type { Parcel } from '~/types';

import { DropRounds } from '~/constants/logistics';
import { FilterOptions } from '~/components/sorting/filter/filter-options';
import { LinkToScanner } from './filter/link-to-scanner';

import dynamic from 'next/dynamic';
const SearchField = dynamic(
  () => import('./filter/search-field').then((mod) => mod.SearchField),
  {
    loading: () => (
      <Skeleton variant='rectangular' height='100%' />
    ),
    ssr: false,
  }
);

export interface SortFilterProps<T = Parcel> {
  sortingList: T[];
  parcelToSort: T | null;
  setParcelToSort: React.Dispatch<React.SetStateAction<T | null>>;
}

export const SortFilter: React.FC<SortFilterProps> = ({
  sortingList = [],
  parcelToSort,
  setParcelToSort,
}) => {
  const { t } = useTranslation('sorting');
  const roundText = t('round');

  const [selectedRounds, setSelectedRounds] = useState([1, 2]);

  const breakpointSM = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('sm')
  );

  return (
    <Grid
      container
      gap={2}
      justifyContent={{ xs: 'space-between', md: 'center' }}
    >
      <Grid item xs={12} sm={8} sx={{ pr: 0.5 }}>
        <SearchField
          sortingList={sortingList}
          parcelToSort={parcelToSort}
          setParcelsToSort={setParcelToSort}
        />
      </Grid>
      <Grid item xs={5} sm={1}>
        <FilterOptions
          shrink={breakpointSM}
          options={DropRounds}
          optionText={roundText}
          selectedOptions={selectedRounds}
          setSelectedOptions={setSelectedRounds}
        />
      </Grid>
      <Grid item xs={5} sm={1}>
        <LinkToScanner shrink={breakpointSM} />
      </Grid>
    </Grid>
  );
};
