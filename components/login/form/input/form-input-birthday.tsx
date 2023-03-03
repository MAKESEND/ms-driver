import { useTranslation } from 'next-i18next';

import type {
  LoginFormFields,
  DriverAuthentication,
} from '~/components/login/login-page';
import {
  FormBaseInput,
  type CustomInputProps,
} from '~/components/login/form/input/form-base-input';

import dynamic from 'next/dynamic';
const CalendarMonthIcon = dynamic(
  () => import('@mui/icons-material/CalendarMonthOutlined')
);

export const FormInputBirthday: React.FC<
  CustomInputProps<DriverAuthentication[LoginFormFields.Birthday]>
> = ({ formField, defaultValue }) => {
  const { t } = useTranslation('common');
  const birthdayInputPlaceholder = t('auth.dob') || 'Date of birth';
  const birthdayInputRequiredMessage = t('auth.error.required', {
    field: t('auth.dob'),
  });
  const birthdayInputErrorMessage =
    t('auth.error.invalidDOB') ?? 'Wrong birthday format';

  // TODO: check with local/locale year
  const thisYear = new Date().getUTCFullYear();

  return (
    <FormBaseInput
      formField={formField}
      inputType='date'
      inputPlaceholder={birthdayInputPlaceholder}
      inputProps={{
        min: `${thisYear - 80}-01-01`, // up to 80-year-old
        max: `${thisYear - 18}-12-31`, // at least 18-year-old
      }}
      StartIcon={CalendarMonthIcon}
      startIconCallback={(_e, inputElement) => {
        if (inputElement?.showPicker) {
          inputElement?.showPicker();
        }
      }}
      formControllerConfig={{
        defaultValue,
        name: formField,
        rules: {
          required: {
            value: true,
            message: birthdayInputRequiredMessage,
          },
          pattern: {
            value: /\d{4}-\d{2}-\d{2}/g,
            message: birthdayInputErrorMessage,
          },
        },
      }}
      TextFieldSx={{
        'input[type=date]::-webkit-inner-spin-button, input[type="date"]::-webkit-calendar-picker-indicator':
          { display: 'none', WebkitAppearance: 'none' },
        '.Mui-focused .MuiSvgIcon-root': {
          color: (theme) => theme.palette.primary.main,
        },
      }}
    />
  );
};

export default FormInputBirthday;
