import { useTranslation } from 'next-i18next';

import { LoginFormFields } from '~/components/login/login-page';
import { FormBaseInput } from '~/components/login/form/input/form-base-input';

import dynamic from 'next/dynamic';
const PhoneIcon = dynamic(
  () => import('@mui/icons-material/LocalPhoneOutlined')
);

export const InputPhone: React.FC = () => {
  const { t } = useTranslation('common');
  const phoneInputPlaceholder = t('auth.phone') || 'Phone';
  const phoneInputRequiredMessage = t('auth.error.required', {
    field: t('auth.phone'),
  });
  const phoneInputErrorMessage = t('auth.error.invalidPhone');

  const formField = LoginFormFields.Phone;

  return (
    <FormBaseInput
      formField={formField}
      inputType='tel'
      inputPlaceholder={phoneInputPlaceholder}
      startIconProps={{
        disabled: true,
        sx: {
          '&:disabled': {
            color: (theme) => theme.palette.common.darkGrey,
          },
        },
      }}
      StartIcon={PhoneIcon}
      formControllerConfig={{
        defaultValue: '', //TODO: get value from cache if remembered
        name: formField,
        rules: {
          required: {
            value: true,
            message: phoneInputRequiredMessage,
          },
          pattern: {
            value: /^0\d{9}$/g,
            message: phoneInputErrorMessage,
          },
        },
      }}
    />
  );
};

export default InputPhone;
