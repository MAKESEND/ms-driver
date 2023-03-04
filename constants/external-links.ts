export enum ExternalLinks {
  MAKESEND_HOME = 'MAKESEND_HOME',
  GOOGLE_MAPS = 'GOOGLE_MAPS',
}

export type ExternalLinkList = {
  [key in ExternalLinks]: React.HTMLProps<HTMLAnchorElement>;
};

export const externalLinks: ExternalLinkList = {
  [ExternalLinks.MAKESEND_HOME]: {
    href: 'https://makesend.asia',
    target: '_blank',
    rel: 'noreferrer',
  },
  [ExternalLinks.GOOGLE_MAPS]: {
    href: 'https://www.google.com/maps/dir',
    target: '_blank',
    rel: 'noreferrer',
  },
};
