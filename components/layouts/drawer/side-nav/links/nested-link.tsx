import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

import type { Link } from '~/constants/sideNavLink';
import { SingleLink } from './single-link';
import { LinkIcons } from './link-icons';

import dynamic from 'next/dynamic';
const ExpandLess = dynamic(() => import('@mui/icons-material/ExpandLess'));
const ExpandMore = dynamic(() => import('@mui/icons-material/ExpandMore'));

export interface NestedLinkProps {
  id: string;
  links?: Link[];
}

export const NestedLink: React.FC<NestedLinkProps> = ({ links, id: group }) => {
  const { t } = useTranslation('common');
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItemButton onClick={() => setOpen((val) => !val)}>
        <ListItemIcon>{LinkIcons[group]}</ListItemIcon>
        <ListItemText>
          <Typography sx={{ textAlign: 'left' }}>
            {t(`links.${group}.id`)}
          </Typography>
        </ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout='auto'>
        <List sx={{ pl: 1 }}>
          {links?.map(({ id, links, ...props }) => {
            if (links) return <NestedLink key={id} links={links} id={id} />;
            return <SingleLink key={id} id={id} group={group} {...props} />;
          })}
        </List>
      </Collapse>
    </>
  );
};

export default NestedLink;
