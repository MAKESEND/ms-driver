import { Stack, styled } from '@mui/material';

export interface DrawerMainProps {
  open?: boolean;
}

const DrawerMain = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'open',
})<DrawerMainProps>(({ theme, open = false }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  position: 'relative',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    [theme.breakpoints.up('xs')]: {
      marginLeft: 0,
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.layout.size.drawerWidth,
    },
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default DrawerMain;
