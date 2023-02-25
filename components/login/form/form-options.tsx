import { useTranslation } from 'next-i18next';
import { Box as MuiBox, Checkbox, Typography, styled } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { externalLinks, ExternalLinks } from '~/constants/external-links';
import { LoginFormFields } from '~/components/login/login-page';

const Box = styled(MuiBox)(({ theme }) => ({
  px: 1,
  width: '100%',
  maxWidth: theme.layout.size.btnMaxWidth,
  flexWrap: 'wrap',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const LoginFormField = LoginFormFields.Remember;

export const FormOptions: React.FC = () => {
  const { t } = useTranslation('common');
  const { register } = useFormContext();

  return (
    <Box>
      <Typography
        component='label'
        variant='secondary'
        sx={{
          mr: 2,
          display: 'inline-flex',
          fontSize: '0.75rem',
          alignItems: 'center',
        }}
      >
        <Checkbox
          {...register(LoginFormField, { required: false })}
          sx={{ maxWidth: '40px', maxHeight: '40px' }}
        />
        {t('hint.rememberMe')}
      </Typography>
      <a {...externalLinks[ExternalLinks.MAKESEND_HOME]}>
        <Typography sx={{ fontSize: '0.75rem' }}>
          {t('hint.forgetPassword')}
        </Typography>
      </a>
    </Box>
  );
};

export default FormOptions;
