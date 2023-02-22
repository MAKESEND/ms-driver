import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Typography,
} from '@mui/material';

import LinkIcons from './link-icons';

export interface SingleLinkProps {
  id: string;
  group?: string;
  href?: string;
  onPath?: string;
  disabled?: boolean;
}

export const SingleLink: React.FC<SingleLinkProps> = ({
  id,
  group,
  href = '/',
  onPath,
  disabled = false,
}) => {
  const { t } = useTranslation('common');

  return (
    <ListItem disableGutters>
      <Link href={href} passHref legacyBehavior>
        <ListItemButton selected={id === onPath} disabled={disabled}>
          <ListItemIcon>{LinkIcons[id]}</ListItemIcon>
          <ListItemText>
            <Typography sx={{ textAlign: 'left' }}>
              {t(`links${group ? `.${group}` : ''}.${id}`)}
            </Typography>
          </ListItemText>
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default SingleLink;
