import { useEffect, useState } from 'react';
import { Checkbox, MenuItem, Typography } from '@mui/material';

export interface FilterOptionProps {
  option: string;
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
  Label?: React.ReactNode;
}

export const FilterOption = ({
  Label,
  option,
  selectedOptions,
  setSelectedOptions,
}: FilterOptionProps) => {
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    const index = selectedOptions.findIndex((item) => item === option);
    setChecked(index > -1);
  }, [option, selectedOptions]);

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    setSelectedOptions((options) => {
      if (checked) return options.filter((item) => item !== option);

      return option ? [...options, option] : options;
    });
  };

  return (
    <MenuItem onClick={onClick} sx={{ pl: 0 }}>
      <Checkbox checked={checked} onClick={onClick} />
      <Typography fontSize={14}>{Label ?? option}</Typography>
    </MenuItem>
  );
};
