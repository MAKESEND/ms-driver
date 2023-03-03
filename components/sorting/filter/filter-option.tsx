import { useState, useEffect } from 'react';
import { Checkbox, MenuItem, Typography } from '@mui/material';

export interface FilterOption<T = any> {
  option: T;
  selectedOptions: T[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<T[]>>;
  label?: React.ReactNode;
}

export const FilterOption: React.FC<FilterOption> = ({
  option,
  selectedOptions,
  setSelectedOptions,
  label,
}) => {
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    const index = selectedOptions.findIndex((item) => item === option);
    setChecked(index > -1);
  }, [option, selectedOptions]);

  const Label =
    typeof label === 'string' ? (
      <Typography sx={{ pr: 1 }}>{label}</Typography>
    ) : (
      label
    );

  if (!option) return null;

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    setSelectedOptions((options) => {
      if (checked) return options.filter((item) => item !== option);

      return option ? [...options, option] : [...options];
    });
  };

  return (
    <MenuItem sx={{ px: 0 }} onClick={onClick}>
      <Checkbox checked={checked} onClick={onClick} />
      {Label}
    </MenuItem>
  );
};
