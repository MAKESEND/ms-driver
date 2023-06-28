import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { type ScannerStore } from '~/providers/scanner-provider';

const { persistAtom } = recoilPersist();

export const deviceState = atom<MediaDeviceInfo[]>({
  key: 'devices',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const scannerConfigState = atom<ScannerStore['config']>({
  key: 'camera_config',
  default: {
    mode: 'single',
    task: 'scan',
  },
});

export const resultOpenState = atom<boolean>({
  key: 'scanner_result_btn',
  default: false,
});

export const scannedParcelIds = atom<string[]>({
  key: 'scanned_parcel_ids',
  default: [],
});
