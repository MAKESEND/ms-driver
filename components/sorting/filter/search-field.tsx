import { useTranslation } from 'react-i18next';
import { Autocomplete, createFilterOptions, TextField } from '@mui/material';

import { Parcel } from '~/types';

const filterOptions = createFilterOptions<Parcel>({
  stringify: (option) =>
    Object.values(option)
      ?.map((item) => JSON.stringify(item))
      .join(),
});

export interface SearchFieldProps {
  sortingList: Parcel[];
  parcelToSort: Parcel | null;
  setParcelsToSort: React.Dispatch<React.SetStateAction<Parcel | null>>;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  parcelToSort,
  sortingList = [],
  setParcelsToSort,
}) => {
  const { t } = useTranslation('sorting');
  const roundText = t('round');
  const parcelText = t('parcel');
  const parcelsText = t('parcels');

  const getOptionLabel = (option: Parcel) =>
    `${option?.trackingID?.trim() ?? ''} ${option?.receiverName?.trim() ?? ''}`;

  const groupBy = (option: Parcel) => {
    const parcelCount = sortingList.filter(
      (parcel) => parcel.round === option?.round
    ).length;

    const parcelUnit = parcelCount > 1 ? parcelsText : parcelText;

    // TODO: handle with i18n plural
    return `${roundText} ${option?.round?.toString()}: ${parcelCount} ${parcelUnit}`;
  };

  return (
    <Autocomplete
      blurOnSelect
      disablePortal
      disableCloseOnSelect
      size='small'
      filterOptions={filterOptions}
      getOptionLabel={getOptionLabel}
      groupBy={groupBy}
      onChange={(_event, value) => setParcelsToSort(value)}
      options={sortingList.sort((a, b) => +(a?.round ?? 0) - +(b?.round ?? 0))}
      renderInput={(params) => <TextField {...params} label={parcelsText} />}
      value={parcelToSort}
    />
  );
};
