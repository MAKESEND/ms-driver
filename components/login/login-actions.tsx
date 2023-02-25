import { useTranslation } from 'next-i18next';
import { useFormContext } from 'react-hook-form';
import { Box, Button } from '@mui/material';

import type { DriverAuthentication } from './login-page';

export interface LoginActionsProps {
  formId?: string;
}

export const LoginActions: React.FC<LoginActionsProps> = ({ formId }) => {
  const { t } = useTranslation('common');
  const {
    formState: { isSubmitting, errors },
  } = useFormContext<DriverAuthentication>();

  const disabled = !!(errors?.phone || errors?.birthday);

  return (
    <Box width='100%' sx={{ p: 2, textAlign: 'center' }}>
      <Button
        type='submit'
        form={formId}
        variant='contained'
        disabled={isSubmitting || disabled}
        sx={{ width: '100%', maxWidth: (t) => t.layout.size.btnMaxWidth }}
      >
        {t('btn.login')}
      </Button>
    </Box>
  );
};

export default LoginActions;
