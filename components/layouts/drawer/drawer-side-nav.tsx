import { useTranslation } from 'next-i18next';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import type { DrawerProps, Theme } from '@mui/material';

import SideNavHeader from './side-nav/side-nav-header';
import SideNavLinkList from './side-nav/side-nav-link-list';
import { SideNavLogout } from './side-nav/side-nav-logout';
import FlexSpacer from '~/components/common/layout/flex-spacer';

export interface DrawerSideNavProps {
  open: boolean;
  onClose: () => void;
}

const DrawerSideNav: React.FC<DrawerSideNavProps> = ({ open, onClose }) => {
  const { t } = useTranslation('common');
  const sideNavHeaderPlaceholder = t('sideNav.makesend') ?? 'MAKESEND';
  const logoutBtnText = t('sideNav.btn.logout') ?? 'Logout';

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
    >
      <SideNavHeader placeholder={sideNavHeaderPlaceholder} />
      <Divider sx={{ mt: 0 }} />
      <SideNavLinkList />
      <FlexSpacer />
      <Divider />
      <SideNavLogout logoutBtnText={logoutBtnText} />
    </Drawer>
  );
};

export default DrawerSideNav;
