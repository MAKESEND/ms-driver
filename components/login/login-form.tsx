import { useFormContext } from 'react-hook-form';
import { Stack } from '@mui/material';

import { InputPhone } from '~/components/login/form/input-phone';
import { InputBirthday } from '~/components/login/form/input-birthday';
import { FormOptions } from '~/components/login/form/form-options';

export interface LoginFormProps {
  formId?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ formId }) => {
  const { handleSubmit, getValues } = useFormContext();

  const onSubmit = handleSubmit(async () => {
    // TODO: handle login with trpc
    console.log(getValues());
  });

  return (
    <form id={formId} name={formId} onSubmit={onSubmit}>
      <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <InputPhone />
        <InputBirthday />
        <FormOptions />
      </Stack>
    </form>
  );
};

export default LoginForm;
