import { DrawerProps, Theme, useMediaQuery } from '@mui/material';
import { Drawer } from '@mui/material';

export interface DrawerSideNavProps {
  open: boolean;
  onClose: () => void;
}

const DrawerSideNav: React.FC<DrawerSideNavProps> = ({ open, onClose }) => {
  const isLargeScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );
  const variant: DrawerProps['variant'] = isLargeScreen
    ? 'temporary'
    : 'persistent';

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
