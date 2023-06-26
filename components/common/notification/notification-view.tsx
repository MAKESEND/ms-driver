import { useState } from 'react';
import {
  Box,
  Badge,
  Divider,
  IconButton,
  Menu,
  type MenuProps,
} from '@mui/material';

import { NotificationHeader } from './notification-header';
import { UpdateItem, type UpdateItemProps } from './update-item';

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

export const NotificationView: React.FC<
  React.PropsWithChildren<{ updates: UpdateItemProps[] }>
> = ({ children, updates }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const Icon = children ?? <NotificationsIcon />;
  const badgeCount = updates.filter(({ isRead }) => !isRead).length;

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
        <Badge badgeContent={badgeCount} color='error'>
          {Icon}
        </Badge>
      </IconButton>
      <Menu {...menuProps} open={open} onClose={onClose} anchorEl={anchorEl}>
        <NotificationHeader />
        <Divider />
        <Box sx={{ maxHeight: '70dvh' }}>
          {updates.map((update) => (
            <UpdateItem key={update.id} {...update} />
          ))}
        </Box>
      </Menu>
    </>
  );
};
