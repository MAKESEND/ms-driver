import { useTranslation } from 'next-i18next';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import type { DrawerProps, Theme } from '@mui/material';

import SideNavHeader from './side-nav/side-nav-header';
import SideNavLinkList from './side-nav/side-nav-link-list';
import SideNavSignout from './side-nav/side-nav-signout';
import FlexSpacer from '~/components/common/flex-spacer';

export interface DrawerSideNavProps {
  open: boolean;
  onClose: () => void;
}

const DrawerSideNav: React.FC<DrawerSideNavProps> = ({ open, onClose }) => {
  const { t } = useTranslation('common');
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
      <SideNavHeader placeholder={t('sideNav.makesend')} />
      <Divider sx={{ mt: 0 }} />
      <SideNavLinkList />
      <FlexSpacer />
      <Divider />
      <SideNavSignout signoutBtnText={t('sideNav.btn.signout')} />
    </Drawer>
  );
};

export default DrawerSideNav;
