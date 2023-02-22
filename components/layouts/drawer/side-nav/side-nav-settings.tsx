import Link from 'next/link';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Typography,
} from '@mui/material';

import dynamic from 'next/dynamic';
const SettingsIcon = dynamic(
  () => import('@mui/icons-material/SettingsOutlined')
);

export interface SideNavSettingsProps {
  settingsText?: string | null;
  selected?: boolean;
}

export const SideNavSettings: React.FC<SideNavSettingsProps> = ({
  settingsText = 'Settings',
  selected = false,
}) => {
  return (
    <ListItem disableGutters>
      <Link href='/settings' passHref legacyBehavior>
        <ListItemButton selected={selected}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography sx={{ textAlign: 'left' }}>{settingsText}</Typography>
          </ListItemText>
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default SideNavSettings;
