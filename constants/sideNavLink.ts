export interface Link {
  id: string;
  title: string;
  href?: string;
  disabled?: boolean;
  links?: Link[];
}

export const sideNavLink: Link[] = [
  {
    id: 'dashboard',
    href: '/dashboard',
    title: 'Warehouse',
  },
  {
    id: 'sorting',
    href: '/sorting',
    title: 'Sorting',
  },
  {
    id: 'tasks',
    title: 'Tasks',
    links: [
      {
        id: 'pickup',
        href: '/tasks/pickup',
        title: 'Pickup',
      },
      {
        id: 'dropoff',
        href: '/tasks/dropoff',
        title: 'Dropoff',
      },
    ],
  },
  {
    id: 'map',
    href: '/map',
    title: 'Map',
    disabled: true,
  },
  {
    id: 'scanner',
    href: '/scanner',
    title: 'Scanner',
  },
];

export default sideNavLink;
