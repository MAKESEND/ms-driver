import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import {
  Box,
  Divider,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Typography,
} from '@mui/material';

import { languages } from '~/constants/locales';
const langs = Object.values(languages);

export const Settings: React.FC = () => {
  const { t } = useTranslation('settings');
  const selectLanguage = t('title.selectLanguage');

  const router = useRouter();
  const [lang, setLang] = useState<string>(router.locale || 'en');

  const onChange = (e: SelectChangeEvent<unknown>) => {
    const locale = e.target.value as string;
    setLang(locale);
    router.replace('/settings', router.asPath, { locale });
  };

  return (
    <Box
      width='100%'
      height='100%'
      maxWidth={(theme) => theme.layout.size.portMaxWidth}
      mx='auto'
    >
      <Typography variant='h1' marginBottom='2rem'>
        {selectLanguage}
      </Typography>
      <Select
        value={lang}
        size='small'
        labelId='select_a_language'
        onChange={onChange}
        fullWidth
      >
        {langs.map(({ id, title, flag }) => (
          <MenuItem key={id} value={id}>
            <Typography
              sx={{
                textAlign: 'start',
                display: 'inline-flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Image
                src={`https://flagcdn.com/w20/${flag.toLowerCase()}.png`}
                alt={`${id}_flag`}
                width={20}
                height={15}
              />
              <Typography component='span' sx={{ ml: '10px' }}>
                {title}
              </Typography>
            </Typography>
          </MenuItem>
        ))}
      </Select>
      <Divider />
    </Box>
  );
};
