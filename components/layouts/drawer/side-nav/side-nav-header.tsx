import Image from 'next/image';
import { Stack, styled, Typography, useTheme } from '@mui/material';

const AppLogo = styled(Typography)(() => ({
  fontSize: '2rem',
  fontWeight: 600,
  textAlign: 'center',
}));

export interface SideNavHeaderProps {
  placeholder?: string | null;
  imgSrc?: string;
}

const SideNavHeader: React.FC<SideNavHeaderProps> = ({
  placeholder = 'MAKESEND',
  imgSrc,
}) => {
  const theme = useTheme();
  const width = theme.layout.size.drawerWidth;

  return (
    <Stack
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        height: { xs: '56px', sm: '64px' },
      }}
    >
      {imgSrc ? (
        <Image height={48} width={width} src={imgSrc} alt='ms_logo' />
      ) : (
        <AppLogo variant='h1'>{placeholder}</AppLogo>
      )}
    </Stack>
  );
};

export default SideNavHeader;
