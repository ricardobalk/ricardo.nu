export interface NavItem {
  text: string;
  ariaLabel?: string;
}

export interface NavGroup<T> extends NavItem {
  children: T[];
}

export interface NavLink<T> extends NavItem {
  link: string;
  rel?: string;
  target?: string;
  children?: T[]; // TODO: This omits TS errors, but is not technically correct.
}

export type NavigationItem = NavLink<any>;
export type NavigationGroup = NavGroup<NavigationGroup | NavigationItem>;
export type NavigationMenu = (NavigationItem | NavigationGroup)[];

export const ExampleData: NavigationMenu = [
  {
    text: "Home",
    link: "/",
    ariaLabel: "Home",
  },
  {
    text: "About",
    link: "/about",
    ariaLabel: "About",
  },
  {
    text: "Contact",
    // link: '/contact',
    ariaLabel: "Contact",
    children: [
      {
        text: "Email",
        link: "mailto:example@example.com",
      },
      {
        text: "Phone",
        link: "tel:+1-555-555-5555",
      },
    ],
  },
];

export default NavigationMenu;