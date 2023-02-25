import { useFormContext } from 'react-hook-form';
import { Stack } from '@mui/material';

import { FormOptions } from '~/components/login/form/form-options';
import { InputPhone } from '~/components/login/form/input/input-phone';
import { InputBirthday } from '~/components/login/form/input/input-birthday';

export interface LoginFormProps {
  formId?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ formId }) => {
  const { handleSubmit, getValues } = useFormContext();

  const onSubmit = handleSubmit(async () => {
    // TODO: handle login with NextAuth/trpc
    console.log(getValues());
  });

  return (
    <form id={formId} name={formId} onSubmit={onSubmit}>
      <Stack justifyContent='center' alignItems='center' gap={1}>
        <InputPhone />
        <InputBirthday />
        <FormOptions />
      </Stack>
    </form>
  );
};

export default LoginForm;
