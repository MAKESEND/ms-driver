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
import type { CustomLink } from '~/constants/side-nav-links';

export interface SingleLinkProps extends CustomLink {
  onPath: string;
  parentLink?: `/${string}`;
  disabled?: boolean;
}

export const SingleLink: React.FC<SingleLinkProps> = ({
  id,
  href = '/',
  onPath,
  parentLink,
  disabled = false,
}) => {
  const { t } = useTranslation('common');
  const linkText = t(`links.${id}`) ?? id;

  return (
    <ListItem disableGutters>
      <Link href={`${parentLink ?? ''}${href}`} passHref legacyBehavior>
        <ListItemButton selected={id === onPath} disabled={disabled}>
          <ListItemIcon>{LinkIcons[id]}</ListItemIcon>
          <ListItemText>
            <Typography sx={{ textAlign: 'left' }}>{linkText}</Typography>
          </ListItemText>
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default SingleLink;
