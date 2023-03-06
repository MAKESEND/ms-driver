import { useState, useEffect } from 'react';
import { styled, Card, CircularProgress, IconButton } from '@mui/material';

import type { CallbackFunction } from '~/types';
import { blobToBase64 } from '~/utils/img-processor';

import { SquareBox } from '~/components/common/layout/square-box';

import dynamic from 'next/dynamic';
const CloseIcon = dynamic(() => import('@mui/icons-material/Close'));

const Image = styled('img')(() => ({
  width: '100%',
  height: 'auto',
  aspectRatio: '1.33',
  objectFit: 'contain',
}));

export interface ImageThumbProps {
  image: File;
  index?: number;
  setImages: CallbackFunction;
  width?: string;
  height?: string;
}

export const ImageThumb: React.FC<ImageThumbProps> = ({
  image,
  setImages,
  index = 0,
  width = '7rem',
  height = '7rem',
}) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const Img = isLoading ? (
    <CircularProgress />
  ) : (
    <Image src={imgSrc} alt={image.name} />
  );

  useEffect(() => {
    const readAsBase64 = async (image: File) => {
      setIsLoading(true);
      const serializedImg = await blobToBase64(image);
      setImgSrc(serializedImg);
    };

    readAsBase64(image).finally(() => setIsLoading(false));
  }, [image]);

  const onRemoveImg = () =>
    setImages &&
    setImages((list: File[]) => {
      const imgList = [...list];
      imgList.splice(index, 1);
      return imgList;
    });

  return (
    <SquareBox sx={{ position: 'relative' }}>
      <Card
        sx={{
          width,
          height,
          mx: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {Img}
      </Card>
      <IconButton
        onClick={onRemoveImg}
        sx={{
          position: 'absolute',
          top: -10,
          right: 10,
        }}
      >
        <CloseIcon />
      </IconButton>
    </SquareBox>
  );
};

export default ImageThumb;
