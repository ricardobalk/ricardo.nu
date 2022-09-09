export interface Link {
  link: string;
  rel?: string;
  target?: string;
}

export interface LinkLabel {
  text: string;
  ariaLabel?: string;
}

export interface LinkGroup<T> extends LinkLabel {
  children: T[];
}

export type LabelledLink = Link & LinkLabel;
export type NavLink<T> = Link & LinkLabel & { children?: T[] };
export type NavigationItem = NavLink<any>;
export type NavigationGroup = LinkGroup<NavigationGroup | NavigationItem>;
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