import { useRef } from 'react';
import { useLocalStorage } from 'react-use';
import { Fade } from '@mui/material';

import { localStorageKeyList } from '~/constants/local-storage-keys';

import { LoginFormFields } from '~/components/login/login-page';
import type { DriverAuthentication } from '~/components/login/login-page';
import { FormInputBirthday } from '~/components/login/form/input/form-input-birthday';
import { FormInputPhone } from '~/components/login/form/input/form-input-phone';
import { FormOptions } from '~/components/login/form/input/form-options';

export const InputGroup: React.FC = () => {
  const [value] = useLocalStorage<DriverAuthentication>(
    localStorageKeyList.FormInputs
  );

  const defaultBirthdayInput = value?.birthday ?? '';
  const defaultPhoneInput = value?.phone ?? '';
  const defaultRememberMe = !!value?.rememberMe;

  return (
    <Fade in>
      <div>
        <FormInputPhone
          formField={LoginFormFields.Phone}
          defaultValue={defaultPhoneInput}
        />
        <FormInputBirthday
          formField={LoginFormFields.Birthday}
          defaultValue={defaultBirthdayInput}
        />
        <FormOptions
          formField={LoginFormFields.RememberMe}
          defaultValue={defaultRememberMe}
        />
      </div>
    </Fade>
  );
};
