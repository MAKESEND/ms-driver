import { Card, IconButton } from '@mui/material';

import type { CallbackFunction } from '~/types';
import { SquareBox } from '~/components/common/layout/square-box';

import dynamic from 'next/dynamic';
const AddIcon = dynamic(() => import('@mui/icons-material/Add'));

export interface IAddImageProps {
  onClick: CallbackFunction;
  width?: string;
  height?: string;
}

export const AddImage: React.FC<IAddImageProps> = ({
  onClick,
  width = '7rem',
  height = '7rem',
}) => {
  return (
    <SquareBox>
      <Card sx={{ width, height, mx: 'auto' }}>
        <IconButton sx={{ width: '100%', height: '100%' }} onClick={onClick}>
          <AddIcon />
        </IconButton>
      </Card>
    </SquareBox>
  );
};

export default AddImage;
