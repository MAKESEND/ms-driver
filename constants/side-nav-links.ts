import { InAppLinks } from './enums';

export type CustomLink = {
  id: string;
  label: string;
  href?: string;
  disabled?: boolean;
  nested?: CustomLinkList;
};

export type CustomLinkList = {
  [key in InAppLinks]?: CustomLink;
};

export const inAppLinks: CustomLinkList = {
  [InAppLinks.DASHBOARD]: {
    id: 'dashboard',
    label: 'dashboard',
    href: '/dashboard',
    disabled: false,
  },
  [InAppLinks.SORTING]: {
    id: 'sorting',
    label: 'sorting',
    href: '/sorting',
    disabled: false,
  },
  [InAppLinks.TASKS]: {
    id: 'tasks',
    label: 'tasks',
    href: '/tasks',
    nested: {
      [InAppLinks.PICKUP]: {
        id: 'pickup',
        label: 'pickup',
        href: '/pickup',
        disabled: false,
      },
      [InAppLinks.DROPOFF]: {
        id: 'dropoff',
        label: 'dropoff',
        href: '/dropoff',
        disabled: false,
      },
    },
  },
  [InAppLinks.SORTING]: {
    id: 'sorting',
    label: 'sorting',
    href: '/sorting',
    disabled: false,
  },
  [InAppLinks.MAP]: {
    id: 'map',
    label: 'map',
    href: '/map',
    disabled: true,
  },
  [InAppLinks.SCANNER]: {
    id: 'scanner',
    label: 'scanner',
    href: '/scanner',
    disabled: false,
  },
  [InAppLinks.SETTINGS]: {
    id: 'settings',
    label: 'settings',
    href: '/settings',
    disabled: false,
  },
  [InAppLinks.AUTH]: {
    id: 'auth',
    label: 'auth',
    href: '/auth',
    nested: {
      [InAppLinks.LOGIN]: {
        id: 'login',
        label: 'login',
        href: '/login',
        disabled: false,
      },
    },
  },
};
