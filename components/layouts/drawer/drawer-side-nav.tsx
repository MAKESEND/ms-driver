import { DrawerProps, Theme } from '@mui/material';
import { Drawer, useMediaQuery } from '@mui/material';

export interface DrawerSideNavProps {
  open: boolean;
  onClose: () => void;
}

const DrawerSideNav: React.FC<DrawerSideNavProps> = ({ open, onClose }) => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md')
  );
  const variant: DrawerProps['variant'] = isSmallScreen
    ? 'persistent'
    : 'temporary';

  return (
    <Drawer
      open={open}
      anchor='left'
      variant={variant}
      onClose={onClose}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '& .MuiDrawer-paper': {
          width: (theme) => theme.layout.size.drawerWidth,
        },
      }}
    ></Drawer>
  );
};

export default DrawerSideNav;
