import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import {
  Button as MuiButton,
  Menu,
  styled,
  Stack,
  Typography,
} from '@mui/material';

import type { TaskTypes } from '~/constants/tasks';
import { inAppLinks } from '~/constants/side-nav-links';

import type { TaskFilterProps } from '~/components/tasks/task-filter';
import {
  FilterOption,
  type FilterOptionProps,
} from '~/components/tasks/filter/filter-option';

import dynamic from 'next/dynamic';
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

export interface FilterOptionsProps {
  filterOptions: TaskFilterProps['filterOptions'];
  label?: string;
  scan?: boolean;
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
  taskType: `${TaskTypes}`;
}

export const FilterOptions = ({
  filterOptions,
  label,
  scan = true,
  selectedOptions,
  setSelectedOptions,
  taskType,
}: FilterOptionsProps) => {
  const { t } = useTranslation('tasks');

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = !!anchorEl;

  const onOpenMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const onCloseMenu = () => setAnchorEl(null);

  const Label = (option: string) => (label ? `${label} ${option}` : t(option));

  const Scanner = scan ? (
    <Link
      passHref
      href={{
        pathname: inAppLinks.scanner?.href!,
        query: { task: taskType },
      }}
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
      <Menu open={open} onClose={onCloseMenu} anchorEl={anchorEl}>
        {Object.entries(filterOptions).map(([key, values]) => {
          return (
            <Stack key={key}>
              <Typography
                fontSize={16}
                variant='secondary'
                sx={{
                  ml: 2,
                  ['&::first-letter']: { textTransform: 'capitalize' },
                }}
              >
                {label}
              </Typography>
              {values.map((option: FilterOptionProps['option']) => {
                const key = String(option);
                return (
                  <FilterOption
                    key={key}
                    option={key}
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                    Label={Label(key)}
                  />
                );
              })}
            </Stack>
          );
        })}
      </Menu>
      {Scanner}
    </>
  );
};
