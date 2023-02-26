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

import type { CustomLink } from '~/constants/side-nav-links';
import { SingleLink } from './single-link';
import { LinkIcons } from './link-icons';

import dynamic from 'next/dynamic';
const ExpandLess = dynamic(() => import('@mui/icons-material/ExpandLess'));
const ExpandMore = dynamic(() => import('@mui/icons-material/ExpandMore'));

export interface NestedLinkProps extends CustomLink {
  parentLink: `/${string}`;
  onPath: string;
}

export const NestedLink: React.FC<NestedLinkProps> = ({
  id,
  parentLink,
  onPath,
  nested,
}) => {
  const { t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const linkText = t(`links.${id}`) ?? id;

  return (
    <>
      <ListItemButton onClick={() => setOpen((val) => !val)}>
        <ListItemIcon>{LinkIcons[id]}</ListItemIcon>
        <ListItemText>
          <Typography sx={{ textAlign: 'left' }}>{linkText}</Typography>
        </ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout='auto'>
        <List sx={{ pl: 1 }}>
          {Object.values(nested ?? {}).map(({ id, nested, ...props }) => {
            if (nested)
              return (
                <NestedLink
                  key={id}
                  id={id}
                  parentLink={`${parentLink ?? ''}/${id}`}
                  nested={nested}
                  onPath={onPath}
                  {...props}
                />
              );
            return (
              <SingleLink
                key={id}
                id={id}
                onPath={onPath}
                parentLink={parentLink}
                {...props}
              />
            );
          })}
        </List>
      </Collapse>
    </>
  );
};

export default NestedLink;
