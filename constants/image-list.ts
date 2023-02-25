export enum InAppImages {
  MS_LOGO,
}

export type ImageList = {
  [key in InAppImages]: React.HTMLProps<HTMLImageElement>;
};

export const inAppImages: ImageList = {
  [InAppImages.MS_LOGO]: {
    src: '/imgs/ms_logo/makesend_logo.png',
    alt: 'ms_logo',
    width: 448,
    height: 114,
  },
};
