import { useState } from 'react';
import { useRouter } from 'next/router';
import { Avatar, MenuItem, Typography } from '@mui/material';

export interface UpdateItemProps {
  id: string | number;
  href?: string;
  message?: string;
  imgSrc?: string;
  isRead?: boolean;
}

export const UpdateItem: React.FC<UpdateItemProps> = ({
  imgSrc,
  message,
  href,
  isRead = false,
}) => {
  const router = useRouter();
  const [read, setRead] = useState<boolean>(isRead);

  const Image = imgSrc ? (
    <Avatar src={imgSrc} alt={message} variant='rounded' />
  ) : null;

  const disabled = read && !href;

  // TODO: handle onClick callback
  const onClick = () => {
    setRead(true);

    if (href) {
      router.push(href);
    }
  };

  return (
    <MenuItem disabled={disabled} onClick={onClick}>
      {Image}
      <Typography
        flexGrow={1}
        textAlign='start'
        sx={{ ...(imgSrc && { ml: 2 }) }}
      >
        {message}
      </Typography>
    </MenuItem>
  );
};
