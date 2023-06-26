import { useEffect, useState } from 'react';
import { Checkbox, MenuItem, Typography } from '@mui/material';

export interface FilterOptionProps<T> {
  disabled?: boolean;
  option: string;
  selectedOptions: T;
  setSelectedOptions: any; // TODO: update to dedicate type
  Label?: React.ReactNode;
}

export const FilterOption = <T extends any[]>({
  disabled = false,
  Label,
  option,
  selectedOptions,
  setSelectedOptions,
}: FilterOptionProps<T>) => {
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    const index = selectedOptions.findIndex((item) => item === option);
    setChecked(index > -1);
  }, [option, selectedOptions]);

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    setSelectedOptions((options: any) => {
      if (checked) return options.filter((item: any) => item !== option);

      return option ? [...options, option] : options;
    });
  };

  return (
    <MenuItem disabled={disabled} onClick={onClick} sx={{ pl: 0 }}>
      <Checkbox checked={checked} onClick={onClick} />
      <Typography fontSize={14}>{Label ?? option}</Typography>
    </MenuItem>
  );
};
