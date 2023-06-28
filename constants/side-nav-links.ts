export enum InAppLinks {
  DASHBOARD = 'dashboard',
  SORTING = 'sorting',
  TASKS = 'tasks',
  DROPOFF = 'dropoff',
  PICKUP = 'pickup',
  MAP = 'map',
  SCANNER = 'scanner',
  SETTINGS = 'settings',
  AUTH = 'auth',
  LOGIN = 'login',
}

export type CustomLink = {
  id: string;
  label: string;
  href?: string;
  disabled?: boolean;
  parent?: string;
  nested?: CustomLinkList;
};

export type CustomLinkList = {
  [key in InAppLinks]?: CustomLink;
};

export const inAppLinks: CustomLinkList = {
  [InAppLinks.DASHBOARD]: {
    id: InAppLinks.DASHBOARD,
    label: 'dashboard',
    href: '/dashboard',
    disabled: false,
  },
  [InAppLinks.SORTING]: {
    id: InAppLinks.SORTING,
    label: 'sorting',
    href: '/sorting',
    disabled: false,
  },
  [InAppLinks.TASKS]: {
    id: InAppLinks.TASKS,
    label: 'tasks',
    href: '/tasks',
    nested: {
      [InAppLinks.PICKUP]: {
        id: InAppLinks.PICKUP,
        label: 'pickup',
        href: '/pickup',
        disabled: false,
        parent: InAppLinks.TASKS,
      },
      [InAppLinks.DROPOFF]: {
        id: InAppLinks.DROPOFF,
        label: 'dropoff',
        href: '/dropoff',
        disabled: true,
        parent: InAppLinks.TASKS,
      },
    },
  },
  [InAppLinks.MAP]: {
    id: InAppLinks.MAP,
    label: 'map',
    href: '/map',
    disabled: true,
  },
  [InAppLinks.SCANNER]: {
    id: InAppLinks.SCANNER,
    label: 'scanner',
    href: '/scanner',
    disabled: false,
  },
  [InAppLinks.SETTINGS]: {
    id: InAppLinks.SETTINGS,
    label: 'settings',
    href: '/settings',
    disabled: false,
  },
  [InAppLinks.AUTH]: {
    id: InAppLinks.AUTH,
    label: 'auth',
    href: '/auth',
    nested: {
      [InAppLinks.LOGIN]: {
        id: InAppLinks.LOGIN,
        label: 'login',
        href: '/login',
        disabled: false,
        parent: InAppLinks.AUTH,
      },
    },
  },
};
