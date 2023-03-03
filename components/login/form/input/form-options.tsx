import { useTranslation } from 'next-i18next';
import { Box as MuiBox, Checkbox, Typography, styled } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { externalLinks, ExternalLinks } from '~/constants/external-links';
import { LoginFormFields } from '~/components/login/login-page';
import type { DriverAuthentication } from '~/components/login/login-page';
import type { CustomInputProps } from './form-base-input';
import { useState } from 'react';

const Box = styled(MuiBox)(({ theme }) => ({
  px: 1,
  width: '100%',
  maxWidth: theme.layout.size.btnMaxWidth,
  flexWrap: 'wrap',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const FormOptions: React.FC<
  CustomInputProps<DriverAuthentication[LoginFormFields.RememberMe]>
> = ({ formField, defaultValue = false }) => {
  const { t } = useTranslation('common');
  const rememberMeLabel = t('hint.rememberMe');
  const forgetPasswordHint = t('hint.forgetPassword');

  const { register } = useFormContext();
  const [checked, setChecked] = useState<boolean>(defaultValue);

  const externalLinkProps = externalLinks[ExternalLinks.MAKESEND_HOME];

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
          checked={checked}
          {...register(formField, {
            required: false,
            value: defaultValue,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setChecked(e.target.checked),
          })}
          sx={{ maxWidth: '40px', maxHeight: '40px' }}
        />
        {rememberMeLabel}
      </Typography>
      <a {...externalLinkProps}>
        <Typography sx={{ fontSize: '0.75rem' }}>
          {forgetPasswordHint}
        </Typography>
      </a>
    </Box>
  );
};

export default FormOptions;
