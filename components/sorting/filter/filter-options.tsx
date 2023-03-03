import { Fragment, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Button, IconButton, Menu } from '@mui/material';

import dynamic from 'next/dynamic';
const FilterIcon = dynamic(
  () => import('@mui/icons-material/FilterAltOutlined')
);

import { FilterOption } from '~/components/sorting/filter/filter-option';

export interface FilterOptionsProps<T = any> {
  options: T[];
  optionText?: string;
  selectedOptions: T[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<T[]>>;
  shrink?: boolean;
}

export const FilterOptions: React.FC<FilterOptionsProps> = ({
  options = [],
  optionText,
  selectedOptions,
  setSelectedOptions,
  shrink = false,
}) => {
  const { t } = useTranslation('sorting');
  const filterText = t('filter');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;

  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const Btn = shrink ? (
    <IconButton onClick={handleClick}>
      <FilterIcon />
    </IconButton>
  ) : (
    <Button
      fullWidth
      variant='outlined'
      endIcon={<FilterIcon />}
      onClick={handleClick}
    >
      {filterText}
    </Button>
  );

  return (
    <Fragment>
      {Btn}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((option) => (
          <FilterOption
            key={option}
            option={option}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            label={`${optionText + ' '}${option}`}
          />
        ))}
      </Menu>
    </Fragment>
  );
};
