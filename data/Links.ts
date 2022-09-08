import { NavigationItem, NavigationGroup } from "@/types/Links";

export const Data: (NavigationItem | NavigationGroup)[] = [
  {
    text: "Links",
    children: [
      { text: "Website", link: "https://ricardobalk.nl" },
    ],
  },
  {
    text: "Social",
    children: [
      { text: "Twitter", link: "https://twitter.com/RicardoBalk" },
      { text: "GitHub", link: "https://github.com/RicardoBalk" },
      { text: "LinkedIn", link: "https://www.linkedin.com/in/ricardobalk/" },
    ],
  },
];

export default Data;
