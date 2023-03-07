import { useTranslation } from 'next-i18next';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { TaskTypes } from '~/constants/tasks';

import {
  ConfigKeys,
  ScannerMode,
  ScannerActionTypes,
  ScannerStore,
  useScanner,
} from '~/providers/scanner-provider';

const dispatchTypeMapper = {
  [ConfigKeys.Mode]: ScannerActionTypes.SetScannerMode,
  [ConfigKeys.Task]: ScannerActionTypes.SetScannerTask,
};

const configOptionMapper = {
  [ConfigKeys.Mode]: Object.values(ScannerMode),
  [ConfigKeys.Task]: Object.values(TaskTypes),
};

interface ScannerSelectProps {
  configType: keyof ScannerStore['config'];
}

export const ScannerConfigSelect: React.FC<ScannerSelectProps> = ({
  configType,
}) => {
  const { t } = useTranslation('scanner');
  const labelText = t(`select.${configType}.label`);
  const optionText = (option: string) => t(`select.${configType}.${option}`);

  const { state, dispatch } = useScanner();

  return (
    <FormControl fullWidth>
      <InputLabel>{labelText}</InputLabel>
      <Select
        label={labelText}
        size='small'
        value={state.config[configType]}
        onChange={(e) =>
          dispatch({
            type: dispatchTypeMapper[configType],
            payload: e.target.value as any,
          })
        }
      >
        {configOptionMapper[configType].map((option) => (
          <MenuItem key={option} value={option}>
            {optionText(option)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
