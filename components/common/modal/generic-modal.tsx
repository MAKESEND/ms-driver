import { Fragment } from 'react';
import { useTranslation } from 'next-i18next';
import { Modal as MuiModal, Stack, Typography } from '@mui/material';

import { useModal, ModalActionTypes } from '~/providers/modal-provider';

import { ModalLayout } from '~/components/layouts/modal-layout';
import { modalButtons } from '~/components/common/modal/buttons';

export const Modal: React.FC = ({}) => {
  const { t } = useTranslation('common');
  const cancelBtnText = t('btn.cancel');

  const {
    state: { show, modalProps },
    dispatch,
  } = useModal();

  if (!modalProps) return null;

  const hideModal = () => dispatch({ type: ModalActionTypes.CloseModal });

  const Header =
    modalProps.header ??
    (modalProps.title && (
      <Typography
        variant='h2'
        sx={{ my: 1, ['&:first-letter']: { textTransform: 'capitalize' } }}
      >
        {modalProps.title}
      </Typography>
    ));

  const Content = modalProps.content;
  const Body =
    typeof Content === 'string' ? <Typography>{Content}</Typography> : Content;

  const CancelBtn = modalButtons.cancelType.create({
    BtnAction: modalProps.cancelBtn || cancelBtnText,
    onClick: modalProps.onCancel ?? hideModal,
  });

  const ConfirmBtn = modalButtons.confirmType.create({
    BtnAction: modalProps.confirmBtn,
    onClick: modalProps.onConfirm,
  });

  return (
    <MuiModal open={show} {...(modalProps.canEscape && { onClose: hideModal })}>
      <Fragment>
        <ModalLayout>
          <Stack gap={1}>{Header}</Stack>
          {Body}
          <Stack sx={{ flex: 1, height: 40, flexDirection: 'row' }}>
            {CancelBtn}
            {ConfirmBtn}
          </Stack>
        </ModalLayout>
      </Fragment>
    </MuiModal>
  );
};
