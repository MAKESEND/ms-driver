import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const deviceState = atom<MediaDeviceInfo[]>({
  key: 'devices',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
