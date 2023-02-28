import { createContext, useContext, useReducer } from 'react';

export enum ScannerTask {
  Scan = 'scan',
  Pickup = 'pickup',
  Dropoff = 'dropoff',
  Sorting = 'sorting',
}

export enum ScannerMode {
  Single = 'single',
  Bulk = 'bulk',
}

export interface ScannedResult {
  text: string;
  scannedAt: number;
}

export enum ConfigKeys {
  Task = 'task',
  Mode = 'mode',
}

export type ScannerStore = {
  isScanning: boolean;
  cameraInUse: string;
  config: {
    [ConfigKeys.Task]: `${ScannerTask}`;
    [ConfigKeys.Mode]: `${ScannerMode}`;
  };
};

export enum ScannerActionTypes {
  OpenScanner = 'OPEN_SCANNER',
  CloseScanner = 'CLOSE_SCANNER',
  SetScannerMode = 'SET_SCANNER_MODE',
  SetScannerTask = 'SET_SCANNER_TASK',
  ChangeCamera = 'CHANGE_CAMERA',
  SetConfig = 'SET_CONFIG',
  ResetScanner = 'RESET_SCANNER',
}

type ScannerToggleAction = {
  type: ScannerActionTypes.CloseScanner | ScannerActionTypes.OpenScanner;
  payload?: never;
};

type ScannerSetModeAction = {
  type: ScannerActionTypes.SetScannerMode;
  payload: `${ScannerMode}`;
};

type ScannerSetTaskAction = {
  type: ScannerActionTypes.SetScannerTask;
  payload: `${ScannerTask}`;
};

type ScannerSetConfigAction = {
  type: ScannerActionTypes.SetConfig;
  payload: ScannerStore['config'];
};

type ScannerResetScannerAction = {
  type: ScannerActionTypes.ResetScanner;
  payload?: never;
};

type ScannerChangeCameraAction = {
  type: ScannerActionTypes.ChangeCamera;
  payload: string;
};

export type ScannerActions =
  | ScannerToggleAction
  | ScannerSetModeAction
  | ScannerSetTaskAction
  | ScannerSetConfigAction
  | ScannerResetScannerAction
  | ScannerChangeCameraAction;

export const ScannerContext = createContext<{
  state: ScannerStore;
  dispatch: React.Dispatch<ScannerActions>;
} | null>(null);

const defaultScanner: ScannerStore = {
  cameraInUse: '',
  isScanning: false,
  config: { task: 'scan', mode: 'single' },
};

const reducer = (state: ScannerStore, { type, payload }: ScannerActions) => {
  switch (type) {
    case ScannerActionTypes.OpenScanner:
      return { ...state, isScanning: true };
    case ScannerActionTypes.CloseScanner:
      return { ...state, isScanning: false };
    case ScannerActionTypes.SetScannerMode:
      return { ...state, config: { ...state.config, mode: payload } };
    case ScannerActionTypes.SetScannerTask:
      return { ...state, config: { ...state.config, task: payload } };
    case ScannerActionTypes.SetConfig:
      return { ...state, config: payload };
    case ScannerActionTypes.ResetScanner:
      return { ...defaultScanner };
    default:
      return state;
  }
};

export const ScannerProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, defaultScanner);

  return (
    <ScannerContext.Provider value={{ state, dispatch }}>
      {children}
    </ScannerContext.Provider>
  );
};

export const useScanner = () => {
  const ctx = useContext(ScannerContext);

  if (!ctx) throw new Error('useScanner can only be used in ScannerProvider');

  return ctx;
};
