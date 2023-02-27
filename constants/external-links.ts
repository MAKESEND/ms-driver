export enum ExternalLinks {
  MAKESEND_HOME = 'MAKESEND_HOME',
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
};
