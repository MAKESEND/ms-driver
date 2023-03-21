import { useState } from 'react';
import { Box } from '@mui/material';

import dynamic from 'next/dynamic';
const DrawerHeader = dynamic(() => import('./drawer/drawer-header'));
const DrawerTopNav = dynamic(() => import('./drawer/drawer-top-nav'));
const DrawerSideNav = dynamic(() => import('./drawer/drawer-side-nav'));
const DrawerMain = dynamic(() => import('./drawer/drawer-main'));

const DrawerLayout: React.FC<
  React.PropsWithChildren<{ fullHeight?: boolean }>
> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);

  const closeDrawer = () => setOpen(false);

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100dvh',
        ['@supports not (height: 100dvh)']: { height: '100vh' },
      }}
    >
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
