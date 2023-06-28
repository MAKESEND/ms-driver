import {
  AppBar as MuiAppBar,
  Box,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { Notification } from '~/components/common/notification';

export interface AppBarProps {
  open?: boolean;
  isMobile?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isMobile',
})<AppBarProps>(({ theme, open = false }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${theme.layout.size.drawerWidth}px)`,
    },
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

import dynamic from 'next/dynamic';
const MenuIcon = dynamic(() => import('@mui/icons-material/Menu'));

export const AppTitle: React.FC = () => {
  const { asPath } = useRouter();
  const { t } = useTranslation('common');

  // TODO: improve header naming template
  const route = asPath.split('?')[0].split('/').slice(-1)[0];

  return (
    <Typography variant='h1'>
      {t(`links.${route}`, { defaultValue: null }) || route}
    </Typography>
  );
};

export const DrawerTopNav: React.FC<{
  open: boolean;
  toggleDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, toggleDrawer }) => {
  return (
    <AppBar position='fixed' elevation={0} open={open}>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={() => toggleDrawer((val) => !val)}
          edge='start'
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <AppTitle />
        <Box flexGrow={1} />
        <Notification />
      </Toolbar>
    </AppBar>
  );
};

export default DrawerTopNav;
