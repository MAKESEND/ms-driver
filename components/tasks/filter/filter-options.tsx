import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { useTranslation } from 'next-i18next';
import {
  Button as MuiButton,
  Menu,
  styled,
  Stack,
  Typography,
} from '@mui/material';

import { scannerConfigState } from '~/store/scanner';
import { inAppLinks } from '~/constants/side-nav-links';

import type { TaskFilterProps } from '~/components/tasks/task-filter';
import { FilterOption } from '~/components/tasks/filter/filter-option';

import dynamic from 'next/dynamic';
import { TaskTypes } from '~/constants/tasks';
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

export interface FilterOptionsProps<T> {
  disabled?: boolean;
  filterOptions: TaskFilterProps['filterOptions'];
  scan?: boolean;
  selectedOptions: T;
  setSelectedOptions: React.Dispatch<React.SetStateAction<T>>;
  taskType: `${TaskTypes}`;
}

export const FilterOptions = <T extends Record<string, any[]>>({
  disabled = false,
  filterOptions,
  scan = true,
  selectedOptions,
  setSelectedOptions,
  taskType,
}: FilterOptionsProps<T>) => {
  const router = useRouter();
  const setScannerConfig = useSetRecoilState(scannerConfigState);
  const { t } = useTranslation('tasks');

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = !!anchorEl;

  const onOpenMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const onCloseMenu = () => setAnchorEl(null);

  const onClick = () => {
    setScannerConfig((prev) => ({ ...prev, task: taskType, mode: 'bulk' }));
    router.push(inAppLinks.scanner?.href!);
  };

  const Scanner = scan ? (
    <Button onClick={onClick}>
      <QrScannerIcon />
    </Button>
  ) : null;

  const updateSelectedFilter =
    (key: keyof T) => (callback: (value: T[typeof key]) => T[typeof key]) => {
      setSelectedOptions((prev) => ({ ...prev, [key]: callback(prev[key]) }));
    };

  return (
    <>
      <Button disabled={disabled} onClick={onOpenMenu}>
        <FilterIcon />
      </Button>
      <Menu open={open} onClose={onCloseMenu} anchorEl={anchorEl}>
        {Object.entries(filterOptions).map(([filter, options]) => (
          <Stack key={filter}>
            <Typography
              fontSize={16}
              variant='secondary'
              sx={{
                ml: 2,
                ['&::first-letter']: { textTransform: 'capitalize' },
              }}
            >
              {/* TODO: update filter text */}
              {t(`label.${filter}`)}
            </Typography>
            {options.map((option: (typeof options)[0]) => {
              const key = String(option);

              return (
                <FilterOption
                  disabled={disabled}
                  key={key}
                  option={key}
                  selectedOptions={selectedOptions[filter]}
                  setSelectedOptions={updateSelectedFilter(filter)}
                />
              );
            })}
          </Stack>
        ))}
      </Menu>
      {Scanner}
    </>
  );
};
