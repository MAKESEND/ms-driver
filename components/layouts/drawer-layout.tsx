import { useState } from 'react';
import { Box } from '@mui/material';

import DrawerMain from './drawer/drawer-main';
import DrawerHeader from './drawer/drawer-header';
import DrawerTopNav from './drawer/drawer-top-nav';
import DrawerSideNav from './drawer/drawer-side-nav';

const DrawerLayout: React.FC<
  React.PropsWithChildren<{ fullHeight?: boolean }>
> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);

  const closeDrawer = () => setOpen(false);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <DrawerSideNav open={open} onClose={closeDrawer} />
      <DrawerTopNav open={open} toggleDrawer={setOpen} />
      <DrawerMain open={open}>
        <DrawerHeader />
        {children}
      </DrawerMain>
    </Box>
  );
};

export default DrawerLayout;
