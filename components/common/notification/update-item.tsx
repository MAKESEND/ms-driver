import Link from 'next/link';

import { Avatar, MenuItem, Stack, Typography } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

import { useUpdates } from '~/providers/updates-provider';
import { NotificationTypes } from '~/constants/notification';
import { ModalActionTypes, useModal } from '~/providers/modal-provider';

export interface UpdateItemProps {
  id: string | number;
  href?: string;
  title?: string;
  content?: string;
  imgSrc?: string;
  isRead?: boolean;
  updateType?: NotificationTypes;
}

export const UpdateItem: React.FC<UpdateItemProps> = ({
  id,
  imgSrc,
  title,
  content,
  href,
  isRead = false,
  updateType,
}) => {
  const [, setUpdates] = useUpdates();
  const { dispatch: handleModal } = useModal();

  const Image = imgSrc ? (
    <Avatar src={imgSrc} alt={content} variant='rounded' />
  ) : null;

  const onClick = () => {
    // set message as read
    setUpdates((prevUpdates) =>
      prevUpdates.map((update) => ({
        ...update,
        isRead: update.id === id ? true : !!update.isRead,
      }))
    );

    if (updateType === NotificationTypes.UPDATE) {
      handleModal({
        type: ModalActionTypes.OpenModal,
        payload: {
          title,
          content,
        },
      });
    }
  };

  return (
    <MenuItem onClick={onClick} sx={{ gap: 1 }}>
      {Image}
      <Stack
        flexGrow={1}
        sx={{
          color: (theme) =>
            isRead ? theme.palette.common.lightGrey : 'inherit',
        }}
      >
        <Typography
          variant='body1'
          textAlign='start'
          sx={{
            ['&:first-letter']: {
              textTransform: 'capitalize',
            },
          }}
        >
          {title}
        </Typography>
        <Typography
          variant='body2'
          textAlign='start'
          sx={{
            flexGrow: 1,
            whiteSpace: 'pre-line',
            wordBreak: 'break-word',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: '2',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {content}
        </Typography>
      </Stack>
      {href && (
        <Link href={href} legacyBehavior passHref>
          <LaunchIcon color='action' />
        </Link>
      )}
    </MenuItem>
  );
};
