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
