import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material';
import { signOut } from 'next-auth/react';

import dynamic from 'next/dynamic';
const ExitIcon = dynamic(() => import('@mui/icons-material/ExitToAppOutlined'));

export interface SideNavLogoutProps {
  logoutBtnText?: string | null;
}

export const SideNavLogout: React.FC<SideNavLogoutProps> = ({
  logoutBtnText = 'Logout',
}) => {
  const onLogout = () => signOut();

  return (
    <ListItem aria-label='logout-button'>
      <ListItemButton onClick={onLogout}>
        <ListItemText>
          <Typography>{logoutBtnText}</Typography>
        </ListItemText>
        <ListItemIcon sx={{ justifyContent: 'center' }}>
          <ExitIcon />
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
};

export default SideNavLogout;
