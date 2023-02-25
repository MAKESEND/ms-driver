import { useTranslation } from 'next-i18next';

import { FormBaseInput } from '~/components/login/form/input/form-base-input';
import { LoginFormFields } from '~/components/login/login-page';

import dynamic from 'next/dynamic';
const CalendarMonthIcon = dynamic(
  () => import('@mui/icons-material/CalendarMonthOutlined')
);

export const InputBirthday: React.FC = () => {
  const { t } = useTranslation('common');
  const birthdayInputPlaceholder = t('auth.dob') || 'Date of birth';
  const birthdayInputRequiredMessage = t('auth.error.required', {
    field: t('auth.dob'),
  });
  const birthdayInputErrorMessage =
    t('auth.error.invalidDOB') ?? 'Wrong birthday format';

  // TODO: check with local/locale year
  const thisYear = new Date().getUTCFullYear();

  const LoginFormField = LoginFormFields.Birthday;

  return (
    <FormBaseInput
      formField={LoginFormField}
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
        defaultValue: '', //TODO: get value from cache if remembered
        name: LoginFormField,
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
      }}
    />
  );
};

export default InputBirthday;
