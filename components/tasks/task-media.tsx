import { useTranslation } from 'next-i18next';
import { useDropzone } from 'react-dropzone';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Typography,
} from '@mui/material';

import {
  usePickupOrderState,
  PickupOrderStateActionTypes,
} from '~/providers/pickup-order-state-provider';

import { AddImage } from '~/components/common/img-preview/add-image';
import { ImageThumb } from '~/components/common/img-preview/image-thumb';
import { ImageUploadPlaceholder } from '~/components/common/img-preview/image-upload-placeholder';

import dynamic from 'next/dynamic';
const ExpandMoreIcon = dynamic(() => import('@mui/icons-material/ExpandMore'));

export interface TaskMediaProps {
  disabled?: boolean;
  maxImgs?: number;
}

export const TaskMedia: React.FC<TaskMediaProps> = ({
  disabled = false,
  maxImgs = 3,
}) => {
  const {
    state: { images },
    dispatch,
  } = usePickupOrderState();
  const setImages = (fn: Function) =>
    dispatch({
      type: PickupOrderStateActionTypes.SetImages,
      payload: fn(images),
    });

  const { t } = useTranslation('tasks');
  const imageSummary = `${t('title.uploadPhotos')} ${images.length}`;

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: { 'image/*': ['.png', '.jpeg'] },
    noClick: true,
    maxFiles: maxImgs,
    onDrop: (files) => {
      if (images.length < maxImgs) {
        const slicer = maxImgs - images.length;
        setImages((list: File[]) => [...list, ...files.slice(0, slicer)]);
      }
    },
    disabled,
  });

  const UploadImg = !images.length ? (
    <ImageUploadPlaceholder onClick={open} />
  ) : (
    <Grid container width='100%' rowGap={2}>
      {images.map((image, index) => (
        <Grid item xs={6} sm={4} key={image.lastModified + index}>
          <ImageThumb
            disabled={disabled}
            image={image}
            index={index}
            setImages={setImages}
          />
        </Grid>
      ))}
      {images.length < maxImgs && (
        <Grid item xs={5} sm={3}>
          <AddImage onClick={open} />
        </Grid>
      )}
    </Grid>
  );

  return (
    <Accordion defaultExpanded disabled={disabled} sx={{ width: '100%' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{imageSummary}</Typography>
      </AccordionSummary>
      <AccordionDetails {...getRootProps()}>
        <input {...getInputProps()} />
        {UploadImg}
      </AccordionDetails>
    </Accordion>
  );
};
