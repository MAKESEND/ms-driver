import { IconButton } from '@mui/material';
import { QrReader, type QrReaderProps } from 'react-qr-reader';

import { getContentType } from '~/utils/get-content-type';

import { ToastActionTypes, useToast } from '~/providers/toast-provider';
import {
  useScanner,
  ScannerActionTypes,
  ScannerMode,
} from '~/providers/scanner-provider';

import dynamic from 'next/dynamic';

const HighlightOffIcon = dynamic(
  () => import('@mui/icons-material/HighlightOff')
);

export const QRReader: React.FC = () => {
  const {
    state: { deviceId, config },
    dispatch,
    scannedResultRef,
  } = useScanner();

  const { dispatch: handleToast } = useToast();

  const videoConstraints = deviceId
    ? { deviceId: { exact: deviceId } }
    : { facingMode: 'environment' };

  const onScannedResult: QrReaderProps['onResult'] = (result, error) => {
    if (result) {
      const text = result.getText();
      const type = getContentType(text);
      const scannedResult = { text, type, scannedAt: Date.now() };

      // TODO: business cases after scanning on each task and mode
      if (config.mode === ScannerMode.Single) {
        scannedResultRef.current = [scannedResult];
        dispatch({ type: ScannerActionTypes.CloseScanner });
      } else if (config.mode === ScannerMode.Bulk) {
        if (!scannedResultRef.current.map((item) => item.text).includes(text)) {
          scannedResultRef.current = [
            scannedResult,
            ...scannedResultRef.current,
          ];
        }
      }

      handleToast({
        type: ToastActionTypes.OpenToast,
        payload: {
          closeIn: 3000,
          icon: false,
          content: `Scanned ${text}`,
        },
      });
    }

    // error will be an empty object {}
    // when scanner got nothing during the interval
    if (error && !Object.keys(error).length) {
      // TODO: handle error
      handleToast({
        type: ToastActionTypes.OpenToast,
        payload: {
          content: error?.message || 'something went wrong',
        },
      });
    }
  };

  return (
    <QrReader
      videoId='qr-scanner'
      onResult={onScannedResult}
      scanDelay={500} // 0.5s
      constraints={{ aspectRatio: 1, ...videoConstraints }}
      ViewFinder={ScannerCloseBtn}
    />
  );
};

export const ScannerCloseBtn: React.FC = () => {
  const { dispatch } = useScanner();
  const onClose = () => dispatch({ type: ScannerActionTypes.CloseScanner });

  return (
    <IconButton
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
      }}
      onClick={onClose}
    >
      <HighlightOffIcon sx={{ color: (theme) => theme.palette.common.white }} />
    </IconButton>
  );
};
