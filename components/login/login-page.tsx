import { useForm, FormProvider } from 'react-hook-form';
import { Card, CardContent, CardActions, Stack } from '@mui/material';

import { LoginLayout } from './login-layout';
import { LoginActions } from './login-actions';
import { LoginForm } from './login-form';

import dynamic from 'next/dynamic';
const LoginBanner = dynamic(() => import('./login-banner'));

export enum LoginFormFields {
  Phone = 'phone',
  Birthday = 'birthday',
  Remember = 'remember_me',
}

export interface DriverAuthentication {
  [LoginFormFields.Phone]: string;
  [LoginFormFields.Birthday]: string;
  [LoginFormFields.Remember]: boolean;
}

const formId = 'ms-driver-login';

export const LoginPage: React.FC = () => {
  const formMethods = useForm<DriverAuthentication>();

  return (
    <FormProvider {...formMethods}>
      <LoginLayout>
        <Card>
          <CardContent>
            <Stack gap={3}>
              <LoginBanner />
              <LoginForm formId={formId} />
            </Stack>
          </CardContent>
          <CardActions>
            <LoginActions formId={formId} />
          </CardActions>
        </Card>
      </LoginLayout>
    </FormProvider>
  );
};

export default LoginPage;
