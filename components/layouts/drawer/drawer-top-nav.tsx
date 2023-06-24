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

import { NotificationController } from '~/components/common/notification-controller';

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
  const { t } = useTranslation('common');
  const { asPath } = useRouter();
  const route = asPath.split('/').slice(-1)[0];

  return <Typography variant='h1'>{t(`links.${route}`)}</Typography>;
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
        <NotificationController />
      </Toolbar>
    </AppBar>
  );
};

export default DrawerTopNav;
