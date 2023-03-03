import { useState } from 'react';

import {
  Badge,
  Divider,
  IconButton,
  Menu,
  type MenuProps,
} from '@mui/material';

import { NotificationHeader } from './notification-update/notification-header';
import {
  UpdateItem,
  type UpdateItemProps,
} from './notification-update/update-item';

import dynamic from 'next/dynamic';
const NotificationsIcon = dynamic(
  () => import('@mui/icons-material/Notifications')
);

const menuProps: {
  anchorOrigin: MenuProps['anchorOrigin'];
  transformOrigin: MenuProps['transformOrigin'];
} = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
  transformOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
};

export const Notification: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // TODO: remove mock notification updates
  const updates: UpdateItemProps[] = [];

  const onOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton aria-label='notification' color='inherit' onClick={onOpen}>
        <Badge badgeContent={updates.length} color='error'>
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu {...menuProps} open={open} onClose={onClose} anchorEl={anchorEl}>
        <NotificationHeader allRead={false} />
        <Divider />
        {updates.map((update) => (
          <UpdateItem key={update.id} {...update} />
        ))}
      </Menu>
    </>
  );
};
