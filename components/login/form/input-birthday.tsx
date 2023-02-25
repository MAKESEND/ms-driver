import { useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { useFormContext, useController } from 'react-hook-form';
import { IconButton, Fade, TextField } from '@mui/material';

import { InputAlert } from './input-alert';
import { InputLayout } from './input-layout';
import { LoginFormFields } from '~/components/login/login-page';

import dynamic from 'next/dynamic';
const ClearIcon = dynamic(() => import('@mui/icons-material/Clear'));
const CalendarMonthIcon = dynamic(
  () => import('@mui/icons-material/CalendarMonthOutlined')
);

const LoginFormField = LoginFormFields.Birthday;

export const InputBirthday: React.FC = () => {
  const { t } = useTranslation('common');
  const requiredMessage = t('') ?? 'Required';
  const inputErrorMessage = t('') ?? 'Wrong birthday format';
  const placeholder = t('auth.dob') || 'Date of birth';

  // TODO: check with local/locale year
  const thisYear = new Date().getUTCFullYear();
  const inputRef = useRef<HTMLInputElement>();

  const { control, resetField } = useFormContext();
  const { field, fieldState } = useController({
    control,
    defaultValue: '', //TODO: get value from cache if remembered
    name: LoginFormField,
    rules: {
      required: {
        value: true,
        message: requiredMessage,
      },
      pattern: {
        value: /\d{4}-\d{2}-\d{2}/g,
        message: inputErrorMessage,
      },
    },
  });

  const isError = !!fieldState.error;
  const color = isError ? 'error' : undefined;

  const onClearInput = () => resetField(LoginFormField);
  const onShowCalendar = () => {
    if (inputRef.current?.showPicker) {
      inputRef.current?.showPicker();
    }
  };

  return (
    <InputLayout htmlFor={LoginFormField}>
      <TextField
        id={field.name}
        fullWidth
        type='date'
        error={isError}
        placeholder={placeholder}
        {...field}
        inputRef={(e) => {
          field.ref(e);
          inputRef.current = e;
        }}
        inputProps={{
          min: `${thisYear - 80}-01-01`, // up to 80-year-old
          max: `${thisYear - 18}-12-31`, // at least 18-year-old
        }}
        InputProps={{
          startAdornment: (
            <IconButton onClick={onShowCalendar}>
              <CalendarMonthIcon color={color} />
            </IconButton>
          ),
          endAdornment: (
            <Fade in={!!field.value}>
              <IconButton color={color} onClick={onClearInput}>
                <ClearIcon />
              </IconButton>
            </Fade>
          ),
        }}
        sx={{
          'input[type=date]::-webkit-inner-spin-button, input[type="date"]::-webkit-calendar-picker-indicator':
            { display: 'none', WebkitAppearance: 'none' },
        }}
      />
      <InputAlert inputState={fieldState} />
    </InputLayout>
  );
};

export default InputBirthday;
