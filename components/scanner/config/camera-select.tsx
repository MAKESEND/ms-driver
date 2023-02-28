import { useTranslation } from 'next-i18next';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material';

import { useScanner, ScannerActionTypes } from '~/providers/scanner-provider';
import { useVideoDevices } from '~/hooks/useVideoDevices';

export const CameraSelect: React.FC = () => {
  const { t } = useTranslation('scanner');
  const labelText = t(`select.camera.label`);

  const devices = useVideoDevices();
  const { state, dispatch } = useScanner();

  /**
   * // TODO: handle UI before user authorization to camera
   * devices array lists all camera(s) of the device
   * 'label' and 'deviceId' are given only after user authorize camera usage.
   */

  const onChangeCamera = (e: SelectChangeEvent) => {
    dispatch({
      type: ScannerActionTypes.ChangeCamera,
      payload: e.target.value,
    });
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{labelText}</InputLabel>
      <Select
        size='small'
        label={labelText}
        value={state.cameraInUse}
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
