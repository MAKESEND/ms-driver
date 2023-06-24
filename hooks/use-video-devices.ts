import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { deviceState } from '~/store/scanner';

export const getDevices = async (
  setter: React.Dispatch<React.SetStateAction<MediaDeviceInfo[]>>
) => {
  if (navigator && navigator.mediaDevices?.enumerateDevices) {
    setter(
      (await navigator.mediaDevices?.enumerateDevices()).filter(
        ({ kind }) => kind === 'videoinput'
      )
    );
  }
};

export const useVideoDevices = () => {
  const [devices, setDevices] = useRecoilState(deviceState);

  useEffect(() => {
    getDevices(setDevices);
  }, [setDevices]);

  return devices;
};
