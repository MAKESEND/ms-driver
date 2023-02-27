import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useLocalStorage } from 'react-use';
import { useFormContext } from 'react-hook-form';
import { CircularProgress, Stack } from '@mui/material';

import { inAppLinks } from '~/constants/side-nav-links';
import { localStorageKeyList } from '~/constants/local-storage-keys';
import { authProviders } from '~/constants/auth-provider';

import type { DriverAuthentication } from '~/components/login/login-page';

import dynamic from 'next/dynamic';
const InputGroup = dynamic(
  () =>
    import('~/components/login/form/input-group').then((mod) => mod.InputGroup),
  { ssr: false, loading: () => <CircularProgress /> }
);

export interface LoginFormProps {
  formId?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ formId }) => {
  const router = useRouter();
  const { handleSubmit, getValues } = useFormContext<DriverAuthentication>();
  const [, setValue, remove] = useLocalStorage<DriverAuthentication>(
    localStorageKeyList.FormInputs
  );

  // TODO: revalidate login process with sensitive data and security
  const onSubmit = handleSubmit(async () => {
    const { birthday, phone, rememberMe } = getValues();
    const res = await signIn(authProviders.MSDriver, {
      birthday,
      phone,
      redirect: false,
    });

    if (res) {
      if (res.ok) {
        // manage cache in localStorage;
        rememberMe ? setValue(getValues()) : remove();

        router.replace((router.query?.from as string) ?? inAppLinks.dashboard!);
      }
    }
    if (/2\d\d/g.test(String(res?.status ?? 500))) {
      //TODO: handle login error with react-hook-form and/or extra info
    }
  });

  return (
    <form id={formId} name={formId} onSubmit={onSubmit}>
      <Stack
        justifyContent='center'
        alignItems='center'
        gap={1}
        minHeight={232}
        maxHeight={250}
      >
        <InputGroup />
      </Stack>
    </form>
  );
};

export default LoginForm;
