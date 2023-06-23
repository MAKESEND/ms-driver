import { useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material';

import { useScanner, ScannerActionTypes } from '~/providers/scanner-provider';
import { useVideoDevices } from '~/hooks/use-video-devices';

export const CameraSelect: React.FC = () => {
  const { t } = useTranslation('scanner');
  const labelText = t(`select.camera.label`);

  const timerRef = useRef<NodeJS.Timeout>();
  const devices = useVideoDevices();
  const { state, dispatch } = useScanner();

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  /**
   * // TODO: handle UI before user authorization to camera
   * devices array lists all camera(s) of the device
   * 'label' and 'deviceId' are given only after user authorize camera usage.
   */

  const onChangeCamera = (e: SelectChangeEvent) => {
    dispatch({ type: ScannerActionTypes.CloseScanner });

    dispatch({
      type: ScannerActionTypes.ChangeCamera,
      payload: e.target.value,
    });

    timerRef.current = setTimeout(() => {
      dispatch({ type: ScannerActionTypes.OpenScanner });
    }, 0);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{labelText}</InputLabel>
      <Select
        size='small'
        label={labelText}
        value={state.deviceId}
        onChange={onChangeCamera}
        disabled={!devices.length}
      >
        {devices.map(({ deviceId, label }) => (
          <MenuItem key={deviceId} value={deviceId}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
