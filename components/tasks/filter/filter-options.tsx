import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Button as MuiButton, Menu, styled } from '@mui/material';

import { FilterOption } from './filter-option';

import type { TaskTypes } from '~/constants/tasks';
import { inAppLinks } from '~/constants/side-nav-links';

import dynamic from 'next/dynamic';
import { CallbackFunction } from '~/types';
import React from 'react';
const FilterIcon = dynamic(
  () => import('@mui/icons-material/FilterAltOutlined')
);
const QrScannerIcon = dynamic(
  () => import('@mui/icons-material/QrCodeScanner')
);

const Button = styled(MuiButton)(() => ({
  minWidth: 40,
  height: 40,
}));

Button.defaultProps = {
  variant: 'outlined',
  size: 'small',
};

export interface FilterOptionsProps<T, R> {
  anchorEl?: HTMLElement;
  filterOptions: T;
  label?: string;
  onCloseMenu: CallbackFunction;
  onOpenMenu: CallbackFunction;
  scan?: boolean;
  selectedOption: R;
  setSelectedOption: React.Dispatch<React.SetStateAction<R>>;
  taskType: `${TaskTypes}`;
}

export const FilterOptions = <T, R>({
  anchorEl,
  filterOptions,
  label,
  onCloseMenu,
  onOpenMenu,
  scan = true,
  selectedOption,
  setSelectedOption,
  taskType,
}: FilterOptionsProps<T, R>) => {
  const { t } = useTranslation('tasks');

  const open = !!anchorEl;

  const Label = (option: string) => (label ? `${label} ${option}` : t(option));

  const Scanner = scan ? (
    <Link
      href={{ pathname: inAppLinks.scanner?.href!, query: { task: taskType } }}
      passHref
    >
      <Button>
        <QrScannerIcon />
      </Button>
    </Link>
  ) : null;

  return (
    <>
      <Button onClick={onOpenMenu}>
        <FilterIcon />
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={onCloseMenu}>
        {filterOptions.map((option: any) => {
          const key = String(option);
          return (
            <FilterOption
              key={key}
              option={option}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              label={Label(key)}
            />
          );
        })}
      </Menu>
      {Scanner}
    </>
  );
};
