import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material';

import dynamic from 'next/dynamic';
const ExitIcon = dynamic(() => import('@mui/icons-material/ExitToAppOutlined'));

export interface SideNavSignoutProps {
  signoutBtnText?: string | null;
}

export const SideNavSignout: React.FC<SideNavSignoutProps> = ({
  signoutBtnText = 'Signout',
}) => {
  // TODO: sign out onClick callback
  return (
    <ListItem button aria-label='logout-button'>
      <ListItemText>
        <Typography>{signoutBtnText}</Typography>
      </ListItemText>
      <ListItemIcon sx={{ justifyContent: 'center' }}>
        <ExitIcon />
      </ListItemIcon>
    </ListItem>
  );
};

export default SideNavSignout;
