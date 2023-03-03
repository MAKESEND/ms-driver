import { useRef } from 'react';
import { UseControllerProps, FieldValues } from 'react-hook-form';
import { useFormContext, useController } from 'react-hook-form';
import type { IconButtonProps, SxProps, Theme } from '@mui/material';
import { IconButton, Fade, TextField } from '@mui/material';

import { InputAlert } from '../input-alert';
import { InputLayout } from '../input-layout';

import dynamic from 'next/dynamic';
const ClearIcon = dynamic(() => import('@mui/icons-material/Clear'), {
  ssr: false,
});

export interface CustomInputProps<T = unknown> {
  formField: string;
  defaultValue?: T;
}

export interface FormBaseInputProps<
  T extends FieldValues = FieldValues,
  U = UseControllerProps<T>,
  P extends React.FC = React.FC
> {
  formField: string;
  formControllerConfig: U;
  StartIcon?: P | typeof ClearIcon;
  startIconProps?: IconButtonProps;
  startIconCallback?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    inputElement?: HTMLInputElement
  ) => void | Promise<void>;
  inputType?: React.HTMLProps<HTMLInputElement>['type'];
  inputProps?: React.HTMLProps<HTMLInputElement>;
  inputPlaceholder?: string;
  clearable?: boolean;
  TextFieldSx?: SxProps<Theme>;
}

export const FormBaseInput: React.FC<FormBaseInputProps> = ({
  formField,
  formControllerConfig,
  StartIcon,
  startIconProps,
  startIconCallback,
  inputType,
  inputProps,
  inputPlaceholder,
  clearable = true,
  TextFieldSx,
}: FormBaseInputProps) => {
  const inputRef = useRef<HTMLInputElement>();
  const { control, setValue } = useFormContext();
  const { field, fieldState } = useController({
    ...formControllerConfig,
    control,
  });

  const isError = !!fieldState.error;
  const color = isError ? 'error' : undefined;

  const onClearInput = () => {
    setValue(formField, '');
  };

  return (
    <InputLayout htmlFor={formField}>
      <TextField
        id={field.name}
        fullWidth
        type={inputType}
        error={isError}
        placeholder={inputPlaceholder}
        {...field}
        inputRef={(e) => {
          field.ref(e);
          inputRef.current = e;
        }}
        inputProps={inputProps}
        InputProps={{
          startAdornment: StartIcon && (
            <IconButton
              {...startIconProps}
              onClick={(e) =>
                startIconCallback && startIconCallback(e, inputRef.current)
              }
            >
              <StartIcon color={color} />
            </IconButton>
          ),
          endAdornment: (
            <Fade in={!!field.value && clearable}>
              <IconButton color={color} onClick={onClearInput}>
                <ClearIcon />
              </IconButton>
            </Fade>
          ),
        }}
        sx={TextFieldSx}
      />
      <InputAlert inputState={fieldState} />
    </InputLayout>
  );
};
