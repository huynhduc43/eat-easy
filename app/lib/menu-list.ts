import { LucideIcon, BookText, Heart, House } from 'lucide-react';

import { Messages } from '@/global';

type Submenu = {
  href: string;
  label: keyof Messages['Layout']['sidebar'];
  active: boolean;
};

type Menu = {
  href: string;
  active: boolean;
  icon: LucideIcon;
  label: keyof Messages['Layout']['sidebar'];
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/home',
          label: 'home',
          active: pathname.includes('/home'),
          icon: House,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: '',
      menus: [
        {
          href: '/recipes',
          label: 'recipes',
          active: pathname.includes('/recipes'),
          icon: BookText,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: '',
      menus: [
        {
          href: '/favorites',
          label: 'favorites',
          active: pathname.includes('/favorites'),
          icon: Heart,
          submenus: [],
        },
      ],
    },
  ];
}
