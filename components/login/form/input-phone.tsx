import { useTranslation } from 'next-i18next';
import { useFormContext, useController } from 'react-hook-form';
import { IconButton, Fade, TextField } from '@mui/material';

import { InputAlert } from './input-alert';
import { InputLayout } from './input-layout';
import { LoginFormFields } from '~/components/login/login-page';

import dynamic from 'next/dynamic';
const ClearIcon = dynamic(() => import('@mui/icons-material/Clear'));
const PhoneIcon = dynamic(
  () => import('@mui/icons-material/LocalPhoneOutlined')
);

const LoginFormField = LoginFormFields.Phone;

export const InputPhone: React.FC = () => {
  const { t } = useTranslation('common');
  const placeholder = t('auth.phone') || 'Phone';
  const requiredMessage = t('auth.error.required', { field: t('auth.phone') });
  const inputErrorMessage = t('auth.error.invalidPhone');

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
        value: /^0\d{9}$/g,
        message: inputErrorMessage,
      },
    },
  });

  const isError = !!fieldState.error;
  const color = isError ? 'error' : undefined;

  const onClearInput = () => resetField(LoginFormField);

  return (
    <InputLayout htmlFor={LoginFormField}>
      <TextField
        id={field.name}
        fullWidth
        type='tel'
        error={isError}
        placeholder={placeholder}
        {...field}
        inputRef={field.ref}
        InputProps={{
          startAdornment: (
            <IconButton disabled>
              <PhoneIcon color={color} />
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
      />
      <InputAlert inputState={fieldState} />
    </InputLayout>
  );
};

export default InputPhone;
