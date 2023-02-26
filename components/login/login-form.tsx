import { useFormContext } from 'react-hook-form';
import { useLocalStorage } from 'react-use';
import { Stack } from '@mui/material';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import { inAppLinks, InAppLinks } from '~/constants/side-nav-links';
import {
  localStorageKeyList,
  LocalStorageKeys,
} from '~/constants/local-storage-keys';
import { authProviders, AuthProviders } from '~/constants/auth-provider';

import type { DriverAuthentication } from '~/components/login/login-page';
import { LoginFormFields } from '~/components/login/login-page';
import { FormOptions } from '~/components/login/form/form-options';
import { InputPhone } from '~/components/login/form/input/input-phone';
import { InputBirthday } from '~/components/login/form/input/input-birthday';

export interface LoginFormProps {
  formId?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ formId }) => {
  const router = useRouter();
  const { handleSubmit, getValues } = useFormContext<DriverAuthentication>();
  const [value, setValue, remove] = useLocalStorage<DriverAuthentication>(
    localStorageKeyList[LocalStorageKeys.FormInputs]
  );

  // get default from cache
  const defaultBirthdayInput = value?.birthday ?? '';
  const defaultPhoneInput = value?.phone ?? '';
  const defaultRememberMe = !!value?.remember_me;

  // TODO: revalidate login process with sensitive data and security
  const onSubmit = handleSubmit(async () => {
    const { birthday, phone, remember_me } = getValues();
    const res = await signIn(authProviders[AuthProviders.MS_DRIVER], {
      birthday,
      phone,
      redirect: false,
    });

    if (res) {
      if (res.ok) {
        // manage cache in localStorage;
        remember_me ? setValue(getValues()) : remove();

        router.replace(
          (router.query?.from as string) ?? inAppLinks[InAppLinks.DASHBOARD]!
        );
      }
    }
    if (/2\d\d/g.test(String(res?.status ?? 500))) {
      //TODO: handle login error with react-hook-form and/or extra info
    }
  });

  return (
    <form id={formId} name={formId} onSubmit={onSubmit}>
      <Stack justifyContent='center' alignItems='center' gap={1}>
        <InputPhone
          formField={LoginFormFields.Phone}
          defaultValue={defaultPhoneInput}
        />
        <InputBirthday
          formField={LoginFormFields.Birthday}
          defaultValue={defaultBirthdayInput}
        />
        <FormOptions
          formField={LoginFormFields.Remember}
          defaultValue={defaultRememberMe}
        />
      </Stack>
    </form>
  );
};

export default LoginForm;
