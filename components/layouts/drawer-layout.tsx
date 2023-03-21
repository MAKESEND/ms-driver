import { useState } from 'react';

import dynamic from 'next/dynamic';
const DrawerMain = dynamic(() => import('./drawer/drawer-main'));
const DrawerHeader = dynamic(() => import('./drawer/drawer-header'));
const DrawerTopNav = dynamic(() => import('./drawer/drawer-top-nav'));
const DrawerSideNav = dynamic(() => import('./drawer/drawer-side-nav'));
const FullScreenWrapper = dynamic(() => import('./full-screen-wrapper'));

const DrawerLayout: React.FC<
  React.PropsWithChildren<{ fullHeight?: boolean }>
> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);

  const closeDrawer = () => setOpen(false);

  return (
    <FullScreenWrapper>
      <DrawerSideNav open={open} onClose={closeDrawer} />
      <DrawerTopNav open={open} toggleDrawer={setOpen} />
      <DrawerMain open={open}>
        <DrawerHeader />
        {children}
      </DrawerMain>
    </FullScreenWrapper>
  );
};

export default DrawerLayout;
