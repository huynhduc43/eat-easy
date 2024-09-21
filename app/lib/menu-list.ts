import { LucideIcon, BookText, Heart, House } from 'lucide-react';

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
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
          label: 'Home',
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
          label: 'Recipes',
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
          label: 'Favorites',
          active: pathname.includes('/favorites'),
          icon: Heart,
          submenus: [],
        },
      ],
    },
  ];
}
