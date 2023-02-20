import { useState, useEffect } from 'react';
import ReactLottie from 'react-lottie-player';
import { styled } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';

import type yellowDelivery from './yellow-delivery.json';

const Lottie = styled(ReactLottie)(() => ({}));

export interface DeliveryLoaderProps {
  sx?: SxProps<Theme>;
}

export const DeliveryLoader: React.FC<DeliveryLoaderProps> = ({ sx }) => {
  const [animationData, setAnimationData] = useState<
    typeof yellowDelivery | null
  >(null);

  useEffect(() => {
    import('./yellow-delivery.json').then(setAnimationData);

    return () => setAnimationData(null);
  }, []);

  if (!animationData) return null;

  return (
    <Lottie
      loop
      play
      animationData={animationData}
      sx={{ width: '300px', height: '300px', ...sx }}
    />
  );
};

export default DeliveryLoader;
