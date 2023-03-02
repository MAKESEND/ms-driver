import { Button, styled } from '@mui/material';

import type { CallbackFunction } from '~/types';

export const CancelButton = styled(Button)(({ theme }) => {
  const { grey40, grey80 } = theme.palette.common;
  return {
    flex: 1,
    height: 40,
    border: grey40,
    color: grey80,
  };
});

CancelButton.defaultProps = { variant: 'text' };

export const ConfirmButton = styled(Button)(() => ({ flex: 1, height: 40 }));

ConfirmButton.defaultProps = { variant: 'contained' };

export type CreateBtnProps = {
  BtnAction: string | React.FC<Required<React.PropsWithOnClickCallback>>;
  onClick: CallbackFunction;
};

export const modalButtons = {
  cancelType: {
    create: ({ BtnAction, onClick }: CreateBtnProps) => {
      if (typeof BtnAction === 'string' || !BtnAction)
        return <CancelButton onClick={onClick}>{BtnAction}</CancelButton>;

      return <BtnAction onClick={onClick} />;
    },
  },
  confirmType: {
    create: ({ BtnAction, onClick }: Partial<CreateBtnProps>) => {
      if (BtnAction && onClick) {
        if (typeof BtnAction === 'string')
          return <ConfirmButton onClick={onClick}>{BtnAction}</ConfirmButton>;

        return <BtnAction onClick={onClick} />;
      }

      return null;
    },
  },
};
