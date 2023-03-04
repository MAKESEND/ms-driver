import { ImageProps as ImageLegacyProps } from 'next/legacy/image';
export enum InAppImages {
  MSLogo = 'MSLogo',
  FAQ = 'FAQ',
}

export type ImageList = {
  // [key in InAppImages]: React.HTMLProps<HTMLImageElement>;
  [key in InAppImages]: ImageLegacyProps;
};

export const inAppImages: ImageList = {
  [InAppImages.MSLogo]: {
    src: '/imgs/ms_logo/makesend_logo.png',
    alt: 'ms_logo',
    width: 448,
    height: 114,
  },
  [InAppImages.FAQ]: {
    src: '/imgs/faq_primary_blue.svg',
    alt: 'faq',
    width: 250,
    height: 250,
    layout: 'intrinsic',
  },
};
